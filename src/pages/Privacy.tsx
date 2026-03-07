import { Link } from "react-router-dom";
export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b border-border flex items-center px-6"><Link to="/" className="flex items-center gap-2"><span className="text-2xl">🎓</span><span className="font-display font-bold text-foreground">ShikshaGuruji</span></Link></nav>
      <div className="max-w-3xl mx-auto px-6 py-16 prose prose-sm">
        <h1 className="font-display font-bold text-3xl text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground mt-4">Last updated: March 2026</p>
        <div className="mt-6 space-y-4 text-sm text-muted-foreground">
          <p>ShikshaGuruji ("we") is committed to protecting your privacy. This policy describes how we collect, use, and protect your personal data.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">Data Collection</h2>
          <p>We collect: name, email, class, learning progress, and usage analytics. All data is stored on Indian servers.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">Data Usage</h2>
          <p>Your data is used to personalize your learning experience, generate AI lectures, and track progress. We never sell your data to third parties.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">Data Security</h2>
          <p>All data is encrypted in transit and at rest. Our AI runs locally on Indian servers — your data never leaves the country.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">Contact</h2>
          <p>For privacy concerns: privacy@shikshaguruji.com</p>
          <p className="mt-6 text-xs">© ASN StarChem Pvt Ltd, Kota, Rajasthan</p>
        </div>
      </div>
    </div>
  );
}
