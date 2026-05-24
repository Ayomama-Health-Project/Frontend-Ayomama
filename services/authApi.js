import api from "../api";

const unwrap = async (promise) => {
  const response = await promise;
  return response.data.data;
};

export const authApi = {
  registerMother: (payload) => unwrap(api.post("/api/v1/auth/register/mother", payload)),
  registerPartner: (payload) => unwrap(api.post("/api/v1/auth/register/partner", payload)),
  registerHealthWorker: (payload) =>
    unwrap(api.post("/api/v1/auth/register/health-worker", payload)),
  login: (payload) => unwrap(api.post("/api/v1/auth/login", payload)),
  refresh: (payload) => unwrap(api.post("/api/v1/auth/refresh", payload)),
  logout: (payload) => unwrap(api.post("/api/v1/auth/logout", payload)),
  forgotPassword: (payload) => unwrap(api.post("/api/v1/auth/forgot-password", payload)),
  verifyResetOtp: (payload) => unwrap(api.post("/api/v1/auth/verify-reset-otp", payload)),
  resetPassword: (payload) => unwrap(api.post("/api/v1/auth/reset-password", payload)),
  fetchMe: () => unwrap(api.get("/api/v1/auth/me")),
  fetchHealthProfessionals: (limit = 5) =>
    unwrap(api.get(`/api/v1/auth/health-professionals?limit=${limit}`)),
  updateProfile: (payload) => unwrap(api.patch("/api/v1/me/profile", payload)),
  changePassword: (payload) => unwrap(api.patch("/api/v1/me/password", payload)),
  updateLanguage: (payload) => unwrap(api.patch("/api/v1/me/language", payload)),
  updateOnboarding: (payload) => unwrap(api.patch("/api/v1/me/onboarding", payload)),
  fetchNotifications: () => unwrap(api.get("/api/v1/me/notifications")),
  createNotificationToken: (payload) =>
    unwrap(api.post("/api/v1/me/notification-tokens", payload)),
  deleteNotificationToken: (id) => unwrap(api.delete(`/api/v1/me/notification-tokens/${id}`)),
  createPartnerInvite: (payload) => unwrap(api.post("/api/v1/partner-invites", payload)),
  inspectPartnerInvite: (token) => unwrap(api.get(`/api/v1/partner-invites/${token}`)),
};
