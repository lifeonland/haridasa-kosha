'use client';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export default function DailySection() {
  const [daily, setDaily] = useState<any>(null);

  useEffect(() => {
    fetch('/api/daily-composition')
      .then(res => res.json())
      .then(data => setDaily(data));
  }, []);

  if (!daily) return <Typography variant="muted" className="p-10 border border-border rounded-3xl bg-white">Loading...</Typography>;
  
  if (!daily.composition) return <Typography variant="muted" className="p-10 border border-border rounded-3xl bg-white">No composition available</Typography>;
  
  let commentary = { simple: "" };
  if (daily.commentary) {
    try {
      commentary = typeof daily.commentary === 'string' ? JSON.parse(daily.commentary) : daily.commentary;
    } catch (e) {
      commentary = { simple: "" };
    }
  }

  return (
    <Card className="p-0 border-border overflow-hidden rounded-3xl shadow-sm">
      <CardHeader className="p-8 flex flex-col md:flex-row justify-between items-start gap-6 border-b border-border bg-white">
        <div className="space-y-2 flex-1">
          <Typography variant="small" className="text-primary  tracking-widest font-bold">Dasarapada of the Day</Typography>
          <Typography variant="h2" className="text-foreground leading-tight s">{daily.composition.title}</Typography>
          <Typography variant="lead" className="italic font-medium s">By {daily.composition.composer.name}</Typography>
        </div>
        <div className="text-right flex flex-col items-end shrink-0">
          <Typography variant="large" className="text-primary  tracking-wider">{daily.composition.ankita?.name}</Typography>
          <Typography variant="muted" className="mt-1">{daily.composition.deity?.name}</Typography>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 bg-background">
        <div className="space-y-8">
          <div className="space-y-3">
            <Typography variant="small" className="text-primary  tracking-wider font-bold">Meaning & Commentary</Typography>
            <Typography variant="p" className="s leading-relaxed italic font-medium mt-0 text-foreground/90">
              "{commentary.simple}"
            </Typography>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="default" size="sm">Read Full Composition</Button>
            <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary">Listen to Audio</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
