// ShikshaGuruji Mock Data

export const studentProfile = {
  name: "Arjun Kumar",
  email: "arjun@example.com",
  class: 9,
  track: "CBSE",
  plan: "PRO" as const,
  level: 12,
  xp: 2450,
  xpToNext: 3000,
  streak: 12,
  topicsDone: 45,
  cardsDue: 23,
  cardsReviewed: 234,
  location: "Kota, Rajasthan",
  avatar: "",
};

export const subjects = [
  { id: "science", name: "Science", icon: "🔬", color: "subject-science", chapters: 15, progress: 78, topicsMastered: 11, totalTopics: 15 },
  { id: "math", name: "Mathematics", icon: "📐", color: "subject-math", chapters: 15, progress: 62, topicsMastered: 9, totalTopics: 15 },
  { id: "social", name: "Social Science", icon: "🌍", color: "subject-social", chapters: 27, progress: 48, topicsMastered: 7, totalTopics: 27 },
  { id: "english", name: "English", icon: "📖", color: "subject-english", chapters: 10, progress: 71, topicsMastered: 7, totalTopics: 10 },
  { id: "hindi", name: "Hindi", icon: "🇮🇳", color: "subject-hindi", chapters: 12, progress: 38, topicsMastered: 4, totalTopics: 12 },
];

export const scienceChapters = [
  { id: "ch1", number: 1, name: "Matter in Our Surroundings", progress: 75, status: "in-progress" as const, topics: 8 },
  { id: "ch2", number: 2, name: "Is Matter Around Us Pure?", progress: 48, status: "in-progress" as const, topics: 6 },
  { id: "ch3", number: 3, name: "Atoms and Molecules", progress: 0, status: "locked" as const, topics: 7 },
  { id: "ch4", number: 4, name: "Structure of the Atom", progress: 0, status: "locked" as const, topics: 5 },
  { id: "ch5", number: 5, name: "The Fundamental Unit of Life", progress: 0, status: "locked" as const, topics: 6 },
  { id: "ch6", number: 6, name: "Tissues", progress: 100, status: "mastered" as const, topics: 4 },
  { id: "ch7", number: 7, name: "Diversity in Living Organisms", progress: 100, status: "mastered" as const, topics: 5 },
  { id: "ch8", number: 8, name: "Motion", progress: 30, status: "in-progress" as const, topics: 8 },
  { id: "ch9", number: 9, name: "Force and Laws of Motion", progress: 0, status: "locked" as const, topics: 6 },
  { id: "ch10", number: 10, name: "Gravitation", progress: 0, status: "locked" as const, topics: 5 },
  { id: "ch11", number: 11, name: "Work and Energy", progress: 100, status: "mastered" as const, topics: 6 },
  { id: "ch12", number: 12, name: "Sound", progress: 100, status: "mastered" as const, topics: 5 },
  { id: "ch13", number: 13, name: "Why Do We Fall Ill?", progress: 0, status: "locked" as const, topics: 4 },
  { id: "ch14", number: 14, name: "Natural Resources", progress: 100, status: "mastered" as const, topics: 5 },
  { id: "ch15", number: 15, name: "Improvement in Food Resources", progress: 0, status: "locked" as const, topics: 4 },
];

export const chapterTopics = [
  { id: "t1", number: 1, name: "States of Matter", status: "mastered" as const, progress: 100 },
  { id: "t2", number: 2, name: "Evaporation", status: "in-progress" as const, progress: 75 },
  { id: "t3", number: 3, name: "Diffusion", status: "not-started" as const, progress: 0 },
  { id: "t4", number: 4, name: "Brownian Motion", status: "not-started" as const, progress: 0 },
  { id: "t5", number: 5, name: "Classification of Matter", status: "locked" as const, progress: 0 },
  { id: "t6", number: 6, name: "Change of State", status: "locked" as const, progress: 0 },
  { id: "t7", number: 7, name: "Effect of Temperature", status: "locked" as const, progress: 0 },
  { id: "t8", number: 8, name: "Effect of Pressure", status: "locked" as const, progress: 0 },
];

