import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Target, Layers, User, BarChart3, Trophy, Book, CreditCard, Bell, Settings, LogOut } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { studentProfile } from "@/data/mockData";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Subjects", path: "/subjects" },
  { icon: Target, label: "Group Test", path: "/group-test" },
  { icon: Layers, label: "Flashcards", path: "/flashcards" },
  { icon: Settings, label: "Practice", path: "/practice" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: Book, label: "NCERT Books", path: "/books" },
];

const bottomItems = [
  { icon: User, label: "Profile", path: "/profile" },
  { icon: CreditCard, label: "Subscription", path: "/subscription" },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen bg-card border-r border-border fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">SG</div>
          <span className="font-display font-bold text-lg text-foreground">ShikshaGuruji</span>
        </Link>
      </div>

      {/* Student info */}
      <div className="p-4 border-b border-border">
        <p className="font-display font-semibold text-sm text-foreground">{studentProfile.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">Class {studentProfile.class}</span>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0">
            {studentProfile.plan}
          </Badge>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>{studentProfile.xp.toLocaleString()} XP</span>
            <span>Level {studentProfile.level}</span>
          </div>
          <Progress value={(studentProfile.xp / studentProfile.xpToNext) * 100} className="h-1.5" />
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-semibold border-r-2 border-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}

        <div className="my-2 border-t border-border" />

        {bottomItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-semibold border-r-2 border-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Notifications */}
      <div className="p-4 border-t border-border">
        <Link to="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          Notifications
          <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full">3</span>
        </Link>
      </div>
    </aside>
  );
}
