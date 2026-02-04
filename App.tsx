

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import CourseDetailView from './components/CourseDetailView';
import CourseLibraryView from './components/CourseLibraryView';
import PortfolioView from './components/PortfolioView';
import LearningPathView from './components/LearningPathView';
import CoachDashboard from './components/CoachDashboard';
import CoachCohortView from './components/CoachCohortView';
import StudentDetailView from './components/StudentDetailView';
import AdminDashboard from './components/AdminDashboard';
import AdminConfigView from './components/AdminConfigView';
import AdminPathBuilder from './components/AdminPathBuilder';
import CoachReviewView from './components/CoachReviewView';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import { UserRole, Course } from './types';
import { MOCK_COURSES } from './constants';
import api from './services/api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Always ensure dark mode class is handled (though standard is no class for dark)
    document.documentElement.classList.remove('light-mode');
  }, []);

  const [userRole, setUserRole] = useState<UserRole>('apprenant');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [viewingCourseDetail, setViewingCourseDetail] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdateCourses = async (updatedCourses: Course[]) => {
    setCourses(updatedCourses);

    // Persist each updated course to JSON Server
    try {
      for (const course of updatedCourses) {
        await api.courses.patch(course.id, course);
      }
    } catch (error) {
      console.error('Failed to persist course updates:', error);
    }
  };

  // Fetch courses from JSON Server on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const coursesData = await api.courses.getAll();
        setCourses(coursesData);
      } catch (error) {
        console.error('Failed to fetch courses from API, using fallback data:', error);
        // Fallback to mock data if API fails
        setCourses(MOCK_COURSES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (!isAuthenticated) {
    if (showLandingPage) {
      return <LandingPage
        onStart={() => setShowLandingPage(false)}
      />;
    }
    return <Auth onLogin={(role) => {
      setUserRole(role);
      setIsAuthenticated(true);
      setActiveTab('dashboard');
    }} />;
  }

  const handleModuleComplete = (courseId: string, moduleId: string, score: number) => {
    // ... existing logic ...
    setCourses(prevCourses => {
      return prevCourses.map(course => {
        if (course.id !== courseId) return course;

        const moduleIndex = course.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex === -1) return course;

        const updatedModules = [...course.modules];
        // Mark current as completed and save score
        updatedModules[moduleIndex] = {
          ...updatedModules[moduleIndex],
          status: 'completed',
          isLocked: false,
          score: score
        };

        // Unlock next module if it exists
        if (moduleIndex < updatedModules.length - 1) {
          updatedModules[moduleIndex + 1] = {
            ...updatedModules[moduleIndex + 1],
            isLocked: false,
            status: 'in-progress'
          };
        }

        // Update progress
        const completedCount = updatedModules.filter(m => m.status === 'completed').length;
        const progress = Math.round((completedCount / updatedModules.length) * 100);

        return { ...course, modules: updatedModules, progress };
      });
    });
  };

  // Show loading state while fetching data
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
    // Priority to Course Detail/Learning View if selected
    if (selectedCourseId) {
      const course = courses.find(c => c.id === selectedCourseId);
      if (course) {
        // Show detail page first, then learning interface after enrollment
        if (viewingCourseDetail) {
          return (
            <CourseView
              course={course}
              onModuleComplete={(moduleId, score) => handleModuleComplete(course.id, moduleId, score)}
              onBack={() => {
                setViewingCourseDetail(false);
              }}
            />
          );
        } else {
          return (
            <CourseDetailView
              course={course}
              onEnroll={() => setViewingCourseDetail(true)}
              onBack={() => {
                setSelectedCourseId(null);
                setViewingCourseDetail(false);
              }}
            />
          );
        }
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
        return <Dashboard
          courses={courses}
          onCourseSelect={(id) => {
            setSelectedCourseId(id);
            setViewingCourseDetail(false);
            setActiveTab('courses');
          }}
          onNavigateToPortfolio={() => setActiveTab('portfolio')}
          onNavigateToCourse={(id) => {
            setSelectedCourseId(id);
            setViewingCourseDetail(false);
          }}
        />;

      case 'courses':
        return (
          <CourseLibraryView
            courses={courses}
            onSelectCourse={(id) => {
              setSelectedCourseId(id);
              setViewingCourseDetail(false);
              setActiveTab('courses'); // redundant but safe
            }}
          />
        );

      case 'portfolio': return <PortfolioView />;
      case 'profile': return <LearningPathView courses={courses} onNavigateToCourse={(id) => setSelectedCourseId(id)} />;

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
      case 'admin-content': return <AdminPathBuilder courses={courses} onUpdateCourses={setCourses} />;

      default:
        return <Dashboard courses={courses} onCourseSelect={setSelectedCourseId} />;
    }
  };

  const isStudyMode = selectedCourseId !== null && viewingCourseDetail;

  return (
    <Layout
      role={userRole}
      activeTab={activeTab}
      setActiveTab={(tab) => {
        setSelectedCourseId(null);
        setSelectedStudentId(null);
        setSelectedReviewId(null);
        setActiveTab(tab);
      }}
      onLogout={() => setIsAuthenticated(false)}
      isCollapsed={isStudyMode}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
