import { prisma } from './prisma';

export async function getDailyComposition() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let daily = await prisma.dailyComposition.findUnique({
    where: { date: today },
    include: { composition: { include: { composer: true } } },
  });

  if (!daily) {
    // Basic selection: Pick a random composition
    const count = await prisma.composition.count();
    const skip = Math.floor(Math.random() * count);
    const composition = await prisma.composition.findMany({
      take: 1,
      skip: skip,
    });

    daily = await prisma.dailyComposition.create({
      data: {
        date: today,
        compositionId: composition[0].id,
        commentary: JSON.stringify({
          simple: 'A simple meaning.',
          philosophical: 'A philosophical reflection.',
          practical: 'A practical lesson.'
        }),
      },
      include: { composition: { include: { composer: true } } },
    });
  }

  return daily;
}