export const leaderboard = [
  { rank: 1, name: "Sneha Gupta", xp: 8450, avatar: "", badge: "🥇" },
  { rank: 2, name: "Rahul Verma", xp: 7200, avatar: "", badge: "🥈" },
  { rank: 3, name: "Priya Sharma", xp: 6890, avatar: "", badge: "🥉" },
  { rank: 4, name: "Arjun Kumar", xp: 5420, avatar: "", isYou: true },
  { rank: 5, name: "Dev Sharma", xp: 4800, avatar: "" },
  { rank: 6, name: "Ananya Singh", xp: 4200, avatar: "" },
  { rank: 7, name: "Rohan Verma", xp: 3900, avatar: "" },
  { rank: 8, name: "Kavya Patel", xp: 3500, avatar: "" },
  { rank: 9, name: "Aditya Joshi", xp: 3100, avatar: "" },
  { rank: 10, name: "Meera Reddy", xp: 2800, avatar: "" },
];

export const flashcardDecks = [
  { id: "fd1", name: "States of Matter", subject: "Science", chapter: "Ch. 1", cards: 24, due: 12, mastery: 72 },
  { id: "fd2", name: "Atoms & Molecules", subject: "Science", chapter: "Ch. 3", cards: 31, due: 5, mastery: 45 },
  { id: "fd3", name: "Laws of Motion", subject: "Science", chapter: "Ch. 8", cards: 18, due: 0, mastery: 95 },
  { id: "fd4", name: "Number Systems", subject: "Math", chapter: "Ch. 1", cards: 20, due: 8, mastery: 60 },
  { id: "fd5", name: "Polynomials", subject: "Math", chapter: "Ch. 2", cards: 15, due: 3, mastery: 80 },
  { id: "fd6", name: "French Revolution", subject: "Social", chapter: "Ch. 1", cards: 22, due: 3, mastery: 35 },
];

export const sampleFlashcards = [
  { id: "fc1", front: "What is Brownian Motion?", back: "Brownian Motion is the random, zigzag movement of particles suspended in a fluid (liquid or gas), caused by collisions with the surrounding fast-moving molecules.\n\nExample: Dust particles dancing in a sunbeam" },
  { id: "fc2", front: "Define Evaporation", back: "Evaporation is a surface phenomenon where liquid changes to gas at any temperature below its boiling point. It causes a cooling effect.\n\nFactors: Temperature, surface area, humidity, wind speed" },
  { id: "fc3", front: "What is Sublimation?", back: "Sublimation is the direct conversion of a solid to gas without passing through the liquid state.\n\nExamples: Dry ice (solid CO₂), Naphthalene balls, Camphor" },
  { id: "fc4", front: "State Boyle's Law", back: "At constant temperature, the volume of a gas is inversely proportional to its pressure.\n\nP₁V₁ = P₂V₂" },
];

export const diagnosticQuestions = [
  {
    id: 1, subject: "Science", chapter: "Chapter 1",
    question: "A mixture of sand and water is an example of:",
    options: ["Compound", "Heterogeneous mixture", "Homogeneous mixture", "Element"],
    correct: 1,
  },
  {
    id: 2, subject: "Science", chapter: "Chapter 3",
    question: "Which of the following is NOT a subatomic particle?",
    options: ["Proton", "Neutron", "Photon", "Electron"],
    correct: 2,
  },
  {
    id: 3, subject: "Math", chapter: "Chapter 1",
    question: "Which of these is an irrational number?",
    options: ["3/4", "√2", "0.5", "7"],
    correct: 1,
  },
  {
    id: 4, subject: "Math", chapter: "Chapter 2",
    question: "The degree of the polynomial 4x³ + 2x² + 7 is:",
    options: ["1", "2", "3", "7"],
    correct: 2,
  },
  {
    id: 5, subject: "Social", chapter: "Chapter 1",
    question: "The French Revolution began in:",
    options: ["1776", "1789", "1799", "1804"],
    correct: 1,
  },
  {
    id: 6, subject: "English", chapter: "Chapter 1",
    question: "A word that modifies a verb is called:",
    options: ["Adjective", "Adverb", "Pronoun", "Conjunction"],
    correct: 1,
  },
  {
    id: 7, subject: "Hindi", chapter: "Chapter 1",
    question: "संज्ञा के कितने भेद होते हैं?",
    options: ["3", "4", "5", "6"],
    correct: 2,
  },
  {
    id: 8, subject: "Science", chapter: "Chapter 8",
    question: "A car starts from rest and accelerates at 4 m/s². What is its velocity after 5 seconds?",
    options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
    correct: 2,
  },
  {
    id: 9, subject: "Science", chapter: "Chapter 1",
    question: "Which property distinguishes a liquid from a gas?",
    options: ["Has definite shape", "Has definite volume but no fixed shape", "Has neither definite shape nor volume", "Has both definite shape and volume"],
    correct: 1,
  },
  {
    id: 10, subject: "Math", chapter: "Chapter 5",
    question: "If two angles are supplementary and one is 60°, the other is:",
    options: ["30°", "90°", "120°", "150°"],
    correct: 2,
  },
];

