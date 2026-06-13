import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const translations = [
    {
      compositionId: 'kanaka-list-6',
      english: `Refrain:
O Hari, open the door and grant me the opportunity to serve You.
O Narahari, did You not hear my voice even though I called out to You?

Stanza 1:
When You were in the supreme abode, resting on the serpent bed (Adisesha)
In the ocean of milk along with Goddess Lakshmi (Siri),
When the King of Elephants (Gajendra) in great distress called out 'O Primordial Root' (Adimoola),
You arrived instantly to rescue him, O Narahari!

Stanza 2:
When the wicked one (Hiranyakashipu) in extreme anger held a sword in his hand
And struck the pillar asking, 'Where is your Lord?',
When the child (Prahlada) with firm devotion worshipped You without ceasing,
You emerged joyfully from the pillar, O Narahari!

Stanza 3:
You granted endless robes to the queen of the son of Yama (Draupadi),
You protected Ajamila at the right moment.
Is there a right or wrong time for You, who are the lover of Your devotees?
O Lotus-eyed one, the Adikeshava of Kaginele!`
    },
    {
      compositionId: 'kanaka-list-22',
      english: `Refrain:
I am saved, I am saved! The cycle of worldly existence (samsara) has ceased for me.
I have attained the love and grace of the lotus-navelled Lord Padmanabha's feet.

Stanza 1:
The sacred water (tirtha) and offerings (prasada) of Lord Hari have reached my tongue.
The nectar of Hari's name has reached my ears.
The devotees of Hari have become my kin and kinsmen.
The sacred seal (mudra) of Hari has become my ornament.

Stanza 2:
One hundred and one generations of my lineage have attained liberation (mukti).
I have become worthy of the path to salvation.
My mind has grown in devotion to the stainless Sri Hari,
And the Lord of Rukmini (Krishna) has come under my sway (is won over by my devotion).

Stanza 3:
Today, my life has attained all forms of wealth.
Henceforth, my birth has become fruitful and fulfilled.
The father, Lord Adikeshava of Kaginele,
Has come and taken a permanent seat within my heart.`
    }
  ];

  for (const trans of translations) {
    await prisma.translation.create({
      data: { 
        compositionId: trans.compositionId,
        english: trans.english,
        kannadaMeaning: "",
        wordByWord: ""
      }
    });
    console.log('Successfully created translation for:', trans.compositionId);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
