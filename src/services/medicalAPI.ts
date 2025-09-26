import { AudioTranscription, SOAPSummary } from '../types';

// Mock API 서비스 - 실제 환경에서는 실제 API로 교체
export const transcribeAudio = async (
  file: File
): Promise<AudioTranscription> => {
  // 실제 API 호출 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
  
  // Mock 응답 데이터
  const mockTranscriptions = {
    ko: [
      "의사: 안녕하세요, 오늘 어떤 증상으로 오셨나요?\n환자: 며칠 전부터 목이 아프고 기침이 나요. 열도 조금 있는 것 같고요.\n의사: 언제부터 증상이 시작되었나요?\n환자: 3일 전부터요. 처음에는 목만 살짝 아팠는데 점점 심해지고 있어요.\n의사: 다른 증상은 없으신가요? 두통이나 근육통 같은?\n환자: 어제부터 몸이 좀 무거운 느낌이 들어요. 그리고 가끔 오한이 들기도 하고요.\n의사: 알겠습니다. 목을 한번 확인해보겠습니다. 입을 크게 벌려주세요.\n환자: 네.\n의사: 목이 많이 부어있고 빨갛네요. 림프절도 조금 부어있습니다. 감기 초기 증상으로 보입니다.",
      "의사: 혈압 측정 결과가 나왔습니다. 140/90으로 조금 높은 편이네요.\n환자: 높은 편인가요? 평소에도 그런지 잘 모르겠어요.\n의사: 정상 혈압은 120/80 미만이므로 조금 높습니다. 평소 운동을 하시나요?\n환자: 요즘에는 거의 안 해요. 회사 일이 바빠서 운동할 시간이 없어요.\n의사: 짠 음식을 자주 드시는 편인가요?\n환자: 아무래도 외식을 자주 하다 보니 짠 편일 것 같아요.\n의사: 가족력은 어떻게 되시나요? 부모님 중에 고혈압이 있으신 분이 계신가요?\n환자: 아버지가 고혈압으로 약을 드시고 계세요.\n의사: 그렇다면 더욱 주의가 필요하겠네요. 생활습관 개선과 함께 약물 치료를 고려해볼 필요가 있습니다.",
      "환자: 무릎이 아파서 왔어요. 계단 오르내릴 때 특히 심해요.\n의사: 언제부터 아프셨나요?\n환자: 한 달 정도 된 것 같아요. 처음에는 가볍게 생각했는데 점점 심해지네요.\n의사: 어떤 상황에서 가장 아프신가요?\n환자: 아침에 일어날 때랑 오래 앉아있다가 일어날 때 심해요. 그리고 계단 내려갈 때도 아파요.\n의사: 무릎에 붓기나 열감은 없으신가요?\n환자: 붓기는 잘 모르겠는데, 가끔 무릎이 뜨거운 느낌이 들어요.\n의사: X-ray 촬영을 해보겠습니다. 관절염 초기 증상일 수 있어요.\n환자: 관절염인가요? 나이가 아직 많지 않은데...\n의사: 관절염은 나이와 상관없이 올 수 있습니다. 정확한 진단을 위해 검사를 진행해보죠."
    ],
    en: [
      "Doctor: Hello, what symptoms brought you here today?\nPatient: I've had a sore throat and cough for a few days. I think I have a slight fever too.\nDoctor: When did the symptoms start?\nPatient: About three days ago. At first, my throat was just slightly sore, but it's getting worse.\nDoctor: Do you have any other symptoms? Like headache or muscle aches?\nPatient: Since yesterday, I've been feeling heavy. And I sometimes get chills.\nDoctor: I see. Let me check your throat. Please open your mouth wide.\nPatient: Okay.\nDoctor: Your throat is quite swollen and red. The lymph nodes are also slightly swollen. It looks like early cold symptoms."
    ]
  };
  
  const transcriptionTexts = mockTranscriptions.ko;
  const randomText = transcriptionTexts[Math.floor(Math.random() * transcriptionTexts.length)];
  
  return {
    id: `trans_${Date.now()}`,
    filename: file.name,
    originalText: randomText,
    duration: Math.floor(180 + Math.random() * 300), // 3-8분
    timestamp: new Date()
  };
};

