import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactLotus() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", product: "EPE Foam", l: "", w: "", h: "", message: "" });

  return (
    <div className="bg-[#FAF9F6] pt-[88px] md:pt-[112px] px-6 md:px-10 pb-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="border-t border-black/10 pt-6 flex justify-between mono text-[10px] uppercase opacity-40">
          <span>Index — 04 / Contact — Get Custom Sample in 48HR</span><span className="hidden md:block">Response Time — 2 Hours • No Spam</span>
        </div>

        <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <h1 className="syne text-[12vw] md:text-[6vw] leading-[0.8] font-bold tracking-tighter">REQUEST<br />CUSTOM<br />SAMPLE</h1>
            <p className="mt-6 text-[16px] leading-[1.5] max-w-[400px]">Send product dimensions + photo. We will CAD design foam cavity with zero movement and ship sample within 48 hours.</p>

            <div className="mt-12 space-y-6 mono text-[11px]">
              <div className="flex gap-4"><span className="opacity-40 w-16">EMAIL</span><span className="font-bold">sales@lotusinternational.co.in</span></div>
              <div className="flex gap-4"><span className="opacity-40 w-16">PHONE</span><span className="font-bold">+91 9322021868 • Mon—Sat 10am—7pm</span></div>
              <div className="flex gap-4"><span className="opacity-40 w-16">FACTORY</span><span className="font-bold leading-relaxed">Jai Jalram Complex, Gala No 11/6-1, Pimplas, Bhiwandi - 421305, Thane, MH<br /><span className="opacity-60">1.5 Lakh sqft • ISO 9001 • High-end machines</span></span></div>
            </div>

            <div className="mt-12 p-5 rounded-[12px] bg-black text-white">
              <div className="mono text-[10px] uppercase tracking-widest opacity-40">Process — 4 Steps</div>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                {[
                  ["01", "Send\nDetails"],
                  ["02", "CAD\nDesign"],
                  ["03", "Sample\nApproval"],
                  ["04", "Bulk\nProduction"],
                ].map(([n, l]) => (
                  <div key={n}><div className="w-8 h-8 rounded-full bg-white text-black grid place-items-center mx-auto font-bold text-xs">{n}</div><div className="mono text-[9px] uppercase whitespace-pre mt-2 leading-tight">{l}</div></div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[16px] bg-white border border-black/10 p-6 md:p-8">
            {!sent ? (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="mono text-[10px] uppercase opacity-50">Your Name *</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-2 w-full border-b border-black/20 py-3 outline-none focus:border-black transition bg-transparent" placeholder="Full Name" required /></div>
                  <div><label className="mono text-[10px] uppercase opacity-50">Company</label><input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} className="mt-2 w-full border-b border-black/20 py-3 outline-none focus:border-black transition bg-transparent" placeholder="Company Pvt Ltd" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="mono text-[10px] uppercase opacity-50">Phone *</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-2 w-full border-b border-black/20 py-3 outline-none focus:border-black transition bg-transparent" placeholder="+91 98765 43210" required /></div>
                  <div><label className="mono text-[10px] uppercase opacity-50">Email *</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" className="mt-2 w-full border-b border-black/20 py-3 outline-none focus:border-black transition bg-transparent" placeholder="you@company.com" required /></div>
                </div>
                <div className="grid md:grid-cols-[1fr_1fr_1fr_1fr] gap-6">
                  <div>
                    <label className="mono text-[10px] uppercase opacity-50">Product</label>
                    <select value={form.product} onChange={e=>setForm({...form,product:e.target.value})} className="mt-2 w-full border-b border-black/20 py-3 outline-none focus:border-black bg-transparent">
                      <option>EPE Foam</option><option>EP Foam</option><option>Cross Linked</option><option>Bubble Bags</option><option>Custom Fitment</option><option>Honeycomb</option>
                    </select>
                  </div>
                  <div><label className="mono text-[10px] uppercase opacity-50">Length (mm)</label><input value={form.l} onChange={e=>setForm({...form,l:e.target.value})} className="mt-2 w-full border-b border-black/20 py-3 outline-none focus:border-black bg-transparent" placeholder="320" /></div>
                  <div><label className="mono text-[10px] uppercase opacity-50">Width (mm)</label><input value={form.w} onChange={e=>setForm({...form,w:e.target.value})} className="mt-2 w-full border-b border-black/20 py-3 outline-none focus:border-black bg-transparent" placeholder="200" /></div>
                  <div><label className="mono text-[10px] uppercase opacity-50">Height (mm)</label><input value={form.h} onChange={e=>setForm({...form,h:e.target.value})} className="mt-2 w-full border-b border-black/20 py-3 outline-none focus:border-black bg-transparent" placeholder="150" /></div>
                </div>
                <div>
                  <label className="mono text-[10px] uppercase opacity-50">Product Details - Fragile Level, Quantity, Special Requirements *</label>
                  <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={4} className="mt-2 w-full border-b border-black/20 py-3 outline-none focus:border-black bg-transparent resize-none" placeholder="Ex: Electronic device 20x15x10 cm, 500 pcs/month, very fragile, need 30mm EPE foam with cavity, drop test 1.2m, need black foam..." required />
                </div>
                <button type="submit" className="w-full bg-black text-white rounded-full py-4 font-bold text-[13px] tracking-wide hover:bg-zinc-900 transition">Send Enquiry — Get Sample in 48HR →</button>
                <p className="mono text-[9px] uppercase opacity-40 text-center">We respond within 2 hours • Sample free if bulk order confirmed • Mon—Sat 10am—7pm</p>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-black text-white grid place-items-center mx-auto">✓</div>
                <h3 className="mt-6 syne text-3xl font-bold">Enquiry Sent</h3>
                <p className="mt-3 text-sm opacity-60 max-w-[360px] mx-auto">Thank you! Our team will call within 2 hours. Sample will be ready in 48 hours. Check WhatsApp: +91 9322021868</p>
                <button onClick={()=>setSent(false)} className="mt-6 text-xs border border-black/10 px-4 py-2 rounded-full">Send Another</button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
