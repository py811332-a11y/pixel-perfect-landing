import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <nav className="h-16 border-b border-white/10 flex items-center px-6 backdrop-blur-sm bg-[#0A0F1E]/95 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ShikshaGuruji" className="w-8 h-8 rounded-lg object-contain" />
          <span className="font-display font-bold text-white">ShikshaGuruji</span>
        </Link>
        <div className="ml-auto">
          <Link to="/"><Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 gap-1"><ArrowLeft className="w-3 h-3" /> Back</Button></Link>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display font-bold text-3xl text-white">Terms of Service</h1>
        <p className="text-white/40 mt-4">Last updated: March 2026</p>
        <div className="mt-8 space-y-6 text-sm text-white/60 leading-relaxed">
          <p>By using ShikshaGuruji, you agree to these terms.</p>
          <h2 className="font-display font-semibold text-white text-lg !mt-8">Usage</h2>
          <p>ShikshaGuruji is an educational platform for personal, non-commercial learning. You must be 13+ or have parental consent.</p>
          <h2 className="font-display font-semibold text-white text-lg !mt-8">Accounts</h2>
          <p>You are responsible for maintaining the security of your account. One account per student.</p>
          <h2 className="font-display font-semibold text-white text-lg !mt-8">Content</h2>
          <p>NCERT content is used under fair use for educational purposes. AI-generated content is for learning assistance only.</p>
          <h2 className="font-display font-semibold text-white text-lg !mt-8">Payments</h2>
          <p>Paid plans are billed monthly or annually. 7-day refund policy applies. Cancel anytime.</p>
          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-xs text-white/30">© ASN StarChem Pvt Ltd, Kota, Rajasthan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
