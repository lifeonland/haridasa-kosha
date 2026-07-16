const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const kannadaMeaning = `ಪಲ್ಲವಿ:
ಬಾರೋ ರಂಗ, ನಾವು ಯಮುನಾ ನದಿಯ ದಡದಲ್ಲಿ ಒಟ್ಟಾಗಿ ಆಟವಾಡಲು ಹೋಗೋಣ.

ಚರಣ ೧:
ಚಿನ್ನಿದಾಂಡು, ಚೆಂಡು, ಬುಗುರಿ ಮುಂತಾದ ಸಣ್ಣ ಸಣ್ಣ ಆಟಗಳನ್ನೂ, ಕಣ್ಣಾಮುಚ್ಚಾಲೆ, ಕುಂಟೆಬಿಲ್ಲೆಯಂತಹ ವಿವಿಧ ಬಗೆಯ ಬಣ್ಣ ಬಣ್ಣದ ಆಟಗಳನ್ನು ಆಡೋಣ.

ಚರಣ ೨:
ಜಾಹ್ನವಿ (ಗಂಗಾ) ನದಿಯ ದಡದಲ್ಲಿ, ಜನಕರಾಜನ ಮಗಳಾದ ಜಾನಕಿಯ (ಸೀತೆಯ) ವಿವಾಹ ನಡೆಯುತ್ತಿದೆಯಂತೆ; ಎಲೋ ಜಾಣನೆ, ನೀನು ಅಲ್ಲಿಗೆ ಬರಬೇಕಂತೆ.

ಚರಣ ೩:
ಕುಂಡಿನಪುರ ನಗರದಲ್ಲಿ, ಭೀಷ್ಮಕರಾಜನ ಮಗಳಾದ ರುಕ್ಮಿಣಿಯು ಶಿಶುಪಾಲನನ್ನು ವರಿಸಲು ಒಪ್ಪದೆ, ನಿನಗೆ ಓಲೆ (ಪತ್ರ) ಬರೆದಿದ್ದಾಳಂತೆ.

ಚರಣ ೪:
ಕೌರವರು ಮತ್ತು ಪಾಂಡವರು ಪಗಡೆಯಾಟವಾಡಿ ಸೋತಿದ್ದಾರಂತೆ, ಮತ್ತು ತಮ್ಮ ರಾಜ್ಯವನ್ನೇ ಕಳೆದುಕೊಂಡಿದ್ದಾರಂತೆ; ಹೇ ರಂಗವಿಠಲ, ನೀನು ಅಲ್ಲಿಗೂ ಬರಬೇಕಂತೆ.`;

async function main() {
  await prisma.translation.updateMany({
    where: { compositionId: 'sr-11' },
    data: { kannadaMeaning }
  });
  console.log('Updated sr-11 translation in database');
}
main().catch(console.error).finally(() => prisma.$disconnect());
