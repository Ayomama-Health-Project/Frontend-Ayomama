export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAYS = Array.from({ length: 31 }, (_, index) => `${index + 1}`);
const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Array.from(
  { length: 8 },
  (_, index) => `${CURRENT_YEAR + index}`,
);

export const RELATIONSHIP_OPTIONS = [
  "Family",
  "Friend",
  "Hospital",
  "Partner",
  "Neighbor",
];

export const LANGUAGES = [
  { id: "en", label: "English" },
  { id: "yo", label: "Yoruba" },
  { id: "ha", label: "Hausa" },
  { id: "ig", label: "Igbo" },
];

export const PREGNANCY_OPTIONS = [
  { id: "due_date", icon: "calendar", label: "I know my due date" },
  { id: "weeks", icon: "calendar-number", label: "I know how many weeks" },
  { id: "unknown", icon: "help-circle", label: "I don't know" },
  { id: "just_found", icon: "heart-circle", label: "I just found out today" },
];

export const SUPPORT_OPTIONS = [
  { id: "just_me", icon: "person", label: "Just me" },
  { id: "partner", icon: "people", label: "My partner" },
  { id: "health_worker", icon: "medkit", label: "Health Worker" },
  { id: "friends", icon: "people-circle", label: "Friends" },
];

export const QUICK_SETUP_OPTIONS = [
  { id: "health", icon: "heart", label: "Track my health & symptoms" },
  { id: "tips", icon: "notifications", label: "Get daily tips & reminders" },
  { id: "community", icon: "people", label: "Find community support" },
  { id: "emergency", icon: "shield-checkmark", label: "Access emergency" },
];

export const PROFESSIONALS = [
  {
    id: "1",
    name: "Dr Aishat Mohammed",
    role: "Midwife, Lagos State university hospital",
    image:
      "https://www.figma.com/api/mcp/asset/e5f076e9-c0b2-4c16-a665-c3bde47acc46",
    defaultFollowed: true,
  },
  {
    id: "2",
    name: "Dr Aishat Mohammed",
    role: "Midwife, Lagos State university hospital",
    image:
      "https://www.figma.com/api/mcp/asset/e5f076e9-c0b2-4c16-a665-c3bde47acc46",
    defaultFollowed: true,
  },
  {
    id: "3",
    name: "Dr Aishat Mohammed",
    role: "Midwife, Lagos State university hospital",
    image:
      "https://www.figma.com/api/mcp/asset/e5f076e9-c0b2-4c16-a665-c3bde47acc46",
    defaultFollowed: false,
  },
  {
    id: "4",
    name: "Dr Aishat Mohammed",
    role: "Midwife, Lagos State university hospital",
    image:
      "https://www.figma.com/api/mcp/asset/e5f076e9-c0b2-4c16-a665-c3bde47acc46",
    defaultFollowed: false,
  },
];

export const STEP_TITLES = [
  "Welcome",
  "Language preferred",
  "Personal information",
  "Pregnancy Setup",
  "Antenatal",
  "Support Circle",
  "Quick Setup",
  "Follow Health Professionals",
  "Notification",
];
