import type { LeaveRequest } from "@/types/leave";

const REQUESTS_KEY = "zdc_leave_requests";

export function getLeaveRequests(): LeaveRequest[] {
  const data = localStorage.getItem(REQUESTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveLeaveRequests(requests: LeaveRequest[]) {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

export function updateLeaveRequest(id: string, updates: Partial<LeaveRequest>) {
  const requests = getLeaveRequests();
  const idx = requests.findIndex((r) => r.id === id);
  if (idx !== -1) {
    requests[idx] = { ...requests[idx], ...updates };
    saveLeaveRequests(requests);
  }
}
