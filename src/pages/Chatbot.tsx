import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Send, Bot, User, ArrowLeft, Sparkles, BookOpen, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const SUGGESTIONS = [
  { icon: <BookOpen className="w-4 h-4" />, text: "Explain States of Matter" },
  { icon: <Brain className="w-4 h-4" />, text: "What is Newton's Second Law?" },
  { icon: <Zap className="w-4 h-4" />, text: "Solve: Find velocity if a=4m/s², t=5s" },
  { icon: <Sparkles className="w-4 h-4" />, text: "Explain the Mole Concept simply" },
];

const AI_RESPONSES: Record<string, string> = {
  "explain states of matter": `**States of Matter** 🧊💧💨

Matter exists in three main states:

1. **Solid** — Has definite shape and volume. Particles are tightly packed.
   - Example: Ice, Iron, Wood

2. **Liquid** — Has definite volume but takes the shape of its container. Particles are loosely packed.
   - Example: Water, Milk, Oil

3. **Gas** — Has neither definite shape nor volume. Particles move freely.
   - Example: Oxygen, Steam, Carbon dioxide

**Key Formula:** Energy input causes state changes:
- Solid → Liquid (Melting)
- Liquid → Gas (Evaporation/Boiling)
- Solid → Gas (Sublimation)

Want me to explain any of these in more detail? 🎓`,

  "what is newton's second law?": `**Newton's Second Law of Motion** ⚡

> *The rate of change of momentum of an object is directly proportional to the applied force and takes place in the direction of the force.*

**Formula:**
\`F = m × a\`

Where:
- **F** = Force (in Newtons, N)
- **m** = Mass (in kg)
- **a** = Acceleration (in m/s²)

**Example:**
If a 10 kg object accelerates at 3 m/s²:
F = 10 × 3 = **30 N**

**Key Points for CBSE:**
- More force = more acceleration
- More mass = less acceleration (for same force)
- Force and acceleration are in the same direction

Shall I solve a numerical problem on this? 📐`,

  "solve: find velocity if a=4m/s², t=5s": `**Solution** 📝

**Given:**
- Acceleration (a) = 4 m/s²
- Time (t) = 5 seconds
- Initial velocity (u) = 0 m/s (starts from rest)

**Using the first equation of motion:**
\`v = u + at\`

**Substituting values:**
v = 0 + (4 × 5)
v = **20 m/s** ✅

**Answer:** The velocity after 5 seconds is **20 m/s**.

Want to try a similar problem? 🎯`,

  "explain the mole concept simply": `**The Mole Concept** 🔬

Think of "mole" as a **counting word** — like "dozen" means 12, a **mole** means:

> **6.022 × 10²³** particles (Avogadro's Number)

**Why do we need it?**
Atoms are too tiny to count one by one. So chemists use moles!

**Simple Analogy:**
- 1 dozen eggs = 12 eggs
- 1 mole of atoms = 6.022 × 10²³ atoms

**Key Formulas:**
- Moles = Mass / Molar Mass
- Number of particles = Moles × 6.022 × 10²³

**Example:**
Molar mass of Water (H₂O) = 18 g/mol
So, 18g of water = 1 mole = 6.022 × 10²³ molecules of water!

Need help with a numerical? 🧪`,
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, value] of Object.entries(AI_RESPONSES)) {
    if (lower.includes(key) || key.includes(lower)) return value;
  }
  return `Great question! 🎓

Here's what I can help you with:

**"${input}"** — This is an interesting topic!

As ShikshaGuruji's AI tutor, I can explain NCERT concepts for Class 6-10 across all subjects. Try asking me about:

- 📚 Science concepts (Physics, Chemistry, Biology)
- 📐 Math formulas and problem solving
- 🌍 Social Studies topics
- 📖 English grammar and literature

*Sign up for a free account to unlock personalized AI lectures, flashcards, and group tests!* ✨`;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

    const response = getAIResponse(text);
    const assistantMsg: Message = { id: Date.now() + 1, role: "assistant", content: response, timestamp: new Date() };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col">
      {/* Header */}
      <header className="bg-[#0A0F1E] border-b border-white/10 px-4 py-3 flex items-center gap-4 sticky top-0 z-50">
        <Link to="/">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-sm">ShikshaGuruji AI</h1>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Online · Free to use
            </p>
          </div>
        </div>
        <div className="ml-auto">
          <Link to="/register">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center animate-fade-up">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-2">Hi! I'm ShikshaGuruji AI</h2>
            <p className="text-white/50 max-w-md mb-8">
              Ask me anything about NCERT topics for Class 6-10. I'll explain concepts, solve problems, and help you study!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s.text)}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <span className="text-primary">{s.icon}</span>
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 animate-fade-up ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-white/5 text-white/90 border border-white/10 rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-accent" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 animate-fade-up">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 bg-[#0A0F1E] px-4 py-3 sticky bottom-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="max-w-3xl mx-auto flex gap-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask any NCERT question..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            disabled={isTyping}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 h-auto"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-center text-[10px] text-white/30 mt-2">
          Free demo · <Link to="/register" className="text-primary/60 hover:text-primary">Sign up</Link> for unlimited AI tutoring
        </p>
      </div>
    </div>
  );
}