export const topicTestQuestions = [
  {
    id: 1,
    question: "Which property distinguishes a liquid from a gas?",
    options: ["Has definite shape", "Has definite volume but no fixed shape", "Has neither definite shape nor volume", "Has both definite shape and volume"],
    correct: 1,
    explanation: "Liquids have definite volume but take the shape of their container.",
  },
  {
    id: 2,
    question: "What happens when a solid is heated?",
    options: ["Particles slow down", "Particles move faster and farther apart", "Particles stop moving", "Particles get smaller"],
    correct: 1,
    explanation: "Heating provides energy which increases kinetic energy of particles, making them vibrate faster and move farther apart.",
  },
  {
    id: 3,
    question: "Sublimation is the process of converting:",
    options: ["Solid to liquid", "Liquid to gas", "Solid directly to gas", "Gas to liquid"],
    correct: 2,
    explanation: "Sublimation is the direct conversion from solid to gas without passing through the liquid state. Examples: dry ice, camphor.",
  },
  {
    id: 4,
    question: "Which of the following is NOT a factor affecting evaporation?",
    options: ["Surface area", "Temperature", "Color of liquid", "Wind speed"],
    correct: 2,
    explanation: "Evaporation depends on surface area, temperature, humidity, and wind speed — not the color of the liquid.",
  },
  {
    id: 5,
    question: "The boiling point of water is:",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correct: 1,
    explanation: "Water boils at 100°C (212°F) at standard atmospheric pressure.",
  },
  {
    id: 6,
    question: "Brownian motion proves that:",
    options: ["Liquids expand on heating", "Particles of matter are in constant motion", "Gas is lighter than liquid", "Solids are hard"],
    correct: 1,
    explanation: "Brownian motion — the random zigzag movement of particles — proves that matter is made of particles in constant motion.",
  },
  {
    id: 7,
    question: "Which state of matter has the highest kinetic energy?",
    options: ["Solid", "Liquid", "Gas", "All have equal"],
    correct: 2,
    explanation: "Gas particles have the highest kinetic energy, which is why they move freely and rapidly in all directions.",
  },
  {
    id: 8,
    question: "Latent heat is the heat required to:",
    options: ["Raise temperature by 1°C", "Change state without changing temperature", "Cool a substance", "Melt ice at 0°C only"],
    correct: 1,
    explanation: "Latent heat is the heat energy absorbed or released during a change of state without any change in temperature.",
  },
  {
    id: 9,
    question: "Dry ice is an example of:",
    options: ["Freezing", "Evaporation", "Sublimation", "Condensation"],
    correct: 2,
    explanation: "Dry ice (solid CO₂) directly converts from solid to gas — this process is called sublimation.",
  },
  {
    id: 10,
    question: "Plasma is sometimes called the:",
    options: ["First state of matter", "Second state of matter", "Third state of matter", "Fourth state of matter"],
    correct: 3,
    explanation: "Plasma is called the fourth state of matter. It exists in stars, fluorescent lights, and lightning.",
  },
];

export const groupTestHistory = [
  {
    code: "ABC123",
    subject: "Science",
    chapter: "Chapter 1",
    questions: 10,
    timeLimit: 15,
    date: "2 days ago",
    rank: 1,
    total: 6,
    score: 90,
  },
];

