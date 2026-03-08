import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedClass, setSelectedClass] = useState(9);
  const [selectedTrack, setSelectedTrack] = useState("cbse");

  return (
    <div className="min-h-screen grid lg:grid-cols-5">
      <div className="hidden lg:flex lg:col-span-2 bg-[#0A0F1E] flex-col justify-center items-center p-12">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">SG</div>
          <span className="font-display font-bold text-2xl text-white">ShikshaGuruji</span>
        </Link>
        <p className="text-white/60 text-center text-lg">Join 50,000+ students learning smarter</p>
        <div className="mt-12 w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">SG</div>
        </div>
      </div>

      <div className="lg:col-span-3 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">SG</div>
            <span className="font-display font-bold text-lg text-foreground">ShikshaGuruji</span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1</div>
            <div className={`h-0.5 flex-1 ${step >= 2 ? "bg-primary" : "bg-border"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</div>
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground">Create your account</h1>
                <p className="text-muted-foreground mt-1">Step 1 of 2 — Basic Info</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Full Name</label>
                <Input placeholder="Arjun Kumar" className="h-11" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Email address</label>
                <Input type="email" placeholder="arjun@example.com" className="h-11" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Min 8 chars, number + uppercase" className="h-11 pr-10" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button className="w-full h-11 gap-2" onClick={() => setStep(2)}>
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-up">
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground">Tell us about yourself</h1>
                <p className="text-muted-foreground mt-1">Step 2 of 2 — Personalize your experience</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">I am in Class:</label>
                <div className="flex gap-2">
                  {[6, 7, 8, 9, 10].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedClass(c)}
                      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        selectedClass === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">My focus is:</label>
                <div className="flex gap-3">
                  {[{ id: "cbse", label: "CBSE Boards" }, { id: "jee", label: "JEE Foundation" }].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTrack(t.id)}
                      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        selectedTrack === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <Link to="/diagnostic">
                <Button className="w-full h-11 gap-2">Create My Account <ArrowRight className="w-4 h-4" /></Button>
              </Link>
              <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>← Back</Button>
            </div>
          )}

          <p className="text-sm text-center text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
