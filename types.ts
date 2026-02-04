
export type UserRole = 'apprenant' | 'coach' | 'admin';
export type BlockType = 'conceptual_misunderstanding' | 'logic_error' | 'missing_context' | 'terminology_confusion';
export type InterventionMode = 'asynchronous' | 'ai_guided' | 'synchronous';

export interface BlockInfo {
  isBlocked: boolean;
  type: BlockType;
  aiSynthesis: string;
  failCount: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  lastAttemptDate: string;
  moduleId: string;
  moduleTitle: string;
}


export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  isLocked: boolean;
  status: 'completed' | 'in-progress' | 'locked' | 'not-started';
  content: string;
  objectives: string[];
  prerequisites?: string[]; // IDs of required modules
  score?: number;
  llmConfig?: {
    tutorContext?: string;
    evaluationPrompt?: string;
    strictness?: 'low' | 'medium' | 'high';
    style?: 'socratic' | 'didactic' | 'concise';
    depth?: 'overview' | 'detailed' | 'expert';
  };
}

export interface Course {
  id: string;
  title: string;
  category: 'blockchain' | 'finance' | 'development' | 'security';
  progress: number;
  image: string;
  status?: 'draft' | 'published' | 'archived';
  version?: string;
  modules: Module[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  dateEarned: string;
  icon: string;
  color: string;
}

export interface LearnerProgress {
  totalCourses: number;
  completedModules: number;
  avgScore: number;
  skillMatrix: { skill: string; value: number }[];
}

export interface InsightLLM {
  id: string;
  topic: string;
  studentCount: number;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface PendingReview {
  id: string;
  studentName: string;
  moduleTitle: string;
  submissionDate: string;
  aiInitialScore: number;
}

export interface ActivityLog {
  id: string;
  type: 'module_completion' | 'audit_submission' | 'tutor_interaction';
  date: string;
  description: string;
  score?: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  overallProgress: number;
  avgScore: number;
  strengths: string[];
  weaknesses: string[];
  activityLog: ActivityLog[];
  skills: { skill: string; value: number }[];
  blockInfo?: BlockInfo;
}
