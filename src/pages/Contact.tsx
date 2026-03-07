import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b border-border flex items-center px-6">
        <Link to="/" className="flex items-center gap-2"><span className="text-2xl">🎓</span><span className="font-display font-bold text-foreground">ShikshaGuruji</span></Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display font-bold text-3xl text-foreground mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div><label className="text-sm font-medium text-foreground block mb-1">Name</label><Input placeholder="Your name" /></div>
            <div><label className="text-sm font-medium text-foreground block mb-1">Email</label><Input type="email" placeholder="you@example.com" /></div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Subject</label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">
                <option>General</option><option>Technical</option><option>Billing</option><option>Partnership</option>
              </select>
            </div>
            <div><label className="text-sm font-medium text-foreground block mb-1">Message</label><textarea className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground resize-none" placeholder="Your message..." /></div>
            <Button className="w-full">Send Message</Button>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-3"><MessageSquare className="w-5 h-5 text-success mt-0.5" /><div><p className="font-medium text-foreground">WhatsApp</p><p className="text-sm text-muted-foreground">Chat on WhatsApp</p></div></div>
            <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-primary mt-0.5" /><div><p className="font-medium text-foreground">Email</p><p className="text-sm text-muted-foreground">support@shikshaguruji.com</p></div></div>
            <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-destructive mt-0.5" /><div><p className="font-medium text-foreground">Location</p><p className="text-sm text-muted-foreground">Kota, Rajasthan, India</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
