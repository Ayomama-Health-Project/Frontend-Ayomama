import api from "../api";

const unwrap = async (promise) => {
  const response = await promise;
  return response.data.data;
};

export const motherApi = {
  fetchDashboardSummary: () => unwrap(api.get("/api/v1/dashboard/summary")),
  updateDashboardSummary: (payload) => unwrap(api.patch("/api/v1/dashboard/summary", payload)),
  toggleChecklistItem: (itemId) =>
    unwrap(api.patch(`/api/v1/dashboard/checklist/${itemId}/toggle`)),
  fetchVisits: () => unwrap(api.get("/api/v1/visits")),
  createVisit: (payload) => unwrap(api.post("/api/v1/visits", payload)),
  updateVisit: (visitId, payload) => unwrap(api.patch(`/api/v1/visits/${visitId}`, payload)),
  fetchNearbyHospitals: ({ latitude, longitude }) =>
    unwrap(api.get(`/api/v1/emergency/hospitals?latitude=${latitude}&longitude=${longitude}`)),
  switchMotherType: (motherType) =>
    unwrap(api.patch("/api/v1/me/mother-type", { motherType })),
  fetchBlogs: () => unwrap(api.get("/api/v1/blogs")),
  fetchCommunityPosts: () => unwrap(api.get("/api/v1/community/posts")),
  createCommunityPost: (payload) => unwrap(api.post("/api/v1/community/posts", payload)),
  toggleCommunityPostLike: (postId) => unwrap(api.post(`/api/v1/community/posts/${postId}/likes`)),
  addCommunityComment: (postId, payload) =>
    unwrap(api.post(`/api/v1/community/posts/${postId}/comments`, payload)),
  fetchCommunityThreads: () => unwrap(api.get("/api/v1/community/threads")),
  createCommunityThread: (payload) => unwrap(api.post("/api/v1/community/threads", payload)),
  fetchThreadMessages: (threadId) =>
    unwrap(api.get(`/api/v1/community/threads/${threadId}/messages`)),
  sendThreadMessage: (threadId, payload) =>
    unwrap(api.post(`/api/v1/community/threads/${threadId}/messages`, payload)),
  fetchCommunityHealthWorkers: () => unwrap(api.get("/api/v1/community/health-workers")),
  toggleHealthWorkerFollow: (workerId) =>
    unwrap(api.post(`/api/v1/community/health-workers/${workerId}/follow`)),
};
