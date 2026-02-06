
import React, { useState, useEffect } from 'react';
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
import { UserRole, LearningPath, PathModule, Course, LegacyCourse, Remediation } from './types';
import { MOCK_LEARNING_PATHS, MOCK_COURSES } from './constants';
import api from './services/api';

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

  // Legacy State (for admin/coach views)
  const [legacyCourses, setLegacyCourses] = useState<LegacyCourse[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch legacy data for admin views
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const coursesData = await api.courses.getAll();
        setLegacyCourses(coursesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLegacyCourses(MOCK_COURSES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle login from Auth component
  const handleLogin = (role: UserRole, newUser: boolean = false) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setIsNewUser(newUser);

    // New learners go to Path Finder, coaches/admins go to dashboard
    if (role === 'apprenant' && newUser) {
      setShowPathFinder(true);
    } else if (role === 'apprenant') {
      // Existing learner - load their path (mock: use first path)
      setCurrentLearningPath(MOCK_LEARNING_PATHS[0]);
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
    setShowPathFinder(false);
    setIsNewUser(false);
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    if (showLandingPage) {
      return <LandingPage onStart={() => setShowLandingPage(false)} />;
    }
    return <Auth onLogin={handleLogin} />;
  }

  // Show Path Finder for new learners
  if (showPathFinder && userRole === 'apprenant') {
    return (
      <PathFinderView
        onPathConfirmed={handlePathConfirmed}
        onBack={() => {
          setIsAuthenticated(false);
          setShowPathFinder(false);
        }}
      />
    );
  }

  // V2: Handle course completion
  const handleCourseComplete = (courseId: string, passed: boolean, score: number) => {
    if (!currentLearningPath || !activeModuleId) return;

    setCurrentLearningPath(prevPath => {
      if (!prevPath) return prevPath;

      return {
        ...prevPath,
        modules: prevPath.modules.map(module => {
          if (module.id !== activeModuleId) return module;

          const updatedCourses = module.courses.map((course, idx, arr) => {
            if (course.id !== courseId) return course;

            if (passed) {
              const nextCourse = arr[idx + 1];
              if (nextCourse) {
                arr[idx + 1] = { ...nextCourse, isLocked: false, status: 'not-started' };
              }
              return { ...course, status: 'completed' as const, score, isLocked: false };
            } else {
              return course;
            }
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

    if (passed) {
      setActiveCourseId(null);
    }
  };

  // V2: Handle module exam completion
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
            status: 'in-progress'
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

  // V2: Handle final project completion
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

  // Open coach modal
  const openCoachHelp = (course?: string, module?: string, blocking?: string) => {
    setCoachContext({ course, module, blocking });
    setShowCoachModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="font-medium" style={{ color: 'var(--text-muted)' }}>Chargement des données...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    // V2: Remediation View
    if (activeRemediation) {
      return (
        <RemediationView
          remediation={activeRemediation.remediation}
          originalCourse={activeRemediation.course}
          onComplete={(passed, score) => {
            if (passed) {
              setActiveRemediation(null);
              setActiveCourseId(activeRemediation.course.id);
            }
          }}
          onBack={() => setActiveRemediation(null)}
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
      const module = currentLearningPath.modules.find(m => m.id === activeModuleId);
      const course = module?.courses.find(c => c.id === activeCourseId);

      if (course) {
        const legacyCourse: LegacyCourse = {
          id: course.id,
          title: module!.title,
          category: 'blockchain',
          progress: module!.progress,
          image: currentLearningPath.image || '',
          modules: [{
            id: course.id,
            title: course.title,
            description: course.description,
            duration: course.duration,
            isLocked: false,
            status: course.status,
            content: course.content.map(c => c.content).join('\n\n'),
            objectives: course.objectives || [],
            score: course.score
          }]
        };

        return (
          <CourseView
            course={legacyCourse}
            onModuleComplete={(moduleId, score) => {
              const passed = score >= (course.exercise.passingScore || 70);
              if (!passed && course.remediation) {
                setActiveRemediation({ remediation: course.remediation, course });
                setActiveCourseId(null);
              } else {
                handleCourseComplete(activeCourseId, passed, score);
              }
            }}
            onBack={() => {
              setActiveCourseId(null);
              setActiveModuleId(null);
            }}
            onRequestCoach={() => openCoachHelp(course.title, module!.title)}
          />
        );
      }
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

      case 'profile':
        return (
          <LearningPathView
            learningPath={currentLearningPath || undefined}
            onNavigateToCourse={(moduleId, courseId) => {
              setActiveModuleId(moduleId);
              setActiveCourseId(courseId);
            }}
            onNavigateToExam={(moduleId) => {
              setActiveModuleId(moduleId);
              setShowModuleExam(true);
            }}
            onNavigateToFinalProject={() => setShowFinalProject(true)}
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
    </>
  );
};

export default App;