export const groupTestResults = [
  { rank: 1, name: "Sneha", score: 90, correct: 18, total: 20, time: "4:12 min", badge: "🥇" },
  { rank: 2, name: "Arjun", score: 85, correct: 17, total: 20, time: "4:45 min", badge: "🥈", isYou: true },
  { rank: 3, name: "Priya", score: 70, correct: 14, total: 20, time: "6:30 min", badge: "🥉" },
  { rank: 4, name: "Dev", score: 65, correct: 13, total: 20, time: "7:15 min" },
  { rank: 5, name: "Ananya", score: 50, correct: 10, total: 20, time: "9:20 min" },
];

export const weeklyXP = [
  { day: "Mon", xp: 120 },
  { day: "Tue", xp: 280 },
  { day: "Wed", xp: 350 },
  { day: "Thu", xp: 200 },
  { day: "Fri", xp: 450 },
  { day: "Sat", xp: 380 },
  { day: "Sun", xp: 320 },
];

export const badges = [
  { name: "First Lesson", icon: "🥇", earned: true, date: "Jan 15" },
  { name: "3-Day Streak", icon: "🔥", earned: true, date: "Jan 18" },
  { name: "Topic Master", icon: "⭐", earned: true, date: "Feb 2" },
  { name: "100 Problems", icon: "💪", earned: true, date: "Feb 10" },
  { name: "Group Test Win", icon: "🎯", earned: true, date: "Feb 15" },
  { name: "7-Day Streak", icon: "🔥", earned: true, date: "Feb 20" },
  { name: "Speed Demon", icon: "⚡", earned: true, date: "Mar 1" },
  { name: "Perfect Score", icon: "💯", earned: true, date: "Mar 3" },
  { name: "Book Worm", icon: "📚", earned: true, date: "Mar 4" },
  { name: "Social Star", icon: "🌟", earned: true, date: "Mar 5" },
  { name: "Math Wizard", icon: "🧙", earned: true, date: "Mar 6" },
  { name: "Science Pro", icon: "🔬", earned: true, date: "Mar 7" },
  { name: "30-Day Streak", icon: "🔥", earned: false },
  { name: "All Subjects", icon: "🌈", earned: false },
  { name: "JEE Ready", icon: "🚀", earned: false },
];

