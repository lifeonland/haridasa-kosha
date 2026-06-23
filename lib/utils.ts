import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Master historical order for all 29 composers in the database
export const HISTORICAL_COMPOSER_ORDER = [
  'madhwacharya',
  'narahari-tirtha',
  'sripadaraja',
  'vyasatirtha',
  'vadiraja-tirtha',
  'purandara-dasa',
  'kanaka-dasa',
  'raghavendra-dasa',
  'mahipati-dasa',
  'prasanna-venkata-dasa',
  'vijaya-dasa',
  'gopala-dasa',
  'satyabodha-dasa',
  'jagannatha-dasaru',
  'mohana-dasa',
  'pranesha-dasaru',
  'subbanna-dasa',
  'helavanakatte-giriyamma',
  'srinivasa-dasa',
  'lakshmipati-dasa',
  'madhwapati-dasa',
  'venkatesha-dasa',
  'narahari-dasa',
  'govinda-dasa',
  'ugabhoga-narayana-dasa',
  'venugopala-dasa',
  'vishnu-dasa',
  'krishnapriya-dasa',
  'harapanahalli-bhimavva'
];

export function getComposerTranslationKey(id: string): string {
  const map: Record<string, string> = {
    'madhwacharya': 'madhwacharyaru',
    'narahari-tirtha': 'narahariTirtharu',
    'sripadaraja': 'sripadarajaru',
    'vyasatirtha': 'vyasatirthaName',
    'vadiraja-tirtha': 'vadirajaTirtharu',
    'purandara-dasa': 'purandaraDasaru',
    'kanaka-dasa': 'kanakaDasaru',
    'raghavendra-dasa': 'raghavendraDasaru',
    'mahipati-dasa': 'mahipatiDasaru',
    'prasanna-venkata-dasa': 'prasannaVenkataDasaru',
    'vijaya-dasa': 'vijayaDasaru',
    'gopala-dasa': 'gopalaDasaru',
    'satyabodha-dasa': 'satyabodhaDasaru',
    'jagannatha-dasaru': 'jagannathaDasaru',
    'mohana-dasa': 'mohanaDasaru',
    'pranesha-dasaru': 'praneshaDasaru',
    'subbanna-dasa': 'subbannaDasaru',
    'helavanakatte-giriyamma': 'helavanakatteGiriyamma',
    'srinivasa-dasa': 'srinivasaDasaru',
    'lakshmipati-dasa': 'lakshmipatiDasaru',
    'madhwapati-dasa': 'madhwapatiDasaru',
    'venkatesha-dasa': 'venkateshaDasaru',
    'narahari-dasa': 'narahariDasaru',
    'govinda-dasa': 'govindaDasaru',
    'ugabhoga-narayana-dasa': 'ugabhogaNarayanaDasaru',
    'venugopala-dasa': 'venugopalaDasaru',
    'vishnu-dasa': 'vishnuDasaru',
    'krishnapriya-dasa': 'krishnapriyaDasaru',
    'harapanahalli-bhimavva': 'harapanahalliBhimavva'
  };
  return map[id] || id;
}

export function getBioTranslationKey(id: string): string {
  const map: Record<string, string> = {
    'madhwacharya': 'madhwacharyaBio',
    'narahari-tirtha': 'narahariTirthaDesc',
    'sripadaraja': 'sripadarajaDesc',
    'vyasatirtha': 'vyasatirthaDesc',
    'vadiraja-tirtha': 'vadirajaTirthaDesc',
    'purandara-dasa': 'purandaraDasaDesc',
    'kanaka-dasa': 'kanakaDasaDesc',
    'raghavendra-dasa': 'raghavendraDasaDesc',
    'mahipati-dasa': 'mahipatiDasaDesc',
    'prasanna-venkata-dasa': 'prasannaVenkataDasaDesc',
    'vijaya-dasa': 'vijayaDasaDesc',
    'gopala-dasa': 'gopalaDasaDesc',
    'satyabodha-dasa': 'satyabodhaDasaDesc',
    'jagannatha-dasaru': 'jagannathaDasaDesc',
    'mohana-dasa': 'mohanaDasaDesc',
    'pranesha-dasaru': 'praneshaDasaDesc',
    'subbanna-dasa': 'subbannaDasaDesc',
    'helavanakatte-giriyamma': 'helavanakatteGiriyammaDesc',
    'srinivasa-dasa': 'srinivasaDasaDesc',
    'lakshmipati-dasa': 'lakshmipatiDasaDesc',
    'madhwapati-dasa': 'madhwapatiDasaDesc',
    'venkatesha-dasa': 'venkateshaDasaDesc',
    'narahari-dasa': 'narahariDasaDesc',
    'govinda-dasa': 'govindaDasaDesc',
    'ugabhoga-narayana-dasa': 'ugabhogaNarayanaDasaDesc',
    'venugopala-dasa': 'venugopalaDasaDesc',
    'vishnu-dasa': 'vishnuDasaDesc',
    'krishnapriya-dasa': 'krishnapriyaDasaDesc',
    'harapanahalli-bhimavva': 'harapanahalliBhimavvaDesc'
  };
  return map[id] || 'reveredHaridasa';
}

