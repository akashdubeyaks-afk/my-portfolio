import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import MagneticButton from "../../components/MagneticButton";

export default function ContactLotus() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", product: "EPE Foam", message: "" });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="bg-[#FFFEFB] pt-28 md:pt-32 px-6 md:px-10 pb-20">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
        <div>
          <h1 className="text-[12vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter" style={{ fontFamily: 'Syne' }}>LET’S TALK<br />PACKAGING</h1>
          <p className="mt-6 text-black/60 max-w-[400px]">Tell us your product size, fragile level, and quantity. We’ll design custom foam fitment and send sample within 48 hours.</p>

          <div className="mt-12 space-y-6">
            {[
              [Mail, "Email", "sales@lotusinternational.co.in", "Reply within 2 hours"],
              [Phone, "Phone", "+91 9322021868", "Mon - Sat, 10am - 7pm"],
              [MapPin, "Factory Address", "Jai Jalram Complex, Gala No 11/6-1, Pimplas, Bhiwandi - 421305, Thane, MH", "1.5 Lakh sqft plant"],
              [Clock, "Working Hours", "Mon - Sat, 10am - 7pm", "Sunday closed"],
            ].map(([Icon, label, value, sub]) => (
              <div key={label} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-black/[0.04] border border-black/[0.06] grid place-items-center"><Icon size={16} /></div>
                <div><div className="text-[10px] tracking-widest uppercase opacity-40">{label}</div><div className="font-bold mt-1">{value}</div><div className="text-xs opacity-50 mt-0.5">{sub}</div></div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-[16px] bg-[#7E22CE]/10 border border-[#7E22CE]/20">
            <div className="text-xs font-bold uppercase tracking-widest text-[#7E22CE]">Custom Shape Process</div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-[10px] text-center">
              {["Send Product", "CAD Design", "Sample Approval", "Bulk Production"].map((s, i) => (
                <div key={s}><div className="w-8 h-8 rounded-full bg-[#7E22CE] text-white grid place-items-center mx-auto font-bold">{i + 1}</div><div className="mt-2 font-bold leading-tight">{s}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[24px] bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          {!sent ? (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] tracking-widest uppercase opacity-50">Your Name*</label>
                  <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="mt-2 w-full border-b border-black/10 py-3 outline-none focus:border-[#7E22CE] transition" placeholder="Akash Dubey" required />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase opacity-50">Company Name</label>
                  <input value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} className="mt-2 w-full border-b border-black/10 py-3 outline-none focus:border-[#7E22CE] transition" placeholder="Your Company Pvt Ltd" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] tracking-widest uppercase opacity-50">Phone*</label>
                  <input value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="mt-2 w-full border-b border-black/10 py-3 outline-none focus:border-[#7E22CE] transition" placeholder="+91 98765 43210" required />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase opacity-50">Email*</label>
                  <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} type="email" className="mt-2 w-full border-b border-black/10 py-3 outline-none focus:border-[#7E22CE] transition" placeholder="sales@company.com" required />
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase opacity-50">Product Interested</label>
                <select value={form.product} onChange={(e)=>setForm({...form,product:e.target.value})} className="mt-2 w-full border-b border-black/10 py-3 outline-none focus:border-[#7E22CE] bg-transparent">
                  <option>EPE Foam</option><option>EP Foam</option><option>Cross Linked / EVA Foam</option><option>Air Bubble Bags</option><option>Custom Foam Fitments</option><option>Honeycomb Paper</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase opacity-50">Product Details - Size, Quantity, Fragile Level*</label>
                <textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} rows={4} className="mt-2 w-full border-b border-black/10 py-3 outline-none focus:border-[#7E22CE] transition resize-none" placeholder="Example: We have electronic device 20x15x10 cm, 500 pcs monthly, very fragile, need custom EPE foam cavity with 2 inch thickness..." required />
              </div>
              <MagneticButton className="w-full">
                <button type="submit" className="w-full bg-[#1A1A1A] text-white rounded-full py-4 font-bold flex items-center justify-center gap-2 hover:bg-black transition">Send Enquiry <ArrowUpRight size={18} /></button>
              </MagneticButton>
              <p className="text-[10px] tracking-widest uppercase opacity-40 text-center">We will respond within 2 hours • Sample in 48 hours • No spam</p>
            </form>
          ) : (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-[#00FF94] text-black grid place-items-center mx-auto text-3xl">✓</div>
              <h3 className="mt-6 text-3xl font-black tracking-tighter">Enquiry Sent!</h3>
              <p className="mt-2 text-black/60 max-w-[320px] mx-auto">Thank you! Our team will call you within 2 hours. Custom sample will be ready in 48 hours.</p>
              <button onClick={()=>setSent(false)} className="mt-6 px-6 py-2 rounded-full bg-black/5 text-sm">Send Another</button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
