import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export default function CommunityPreservation() {
  return (
    <Section spacing="lg" className="bg-white border-t border-border/50">
      <Container size="md" className="text-center">
        <RevealOnScroll>
          <div className="space-y-12">
            <div className="space-y-4">
              <Typography variant="small" className="text-primary">Digital Guardianship</Typography>
              <Typography variant="h2" className="leading-tight tracking-tight">
                Patronage & The Art of <br/><span className="text-primary italic">Digital Preservation.</span>
              </Typography>
            </div>
            
            <Typography variant="lead" className="max-w-2xl mx-auto text-foreground/70 not-italic">
              Our mission is to ensure that the divine heritage of the Haridasas remains accessible for centuries to come. Your patronage supports the digitization of manuscripts and the maintenance of this scholarly archive.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button variant="premium" size="lg" className="min-w-[240px]">
                Become a Patron
              </Button>
              <Button variant="outline" size="lg" className="min-w-[240px]">
                Preservation Roadmap
              </Button>
            </div>

            <div className="pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-40 grayscale contrast-125">
              {['Manuscripts', 'Notations', 'Oral History', 'Translations'].map((item) => (
                <div key={item} className="text-[10px] font-bold  tracking-[0.4em] text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
