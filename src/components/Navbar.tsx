import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-colors duration-500">
      <nav className="flex items-center justify-between px-6 py-4 md:px-10">
        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-[18px] h-[18px] text-foreground transition-transform duration-300" />
          ) : (
            <Moon className="w-[18px] h-[18px] text-foreground transition-transform duration-300" />
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">ISI Global</span>
        </div>

        {/* Menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/80 transition-colors"
        >
          {menuOpen ? (
            <X className="w-4 h-4 text-primary-foreground" />
          ) : (
            <Menu className="w-4 h-4 text-primary-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-[72px] bg-background z-40 animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-light">
            <a href="#about" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">About</a>
            <a href="#projects" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">Projects</a>
            <a href="#services" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">Services</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">FAQ</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
