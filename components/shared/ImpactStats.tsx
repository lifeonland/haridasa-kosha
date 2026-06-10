'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

const AnimatedCounter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Typography variant="h1" className="s md:s font-serif text-primary/80 tracking-tighter">{value}</Typography>
      </motion.div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-[1px] bg-primary/20 mb-3"></div>
        <Typography variant="small" className="text-[10px] font-bold text-muted-foreground  tracking-[0.3em]">{label}</Typography>
      </div>
    </div>
  );
};

export default function ImpactStats() {
  const stats = [
    { label: 'Manuscripts', value: '10,000+' },
    { label: 'The Masters', value: '50+' },
    { label: 'The Scales', value: '200+' },
    { label: 'Interpretations', value: '1,000+' },
    { label: 'Thematic Wings', value: '25+' },
    { label: 'Dialogues', value: '8+' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16 py-12 border-y border-border/40">
      {stats.map((stat) => (
        <AnimatedCounter key={stat.label} {...stat} />
      ))}
    </div>
  );
}
