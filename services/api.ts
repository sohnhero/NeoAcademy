// API Service for JSON Server Integration
const API_BASE_URL = 'http://localhost:3001';

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

export default {
    courses: coursesAPI,
    students: studentsAPI,
    activityLog: activityLogAPI,
    reviews: reviewsAPI,
    insights: insightsAPI,
    kpis: kpisAPI,
    alerts: alertsAPI,
    badges: badgesAPI,
};
