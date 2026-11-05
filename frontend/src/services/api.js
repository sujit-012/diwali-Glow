const API_BASE = 'http://localhost:5000/api';

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('diwali_glow_token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const api = {
  // Auth
  register: async (name, email, password) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Projects
  getProjects: async () => {
    const res = await fetch(`${API_BASE}/projects`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  getProjectById: async (id) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  createProject: async (projectData) => {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(projectData),
    });
    return res.json();
  },

  updateProject: async (id, projectData) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(projectData),
    });
    return res.json();
  },

  deleteProject: async (id) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Transformations
  saveTransformation: async (data) => {
    const res = await fetch(`${API_BASE}/transformations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getTransformations: async (projectId) => {
    const res = await fetch(`${API_BASE}/transformations/${projectId}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // AI
  getAIStatus: async () => {
    const res = await fetch(`${API_BASE}/ai/status`);
    return res.json();
  },

  transformRoomAI: async (payload) => {
    const res = await fetch(`${API_BASE}/ai/transform`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
};
