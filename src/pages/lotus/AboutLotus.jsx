export default function AboutLotus() {
  return (
    <div className="bg-[#FAF9F6] pt-[88px] md:pt-[112px] px-6 md:px-10 pb-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="border-t border-black/10 pt-6 flex justify-between mono text-[10px] uppercase tracking-widest opacity-40">
          <span>Index — 03 / About — Since 2019</span><span>Bhiwandi, Maharashtra • 19°17'N 73°04'E</span>
        </div>

        <h1 className="mt-12 syne text-[13vw] md:text-[7vw] leading-[0.8] font-bold tracking-tighter">WE EMERGED<br />AS ONE OF THE<br /><span className="serif italic font-light">LARGEST FABRICATORS</span></h1>

        <div className="mt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <div className="aspect-[4/3] rounded-[12px] overflow-hidden bg-[#EDE9E3] border border-black/5">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200" alt="Factory" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="mono text-[10px] uppercase tracking-[0.2em] opacity-40 mb-4">About Our Company</div>
            <p className="text-[20px] md:text-[24px] leading-[1.3] tracking-tight font-medium">We are committed to provide wide range of EPE foams, Cross linked Foam, Honeycomb and their products of superior quality at competitive prices for packaging needs.</p>
            <p className="mt-6 text-[14px] leading-[1.6] opacity-70">We tie up with renowned company which is ISO 9001 certified and well-established foam manufacturing company which have a plant. Factory premises comprising more than 1.5 lakhs sqft built-up area situated as per international standards. Installed high-end quality machines that gives world-class output of cushion packaging materials.</p>

            <div className="mt-10 grid grid-cols-3 border border-black/10 rounded-[12px] overflow-hidden">
              {[
                ["1.5L", "Sqft Built-up\nAs per intl standards"],
                ["ISO 9001", "Certified\nManufacturing"],
                ["High-end", "Machines\nWorld-class output"],
              ].map(([n,l])=>(
                <div key={n} className="p-5 border-r last:border-r-0 border-black/10">
                  <div className="syne text-xl font-bold">{n}</div>
                  <div className="mono text-[9px] uppercase leading-[1.3] whitespace-pre opacity-60 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-black/10 pt-12 grid md:grid-cols-3 gap-12">
          <div>
            <div className="mono text-[10px] uppercase opacity-40">01 / Culture and Values</div>
            <h3 className="mt-4 syne text-2xl font-bold leading-tight">Through commitment to quality, innovation and environment.</h3>
            <p className="mt-3 text-[13px] leading-[1.6] opacity-60">We provide one of the most dynamic and advanced technology bases within industry. Quality first, innovation always.</p>
          </div>
          <div>
            <div className="mono text-[10px] uppercase opacity-40">02 / Unique Framework</div>
            <h3 className="mt-4 syne text-2xl font-bold leading-tight">Purpose drives vision, vision drives strategy.</h3>
            <p className="mt-3 text-[13px] leading-[1.6] opacity-60">We execute through operating framework in line with culture and values. Gorakhdhandha is our unique operating system.</p>
          </div>
          <div>
            <div className="mono text-[10px] uppercase opacity-40">03 / Future Packaging</div>
            <h3 className="mt-4 syne text-2xl font-bold leading-tight">Sustainable & innovative for circular economy.</h3>
            <p className="mt-3 text-[13px] leading-[1.6] opacity-60">Join packaging powerhouse and create solutions for better tomorrow. Recycling, eco-friendly, high resistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
