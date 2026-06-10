'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

interface DailyWisdomCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function DailyWisdomCard({ title, className, children }: DailyWisdomCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`h-full ${className}`}
    >
      <Card className="h-full bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-6 h-full flex flex-col">
          <Typography variant="small" className="text-royal-indigo font-bold  tracking-widest mb-4">
            {title}
          </Typography>
          <div className="flex-1">{children}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
