import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Mic,
  FileText,
  Activity,
  Stethoscope,
  ArrowLeft,
  Edit,
  Check,
  X,
  User,
  UserCircle,
  Phone,
  Mail,
  FileClockIcon,
  FileAudio,
} from "lucide-react";
import { AudioTranscription, SOAPSummary, Patient } from "../types";
import { generateSOAPSummary } from "../services/medicalAPI";

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
}

// 화자별 대화 인터페이스
interface DialogueLine {
  speaker: 'speaker1' | 'speaker2';
  content: string;
  timestamp?: string;
}

// 대화 형태로 텍스트 파싱하는 함수
const parseDialogueText = (text: string): DialogueLine[] => {
  const lines = text.split('\n').filter(line => line.trim());
  const dialogue: DialogueLine[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    const speakerMatch = trimmedLine.match(/^(사람[12]|의사|환자|doctor|patient|speaker[12]|person[12])\s*[:：]\s*(.+)$/i);
    
    if (speakerMatch) {
      const speakerLabel = speakerMatch[1].toLowerCase();
      const content = speakerMatch[2];
      
      const speaker = (
        speakerLabel.includes('1') || 
        speakerLabel.includes('의사') || 
        speakerLabel.includes('doctor')
      ) ? 'speaker1' : 'speaker2';
      
      dialogue.push({
        speaker,
        content: content.trim(),
      });
    } else if (trimmedLine && dialogue.length > 0) {
      const lastIndex = dialogue.length - 1;
      dialogue[lastIndex].content += ' ' + trimmedLine;
    }
  }
  
  return dialogue;
};

