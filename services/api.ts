// API Service for JSON Server Integration
const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001';

// Generic fetch wrapper with error handling
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
}

// Courses API
export const coursesAPI = {
    getAll: () => apiRequest<any[]>('/courses'),
    getById: (id: string) => apiRequest<any>(`/courses/${id}`),
    create: (course: any) => apiRequest<any>('/courses', {
        method: 'POST',
        body: JSON.stringify(course),
    }),
    update: (id: string, course: any) => apiRequest<any>(`/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(course),
    }),
    patch: (id: string, updates: Partial<any>) => apiRequest<any>(`/courses/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
    }),
    delete: (id: string) => apiRequest<void>(`/courses/${id}`, {
        method: 'DELETE',
    }),
};

// Students API
export const studentsAPI = {
    getAll: (params?: { status?: string; _sort?: string; _order?: string }) => {
        const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
        return apiRequest<any[]>(`/students${queryString}`);
    },
    getById: (id: string) => apiRequest<any>(`/students/${id}`),
    create: (student: any) => apiRequest<any>('/students', {
        method: 'POST',
        body: JSON.stringify(student),
    }),
    update: (id: string, student: any) => apiRequest<any>(`/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(student),
    }),
    patch: (id: string, updates: Partial<any>) => apiRequest<any>(`/students/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
    }),
    delete: (id: string) => apiRequest<void>(`/students/${id}`, {
        method: 'DELETE',
    }),
};

// Activity Log API
export const activityLogAPI = {
    getAll: (studentId?: string) => {
        const queryString = studentId ? `?studentId=${studentId}` : '';
        return apiRequest<any[]>(`/activityLog${queryString}`);
    },
    create: (activity: any) => apiRequest<any>('/activityLog', {
        method: 'POST',
        body: JSON.stringify(activity),
    }),
};

// Pending Reviews API
export const reviewsAPI = {
    getAll: () => apiRequest<any[]>('/pendingReviews'),
    getById: (id: string) => apiRequest<any>(`/pendingReviews/${id}`),
    updateStatus: (id: string, status: string) => apiRequest<any>(`/pendingReviews/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    }),
};

// Insights API
export const insightsAPI = {
    getAll: () => apiRequest<any[]>('/insights'),
    getById: (id: string) => apiRequest<any>(`/insights/${id}`),
};

// KPIs API
export const kpisAPI = {
    getAll: () => apiRequest<any>('/kpis'),
    getCoach: () => apiRequest<any>('/kpis/coach'),
    getAdmin: () => apiRequest<any>('/kpis/admin'),
};

// Alerts API
export const alertsAPI = {
    getAll: (type?: 'critical' | 'warning' | 'info') => {
        const queryString = type ? `?type=${type}` : '';
        return apiRequest<any[]>(`/alerts${queryString}`);
    },
    create: (alert: any) => apiRequest<any>('/alerts', {
        method: 'POST',
        body: JSON.stringify(alert),
    }),
};

// Badges API
export const badgesAPI = {
    getAll: () => apiRequest<any[]>('/badges'),
    getById: (id: string) => apiRequest<any>(`/badges/${id}`),
};

// Learning Paths API
export const learningPathsAPI = {
    getAll: () => apiRequest<any[]>('/learningPaths'),
    getById: (id: string) => apiRequest<any>(`/learningPaths/${id}`),
    create: (path: any) => apiRequest<any>('/learningPaths', {
        method: 'POST',
        body: JSON.stringify(path),
    }),
    update: (id: string, path: any) => apiRequest<any>(`/learningPaths/${id}`, {
        method: 'PUT',
        body: JSON.stringify(path),
    }),
    patch: (id: string, updates: Partial<any>) => apiRequest<any>(`/learningPaths/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
    }),
    delete: (id: string) => apiRequest<void>(`/learningPaths/${id}`, {
        method: 'DELETE',
    }),
};

// Users API
export const usersAPI = {
    getAll: () => apiRequest<any[]>('/users'),
    getById: (id: string) => apiRequest<any>(`/users/${id}`),
    getByEmail: (email: string) => apiRequest<any[]>(`/users?email=${encodeURIComponent(email)}`),
    create: (user: any) => apiRequest<any>('/users', {
        method: 'POST',
        body: JSON.stringify(user),
    }),
    update: (id: string, user: any) => apiRequest<any>(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
    }),
    patch: (id: string, updates: Partial<any>) => apiRequest<any>(`/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
    }),
};

// Remediations API
export const remediationsAPI = {
    getAll: () => apiRequest<any[]>('/remediations'),
    getById: (id: string) => apiRequest<any>(`/remediations/${id}`),
    getByCourseId: (courseId: string) => apiRequest<any[]>(`/remediations?courseId=${courseId}`),
};

// Coach Requests API
export const coachRequestsAPI = {
    getAll: (status?: string) => {
        const queryString = status ? `?status=${status}` : '';
        return apiRequest<any[]>(`/coachRequests${queryString}`);
    },
    getById: (id: string) => apiRequest<any>(`/coachRequests/${id}`),
    create: (request: any) => apiRequest<any>('/coachRequests', {
        method: 'POST',
        body: JSON.stringify(request),
    }),
    updateStatus: (id: string, status: string) => apiRequest<any>(`/coachRequests/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    }),
};

export default {
    courses: coursesAPI,
    students: studentsAPI,
    activityLog: activityLogAPI,
    reviews: reviewsAPI,
    insights: insightsAPI,
    kpis: kpisAPI,
    alerts: alertsAPI,
    badges: badgesAPI,
    learningPaths: learningPathsAPI,
    users: usersAPI,
    remediations: remediationsAPI,
    coachRequests: coachRequestsAPI,
};
