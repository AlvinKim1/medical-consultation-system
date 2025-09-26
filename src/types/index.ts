export interface AudioTranscription {
  id: string;
  filename: string;
  originalText: string;
  duration: number;
  timestamp: Date;
}

export interface SOAPSummary {
  id: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  timestamp: Date;
  transcriptionId: string;
}

export interface MedicalConsultation {
  id: string;
  patientId: string;
  date: string;
  transcription?: AudioTranscription;
  soapSummary?: SOAPSummary;
  status: 'recording' | 'transcribed' | 'summarized' | 'completed';
  duration?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastConsultation?: string;
  consultationCount: number;
  recentConditions: string[];
  consultations: MedicalConsultation[];
}

export type MenuTab = 'ai-consultation' | 'prescription-analysis' | 'health-checkup' | 'medical-summary';