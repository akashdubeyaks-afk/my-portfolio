import { motion } from "framer-motion";
import { Factory, Award, Users, Recycle, Target, Eye, Heart } from "lucide-react";

export default function AboutLotus() {
  return (
    <div className="bg-[#FFFEFB] pt-28 md:pt-32">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="inline-flex px-4 py-2 rounded-full bg-black/[0.04] border border-black/[0.06] text-[10px] tracking-[0.2em] uppercase">About Lotus International • Since 2019</div>
        <h1 className="mt-6 text-[12vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter" style={{ fontFamily: 'Syne' }}>WE EMERGED AS<br /><span className="text-[#7E22CE]">ONE OF THE LARGEST</span><br />FABRICATOR & EXPORTER</h1>
        <p className="mt-6 max-w-[600px] text-black/60 leading-relaxed">We are committed to provide wide range of EPE foams, Cross linked Foam, Honeycomb and their products of superior quality at competitive prices for packaging needs. We tie up with ISO 9001 certified manufacturing company with 1.5 lakhs sqft plant, high-end quality machines giving world-class output.</p>
      </div>

      <div className="mt-16 px-6 md:px-10 max-w-[1600px] mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div className="rounded-[24px] overflow-hidden aspect-[4/3] bg-[#F5F3FF]">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" alt="Factory" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-10">
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4">Our Culture and Values</h3>
            <p className="text-2xl md:text-3xl font-black leading-[0.9] tracking-tight">Through commitment to quality, innovation and environment, we provide most dynamic and advanced technology base.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              [Factory, "1.5 Lakh", "Sqft Plant"],
              [Award, "ISO 9001", "Certified"],
              [Users, "1000+", "Clients"],
            ].map(([Icon, n, l]) => (
              <div key={l} className="text-center p-4 rounded-[16px] bg-white border border-black/5">
                <Icon size={20} className="mx-auto text-[#7E22CE]" /><div className="mt-2 font-black text-xl">{n}</div><div className="text-[10px] uppercase tracking-widest opacity-50">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 px-6 md:px-10 max-w-[1600px] mx-auto grid md:grid-cols-3 gap-6">
        {[
          { icon: Target, title: "Our Purpose", desc: "To protect every product as carefully as a lotus protects its petals, ensuring safe delivery with zero damage." },
          { icon: Eye, title: "Our Vision", desc: "To be India's most trusted custom foam packaging partner with sustainable solutions." },
          { icon: Heart, title: "Our Values", desc: "Quality first, innovation always, environment friendly, customer happiness without problems." },
        ].map((v) => (
          <div key={v.title} className="rounded-[20px] bg-white border border-black/5 p-8">
            <v.icon size={24} className="text-[#7E22CE]" />
            <h4 className="mt-4 font-black text-xl tracking-tight">{v.title}</h4>
            <p className="mt-3 text-sm text-black/60 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 mx-6 md:mx-10 rounded-[24px] bg-[#1A1A1A] text-white p-8 md:p-12">
        <h3 className="text-[10px] tracking-[0.3em] uppercase opacity-40">Gorakhdhandha - Our Unique Framework</h3>
        <p className="mt-4 text-2xl md:text-4xl font-black leading-[0.9] tracking-tight max-w-[800px]">Our purpose drives our vision and provides context for our strategy, which we then execute through our operating framework, in line with our culture and values.</p>
      </div>

      <div className="h-10" />
    </div>
  );
}
