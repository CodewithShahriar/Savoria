'use client';

import React from 'react';
import { Star, Quote, Award } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Elena Rostova',
    title: 'Senior Culinary Critic, Haute Gastronomy Review',
    rating: 5,
    quote:
      'Savoria has redefined modern luxury dining. The Prime Dry-Aged Ribeye paired with their Butter-Poached Maine Lobster is culinary wizardry. And having live cyber order telemetry right to your door is breathtaking.',
  },
  {
    name: 'Marcus Sterling',
    title: 'Tech Founder & Gastronomy Enthusiast',
    rating: 5,
    quote:
      'The website experience matches the futuristic feel of their restaurant. The online ordering is lightning fast, checkout was effortless, and I could literally monitor real-time kitchen preparation status live!',
  },
  {
    name: 'Chef Jean-Luc Moreau',
    title: 'Michelin-Trained Culinary Consultant',
    rating: 5,
    quote:
      'The 45-day dry-aged Black Angus Ribeye has an exquisite charcoal sear with bone marrow butter that rivals the finest Parisian steak institutions. 10/10 perfection.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#080c14] border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>CRITIC ACCLAIM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            What World Gastronomy Critics Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col justify-between space-y-6 relative hover:border-amber-500/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-amber-500/30 absolute top-6 right-6" />
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                <p className="text-[11px] font-mono text-cyan-400">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
