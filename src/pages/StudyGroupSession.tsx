import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, Hand, PhoneOff } from "lucide-react";
import { useState } from "react";

export default function StudyGroupSession() {
  const { groupId } = useParams();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  const participants = [
    { name: "Arjun (You)", initials: "AK", speaking: false },
    { name: "Sneha", initials: "SS", speaking: true },
    { name: "Priya", initials: "PG", speaking: false },
    { name: "Dev", initials: "DS", speaking: false },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#0A0F1E]">
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link to="/study-groups" className="text-white/60 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <span className="font-display font-semibold text-white">Science Toppers 🔬</span>
          <Badge className="bg-success/20 text-success border-0 text-xs">● Live</Badge>
        </div>
        <p className="text-sm text-white/60">4 participants · 12:34 elapsed</p>
      </header>

      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-2 gap-4">
          {participants.map((p, i) => (
            <div key={i} className={`rounded-xl bg-white/5 border ${p.speaking ? "border-success" : "border-white/10"} flex items-center justify-center relative`}>
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-display font-bold text-2xl text-primary">{p.initials}</span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="text-sm text-white font-medium">{p.name}</span>
                {p.speaking && <span className="text-xs text-success">🎤 Speaking</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Whiteboard Area */}
        <div className="hidden lg:flex flex-col w-96 border-l border-white/10">
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-sm text-white font-medium">📝 Shared Whiteboard</span>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white text-xs">Clear</Button>
          </div>
          <div className="flex-1 bg-white rounded-lg m-3 p-4">
            <p className="text-muted-foreground text-sm italic">Whiteboard area — draw and explain concepts together</p>
            <div className="mt-4 space-y-2 text-sm text-foreground">
              <p className="font-display font-semibold">States of Matter</p>
              <p>Solid → Liquid → Gas</p>
              <p className="font-mono text-xs mt-2">ΔH = mL (Latent heat formula)</p>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        {chatOpen && (
          <div className="w-80 border-l border-white/10 flex flex-col">
            <div className="p-3 border-b border-white/10">
              <span className="text-sm text-white font-medium">Chat</span>
            </div>
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              <div><span className="text-xs text-primary">Sneha:</span><p className="text-sm text-white/80">Can someone explain latent heat?</p></div>
              <div><span className="text-xs text-accent">Arjun:</span><p className="text-sm text-white/80">It's the heat absorbed without temperature change during phase transition</p></div>
            </div>
            <div className="p-3 border-t border-white/10">
              <input className="w-full bg-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none placeholder:text-white/40" placeholder="Type a message..." />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 py-4 border-t border-white/10">
        <Button variant="ghost" size="sm" className={`rounded-full w-12 h-12 ${micOn ? "bg-white/10 text-white" : "bg-destructive text-white"}`} onClick={() => setMicOn(!micOn)}>
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </Button>
        <Button variant="ghost" size="sm" className={`rounded-full w-12 h-12 ${videoOn ? "bg-white/10 text-white" : "bg-destructive text-white"}`} onClick={() => setVideoOn(!videoOn)}>
          {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full w-12 h-12 bg-white/10 text-white"><Monitor className="w-5 h-5" /></Button>
        <Button variant="ghost" size="sm" className="rounded-full w-12 h-12 bg-white/10 text-white"><Hand className="w-5 h-5" /></Button>
        <Button variant="ghost" size="sm" className={`rounded-full w-12 h-12 ${chatOpen ? "bg-primary text-white" : "bg-white/10 text-white"}`} onClick={() => setChatOpen(!chatOpen)}>
          <MessageSquare className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full w-12 h-12 bg-destructive text-white"><PhoneOff className="w-5 h-5" /></Button>
      </div>
    </div>
  );
}
