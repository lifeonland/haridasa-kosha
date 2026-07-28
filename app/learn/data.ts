export interface LearningPath {
  id: string;
  title: { EN: string; KN: string };
  description: { EN: string; KN: string };
  duration: string;
  imageUrl: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: { EN: string; KN: string };
  description: { EN: string; KN: string };
  estimatedMinutes: number;
}

export const LEARNING_PATHS: Record<string, LearningPath> = {
  prathama: {
    id: 'prathama',
    title: { EN: 'Prathama (Beginner)', KN: 'ಪ್ರಥಮ (ಆರಂಭಿಕ)' },
    description: {
      EN: 'Begin your journey into Haridasa Sahitya. Learn the fundamental concepts, history, and the life of the Pitamaha of Carnatic music.',
      KN: 'ಹರಿದಾಸ ಸಾಹಿತ್ಯದತ್ತ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ. ಮೂಲಭೂತ ಪರಿಕಲ್ಪನೆಗಳು ಮತ್ತು ಇತಿಹಾಸವನ್ನು ಕಲಿಯಿರಿ.'
    },
    duration: '2 Hours',
    imageUrl: '/images/prathama_path.png',
    modules: [
      {
        id: 'life-of-purandaradasa',
        title: { EN: 'Life of Purandaradasa', KN: 'ಪುರಂದರದಾಸರ ಜೀವನ' },
        description: { EN: 'Explore the transformation of Srinivasa Nayaka into Purandaradasa.', KN: 'ಶ್ರೀನಿವಾಸ ನಾಯಕರು ಪುರಂದರದಾಸರಾಗಿ ಬದಲಾದ ಕಥೆ.' },
        estimatedMinutes: 30
      },
      {
        id: 'intro-to-dasa-koota',
        title: { EN: 'Introduction to Dasa Koota', KN: 'ದಾಸ ಕೂಟದ ಪರಿಚಯ' },
        description: { EN: 'Understand the origin and purpose of the Dasa Koota movement.', KN: 'ದಾಸ ಕೂಟ ಚಳುವಳಿಯ ಮೂಲ ಮತ್ತು ಉದ್ದೇಶವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.' },
        estimatedMinutes: 45
      },
      {
        id: 'basics-of-bhakti',
        title: { EN: 'Basics of Bhakti Movement', KN: 'ಭಕ್ತಿ ಚಳುವಳಿಯ ಮೂಲಭೂತ ಅಂಶಗಳು' },
        description: { EN: 'Learn how the Bhakti movement shaped Haridasa Sahitya.', KN: 'ಭಕ್ತಿ ಚಳುವಳಿಯು ಹರಿದಾಸ ಸಾಹಿತ್ಯವನ್ನು ಹೇಗೆ ರೂಪಿಸಿತು ಎಂಬುದನ್ನು ಕಲಿಯಿರಿ.' },
        estimatedMinutes: 45
      }
    ]
  },
  madhyama: {
    id: 'madhyama',
    title: { EN: 'Madhyama (Intermediate)', KN: 'ಮಧ್ಯಮ (ಮಧ್ಯಮ ಹಂತ)' },
    description: {
      EN: 'Deepen your knowledge with complex musical structures, comparative analysis of Kootas, and the life of Kanakadasa.',
      KN: 'ಸಂಕೀರ್ಣ ಸಂಗೀತ ರಚನೆಗಳು, ಕೂಟಗಳ ತುಲನಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಕನಕದಾಸರ ಜೀವನದೊಂದಿಗೆ ನಿಮ್ಮ ಜ್ಞಾನವನ್ನು ಹೆಚ್ಚಿಸಿ.'
    },
    duration: '3 Hours',
    imageUrl: '/images/madhyama_path.png',
    modules: [
      {
        id: 'life-of-kanakadasa',
        title: { EN: 'Life of Kanakadasa', KN: 'ಕನಕದಾಸರ ಜೀವನ' },
        description: { EN: 'Dive into the life and struggles of Kanakadasa and his devotion to Kaginele Adikeshava.', KN: 'ಕನಕದಾಸರ ಜೀವನ ಮತ್ತು ಹೋರಾಟಗಳನ್ನು ತಿಳಿಯಿರಿ.' },
        estimatedMinutes: 45
      },
      {
        id: 'ugabhoga-and-suladi',
        title: { EN: 'Ugabhoga and Suladi', KN: 'ಉಗಾಭೋಗ ಮತ್ತು ಸೂಳಾದಿ' },
        description: { EN: 'Master the unique musical formats of Ugabhoga and Suladi.', KN: 'ಉಗಾಭೋಗ ಮತ್ತು ಸೂಳಾದಿಯ ವಿಶಿಷ್ಟ ಸಂಗೀತ ಸ್ವರೂಪಗಳನ್ನು ಕರಗತ ಮಾಡಿಕೊಳ್ಳಿ.' },
        estimatedMinutes: 60
      },
      {
        id: 'dasa-vs-vyasa-koota',
        title: { EN: 'Dasa Koota vs Vyasa Koota', KN: 'ದಾಸ ಕೂಟ ಮತ್ತು ವ್ಯಾಸ ಕೂಟ' },
        description: { EN: 'Compare the two major sects of the Madhva tradition.', KN: 'ಮಧ್ವ ಸಂಪ್ರದಾಯದ ಎರಡು ಪ್ರಮುಖ ಪಂಥಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ.' },
        estimatedMinutes: 45
      }
    ]
  },
  vidwat: {
    id: 'vidwat',
    title: { EN: 'Vidwat (Advanced)', KN: 'ವಿದ್ವತ್ (ಉನ್ನತ ಹಂತ)' },
    description: {
      EN: 'Achieve mastery by studying advanced Dvaita philosophy embedded in the sahitya, complex metaphors, and magnum opuses.',
      KN: 'ಸಾಹಿತ್ಯದಲ್ಲಿ ಅಡಗಿರುವ ಉನ್ನತ ದ್ವೈತ ತತ್ವಶಾಸ್ತ್ರ, ಸಂಕೀರ್ಣ ರೂಪಕಗಳು ಮತ್ತು ಮಹಾನ್ ಕೃತಿಗಳನ್ನು ಅಧ್ಯಯನ ಮಾಡುವ ಮೂಲಕ ಪಾಂಡಿತ್ಯವನ್ನು ಸಾಧಿಸಿ.'
    },
    duration: '5 Hours',
    imageUrl: '/images/vidwat_path.png',
    modules: [
      {
        id: 'dvaita-philosophy',
        title: { EN: 'Dvaita Philosophy in Sahitya', KN: 'ಸಾಹಿತ್ಯದಲ್ಲಿ ದ್ವೈತ ತತ್ವಶಾಸ್ತ್ರ' },
        description: { EN: 'Analyze Madhvacharya\'s tenets as sung by the Haridasas.', KN: 'ಹರಿದಾಸರು ಹಾಡಿದ ಮಧ್ವಾಚಾರ್ಯರ ತತ್ವಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ.' },
        estimatedMinutes: 90
      },
      {
        id: 'harikathamrutasara',
        title: { EN: 'Harikathamrutasara', KN: 'ಹರಿಕಥಾಮೃತಸಾರ' },
        description: { EN: 'A deep dive into Jagannatha Dasa\'s magnum opus.', KN: 'ಜಗನ್ನಾಥ ದಾಸರ ಮಹಾನ್ ಕೃತಿಯ ಆಳವಾದ ಅಧ್ಯಯನ.' },
        estimatedMinutes: 120
      },
      {
        id: 'mundiges',
        title: { EN: 'Mundiges (Metaphors)', KN: 'ಮುಂಡಿಗೆಗಳು (ರೂಪಕಗಳು)' },
        description: { EN: 'Decode the secret, esoteric metaphors in Dasa Sahitya.', KN: 'ದಾಸ ಸಾಹಿತ್ಯದಲ್ಲಿನ ರಹಸ್ಯ ರೂಪಕಗಳನ್ನು ಡಿಕೋಡ್ ಮಾಡಿ.' },
        estimatedMinutes: 90
      }
    ]
  }
};
