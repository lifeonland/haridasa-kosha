import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public', 'assets');
const outputDir = path.join(process.cwd(), 'public', 'assets', 'webp');

async function convertImages() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));

    console.log(`Converting ${file} to WebP...`);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 }) // Adjust quality as needed
        .toFile(outputPath);
      console.log(`Converted ${file} to ${outputPath}`);
    } catch (error) {
      console.error(`Error converting ${file}:`, error);
    }
  }
}

convertImages().then(() => console.log('Conversion complete.'));
