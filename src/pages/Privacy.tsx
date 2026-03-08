import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export default function Privacy() {
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
        <h1 className="font-display font-bold text-3xl text-white">Privacy Policy</h1>
        <p className="text-white/40 mt-4">Last updated: March 2026</p>
        <div className="mt-8 space-y-6 text-sm text-white/60 leading-relaxed">
          <p>ShikshaGuruji ("we") is committed to protecting your privacy. This policy describes how we collect, use, and protect your personal data.</p>
          <h2 className="font-display font-semibold text-white text-lg !mt-8">Data Collection</h2>
          <p>We collect: name, email, class, learning progress, and usage analytics. All data is stored on Indian servers.</p>
          <h2 className="font-display font-semibold text-white text-lg !mt-8">Data Usage</h2>
          <p>Your data is used to personalize your learning experience, generate AI lectures, and track progress. We never sell your data to third parties.</p>
          <h2 className="font-display font-semibold text-white text-lg !mt-8">Data Security</h2>
          <p>All data is encrypted in transit and at rest. Our AI runs locally on Indian servers — your data never leaves the country.</p>
          <h2 className="font-display font-semibold text-white text-lg !mt-8">Contact</h2>
          <p>For privacy concerns: privacy@shikshaguruji.com</p>
          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-xs text-white/30">© ASN StarChem Pvt Ltd, Kota, Rajasthan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
