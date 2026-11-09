export type Language = 'ar' | 'en';

export interface Product {
  id: string;
  num: number;
  categoryKey: string;
  categoryAr: string;
  categoryEn: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  detailsAr: string;
  detailsEn: string;
  image: string;
  priceBhd: number;
}

export interface Station {
  id: string;
  num: string;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descAr: string;
  descEn: string;
  featuresAr: string[];
  featuresEn: string[];
  imageDay: string;
  imageEvening?: string;
  interiorImage?: string;
  badgeAr: string;
  badgeEn: string;
}

export interface EventItem {
  id: string;
  titleAr: string;
  titleEn: string;
  timingAr: string;
  timingEn: string;
  descAr: string;
  descEn: string;
  detailAr: string;
  detailEn: string;
  image: string;
  isFlagship?: boolean;
  kind?: 'recurring' | 'winter' | 'annual';
  tagAr?: string;
  tagEn?: string;
}

export interface FaqItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface ServiceItem {
  id: string;
  num: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  iconName: string;
}

export interface SurveyVote {
  id: string;
  rating: number; // 1-5
  favoriteStation: string;
  supportConservation: 'yes' | 'maybe' | 'no';
  visitorType: string;
  feedback?: string;
  createdAt: string;
}

export interface ItineraryBooking {
  id: string;
  passNumber: string;
  visitorName: string;
  experienceType: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  hasPlanting: boolean;
  hasBinoculars: boolean;
  hasMajlisHospitality: boolean;
  totalBhd: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface GraduationDossierInfo {
  projectTitleAr: string;
  projectTitleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  studentName: string;
  supervisorName: string;
  universityName: string;
  collegeName: string;
  academicYear: string;
  abstractAr: string;
  abstractEn: string;
}
