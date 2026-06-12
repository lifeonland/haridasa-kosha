-- CreateTable
CREATE TABLE "Composer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "biography" TEXT,
    "imageUrl" TEXT,
    "ankitaId" TEXT NOT NULL,
    "timeline" TEXT,

    CONSTRAINT "Composer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Composition" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstLine" TEXT NOT NULL,
    "lyrics" TEXT NOT NULL,
    "transliteration" TEXT,
    "composerId" TEXT NOT NULL,
    "deityId" TEXT NOT NULL,
    "ankitaId" TEXT NOT NULL,
    "ragaId" TEXT,
    "talaId" TEXT,

    CONSTRAINT "Composition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raga" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Raga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tala" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ankita" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ankita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Deity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL,
    "compositionId" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "kannadaMeaning" TEXT NOT NULL,
    "wordByWord" TEXT NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioFile" (
    "id" TEXT NOT NULL,
    "compositionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "AudioFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyComposition" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "compositionId" TEXT NOT NULL,
    "commentary" TEXT NOT NULL,
    "isEditorial" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DailyComposition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStreak" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "lastDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStreak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reflection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "compositionId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reflection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompositionToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CompositionToTheme" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Raga_name_key" ON "Raga"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tala_name_key" ON "Tala"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ankita_name_key" ON "Ankita"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Deity_name_key" ON "Deity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DailyComposition_date_key" ON "DailyComposition"("date");

-- CreateIndex
CREATE UNIQUE INDEX "UserStreak_userId_key" ON "UserStreak"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_CompositionToTag_AB_unique" ON "_CompositionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_CompositionToTag_B_index" ON "_CompositionToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompositionToTheme_AB_unique" ON "_CompositionToTheme"("A", "B");

-- CreateIndex
CREATE INDEX "_CompositionToTheme_B_index" ON "_CompositionToTheme"("B");

-- AddForeignKey
ALTER TABLE "Composer" ADD CONSTRAINT "Composer_ankitaId_fkey" FOREIGN KEY ("ankitaId") REFERENCES "Ankita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_composerId_fkey" FOREIGN KEY ("composerId") REFERENCES "Composer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_deityId_fkey" FOREIGN KEY ("deityId") REFERENCES "Deity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_ankitaId_fkey" FOREIGN KEY ("ankitaId") REFERENCES "Ankita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_ragaId_fkey" FOREIGN KEY ("ragaId") REFERENCES "Raga"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_talaId_fkey" FOREIGN KEY ("talaId") REFERENCES "Tala"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "Composition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioFile" ADD CONSTRAINT "AudioFile_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "Composition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyComposition" ADD CONSTRAINT "DailyComposition_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "Composition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompositionToTag" ADD CONSTRAINT "_CompositionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Composition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompositionToTag" ADD CONSTRAINT "_CompositionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompositionToTheme" ADD CONSTRAINT "_CompositionToTheme_A_fkey" FOREIGN KEY ("A") REFERENCES "Composition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompositionToTheme" ADD CONSTRAINT "_CompositionToTheme_B_fkey" FOREIGN KEY ("B") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