// 대화 UI 컴포넌트
const DialogueView = ({ dialogue }: { dialogue: DialogueLine[] }) => {
  return (
    <div className="space-y-3 w-full overflow-hidden">
      {dialogue.map((line, index) => (
        <div
          key={index}
          className={`flex w-full ${line.speaker === 'speaker1' ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg break-words overflow-hidden ${
              line.speaker === 'speaker1'
                ? 'bg-blue-50 border border-blue-200 text-blue-900'
                : 'bg-green-50 border border-green-200 text-green-900'
            }`}
          >
            <div className="flex items-start space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                line.speaker === 'speaker1' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-green-600 text-white'
              }`}>
                {line.speaker === 'speaker1' ? (
                  <Stethoscope className="w-3 h-3" />
                ) : (
                  <User className="w-3 h-3" />
                )}
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className={`text-xs font-medium mb-1 ${
                  line.speaker === 'speaker1' ? 'text-blue-700' : 'text-green-700'
                }`}>
                  {line.speaker === 'speaker1' ? '의사' : '환자'}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                  {line.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="h-1" />
    </div>
  );
};

export function PatientDetail({
  patient,
  onBack,
}: PatientDetailProps) {
  const [transcription, setTranscription] = useState<AudioTranscription | null>(null);
  const [soapSummary, setSoapSummary] = useState<SOAPSummary | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // 컴포넌트 마운트 시 기본 상담 데이터 로드
  useEffect(() => {
    // 기본 상담 데이터 생성 (실제로는 선택된 상담 ID에 따라 로드)
    const generateMockTranscription = () => {
      const mockTexts = [
        "의사: 안녕하세요, 오늘 어떤 증상으로 오셨나요?\n환자: 며칠 전부터 목이 아프고 기침이 나요. 열도 조금 있는 것 같고요.\n의사: 언제부터 증상이 시작되었나요?\n환자: 3일 전부터요. 처음에는 목만 살짝 아팠는데 점점 심해지고 있어요.\n의사: 다른 증상은 없으신가요? 두통이나 근육통 같은?\n환자: 어제부터 몸이 좀 무거운 느낌이 들어요. 그리고 가끔 오한이 들기도 하고요.\n의사: 알겠습니다. 목을 한번 확인해보겠습니다. 입을 크게 벌려주세요.\n환자: 네.\n의사: 목이 많이 부어있고 빨갛네요. 림프절도 조금 부어있습니다. 감기 초기 증상으로 보입니다.",
        "의사: 혈압 측정 결과가 나왔습니다. 140/90으로 조금 높은 편이네요.\n환자: 높은 편인가요? 평소에도 그런지 잘 모르겠어요.\n의사: 정상 혈압은 120/80 미만이므로 조금 높습니다. 평소 운동을 하시나요?\n환자: 요즘에는 거의 안 해요. 회사 일이 바빠서 운동할 시간이 없어요.\n의사: 짠 음식을 자주 드시는 편인가요?\n환자: 아무래도 외식을 자주 하다 보니 짠 편일 것 같아요.\n의사: 가족력은 어떻게 되시나요? 부모님 중에 고혈압이 있으신 분이 계신가요?\n환자: 아버지가 고혈압으로 약을 드시고 계세요.\n의사: 그렇다면 더욱 주의가 필요하겠네요. 생활습관 개선과 함께 약물 치료를 고려해볼 필요가 있습니다."
      ];
      
      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      
      return {
        id: `trans_${Date.now()}`,
        filename: `${patient.name}_상담_${new Date().toISOString().split('T')[0]}.mp3`,
        originalText: randomText,
        duration: Math.floor(300 + Math.random() * 600), // 5-15분
        timestamp: new Date()
      };
    };

    const mockTranscription = generateMockTranscription();
    setTranscription(mockTranscription);
  }, [patient.id]);

  // transcription이 설정되면 자동으로 SOAP 요약 생성
  useEffect(() => {
    if (transcription && !soapSummary) {
      setTimeout(() => {
        handleAutoGenerateSummary();
      }, 1000);
    }
  }, [transcription]);

  // 편집 기능을 위한 새로운 상태
  const [isEditingTranscription, setIsEditingTranscription] = useState(false);
  const [editedTranscriptionText, setEditedTranscriptionText] = useState("");
  const transcriptionScrollRef = useRef<HTMLDivElement>(null);
  const soapScrollRef = useRef<HTMLDivElement>(null);

  // 원본 데이터 표시 상태
  const [showRawData, setShowRawData] = useState(false);

  // 화자 분리된 대화 데이터
  const [parsedDialogue, setParsedDialogue] = useState<DialogueLine[]>([]);

  // 자동 스크롤을 위한 ref 추가
  const dialogueScrollRef = useRef<HTMLDivElement>(null);

  // transcription이 변경될 때마다 대화 파싱
  useEffect(() => {
    if (transcription?.originalText) {
      const dialogue = parseDialogueText(transcription.originalText);
      setParsedDialogue(dialogue);
    } else {
      setParsedDialogue([]);
    }
  }, [transcription]);

  // 자동 스크롤 기능 개선 - 대화 데이터가 업데이트될 때
  useEffect(() => {
    if (parsedDialogue.length > 0 && dialogueScrollRef.current) {
      setTimeout(() => {
        if (dialogueScrollRef.current) {
          const scrollContainer = dialogueScrollRef.current.closest('.scroll-area-viewport');
          if (scrollContainer) {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollHeight,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
    }
  }, [parsedDialogue]);

  const handleAutoGenerateSummary = async () => {
    if (!transcription) return;

    setIsGeneratingSummary(true);

    try {
      const result = await generateSOAPSummary(transcription);
      setSoapSummary(result);

      setTimeout(() => {
        if (soapScrollRef.current) {
          soapScrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } catch (error) {
      console.error("SOAP 요약 생성 오류:", error);
      alert("SOAP 요약 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const resetData = () => {
    setTranscription(null);
    setSoapSummary(null);
    setIsEditingTranscription(false);
    setEditedTranscriptionText("");
    setShowRawData(false);
  };

  const startEditingTranscription = () => {
    if (!transcription) return;
    setEditedTranscriptionText(transcription.originalText);
    setIsEditingTranscription(true);
  };

  const cancelEditingTranscription = () => {
    setIsEditingTranscription(false);
    setEditedTranscriptionText("");
  };

  const saveEditedTranscription = async () => {
    if (!transcription || !editedTranscriptionText.trim()) return;

    const updatedTranscription: AudioTranscription = {
      ...transcription,
      originalText: editedTranscriptionText.trim(),
      timestamp: new Date(),
    };

    setTranscription(updatedTranscription);
    setIsEditingTranscription(false);
    setSoapSummary(null);

    setIsGeneratingSummary(true);

    try {
      const result = await generateSOAPSummary(updatedTranscription);
      setSoapSummary(result);

      setTimeout(() => {
        if (soapScrollRef.current) {
          soapScrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } catch (error) {
      console.error("SOAP 요약 재생성 오류:", error);
      alert("SOAP 요약 재생성 중 오류가 발생했습니다.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-blue-900">상담 요약 시스템</h1>
                <p className="text-sm text-blue-600">{patient.name} 환자</p>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white border-b border-blue-100 px-6 py-4">
        <Card className="border-blue-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <UserCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-lg text-blue-900 mb-1">{patient.name}</h2>
                  <div className="flex items-center space-x-3 text-sm text-blue-600">
                    <span>{patient.age}세 • {patient.gender}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <FileClockIcon className="w-3 h-3" />
                      <span>상담 {patient.consultationCount}회</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Phone className="w-4 h-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Mail className="w-4 h-4" />
                    <span>{patient.email}</span>
                  </div>
                </div>
                
                {transcription && (
                  <Button
                    onClick={resetData}
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    새 상담 시작
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Content Area - Transcription & SOAP */}
        <div className="flex-1 flex min-w-0">
          {/* Left: Transcription */}
          <div className="flex-1 p-6 border-r border-blue-100">
            <Card className="h-full border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mic className="w-5 h-5" />
                    <span>상담 녹취록</span>
                    {transcription && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {transcription.duration ? formatDuration(transcription.duration) : ""}
                      </Badge>
                    )}
                  </div>
                  {transcription && !isEditingTranscription && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowRawData(!showRawData)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        {showRawData ? '대화형 보기' : '원본 텍스트'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={startEditingTranscription}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        disabled={isGeneratingSummary}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        편집
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <ScrollArea className="h-full px-6 pb-6">
                  {transcription ? (
                    <div ref={transcriptionScrollRef} className="space-y-4">
                      <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <FileAudio className="w-4 h-4" />
                          <span className="font-medium">{transcription.filename}</span>
                        </div>
                        <div className="text-xs">
                          생성 시간: {transcription.timestamp.toLocaleString()}
                        </div>
                      </div>

                      {isEditingTranscription ? (
                        <div className="space-y-4 w-full">
                          <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <div className="flex items-center space-x-2 mb-1">
                              <Edit className="w-4 h-4" />
                              <span className="font-medium">편집 모드</span>
                            </div>
                            <div className="text-xs">상담 내용을 수정한 후 저장하면 SOAP 요약이 다시 생성됩니다.</div>
                          </div>

                          <div className="w-full">
                            <Textarea
                              value={editedTranscriptionText}
                              onChange={(e) => setEditedTranscriptionText(e.target.value)}
                              className="min-h-[300px] w-full resize-none border-blue-200 focus:border-blue-400"
                              placeholder="상담 내용을 입력하세요..."
                            />
                          </div>

                          <div className="flex flex-wrap gap-2 w-full">
                            <Button
                              onClick={saveEditedTranscription}
                              className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
                              disabled={!editedTranscriptionText.trim() || isGeneratingSummary}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              {isGeneratingSummary ? "재생성 중..." : "저장 및 재생성"}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={cancelEditingTranscription}
                              className="border-gray-300 text-gray-600 hover:bg-gray-50 flex-shrink-0"
                              disabled={isGeneratingSummary}
                            >
                              <X className="w-4 h-4 mr-1" />
                              취소
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="prose prose-sm prose-blue max-w-none">
                          {showRawData ? (
                            <div className="space-y-4 w-full overflow-hidden">
                              <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded text-center">
                                📋 원본 텍스트
                              </div>
                              <div className="whitespace-pre-wrap leading-relaxed p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 overflow-hidden break-words overflow-wrap-anywhere">
                                {transcription.originalText}
                              </div>
                            </div>
                          ) : parsedDialogue.length > 0 ? (
                            <div className="space-y-4 w-full overflow-hidden" ref={dialogueScrollRef}>
                              <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded text-center">
                                💬 {parsedDialogue.length}개의 대화 감지됨
                              </div>
                              <DialogueView dialogue={parsedDialogue} />
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap leading-relaxed p-4 bg-white border border-blue-100 rounded-lg overflow-hidden break-words overflow-wrap-anywhere">
                              {transcription.originalText}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Mic className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg text-blue-900 mb-2">{patient.name}님과의 상담 기록</h3>
                      <p className="text-blue-600 text-sm">
                        상담 내용을 텍스트로 입력하거나 기존 기록을 불러오세요
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right: SOAP Summary */}
          <div className="flex-1 p-6">
            <Card className="h-full border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>SOAP 요약</span>
                  {soapSummary && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      요약 완료
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <ScrollArea className="h-full px-6 pb-6">
                  {soapSummary ? (
                    <div ref={soapScrollRef} className="space-y-6">
                      <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Stethoscope className="w-4 h-4" />
                          <span className="font-medium">요약 완료</span>
                        </div>
                        <div className="text-xs">
                          생성 시간: {soapSummary.timestamp.toLocaleString()}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-md font-medium text-blue-900 mb-2 flex items-center">
                            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-2">
                              S
                            </span>
                            주관적 증상 (Subjective)
                          </h4>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="whitespace-pre-wrap text-sm">{soapSummary.subjective}</div>
                          </div>
                        </div>

                        <Separator className="bg-blue-100" />

                        <div>
                          <h4 className="text-md font-medium text-green-900 mb-2 flex items-center">
                            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-2">
                              O
                            </span>
                            객관적 소견 (Objective)
                          </h4>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="whitespace-pre-wrap text-sm">{soapSummary.objective}</div>
                          </div>
                        </div>

                        <Separator className="bg-blue-100" />

                        <div>
                          <h4 className="text-md font-medium text-yellow-900 mb-2 flex items-center">
                            <span className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs mr-2">
                              A
                            </span>
                            평가 및 진단 (Assessment)
                          </h4>
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="whitespace-pre-wrap text-sm">{soapSummary.assessment}</div>
                          </div>
                        </div>

                        <Separator className="bg-blue-100" />

                        <div>
                          <h4 className="text-md font-medium text-purple-900 mb-2 flex items-center">
                            <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs mr-2">
                              P
                            </span>
                            치료 계획 (Plan)
                          </h4>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="whitespace-pre-wrap text-sm">{soapSummary.plan}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg text-blue-900 mb-2">SOAP 진료 기록</h3>
                      <p className="text-blue-600 text-sm">
                        상담 내용이 입력되면 자동으로 의료 요약이 생성됩니다
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur border-t border-blue-100 mt-auto flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 (주)MAiN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}