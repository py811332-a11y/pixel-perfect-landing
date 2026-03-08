import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Diagnostic from "./pages/Diagnostic";
import Subjects from "./pages/Subjects";
import SubjectChapters from "./pages/SubjectChapters";
import ChapterTopics from "./pages/ChapterTopics";
import TopicOverview from "./pages/TopicOverview";
import LessonPlayer from "./pages/LessonPlayer";
import TopicTest from "./pages/TopicTest";
import Practice from "./pages/Practice";
import Flashcards from "./pages/Flashcards";
import FlashcardReview from "./pages/FlashcardReview";
import Books from "./pages/Books";
import BookViewer from "./pages/BookViewer";
import GroupTest from "./pages/GroupTest";
import GroupTestCreate from "./pages/GroupTestCreate";
import GroupTestJoin from "./pages/GroupTestJoin";
import GroupTestLive from "./pages/GroupTestLive";
import GroupTestResults from "./pages/GroupTestResults";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";
import Billing from "./pages/Billing";
import Admin from "./pages/Admin";
import StudyGroups from "./pages/StudyGroups";
import StudyGroupSession from "./pages/StudyGroupSession";
import GroupTestLobby from "./pages/GroupTestLobby";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:subjectId" element={<SubjectChapters />} />
          <Route path="/chapters/:chapterId" element={<ChapterTopics />} />
          <Route path="/topics/:topicId" element={<TopicOverview />} />
          <Route path="/topics/:topicId/lesson" element={<LessonPlayer />} />
          <Route path="/topics/:topicId/test" element={<TopicTest />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/flashcards/:deckId" element={<FlashcardReview />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:class/:subject" element={<BookViewer />} />
          <Route path="/group-test" element={<GroupTest />} />
          <Route path="/group-test/create" element={<GroupTestCreate />} />
          <Route path="/group-test/join" element={<GroupTestJoin />} />
          <Route path="/group-test/:code/lobby" element={<GroupTestLobby />} />
          <Route path="/group-test/:code/test" element={<GroupTestLive />} />
          <Route path="/group-test/:code/results" element={<GroupTestResults />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/study-groups/:groupId/session" element={<StudyGroupSession />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
