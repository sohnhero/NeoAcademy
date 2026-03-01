
export type UserRole = 'apprenant' | 'coach' | 'admin';
export type BlockType = 'conceptual_misunderstanding' | 'logic_error' | 'missing_context' | 'terminology_confusion';
export type InterventionMode = 'asynchronous' | 'ai_guided' | 'synchronous';

// =====================================================
// LEARNER LOGIC V2 - New Hierarchy Types
// =====================================================

// Exit profiles for AI-generated paths
export type ExitProfile =
  | 'web3_developer'
  | 'smart_contract_auditor'
  | 'defi_specialist'
  | 'blockchain_architect'
  | 'nft_developer'
  | 'security_expert'
  | 'infra_engineer'
  | 'fullstack_dapp';

// Learning path types
export type LearningPathType = 'ai-generated' | 'custom' | 'predefined';
export type ProgressStatus = 'locked' | 'not-started' | 'in-progress' | 'completed' | 'failed';

// Content types for courses
export type ContentType = 'video' | 'text' | 'graphic' | 'audio' | 'interactive';

// Badge types
export type BadgeType = 'course' | 'module' | 'learning-path' | 'certification';

// =====================================================
// Core Content Structures
// =====================================================

export interface CourseContent {
  id: string;
  type: ContentType;
  title: string;
  content: string;
  duration?: string;
  mediaUrl?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'code' | 'text' | 'quiz' | 'practical';
  prompt: string;
  passingScore: number;
  tools?: string[];
}

export interface Remediation {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: CourseContent[];
  exercise: Exercise;
  targetedGaps: string[];
  status: ProgressStatus;
  assignedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  type: BadgeType;
  dateEarned: string;
  icon: string;
  color: string;
  relatedId?: string; // ID of course/module/path
}

// =====================================================
// Course Level (Lowest in hierarchy)
// =====================================================

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  content: CourseContent[];
  objectives: string[];
  exercise: Exercise;
  status: ProgressStatus;
  isLocked: boolean;
  score?: number;
  badge?: Badge;
  remediation?: Remediation;
  llmConfig?: LLMConfig;
}

export interface LLMConfig {
  tutorContext?: string;
  evaluationPrompt?: string;
  strictness?: 'low' | 'medium' | 'high';
  style?: 'socratic' | 'didactic' | 'concise';
  depth?: 'overview' | 'detailed' | 'expert';
}

// =====================================================
// Project Planning Support
// =====================================================

export interface PlannedTask {
  id: string;
  originalId?: string; // ID of the course or module this task refers to
  title: string;
  durationInHours: number;
  deadline?: string; // ISO string for individual milestone deadline
  status: 'pending' | 'completed' | 'on-track' | 'at-risk';
  order: number;
}

export interface ProjectPlan {
  id: string;
  tasks: PlannedTask[];
  totalAllocatedHours: number;
  lastUpdated: string;
}

// =====================================================
// Module Level (Contains Courses)
// =====================================

export interface ModuleExam {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: ExamQuestion[];
  passingScore: number;
  tools?: string[];
  status: ProgressStatus;
  score?: number;
  attempts: number;
  globalDeadline?: string;
  plan?: ProjectPlan;
}

export interface ExamQuestion {
  id: string;
  type: 'code' | 'text' | 'multiple-choice' | 'practical';
  question: string;
  points: number;
}

export interface PathModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  courses: Course[];
  exam?: ModuleExam;
  status: ProgressStatus;
  isLocked: boolean;
  progress: number;
  badge?: Badge;
}

// =====================================================
// Learning Path Level (Top of hierarchy)
// =====================================================

