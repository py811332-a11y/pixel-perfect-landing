import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Target, Layers, User } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: BookOpen, label: "Subjects", path: "/subjects" },
  { icon: Target, label: "Group Test", path: "/group-test" },
  { icon: Layers, label: "Flashcards", path: "/flashcards" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const active = location.pathname.startsWith(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 min-w-[44px] min-h-[44px] justify-center transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
