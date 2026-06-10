import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { ArrowRight, BookOpen, Music, Users } from "lucide-react";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background pb-20 selection:bg-primary/20 selection:text-primary">
      <Section spacing="lg" className="bg-secondary/30 border-b border-border/50">
        <Container>
          <Typography variant="small" className="text-primary mb-4">Documentation</Typography>
          <Typography variant="h1" className="mb-6">The Archival <br/>Design System.</Typography>
          <Typography variant="lead" className="max-w-2xl mb-12 not-italic">
            Establishing a prestigious visual language for the digital preservation of the Haridasa tradition.
          </Typography>
          <div className="flex gap-4">
            <Button variant="premium" size="lg">Explore Components</Button>
            <Button variant="outline" size="lg">The Methodology</Button>
          </div>
        </Container>
      </Section>

      <Container className="mt-20">
        <div className="space-y-32">
          {/* Colors */}
          <section>
            <Typography variant="h2" className="mb-10">Archival Palette</Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Deep Charcoal", hex: "#1F1F23", class: "bg-foreground text-background" },
                { name: "Archival Purple", hex: "#663399", class: "bg-primary text-white" },
                { name: "Lavender Tint", hex: "#F5F3FF", class: "bg-secondary text-primary" },
              ].map((color) => (
                <div key={color.name} className="space-y-4">
                  <div className={`h-40 rounded-3xl ${color.class}`} />
                  <div>
                    <Typography variant="h4" className="s tracking-widest">{color.name}</Typography>
                    <Typography variant="muted">{color.hex}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section>
            <Typography variant="h2" className="mb-10">The Scholarly Scale</Typography>
            <div className="space-y-12 bg-white p-16 rounded-[2rem] border border-border/60">
              <div className="space-y-4">
                <Typography variant="small">H1 Heritage Display</Typography>
                <Typography variant="h1">The Masters of Melodic Devotion.</Typography>
              </div>
              <div className="space-y-4">
                <Typography variant="small">H2 Collection Heading</Typography>
                <Typography variant="h2">Philosophical Dimensions of the Dvaita Tradition.</Typography>
              </div>
              <div className="space-y-4">
                <Typography variant="small">H3 Entry Title</Typography>
                <Typography variant="h3">Purandara Dasaru: The Father of Carnatic Music.</Typography>
              </div>
              <div className="space-y-4">
                <Typography variant="small">Body Manuscript</Typography>
                <Typography variant="p">
                  The Haridasa tradition is a spiritual and cultural movement that originated in the 13th century in Karnataka, India. It represents a profound shift in devotional literature and musical composition.
                </Typography>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section>
            <Typography variant="h2" className="mb-10">Interactive Primitives</Typography>
            <div className="flex flex-wrap gap-8 items-center bg-secondary/20 p-16 rounded-[2rem] border border-primary/5">
              <Button variant="premium">Enter Archive</Button>
              <Button variant="outline">Learn More</Button>
              <Button variant="archival">Scholarly Record</Button>
              <Button variant="ghost">Secondary Action</Button>
              <Button variant="link" className="px-0">Patronage Program &rarr;</Button>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