export const pricingPlans = [
  {
    id: "free",
    name: "FREE",
    price: 0,
    period: "forever",
    features: [
      { text: "5 Subjects (Class 9 only)", included: true },
      { text: "Basic practice problems", included: true },
      { text: "Group Test (join only)", included: true },
      { text: "NCERT Flipbook", included: true },
      { text: "AI Lectures", included: false },
      { text: "Analytics", included: false },
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    id: "basic",
    name: "BASIC",
    price: 299,
    period: "month",
    features: [
      { text: "Everything in Free", included: true },
      { text: "AI Whiteboard Lectures", included: true },
      { text: "Smart Flashcards (FSRS)", included: true },
      { text: "Create Group Tests", included: true },
      { text: "Progress Analytics", included: true },
      { text: "All classes 6-10", included: true },
    ],
    cta: "Start Free Trial",
    variant: "default" as const,
    popular: false,
  },
  {
    id: "pro",
    name: "PRO",
    price: 599,
    period: "month",
    features: [
      { text: "Everything in Basic", included: true },
      { text: "AI Tutor (unlimited)", included: true },
      { text: "Video Lectures", included: true },
      { text: "Collaborative Video Call", included: true },
      { text: "Parent Dashboard", included: true },
      { text: "Progress PDF Reports", included: true },
    ],
    cta: "Upgrade to PRO",
    variant: "default" as const,
    popular: true,
  },
  {
    id: "jee",
    name: "JEE ELITE",
    price: 999,
    period: "month",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "JEE Mock Tests (3-hour)", included: true },
      { text: "JEE Rank Predictor", included: true },
      { text: "JEE-specific AI lectures", included: true },
      { text: "Class 11-12 content", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Go JEE Elite",
    variant: "default" as const,
    popular: false,
  },
];

export const faqItems = [
  { q: "Is ShikshaGuruji really free?", a: "Yes! Our FREE plan includes core features forever — practice problems, NCERT flipbook, and joining group tests. No credit card needed." },
  { q: "Which classes are supported?", a: "We currently support Class 6 to 10, following the CBSE curriculum. JEE Foundation content is available for Class 9-10 students." },
  { q: "Does it work offline?", a: "Our mobile app supports offline mode for downloaded content including flashcards, NCERT books, and previously viewed lessons." },
  { q: "What is an AI lecture?", a: "Our AI (powered by Ollama, running on Indian servers) generates a personalized whiteboard lecture for each topic, adapting to your learning level and weak areas." },
  { q: "Is JEE content available?", a: "Yes! Class 9-10 students can enable JEE Foundation track which includes JEE-specific problems, mock tests, and rank predictor." },
];

export const testimonials = [
  { quote: "Scored 94% in Class 9 Science boards after using ShikshaGuruji for 2 months", name: "Sneha", location: "Kota" },
  { quote: "The Group Test feature is addictive. Me and 5 friends compete every night", name: "Arjun", location: "Jaipur" },
  { quote: "AI lecture for Mole Concept was better than my tuition teacher", name: "Priya", location: "Delhi" },
];

export const whiteboardSteps = [
  { title: "States of Matter", content: "Matter exists in 3 main states:" },
  { title: "", content: "• Solid → Definite shape & volume\n  Examples: Ice, Iron, Wood" },
  { title: "", content: "• Liquid → Definite volume, no fixed shape\n  Examples: Water, Milk, Oil" },
  { title: "", content: "• Gas → No fixed shape or volume\n  Examples: Air, Steam, CO₂" },
  { title: "Key Properties", content: "Arrangement of particles:\n  Solid: Tightly packed\n  Liquid: Loosely packed\n  Gas: Very loosely packed" },
  { title: "", content: "Kinetic Energy:\n  Solid < Liquid < Gas" },
  { title: "Important Formula", content: "Density: ρ = m/V\n\nwhere:\n  ρ = density (kg/m³)\n  m = mass (kg)\n  V = volume (m³)" },
  { title: "Change of State", content: "Solid ──heat──→ Liquid ──heat──→ Gas\n         (melting)         (boiling)" },
  { title: "", content: "Gas ──cool──→ Liquid ──cool──→ Solid\n      (condensation)    (freezing)" },
  { title: "Latent Heat", content: "Heat absorbed during state change\nwithout temperature change.\n\nLatent heat of fusion: 334 J/g\nLatent heat of vaporization: 2260 J/g" },
  { title: "Evaporation", content: "Surface phenomenon\nOccurs at ANY temperature\n\nFactors:\n  ↑ Temperature → ↑ Evaporation\n  ↑ Surface area → ↑ Evaporation\n  ↑ Wind speed → ↑ Evaporation\n  ↓ Humidity → ↑ Evaporation" },
  { title: "", content: "Evaporation causes COOLING\nExample: We feel cold after a bath" },
  { title: "Sublimation", content: "Direct solid → gas conversion\n\nExamples:\n  • Dry ice (solid CO₂)\n  • Naphthalene balls\n  • Camphor" },
  { title: "Brownian Motion", content: "Random zigzag movement of particles\nin a fluid.\n\nProves: Matter is made of particles\nthat are constantly moving." },
  { title: "Boyle's Law", content: "At constant temperature:\n\nP₁V₁ = P₂V₂\n\nPressure ∝ 1/Volume" },
  { title: "Charles's Law", content: "At constant pressure:\n\nV₁/T₁ = V₂/T₂\n\nVolume ∝ Temperature" },
  { title: "Ideal Gas Equation", content: "PV = nRT\n\nwhere:\n  P = pressure\n  V = volume\n  n = moles\n  R = gas constant\n  T = temperature (K)" },
  { title: "Summary", content: "✓ 3 states: Solid, Liquid, Gas\n✓ Particles: arrangement & energy\n✓ State changes: melting, boiling, etc.\n✓ Evaporation: surface, cooling\n✓ PV = nRT\n\n🎉 Great job! Ready for the test?" },
];

export const ncertBooks = [
  { id: "science-9", subject: "Science", class: 9, chapters: 15, icon: "📘" },
  { id: "math-9", subject: "Mathematics", class: 9, chapters: 15, icon: "📗" },
  { id: "social-9", subject: "Social Science", class: 9, chapters: 27, icon: "📙" },
  { id: "english-9", subject: "English", class: 9, chapters: 10, icon: "📕" },
  { id: "hindi-9", subject: "Hindi", class: 9, chapters: 12, icon: "📔" },
];
