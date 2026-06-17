import sharp from 'sharp';
import path from 'path';

const input = path.join(process.cwd(), 'public', 'assets', 'helavanakatte-giriyamma.jpg');
const output = path.join(process.cwd(), 'public', 'assets', 'webp', 'helavanakatte-giriyamma.webp');

async function convert() {
    await sharp(input).webp({ quality: 80 }).toFile(output);
    console.log('Conversion successful!');
}

convert();
