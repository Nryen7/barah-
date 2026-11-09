export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  audioUrl?: string;
  isAudioLoading?: boolean;
  suggestions?: string[];
  reaction?: 'like' | 'dislike';
}

export type PersonaId = 'chill' | 'comedy' | 'wise' | 'gamer' | 'fusha';

export interface Persona {
  id: PersonaId;
  name: string;
  tagline: string;
  avatarEmoji: string;
  color: string;
  accentBg: string;
  badge: string;
  greeting: string;
  initialQuestion: string;
}

export type DialectId = 'saudi' | 'gulf' | 'egyptian' | 'levantine' | 'fusha';

export interface DialectOption {
  id: DialectId;
  name: string;
  country: string;
  flag: string;
  example: string;
}

export interface ConversationTopic {
  id: string;
  title: string;
  prompt: string;
  category: string;
  icon: string;
  badge?: string;
}