export const generateSOAPSummary = async (
  transcription: AudioTranscription
): Promise<SOAPSummary> => {
  // 실제 API 호출 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 4000 + Math.random() * 2000));
  
  // Mock SOAP 요약 데이터
  const mockSOAPSummaries = {
    ko: [
      {
        subjective: "환자는 3일 전부터 시작된 인후통과 기침을 주증상으로 내원하였습니다. 미열 및 오한을 동반하며, 어제부터는 전신 무력감도 호소하고 있습니다. 초기에는 경미한 인후통이었으나 점차 악화되는 양상을 보이고 있습니다.",
        objective: "신체검진상 인두 및 편도선의 발적과 부종이 관찰되며, 경부 림프절의 경미한 종대가 촉진됩니다. 체온 37.8°C, 혈압 120/80mmHg, 맥박 88회/분, 호흡수 18회/분으로 측정되었습니다.",
        assessment: "임상증상 및 신체검진 소견을 종합하면 급성 인두염(Acute pharyngitis)으로 진단됩니다. 바이러스성 감염으로 추정되며, 현재까지는 세균성 감염의 징후는 보이지 않습니다.",
        plan: "1. 충분한 휴식과 수분 섭취\n2. 해열진통제 처방 (아세트아미노펜 500mg, 1일 3회)\n3. 양치질 및 따뜻한 소금물 가글링\n4. 증상 악화 시 재내원 권고\n5. 3일 후 경과 관찰을 위한 재방문 예약"
      },
      {
        subjective: "환자는 혈압 측정 결과 140/90mmHg로 측정되어 내원하였습니다. 평소 운동 부족과 잦은 외식으로 인한 고염분 식사를 하고 있으며, 가족력상 아버지가 고혈압으로 약물 치료 중입니다.",
        objective: "혈압 140/90mmHg (정상 범위 초과), 체중 78kg, 신장 170cm (BMI 27.0), 복부 둘레 증가 소견. 기타 심박수, 호흡수는 정상 범위 내입니다.",
        assessment: "1차성 고혈압(Primary hypertension)으로 진단됩니다. 생활습관 요인(운동 부족, 고염분 식사)과 유전적 요인이 복합적으로 작용한 것으로 판단됩니다.",
        plan: "1. 생활습관 개선 교육 (저염식, 규칙적 운동)\n2. 체중 감량 목표 설정 (5-10% 감량)\n3. 혈압약 처방 (ACE 억제제 고려)\n4. 2주 후 혈압 재측정을 위한 재방문\n5. 혈액검사 (콜레스테롤, 혈당 검사) 처방"
      },
      {
        subjective: "환자는 약 한 달 전부터 시작된 무릎 통증으로 내원하였습니다. 특히 계단 오르내리기, 아침 기상 시, 장시간 앉은 후 일어날 때 통증이 심화됩니다. 간헐적으로 무릎의 열감도 느끼고 있습니다.",
        objective: "좌측 무릎 관절의 경미한 부종과 압통이 관찰됩니다. 관절 가동 범위는 정상이나 굴곡 시 경미한 통증을 호소합니다. 보행 시 경미한 파행이 관찰됩니다.",
        assessment: "임상 증상을 종합하면 초기 무릎 관절염(Early knee osteoarthritis) 또는 연골연화증이 의심됩니다. 정확한 진단을 위해 영상 검사가 필요합니다.",
        plan: "1. 무릎 X-ray 촬영 처방\n2. 소염진통제 처방 (이부프로펜 400mg, 1일 2회)\n3. 물리치료 의뢰\n4. 무릎에 무리가 가는 활동 제한\n5. 1주일 후 X-ray 결과 확인을 위한 재방문"
      }
    ],
    en: [
      {
        subjective: "The patient presented with a chief complaint of sore throat and cough that started 3 days ago. Associated symptoms include mild fever and chills, with generalized fatigue since yesterday. Initially mild throat discomfort has progressively worsened.",
        objective: "Physical examination reveals erythema and swelling of the pharynx and tonsils, with palpable mild cervical lymphadenopathy. Vital signs: Temperature 37.8°C, BP 120/80mmHg, HR 88/min, RR 18/min.",
        assessment: "Based on clinical presentation and physical findings, the diagnosis is acute pharyngitis. Viral etiology is suspected, with no current evidence of bacterial infection.",
        plan: "1. Rest and adequate fluid intake\n2. Acetaminophen 500mg TID for fever and pain\n3. Warm salt water gargling\n4. Return if symptoms worsen\n5. Follow-up visit in 3 days"
      }
    ]
  };
  
  const summaries = mockSOAPSummaries.ko;
  const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
  
  return {
    id: `soap_${Date.now()}`,
    ...randomSummary,
    timestamp: new Date(),
    transcriptionId: transcription.id
  };
};