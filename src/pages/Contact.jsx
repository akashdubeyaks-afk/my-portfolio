import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="pt-28 md:pt-32 px-6 md:px-10 pb-10 max-w-[1600px] mx-auto">
      <div className="grid md:grid-cols-[0.6fr_0.4fr] gap-12 md:gap-20">
        <div>
          <h1 className="text-[14vw] md:text-[8vw] leading-[0.82] font-black tracking-tighter">LET’S TALK<br /><span className="font-light italic">ABOUT YOUR</span><br />NEXT PROJECT</h1>
          <div className="mt-10 grid md:grid-cols-3 gap-6 text-sm">
            <div className="flex gap-3"><Mail size={16} className="opacity-40" /><div><div className="opacity-40 text-xs uppercase tracking-widest">Email</div><div className="font-bold mt-1">hello@folio.design</div></div></div>
            <div className="flex gap-3"><MapPin size={16} className="opacity-40" /><div><div className="opacity-40 text-xs uppercase tracking-widest">Location</div><div className="font-bold mt-1">Nashik, IN — Remote Worldwide</div></div></div>
            <div className="flex gap-3"><Clock size={16} className="opacity-40" /><div><div className="opacity-40 text-xs uppercase tracking-widest">Response</div><div className="font-bold mt-1">Within 2 hours</div></div></div>
          </div>

          <div className="mt-16 hidden md:block">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-30">Trusted by 100+ clients worldwide</div>
            <div className="mt-4 flex gap-8 opacity-20">
              <span className="text-xl font-black">AWWWWARDS</span><span className="text-xl font-black">FWA</span><span className="text-xl font-black">CSSDA</span>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] md:rounded-[32px] bg-white/[0.04] border border-white/[0.08] p-6 md:p-8 backdrop-blur">
          {!sent ? (
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="text-[10px] tracking-widest uppercase opacity-40">Your Name</label>
                <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Akash Dubey" className="mt-2 w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition placeholder:text-white/20" required />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase opacity-40">Email</label>
                <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="akash@company.com" type="email" className="mt-2 w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition placeholder:text-white/20" required />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase opacity-40">Project Details</label>
                <textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} placeholder="Tell me about your crazy idea..." rows={4} className="mt-2 w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition placeholder:text-white/20 resize-none" required />
              </div>
              <MagneticButton className="w-full">
                <button type="submit" className="w-full mt-4 bg-white text-black rounded-full py-4 font-bold flex items-center justify-center gap-2 hover:bg-zinc-100 transition">SEND MESSAGE <ArrowUpRight size={18} /></button>
              </MagneticButton>
              <p className="text-[10px] tracking-widest uppercase opacity-30 text-center">Average response — 2 hours • 2 spots left for Q1’26</p>
            </form>
          ) : (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#00FF94] text-black grid place-items-center mx-auto text-3xl">✓</div>
              <h3 className="mt-6 text-3xl font-black tracking-tighter">Message Sent!</h3>
              <p className="mt-2 text-white/50">I’ll get back to you within 2 hours. Let’s build something that shocks the web.</p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-16 md:mt-24 border-t border-white/10 pt-8 flex justify-between text-[10px] tracking-widest uppercase opacity-30">
        <span>©2026 Akash Dubey — Crafted with Motion + Lenis + Three.js</span><span>Nashik, IN — 19:21 IST</span>
      </div>
    </div>
  );
}
