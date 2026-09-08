export const MOCK_MOTHER_USER = {
  name: "Amara Okafor",
  email: "amara@example.com",
  phone: "+234 801 234 5678",
  address: "12 Palm Grove, Lagos",
  preferredLanguages: "en",
  emergencyContact: [
    { name: "Kelechi Okafor", phone: "+234 809 000 1122", type: "family" },
    { name: "Dr. Tunde Bello", phone: "+234 808 555 9988", type: "doctor" },
    { name: "Ngozi", phone: "+234 817 101 2020", type: "friend" },
  ],
};

export const MOCK_WORKER = {
  fullName: "Nurse Favour",
  email: "favour@example.com",
  state: "Lagos",
  localGovernment: "Ikeja",
  facilityName: "Ayomama Community Clinic",
  facilityCode: "AYO-CHW-102",
  preferredLanguages: "en",
};

export const MOCK_VISITS = [
  {
    id: "visit-1",
    reminderDateTime: "2026-04-02T09:30:00.000Z",
    doctorName: "Dr. Tunde Bello",
    hospitalName: "Ayomama Community Clinic",
    serviceType: "Antenatal visit",
    duration: 30,
  },
  {
    id: "visit-2",
    reminderDateTime: "2026-04-08T12:00:00.000Z",
    doctorName: "Dr. Nkem Obi",
    hospitalName: "General Hospital Surulere",
    serviceType: "Routine check-up",
    duration: 45,
  },
];

export const MOCK_EMERGENCY_CONTACTS = [
  { name: "Kelechi Okafor", phone: "+234 809 000 1122", type: "family" },
  { name: "Ngozi", phone: "+234 817 101 2020", type: "friend" },
  { name: "Dr. Tunde Bello", phone: "+234 808 555 9988", type: "doctor" },
];

export const MOCK_HOSPITALS = [
  {
    name: "Ayomama Community Clinic",
    address: "12 Broad Street, Lagos",
    distance: 1.2,
  },
  {
    name: "General Hospital Surulere",
    address: "18 Adeniran Road, Surulere",
    distance: 3.9,
  },
];

export function buildMockChatReply(message) {
  const normalized = message.toLowerCase();

  if (normalized.includes("diet") || normalized.includes("food")) {
    return "Focus on balanced meals with fruits, vegetables, protein, and enough water. Small consistent meals usually feel better than skipping and then eating heavily.";
  }

  if (normalized.includes("pain") || normalized.includes("danger")) {
    return "If symptoms feel severe, sudden, or unusual, the safest move is to contact a clinician or emergency contact quickly. For the UI flow, we can keep this as advisory guidance.";
  }

  if (normalized.includes("baby")) {
    return "Your baby's growth and movement can change from week to week. Rest, hydration, and keeping up with appointments are good practical habits to support that journey.";
  }

  return "That looks good for the UI flow. We can show supportive guidance here, quick reminders, and a next-step suggestion without needing a live backend yet.";
}
