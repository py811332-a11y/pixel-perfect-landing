import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Shield, Users, BarChart3, Download } from "lucide-react";
import logo from "@/assets/logo.png";

export default function ParentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-5">
      {/* Left panel */}
      <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-[#0A0F1E] via-[#0F1729] to-[#0A0F1E] flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/15 rounded-full blur-[80px]" />
        
        <div className="relative z-10 text-center">
          <Link to="/" className="flex items-center gap-2 mb-8 justify-center">
            <img src={logo} alt="ShikshaGuruji" className="w-10 h-10 rounded-lg object-contain" />
            <span className="font-display font-bold text-2xl text-white">ShikshaGuruji</span>
          </Link>
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent text-sm px-4 py-1.5 rounded-full mb-6">
            <Shield className="w-4 h-4" /> Parent Portal
          </div>
          <p className="text-white/60 text-lg mb-12">Monitor your child's learning journey</p>

          <div className="space-y-4 text-left max-w-xs mx-auto">
            {[
              { icon: <BarChart3 className="w-5 h-5 text-primary" />, text: "Track subject-wise progress" },
              { icon: <Users className="w-5 h-5 text-accent" />, text: "Monitor multiple children" },
              { icon: <Download className="w-5 h-5 text-success" />, text: "Download PDF reports" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                {f.icon}
                <span className="text-sm text-white/70">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="lg:col-span-3 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <img src={logo} alt="ShikshaGuruji" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-display font-bold text-lg text-foreground">ShikshaGuruji</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs px-3 py-1 rounded-full mb-3">
              <Shield className="w-3 h-3" /> Parent Portal
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">Parent Login</h1>
            <p className="text-muted-foreground mt-1">Access your child's learning dashboard</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Registered Email or Phone</label>
              <Input type="email" placeholder="parent@example.com" className="h-11" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Enter password" className="h-11 pr-10" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Link to="#" className="text-sm text-primary hover:underline mt-1 inline-block">Forgot password?</Link>
            </div>

            <Button className="w-full h-11 mt-2" onClick={() => navigate("/parent")}>
              Login as Parent
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">or</span></div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Are you a student? <Link to="/login" className="text-primary hover:underline font-medium">Student Login</Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Register your child</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
