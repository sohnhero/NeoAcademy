
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import CourseDetailView from './components/CourseDetailView';
import CourseLibraryView from './components/CourseLibraryView';
import PortfolioView from './components/PortfolioView';
import LearningPathView from './components/LearningPathView';
import PathFinderView from './components/PathFinderView';
import RemediationView from './components/RemediationView';
import ModuleExamView from './components/ModuleExamView';
import FinalProjectView from './components/FinalProjectView';
import ExerciseIDEView from './components/ExerciseIDEView';
import CoachRequestModal from './components/CoachRequestModal';
import CoachDashboard from './components/CoachDashboard';
import CoachCohortView from './components/CoachCohortView';
import StudentDetailView from './components/StudentDetailView';
import AdminDashboard from './components/AdminDashboard';
import AdminConfigView from './components/AdminConfigView';
import AdminPathBuilder from './components/AdminPathBuilder';
import CoachReviewView from './components/CoachReviewView';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import AIProcessOverlay from './components/AIProcessOverlay';
import WelcomeOverlay from './components/WelcomeOverlay';
import DeadlinePlanningBoard from './components/DeadlinePlanningBoard';
import DeadlineQuickView from './components/DeadlineQuickView';
import LiveSessionOverlay from './components/LiveSessionOverlay';
import CongratulationsModal from './components/CongratulationsModal';
import SubscriptionView from './components/SubscriptionView';
import { UserRole, LearningPath, PathModule, Course, LegacyCourse, Remediation, ProjectPlan, Coach, UserSubscription, SubscriptionTier } from './types';
import { MOCK_LEARNING_PATHS, MOCK_COURSES, MOCK_COACHES } from './constants';
import api from './services/api';
import { evaluateModule } from './services/geminiService';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // New user flow state
  const [isNewUser, setIsNewUser] = useState(false);
  const [showPathFinder, setShowPathFinder] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('light-mode');
  }, []);

  const [userRole, setUserRole] = useState<UserRole>('apprenant');
  const [activeTab, setActiveTab] = useState('dashboard');

  // V2 State - Learning Paths
  const [currentLearningPath, setCurrentLearningPath] = useState<LearningPath | null>(null);

  // Navigation State
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [showModuleExam, setShowModuleExam] = useState(false);
  const [showFinalProject, setShowFinalProject] = useState(false);
  const [activeRemediation, setActiveRemediation] = useState<{ remediation: Remediation; course: Course } | null>(null);

  // Coach Modal
  const [showCoachModal, setShowCoachModal] = useState(false);
  const [coachContext, setCoachContext] = useState<{ course?: string; module?: string; blocking?: string }>({});

  // IDE State (App-level for full-screen overlay)
  const [showIDE, setShowIDE] = useState(false);
  const [ideContext, setIdeContext] = useState<{ type: 'course' | 'module' | 'final'; title: string; moduleId?: string; courseId?: string } | null>(null);

  // AI Overlay State
  const [showAIOverlay, setShowAIOverlay] = useState(false);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState<'analysis' | 'generation' | 'audit' | 'remediation'>('analysis');
  const [pendingIDEAction, setPendingIDEAction] = useState<(() => void) | null>(null);

  // Remediation Navigation State
  const [isShowingRemediation, setIsShowingRemediation] = useState(false);

  // Submission Synchronization State
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [animationFinished, setAnimationFinished] = useState(false);

  // Deadline Delivery System State
  const [showPlanningBoard, setShowPlanningBoard] = useState(false);
  const [planningContext, setPlanningContext] = useState<{
    type: 'module' | 'final';
    deadline: string;
    title: string;
    id: string;
    subBlocks?: { id: string; title: string }[];
    initialPlan?: ProjectPlan
  } | null>(null);

  // Live Coaching Session State
  const [activeLiveSession, setActiveLiveSession] = useState<{
    type: 'module' | 'final';
    id: string;
    title: string;
    coach: Coach;
  } | null>(null);

  // Congratulations Modal State
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [congratsData, setCongratsData] = useState<{
    title: string;
    type: 'course' | 'module' | 'badge';
    score?: number;
    badgeName?: string;
  } | null>(null);

  // Subscription State
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    currentTier: 'free',
    planName: 'Gratuit',
    isActive: true
  });

  const handleUpgradeSubscription = (tier: SubscriptionTier) => {
    const planNames: Record<SubscriptionTier, string> = { free: 'Gratuit', starter: 'Starter', pro: 'Pro', elite: 'Elite' };
    setUserSubscription({
      currentTier: tier,
      planName: planNames[tier],
      startDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true
    });
    toast.success(`🎉 Abonnement ${planNames[tier]} activé avec succès !`, { theme: 'dark' });
  };

  // Legacy State (for admin/coach views)
  const [legacyCourses, setLegacyCourses] = useState<LegacyCourse[]>([]);
  const [availablePaths, setAvailablePaths] = useState<LearningPath[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch courses and learning paths in parallel
        const [coursesData, pathsData] = await Promise.all([
          api.courses.getAll(),
          api.learningPaths.getAll()
        ]);
        setLegacyCourses(coursesData);
        setAvailablePaths(pathsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLegacyCourses(MOCK_COURSES);
        setAvailablePaths(MOCK_LEARNING_PATHS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle Synchronized IDE Completion - Moved to top level to obey rules of hooks
  useEffect(() => {
    console.log('[IDE Completion] useEffect triggered', {
      animationFinished,
      hasSubmissionResult: !!submissionResult,
      hasIdeContext: !!ideContext,
      ideContextType: ideContext?.type,
      ideContextCourseId: ideContext?.courseId
    });

    if (animationFinished && submissionResult && ideContext) {
      console.log('[IDE Completion] All conditions met, processing result', { type: ideContext.type });
      const { result, course, moduleId, isFinalProject } = submissionResult;
      const passed = result.isPassed;

      // 1. User Feedback
      if (passed) {
        setCongratsData({
          title: ideContext.title,
          type: ideContext.type === 'course' ? 'course' : 'module',
          score: result.score
        });
        setShowCongratsModal(true);
      } else {
        toast.error(
          `⚠️ ÉCHEC DE L'AUDIT\n\nVotre soumission n'a pas atteint les standards requis (Score: ${result.score}%).\n\n${ideContext.type === 'course' ? 'Un cours de remédiation a été généré.' : 'Veuillez revoir les concepts du module et réessayer.'}`,
          {
            position: 'top-center',
            autoClose: 8000,
            theme: 'dark',
            style: { fontSize: '14px', fontWeight: 'bold' }
          }
        );
      }

      // 2. Business Logic Updates
      if (ideContext.type === 'course' && ideContext.courseId) {
        if (!passed && course?.remediation) {
          setActiveRemediation({ remediation: course.remediation, course });
          setIsShowingRemediation(true);
        } else {
          handleCourseComplete(ideContext.courseId, passed, result.score);
        }
      } else if (ideContext.type === 'module' && moduleId) {
        handleModuleExamComplete(moduleId, passed, result.score);
      } else if (ideContext.type === 'final') {
        handleFinalProjectComplete(passed, result.score);
      }

      // 3. Cleanup UI states
      setTimeout(() => {
        setShowAIOverlay(false);
        setShowIDE(false);
        setAnimationFinished(false);
        setSubmissionResult(null);
        setIdeContext(null);
      }, 100);
    }
  }, [animationFinished, submissionResult, ideContext, activeModuleId]);

  // Handle login from Auth component
  const handleLogin = (role: UserRole, newUser: boolean = false) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setIsNewUser(newUser);

    // New learners go to Path Finder, coaches/admins go to dashboard
    if (role === 'apprenant' && newUser) {
      setShowPathFinder(true);
    } else if (role === 'apprenant') {
      // Existing learner - load their path from available paths
      const firstPath = availablePaths.length > 0 ? availablePaths[0] : MOCK_LEARNING_PATHS[0];
      setCurrentLearningPath(firstPath);
      setShowPathFinder(false);
    } else {
      // Coach or Admin - no path needed
      setShowPathFinder(false);
    }

    setActiveTab('dashboard');
  };

  // Handle path confirmation from PathFinder
  const handlePathConfirmed = (path: LearningPath) => {
    setCurrentLearningPath(path);
    setShowWelcomeOverlay(true);
    setShowPathFinder(false);
    setIsNewUser(false);
  };

  const handleWelcomeComplete = () => {
    setShowWelcomeOverlay(false);
    setShowPathFinder(false);
    setIsNewUser(false);
    setActiveTab('dashboard');
  };

  // V2 State Helpers
  const handleCourseComplete = (courseId: string, passed: boolean, score: number) => {
    if (!currentLearningPath || !activeModuleId) return;

    setCurrentLearningPath(prevPath => {
      if (!prevPath) return prevPath;

      return {
        ...prevPath,
        modules: prevPath.modules.map(module => {
          if (module.id !== activeModuleId) return module;

          // Find the index of the course being completed
          const courseIdx = module.courses.findIndex(c => c.id === courseId);
          if (courseIdx === -1) return module;

          const updatedCourses = module.courses.map((course, idx) => {
            if (idx === courseIdx) {
              return { ...course, status: 'completed' as const, score, isLocked: false };
            }
            // Unlock next course if this one was passed
            if (idx === courseIdx + 1 && passed) {
              return { ...course, isLocked: false, status: (course.status === 'locked' || !course.status) ? 'not-started' : course.status };
            }
            return course;
          });

          const completedCourses = updatedCourses.filter(c => c.status === 'completed').length;
          const progress = Math.round((completedCourses / updatedCourses.length) * 100);

          return {
            ...module,
            courses: updatedCourses,
            progress,
            status: completedCourses === updatedCourses.length ? 'completed' as const : 'in-progress' as const
          };
        })
      };
    });
  };

  const handleModuleExamComplete = (moduleId: string, passed: boolean, score: number) => {
    if (!currentLearningPath) return;

    setCurrentLearningPath(prevPath => {
      if (!prevPath) return prevPath;

      const moduleIdx = prevPath.modules.findIndex(m => m.id === moduleId);
      if (moduleIdx === -1) return prevPath;

      const updatedModules = [...prevPath.modules];

      if (passed) {
        updatedModules[moduleIdx] = {
          ...updatedModules[moduleIdx],
          status: 'completed',
          progress: 100,
          exam: updatedModules[moduleIdx].exam ? {
            ...updatedModules[moduleIdx].exam!,
            status: 'completed',
            score
          } : undefined
        };

        if (moduleIdx < updatedModules.length - 1) {
          updatedModules[moduleIdx + 1] = {
            ...updatedModules[moduleIdx + 1],
            isLocked: false,
            status: 'in-progress',
            courses: updatedModules[moduleIdx + 1].courses.map((c, i) =>
              i === 0 ? { ...c, isLocked: false, status: 'not-started' } : c
            )
          };
        }
      }

      const completedModules = updatedModules.filter(m => m.status === 'completed').length;
      const overallProgress = Math.round((completedModules / updatedModules.length) * 100);

      return { ...prevPath, modules: updatedModules, progress: overallProgress };
    });

    setShowModuleExam(false);
    setActiveModuleId(null);
  };

  const handleFinalProjectComplete = (passed: boolean, score: number) => {
    if (!currentLearningPath) return;

    setCurrentLearningPath(prevPath => {
      if (!prevPath || !prevPath.finalProject) return prevPath;

      return {
        ...prevPath,
        progress: passed ? 100 : prevPath.progress,
        status: passed ? 'completed' : prevPath.status,
        finalProject: {
          ...prevPath.finalProject,
          status: passed ? 'completed' : 'failed',
          score
        }
      };
    });

    setShowFinalProject(false);
  };

  const openCoachHelp = (course?: string, module?: string, blocking?: string) => {
    setCoachContext({ course, module, blocking });
    setShowCoachModal(true);
  };

  // ALL EARLY RETURNS MUST BE AFTER ALL HOOKS
  if (!isAuthenticated) {
    if (showLandingPage) {
      return <LandingPage onStart={() => setShowLandingPage(false)} />;
    }
    return <Auth onLogin={handleLogin} />;
  }

  if (showPathFinder && userRole === 'apprenant') {
    return (
      <PathFinderView
        onPathConfirmed={handlePathConfirmed}
        onBack={() => {
          setIsAuthenticated(false);
          setShowPathFinder(false);
        }}
        availablePaths={availablePaths}
      />
    );
  }

  const renderContent = () => {
    // V2: Remediation View (Fallback for top-level access if needed)
    if (activeRemediation && activeTab === 'remediation') {
      return (
        <RemediationView
          remediation={activeRemediation.remediation}
          originalCourse={activeRemediation.course}
          onComplete={(passed, score) => {
            if (passed) {
              setActiveRemediation(null);
              setIsShowingRemediation(false);
              // Stay in CourseView - no tab switch needed
            }
          }}
          onBack={() => {
            setActiveRemediation(null);
            setIsShowingRemediation(false);
          }}
        />
      );
    }

    // V2: Module Exam View
    if (showModuleExam && activeModuleId && currentLearningPath) {
      const module = currentLearningPath.modules.find(m => m.id === activeModuleId);
      if (module?.exam) {
        return (
          <ModuleExamView
            module={module}
            exam={module.exam}
            onComplete={(passed, score) => handleModuleExamComplete(activeModuleId, passed, score)}
            onBack={() => {
              setShowModuleExam(false);
              setActiveModuleId(null);
            }}
          />
        );
      }
    }

    // V2: Final Project View
    if (showFinalProject && currentLearningPath?.finalProject) {
      return (
        <FinalProjectView
          learningPath={currentLearningPath}
          project={currentLearningPath.finalProject}
          onComplete={handleFinalProjectComplete}
          onBack={() => setShowFinalProject(false)}
        />
      );
    }

    // V2: Course View (within learning path)
    if (activeCourseId && activeModuleId && currentLearningPath) {
      return (
        <CourseView
          learningPath={currentLearningPath}
          activeModuleId={activeModuleId}
          activeCourseId={activeCourseId}
          showIDE={showIDE}
          onCourseComplete={(moduleId, courseId, score) => {
            const module = currentLearningPath.modules.find(m => m.id === moduleId);
            const course = module?.courses.find(c => c.id === courseId);
            if (!course) return;

            const passed = score >= (course.exercise.passingScore || 70);
            if (!passed && course.remediation) {
              setActiveRemediation({ remediation: course.remediation, course });
              setIsShowingRemediation(true);
            } else {
              handleCourseComplete(courseId, passed, score);
            }
          }}
          onBack={() => {
            setActiveCourseId(null);
            setActiveModuleId(null);
          }}
          onOpenIDE={(context) => {
            console.log('[Deadline System] onOpenIDE triggered', context);
            // Check if planning is needed for this context
            if (context.type === 'module' && context.moduleId) {
              const module = currentLearningPath?.modules.find(m => m.id === context.moduleId);
              console.log('[Deadline System] Module lookup:', {
                moduleId: context.moduleId,
                found: !!module,
                hasExam: !!module?.exam,
                globalDeadline: module?.exam?.globalDeadline,
                hasPlan: !!module?.exam?.plan
              });

              if (module?.exam?.globalDeadline && !module.exam.plan) {
                console.log('[Deadline System] Planning required, opening board');
                setPlanningContext({
                  type: 'module',
                  id: module.id,
                  title: module.exam.title,
                  deadline: module.exam.globalDeadline,
                  subBlocks: module.courses.map(c => ({ id: c.id, title: c.title }))
                });
                setShowPlanningBoard(true);
                return; // Interrupt IDE opening to show planning first
              }
            } else if (context.type === 'final' && currentLearningPath?.finalProject) {
              console.log('[Deadline System] Final project planning check:', {
                globalDeadline: currentLearningPath.finalProject.globalDeadline,
                hasPlan: !!currentLearningPath.finalProject.plan
              });
              if (currentLearningPath.finalProject.globalDeadline && !currentLearningPath.finalProject.plan) {
                setPlanningContext({
                  type: 'final',
                  id: currentLearningPath.finalProject.id,
                  title: currentLearningPath.finalProject.title,
                  deadline: currentLearningPath.finalProject.globalDeadline,
                  subBlocks: currentLearningPath.modules.map(m => ({ id: m.id, title: m.title }))
                });
                setShowPlanningBoard(true);
                return; // Interrupt IDE opening
              }
            }

            setIdeContext({
              ...context,
              moduleId: context.moduleId || activeModuleId || undefined
            });
            setShowIDE(true);
          }}
          onNavigate={(mId, cId) => {
            setActiveModuleId(mId);
            setActiveCourseId(cId);
            setIsShowingRemediation(false);
          }}
          onOpenCoachHelp={openCoachHelp}
          activeRemediation={activeRemediation}
          isShowingRemediation={isShowingRemediation}
          onSelectRemediation={() => setIsShowingRemediation(true)}
          onSelectCourse={() => setIsShowingRemediation(false)}
          onRemediationComplete={() => {
            setActiveRemediation(null);
            setIsShowingRemediation(false);
          }}
          onOpenPlanning={(type, id, deadline, title, initialPlan) => {
            let subBlocks: { id: string; title: string }[] = [];
            if (type === 'module') {
              const module = currentLearningPath?.modules.find(m => m.id === id);
              if (module) subBlocks = module.courses.map(c => ({ id: c.id, title: c.title }));
            } else {
              if (currentLearningPath) subBlocks = currentLearningPath.modules.map(m => ({ id: m.id, title: m.title }));
            }
            setPlanningContext({ type, id, deadline, title, initialPlan, subBlocks });
            setShowPlanningBoard(true);
          }}
          userSubscription={userSubscription}
          onNavigateToSubscription={() => setActiveTab('subscription')}
        />
      );
    }

    // Role-specific routing
    switch (activeTab) {
      case 'dashboard':
        if (userRole === 'coach') {
          if (selectedReviewId) return <CoachReviewView reviewId={selectedReviewId} onBack={() => setSelectedReviewId(null)} onComplete={() => setSelectedReviewId(null)} />;
          return <CoachDashboard
            onGoToInsights={() => setActiveTab('insights')}
            onReviewStudent={setSelectedReviewId}
            onInterveneStudent={(sid) => {
              setSelectedStudentId(sid);
              setActiveTab('cohort');
            }}
            onStartLiveSession={(studentId, type, title) => {
              setActiveLiveSession({
                type: type as 'module' | 'final',
                id: studentId,
                title: title,
                coach: MOCK_COACHES[0]
              });
              toast.info(`Session Live démarrée. Connexion neurale établie.`, { theme: 'dark' });
            }}
            activeSession={activeLiveSession}
          />;
        }
        if (userRole === 'admin') return <AdminDashboard onGoToConfig={() => setActiveTab('admin-config')} />;

        return (
          <Dashboard
            currentPath={currentLearningPath || undefined}
            onCourseSelect={(pathId, moduleId, courseId) => {
              setActiveModuleId(moduleId);
              setActiveCourseId(courseId);
            }}
            onNavigateToPortfolio={() => setActiveTab('portfolio')}
            onNavigateToPath={() => setActiveTab('profile')}
            onOpenPlanning={(type, id, deadline, title, initialPlan) => {
              let subBlocks: { id: string; title: string }[] = [];
              if (type === 'module') {
                const module = currentLearningPath?.modules.find(m => m.id === id);
                if (module) subBlocks = module.courses.map(c => ({ id: c.id, title: c.title }));
              } else {
                if (currentLearningPath) subBlocks = currentLearningPath.modules.map(m => ({ id: m.id, title: m.title }));
              }
              setPlanningContext({ type, id, deadline, title, initialPlan, subBlocks });
              setShowPlanningBoard(true);
            }}
          />
        );

      case 'courses':
        return (
          <CourseLibraryView
            courses={legacyCourses}
            onSelectCourse={(id) => {
              // Navigate to path finder for course selection
              setShowPathFinder(true);
            }}
          />
        );

      case 'portfolio':
        return <PortfolioView />;

      case 'subscription':
        return (
          <SubscriptionView
            subscription={userSubscription}
            onUpgrade={handleUpgradeSubscription}
          />
        );

      case 'profile':
        return (
          <LearningPathView
            learningPath={currentLearningPath || undefined}
            onNavigateToCourse={(moduleId, courseId) => {
              setActiveModuleId(moduleId);
              setActiveCourseId(courseId);
            }}
            onNavigateToExam={(moduleId) => {
              const module = currentLearningPath?.modules.find(m => m.id === moduleId);
              if (module?.exam) {
                if (module.exam.globalDeadline && !module.exam.plan) {
                  setPlanningContext({
                    type: 'module',
                    id: module.id,
                    title: module.exam.title,
                    deadline: module.exam.globalDeadline,
                    subBlocks: module.courses.map(c => ({ id: c.id, title: c.title }))
                  });
                  setShowPlanningBoard(true);
                } else {
                  setIdeContext({
                    type: 'module',
                    title: module.exam.title,
                    courseId: undefined,
                    moduleId: module.id
                  });
                  setShowIDE(true);
                }
              }
            }}
            onNavigateToFinalProject={() => {
              if (currentLearningPath?.finalProject) {
                if (currentLearningPath.finalProject.globalDeadline && !currentLearningPath.finalProject.plan) {
                  setPlanningContext({
                    type: 'final',
                    id: currentLearningPath.finalProject.id,
                    title: currentLearningPath.finalProject.title,
                    deadline: currentLearningPath.finalProject.globalDeadline,
                    subBlocks: currentLearningPath.modules.map(m => ({ id: m.id, title: m.title }))
                  });
                  setShowPlanningBoard(true);
                } else {
                  setIdeContext({
                    type: 'final',
                    title: currentLearningPath.finalProject.title,
                  });
                  setShowIDE(true);
                }
              }
            }}
            userSubscription={userSubscription}
            onNavigateToSubscription={() => setActiveTab('subscription')}
          />
        );

      // Coach Specific
      case 'cohort':
        if (selectedStudentId) {
          return <StudentDetailView studentId={selectedStudentId} onBack={() => setSelectedStudentId(null)} />;
        }
        return <CoachCohortView onStudentSelect={setSelectedStudentId} />;
      case 'insights':
        if (selectedReviewId) return <CoachReviewView reviewId={selectedReviewId} onBack={() => setSelectedReviewId(null)} onComplete={() => setSelectedReviewId(null)} />;
        return <CoachDashboard
          showOnlyInsights
          onReviewStudent={setSelectedReviewId}
        />;

      // Admin Specific
      case 'admin-config': return <AdminConfigView />;
      case 'admin-content': return <AdminPathBuilder courses={legacyCourses} onUpdateCourses={setLegacyCourses} />;

      default:
        return <Dashboard currentPath={currentLearningPath || undefined} onCourseSelect={() => { }} />;
    }
  };

  const handleSaveProjectPlan = (plan: ProjectPlan) => {
    if (!currentLearningPath || !planningContext) return;

    console.log('[Deadline System] Saving plan:', plan);

    const updatedPath = { ...currentLearningPath };

    if (planningContext.type === 'module') {
      const module = updatedPath.modules.find(m => m.id === planningContext.id);
      if (module && module.exam) {
        module.exam.plan = plan;
      }
    } else {
      if (updatedPath.finalProject) {
        updatedPath.finalProject.plan = plan;
      }
    }

    setCurrentLearningPath(updatedPath);
    setShowPlanningBoard(false);

    // Automatically open IDE after planning if intended
    setIdeContext({
      type: planningContext.type,
      title: planningContext.title,
      moduleId: planningContext.type === 'module' ? planningContext.id : undefined
    });
    setShowIDE(true);
    setPlanningContext(null);
  };

  const isStudyMode = activeCourseId !== null || showModuleExam || showFinalProject || activeRemediation !== null;

  return (
    <>
      <Layout
        role={userRole}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveCourseId(null);
          setActiveModuleId(null);
          setShowModuleExam(false);
          setShowFinalProject(false);
          setActiveRemediation(null);
          setIsShowingRemediation(false);
          setSelectedStudentId(null);
          setSelectedReviewId(null);
          setActiveTab(tab);
        }}
        onLogout={() => {
          setIsAuthenticated(false);
          setCurrentLearningPath(null);
          setShowPathFinder(false);
          setIsNewUser(false);
        }}
        isCollapsed={isStudyMode}
      >
        {renderContent()}
      </Layout>

      {/* Coach Request Modal */}
      <CoachRequestModal
        isOpen={showCoachModal}
        onClose={() => setShowCoachModal(false)}
        contextCourse={coachContext.course}
        contextModule={coachContext.module}
        blockingPoint={coachContext.blocking}
      />

      {showIDE && ideContext && (
        <ExerciseIDEView
          exerciseType={ideContext.type}
          title={ideContext.title}
          isLiveSession={!!activeLiveSession && activeLiveSession.id === (ideContext.moduleId || ideContext.id)}
          coachName={activeLiveSession?.coach.name}
          description={
            ideContext.type === 'course'
              ? "Implémentez les concepts appris en créant un smart contract fonctionnel."
              : ideContext.type === 'module'
                ? "Appliquez l'ensemble des compétences du module pour réaliser cet audit complet."
                : "Le point d'orgue de votre formation : concevez une solution blockchain de bout en bout."
          }
          instructions={
            ideContext.type === 'course'
              ? [
                "Créez un contrat Solidity basé sur les concepts du cours",
                "Implémentez les fonctions requises avec la logique appropriée",
                "Assurez-vous que votre code compile sans erreurs",
                "Exécutez les tests pour valider votre implémentation"
              ]
              : ideContext.type === 'module'
                ? [
                  "Analysez le cahier des charges du module",
                  "Structurez votre solution technique ou votre rapport d'audit",
                  "Vérifiez la cohérence globale de votre proposition",
                  "Soumettez pour une évaluation par expert IA"
                ]
                : [
                  "Concevez une architecture robuste et sécurisée",
                  "Détaillez chaque composant de votre solution",
                  "Prévoyez les mécanismes de gouvernance et de sécurité",
                  "Finalisez votre projet pour la certification"
                ]
          }
          timeLimit={ideContext.type === 'final' ? 120 : ideContext.type === 'module' ? 60 : undefined}
          onTestRemediation={() => {
            if (ideContext.type === 'course' && ideContext.courseId && activeModuleId && currentLearningPath) {
              const module = currentLearningPath.modules.find(m => m.id === activeModuleId);
              const course = module?.courses.find(c => c.id === ideContext.courseId);
              if (course?.remediation) {
                console.log('[Test Remediation] Starting failure simulation', { courseId: course.id, courseTitle: course.title });
                // V2: Simulation with premium animation
                setOverlayType('audit');
                setAnimationFinished(false); // Reset animation state
                setShowAIOverlay(true);

                // Simulate evaluation failure
                setTimeout(() => {
                  console.log('[Test Remediation] Setting submission result (failure)');
                  setSubmissionResult({
                    result: { isPassed: false, score: 45 },
                    course
                  });
                }, 100);
              } else {
                alert("Aucune donnée de remédiation n'est définie pour ce cours. (Vérifiez constants.tsx)");
              }
            }
          }}
          onSubmit={async (code, output) => {
            // Handle submission based on context type
            if (ideContext.type === 'course' && ideContext.courseId && activeModuleId && currentLearningPath) {
              const module = currentLearningPath.modules.find(m => m.id === activeModuleId);
              const course = module?.courses.find(c => c.id === ideContext.courseId);

              if (course) {
                setOverlayType('audit');
                setAnimationFinished(false);
                setShowAIOverlay(true);

                evaluateModule(course.title, course.content.map(c => c.content).join('\n'), course.objectives || [], code)
                  .then(result => {
                    const forcedResult = { ...result, isPassed: true, score: Math.max(result.score, 85) };
                    setSubmissionResult({ result: forcedResult, course });
                  }).catch(err => {
                    console.error("Evaluation error:", err);
                    setShowAIOverlay(false);
                    setAnimationFinished(false);
                    alert("Une erreur de réseau est survenue. Veuillez réessayer.");
                  });
              }
            } else if (ideContext.type === 'module' && ideContext.moduleId && currentLearningPath) {
              const module = currentLearningPath.modules.find(m => m.id === ideContext.moduleId);
              if (module?.exam) {
                setOverlayType('audit');
                setAnimationFinished(false);
                setShowAIOverlay(true);

                // For module exam, we evaluate based on module description and exam objectives
                evaluateModule(module.exam.title, module.description, ["Pass module final project"], code)
                  .then(result => {
                    const forcedResult = { ...result, isPassed: true, score: Math.max(result.score, 85) };
                    setSubmissionResult({ result: forcedResult, moduleId: module.id });
                  }).catch(err => {
                    console.error("Evaluation error:", err);
                    setShowAIOverlay(false);
                    setAnimationFinished(false);
                    alert("Une erreur de réseau est survenue. Veuillez réessayer.");
                  });
              }
            } else if (ideContext.type === 'final' && currentLearningPath) {
              // Final project handling
              setOverlayType('audit');
              setAnimationFinished(false);
              setShowAIOverlay(true);

              evaluateModule(currentLearningPath.finalProject?.title || "Project Final", currentLearningPath.description, currentLearningPath.finalProject?.requirements || [], code)
                .then(result => {
                  const forcedResult = { ...result, isPassed: true, score: Math.max(result.score, 85) };
                  setSubmissionResult({ result: forcedResult, isFinalProject: true });
                }).catch(err => {
                  console.error("Evaluation error:", err);
                  setShowAIOverlay(false);
                  setAnimationFinished(false);
                  alert("Une erreur de réseau est survenue. Veuillez réessayer.");
                });
            } else {
              setShowIDE(false);
              setIdeContext(null);
            }
          }}
          onCancel={() => {
            setShowIDE(false);
            setIdeContext(null);
          }}
        />
      )}

      {/* AI Process Overlay */}
      <AIProcessOverlay
        isVisible={showAIOverlay}
        type={overlayType}
        onComplete={() => {
          console.log('[AI Overlay] Animation completed, setting animationFinished=true');
          setAnimationFinished(true);
        }}
      />

      {/* Project Planning Board */}
      {showPlanningBoard && planningContext && (
        <DeadlinePlanningBoard
          globalDeadline={planningContext.deadline}
          projectType={planningContext.type}
          initialPlan={planningContext.initialPlan}
          subBlocks={planningContext.subBlocks}
          onSavePlan={handleSaveProjectPlan}
          onCancel={() => {
            setShowPlanningBoard(false);
            setPlanningContext(null);
          }}
        />
      )}

      {/* Welcome Animation */}
      {showWelcomeOverlay && (
        <WelcomeOverlay onComplete={handleWelcomeComplete} />
      )}

      {/* Live Coaching Session Overlay */}
      {activeLiveSession && (
        <LiveSessionOverlay
          sessionType={activeLiveSession.type}
          targetTitle={activeLiveSession.title}
          coachName={activeLiveSession.coach.name}
          coachAvatar={activeLiveSession.coach.avatar}
          onEndSession={() => {
            setActiveLiveSession(null);
            toast.warn("Session Live terminée.", { theme: 'dark' });
          }}
        />
      )}

      {/* Congratulations Modal */}
      <CongratulationsModal
        isVisible={showCongratsModal}
        onClose={() => setShowCongratsModal(false)}
        title={congratsData?.title || ''}
        type={congratsData?.type || 'course'}
        score={congratsData?.score}
        badgeName={congratsData?.badgeName}
      />

      {/* Toast Notifications Container */}
      <ToastContainer aria-label="Notifications" />
    </>
  );
};

export default App;
