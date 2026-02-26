"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import aboutData from "./data.json";

interface AccordionItemData {
  question: string;
  answer: React.ReactNode;
  img?: string;
}

interface Section {
  id: string;
  index: string;
  title: string;
  items: AccordionItemData[];
}



function SideNav({
  sections,
  activeId,
  onNavigate,
}: {
  sections: Section[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav className="sticky top-24 self-start hidden lg:flex flex-col py-16">
      {/* vertical accent line */}
      <span className="absolute left-0 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-[#5b8fff55] to-transparent" />

      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className="group relative flex items-center gap-3 py-3 pl-6 text-left transition-all duration-200"
          >
            {/* active indicator */}
            <span
              className={`absolute left-[-1px] top-1/2 -translate-y-1/2 w-[2px] rounded-sm bg-[#5b8fff] transition-all duration-250 ${isActive ? "h-[60%] opacity-100" : "h-0 opacity-0 group-hover:h-[40%] group-hover:opacity-60"
                }`}
            />
            <span
              className={`f text-md tracking-widest transition-colors duration-200 ${isActive ? "text-brand-navy" : "text-[#4a5568] group-hover:text-brand-navy"
                }`}
            >
              {section.index}
            </span>
            <span
              className={`text-sm tracking-wide transition-colors duration-200 ${isActive ? "text-brand-navy" : "text-gary-400 group-hover:text-brand-navy"
                }`}
            >
              {section.title}
            </span>

          </button>
        );
      })}
    </nav>
  );
}


function DocSection({ section }: { section: Section }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={section.id}
      ref={ref}
      className="mb-20 scroll-mt-24 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <span
          className="f text-md tracking-widest text-brand-navy border border-[#5b8fff33] bg-[#5b8fff15] px-2 py-0.5 rounded-sm"
        >
          {section.index}
        </span>
        <h2 className="font-['DM_Serif_Display',serif] text-2xl font-normal italic text-brand-navy tracking-tight">
          {section.title}
        </h2>
        <span className="flex-1 h-px bg-[#ffffff0d]" />
      </div>

      {/* Accordion */}
      <Accordion type="multiple" className="space-y-0">
        {section.items.map((item, idx) => (
          <AccordionItem
            key={idx}
            value={`${section.id}-${idx}`}
            className="border-b border-[#ffffff0d] border-t-0 border-l-0 border-r-0"
          >
            <AccordionTrigger className="group flex items-center gap-4 py-5 text-left hover:no-underline [&>svg]:ml-auto [&>svg]:text-[#4a5568] [&[data-state=open]>svg]:text-brand-navy">
              <span
                className="f text-base tracking-wider text-[#4a5568] min-w-[28px] transition-colors duration-200 group-hover:text-brand-navy group-[[data-state=open]]:text-brand-navy"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-md text-gary-400 transition-colors duration-200 group-hover:text-brand-navy group-[[data-state=open]]:text-brand-navy">
                {item.question}
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-5 pb-6 pl-10">
                {/* left gradient line */}
                <span className="w-px flex-shrink-0 self-stretch rounded bg-gradient-to-b from-[#5b8fff66] to-transparent" />

                <p className="text-md leading-relaxed text-gary-400 font-light">
                  {item.answer}
                </p>

                {/* Optional image */}
                {("img" in item) && item.img && (
                  <div className="mt-4">
                    <img
                      src={item.img}
                      alt="Demo guide"
                      className="w-50 max-w-full rounded border border-[#5b8fff33] shadow-sm"
                    />
                    <p className="mt-2 text-xs text-[#4a5568]">
                      As shown above: the centered part is applied to the snowboard texture.
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>

          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

// ─── Main client component ────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeId, setActiveId] = useState<string>(aboutData.sections[0].id);

  // Intersection observer → update activeId on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    aboutData.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-brand-yellow"
    >
      {/* Grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 "
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-[8vw]">
        <p
          className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-brand-navy"
          style={{ animation: "fadeUp 0.8s 0.2s ease both" }}
        >
          {aboutData.hero.tagline}
        </p>

        <p className="mt-10 max-w-xl text-gray-800 italic leading-relaxed text-sm md:text-sm lg:text-2xl font-[var(--font-dm-mono)]">
          {aboutData.hero.subtitle}
        </p>

        {/* Scroll hint */}
        <div
          className="absolute bottom-12 left-[8vw] flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-[#4a5568]"
          style={{ animation: "fadeUp 1s 0.8s ease both" }}
        >
          <span className="w-10 h-px bg-[#4a5568]" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <div
        className="relative grid grid-cols-2 border-y lg:grid-cols-4 border-transparent"
      >
        {aboutData.stats.map((stat, i) => (
          <div
            key={i}
            className="border-r px-[8vw] py-8 lg:px-8 border-transparent"
            style={{
              animation: `fadeUp 0.8s ${0.1 + i * 0.1}s ease both`,
            }}
          >
            <div
              className="text-brand-navy leading-none text-5xl"
            >
              {stat.value}
            </div>
            <div className="mt-1 text-[0.7rem] uppercase tracking-[0.15em] text-[#4a5568]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── MAIN CONTENT: sidebar + doc area ─────────────────────────────── */}
      <div className="relative mx-auto grid max-w-5xl grid-cols-1 px-6 lg:grid-cols-[200px_1fr] lg:px-8">
        {/* Left sticky nav */}
        <SideNav
          sections={aboutData.sections as Section[]}
          activeId={activeId}
          onNavigate={handleNavigate}
        />

        {/* Right document content */}
        <main
          className="py-16 lg:border-l lg:pl-12 "
        >
          {(aboutData.sections as Section[]).map((section) => (
            <DocSection key={section.id} section={section} />
          ))}
        </main>
      </div>

    </div>
  );
}