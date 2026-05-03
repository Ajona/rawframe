import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Attach JWT to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('rawframe_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle expired tokens automatically
api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = localStorage.getItem('rawframe_refresh');
        if (!refreshToken) throw new Error('No refresh token');
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        localStorage.setItem('rawframe_token',   data.accessToken);
        localStorage.setItem('rawframe_refresh', data.refreshToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (_) {
        localStorage.removeItem('rawframe_token');
        localStorage.removeItem('rawframe_refresh');
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('rawframe_token',   accessToken);
  localStorage.setItem('rawframe_refresh', refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem('rawframe_token');
  localStorage.removeItem('rawframe_refresh');
};

export const getToken = () => localStorage.getItem('rawframe_token');

export const authAPI = {
  signup:          (name, email, password, plan, fields) => api.post('/auth/signup', { name, email, password, plan, fields }),
  login:           (email, password)                     => api.post('/auth/login', { email, password }),
  loginWithGoogle: (idToken, plan, fields)               => api.post('/auth/google', { idToken, plan, fields }),
  logout:          (refreshToken)                        => api.post('/auth/logout', { refreshToken }),
  refresh:         (refreshToken)                        => api.post('/auth/refresh', { refreshToken }),
  getMe:           ()                                    => api.get('/auth/me'),
};

export const uploadsAPI = {
  upload:         (formData, onProgress) => api.post('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: evt => onProgress && onProgress(Math.round((evt.loaded * 100) / evt.total)),
    timeout: 5 * 60 * 1000,
  }),
  getMyUploads:   (params)  => api.get('/uploads/my', { params }),
  getFile:        (id)      => api.get(`/uploads/${id}`),
  deleteFile:     (id)      => api.delete(`/uploads/${id}`),
  getDownloadUrl: (id)      => api.get(`/uploads/${id}/download`),
};

export const contentAPI = {
  browse:            (params)  => api.get('/content', { params }),
  getHashtags:       ()        => api.get('/content/hashtags'),
  getEvents:         (search)  => api.get('/content/events', { params: { search } }),
  getCreators:       (params)  => api.get('/content/creators', { params }),
  getCreatorProfile: (id)      => api.get(`/content/creator/${id}`),
  getCollections:    (params)  => api.get('/content/collections', { params }),
  getCollection:     (id)      => api.get(`/content/collections/${id}`),
};

export const paymentsAPI = {
  initiate:        (body)                  => api.post('/payments/initiate', body),
  verify:          (transactionId, txRef)  => api.post('/payments/verify', { transactionId, txRef }),
  getTransactions: (params)                => api.get('/payments/transactions', { params }),
  withdraw:        (amount, methodId)      => api.post('/payments/withdraw', { amount, paymentMethodId: methodId }),
};

export const usersAPI = {
  getProfile:          ()         => api.get('/users/profile'),
  updateProfile:       (updates)  => api.patch('/users/profile', updates),
  addPaymentMethod:    (method)   => api.post('/users/payment-methods', method),
  removePaymentMethod: (id)       => api.delete(`/users/payment-methods/${id}`),
  setPrimaryMethod:    (id)       => api.patch(`/users/payment-methods/${id}/primary`),
  getLinks:            ()         => api.get('/users/links'),
  getPurchases:        ()         => api.get('/users/purchases'),
  getDashboardStats:   ()         => api.get('/users/dashboard-stats'),
};

export const adminAPI = {
  getOverview:              ()         => api.get('/admin/overview'),
  getUsers:                 (params)   => api.get('/admin/users', { params }),
  updateUser:               (id, body) => api.patch(`/admin/users/${id}`, body),
  getContent:               (params)   => api.get('/admin/content', { params }),
  updateContent:            (id, body) => api.patch(`/admin/content/${id}`, body),
  getEarnings:              (params)   => api.get('/admin/earnings', { params }),
  getAccessRequests:        ()         => api.get('/admin/access-requests'),
  createAccessRequest:      (fileId, reason) => api.post('/admin/access-requests', { fileId, reason }),
  respondToAccessRequest:   (id, status)     => api.patch(`/admin/access-requests/${id}`, { status }),
};

export default api;