export interface FinalProject {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  deliverables: Deliverable[];
  globalDeadline: string;
  status: ProgressStatus;
  score?: number;
  submittedAt?: string;
  feedback?: string;
  plan?: ProjectPlan;
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  deadline: string;
  submittedAt?: string;
  content?: string;
  status: 'pending' | 'submitted' | 'validated' | 'failed';
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  exitProfile: ExitProfile;
  exitProfileLabel: string;
  image: string;
  modules: PathModule[];
  finalProject?: FinalProject;
  status: ProgressStatus;
  progress: number;
  type: LearningPathType;
  estimatedDuration: string;
  skills: string[];
  certification?: Badge;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

// =====================================================
// Learner Progress & Profile
// =====================================================

export interface LearnerProgress {
  totalPaths: number;
  completedPaths: number;
  totalModules: number;
  completedModules: number;
  totalCourses: number;
  completedCourses: number;
  avgScore: number;
  skillMatrix: { skill: string; value: number }[];
  currentLevel?: string;
  identifiedGaps?: { topic: string; severity: 'high' | 'medium' | 'low'; recommendedModule?: string }[];
  evolutionData?: { date: string; score: number }[];
  currentPath?: LearningPath;
}

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  badges: Badge[];
  certifications: Badge[];
  progress: LearnerProgress;
  strengths: string[];
  weaknesses: string[];
  activityLog: ActivityLog[];
}

// =====================================================
// Coach Support
// =====================================================

export interface CoachSession {
  id: string;
  learnerId: string;
  coachId: string;
  learningPathId: string;
  courseId?: string;
  moduleId?: string;
  status: 'requested' | 'scheduled' | 'in-progress' | 'completed';
  context: string;
  blockingPoints: string[];
  messages: CoachMessage[];
  scheduledAt?: string;
  completedAt?: string;
}

export interface CoachMessage {
  id: string;
  senderId: string;
  senderRole: 'learner' | 'coach';
  content: string;
  timestamp: string;
}

export interface Coach {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  specialties: string[];
  availablePaths: string[];
}

// =====================================================
// Legacy Types (for backward compatibility)
// =====================================================

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

// Legacy Module type (mapped to Course in V2)
export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  isLocked: boolean;
  status: 'completed' | 'in-progress' | 'locked' | 'not-started';
  content: string;
  objectives: string[];
  prerequisites?: string[];
  score?: number;
  llmConfig?: LLMConfig;
}

// Legacy Course type (mapped to LearningPath in V2)
export interface LegacyCourse {
  id: string;
  title: string;
  category: 'blockchain' | 'finance' | 'development' | 'security';
  progress: number;
  image: string;
  status?: 'draft' | 'published' | 'archived';
  version?: string;
  modules: Module[];
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
  type: 'course_completion' | 'module_completion' | 'path_completion' | 'exam_submission' | 'remediation' | 'coach_session' | 'tutor_interaction';
  date: string;
  description: string;
  score?: number;
  relatedId?: string;
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

// =====================================================
// AI DIAGNOSTIC TEST SYSTEM
// =====================================================

export interface DiagnosticQuestion {
  id: string;
  type: 'mcq' | 'open';
  question: string;
  options?: string[];     // For MCQ only
  correctAnswer?: string; // For MCQ only
  topic: string;
}

export interface DiagnosticResult {
  level: 'débutant' | 'intermédiaire' | 'avancé';
  score: number;
  gaps: string[];
  strengths: string[];
  recommendations: string[];
  adaptedModuleNotes: string;
}

// =====================================================
// PAYMENT & SUBSCRIPTION SYSTEM
// =====================================================

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'elite';

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  price: number;
  yearlyPrice?: number;
  freeModulesCount: number;
  features: string[];
  isPopular?: boolean;
  coachSessionsIncluded: number;
}

export interface UserSubscription {
  currentTier: SubscriptionTier;
  planName: string;
  startDate?: string;
  nextBillingDate?: string;
  isActive: boolean;
}

export interface CoachRate {
  id: string;
  durationMinutes: number;
  label: string;
  price: number;
  description: string;
}

export interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'subscription' | 'coach_session';
  status: 'completed' | 'pending' | 'failed';
}
