export const DASHBOARD_ARTICLES = [
  {
    id: "1",
    category: "Nutrition",
    title: "5 Essential Nutrients for a Healthy Pregnancy",
    excerpt: "Discover the key nutrients every expecting mother needs this trimester.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    category: "Wellbeing",
    title: "How to Build a Rest Routine That Works for You",
    excerpt: "A gentle bedtime flow can improve energy, sleep quality, and mood.",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    category: "Movement",
    title: "Simple Daily Stretches for Comfort and Strength",
    excerpt: "Support your back, hips, and breathing with safe daily movement.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
  },
];

export const INITIAL_CHECKLIST = [
  {
    id: "supplement",
    label: "Take iron supplement",
    image: require("../../../assets/images/ironSupplement.png"),
  },
  {
    id: "water",
    label: "Drink 8 glasses of water",
    image: require("../../../assets/images/water.png"),
  },
  {
    id: "walk",
    label: "Walk 5 miles",
    image: require("../../../assets/images/shoe.png"),
  },
  {
    id: "clinic",
    label: "Clinic visit tomorrow",
    image: require("../../../assets/images/clinic.png"),
  },
];

export const WELLNESS_ACTIVITIES = [
  { id: "yoga", title: "Prenatal Yoga", meta: "15 mins sessions", icon: "leaf-outline" },
  { id: "breathing", title: "Breathing", meta: "5 min exercise", icon: "body-outline" },
  { id: "meditation", title: "Meditation", meta: "10 min session", icon: "moon-outline" },
  { id: "sleep", title: "Sleep Stories", meta: "15 min session", icon: "bed-outline" },
];

export const INITIAL_VITALS = {
  bloodPressure: "120/80 mmHg",
  weight: "65 kg",
  temperature: "36.8°C",
  bloodLevel: "12.5 g/dl",
};

export const INITIAL_JOURNAL_ENTRIES = [
  {
    id: "1",
    body: "Today baby felt extra active after breakfast. I took time to breathe and slow down.",
    meta: "Yesterday's entry",
  },
  {
    id: "2",
    body: "I completed my walk and drank enough water today. Feeling proud of the little wins.",
    meta: "2 days ago",
  },
];

export const INITIAL_MEALS = [
  { id: "1", category: "Breakfast", meal: "Pap, milk and eggs", weight: "100g", macroA: "40g Protein", macroB: "15g Fat", macroC: "45g Carbs" },
  { id: "2", category: "Breakfast", meal: "Fruit salad and milk", weight: "100g", macroA: "40g Vitamin", macroB: "15g Fibre", macroC: "15g Carbs" },
  { id: "3", category: "Lunch", meal: "Jollof rice, veggies and fish", weight: "100g", macroA: "40g Protein", macroB: "15g fat", macroC: "45g Carbs" },
  { id: "4", category: "Dinner", meal: "Grilled fish and veggies", weight: "100g", macroA: "40g protein", macroB: "15g vitamin", macroC: "15g fat" },
];

export const COMMUNITY_POSTS = [
  "3 tips to reduce morning tiredness naturally",
  "How other mums are preparing for clinic visits this week",
  "Foods many pregnant mums are loving in week 18",
];
