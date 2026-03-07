import { Link } from "react-router-dom";
export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b border-border flex items-center px-6"><Link to="/" className="flex items-center gap-2"><span className="text-2xl">🎓</span><span className="font-display font-bold text-foreground">ShikshaGuruji</span></Link></nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display font-bold text-3xl text-foreground">Terms of Service</h1>
        <p className="text-muted-foreground mt-4">Last updated: March 2026</p>
        <div className="mt-6 space-y-4 text-sm text-muted-foreground">
          <p>By using ShikshaGuruji, you agree to these terms.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">Usage</h2>
          <p>ShikshaGuruji is an educational platform for personal, non-commercial learning. You must be 13+ or have parental consent.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">Accounts</h2>
          <p>You are responsible for maintaining the security of your account. One account per student.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">Content</h2>
          <p>NCERT content is used under fair use for educational purposes. AI-generated content is for learning assistance only.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">Payments</h2>
          <p>Paid plans are billed monthly or annually. 7-day refund policy applies. Cancel anytime.</p>
          <p className="mt-6 text-xs">© ASN StarChem Pvt Ltd, Kota, Rajasthan</p>
        </div>
      </div>
    </div>
  );
}
