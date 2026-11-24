import type { ReactNode } from 'react';

export type DifficultyId = 'mudah' | 'sedang' | 'sulit';

export interface DifficultyConfig {
  id: DifficultyId;
  label: string;
  pairs: number;
  totalCards: number;
  description: string;
  starThresholds: {
    threeStarsMaxAttempts: number;
    twoStarsMaxAttempts: number;
  };
}

export const DIFFICULTIES: Record<DifficultyId, DifficultyConfig> = {
  mudah: {
    id: 'mudah',
    label: 'Mudah',
    pairs: 4,
    totalCards: 8,
    description: '4 pasang · 8 kartu',
    starThresholds: {
      threeStarsMaxAttempts: 6,
      twoStarsMaxAttempts: 9,
    },
  },
  sedang: {
    id: 'sedang',
    label: 'Sedang',
    pairs: 6,
    totalCards: 12,
    description: '6 pasang · 12 kartu',
    starThresholds: {
      threeStarsMaxAttempts: 9,
      twoStarsMaxAttempts: 14,
    },
  },
  sulit: {
    id: 'sulit',
    label: 'Sulit',
    pairs: 8,
    totalCards: 16,
    description: '8 pasang · 16 kartu',
    starThresholds: {
      threeStarsMaxAttempts: 13,
      twoStarsMaxAttempts: 19,
    },
  },
};

export interface CardIllustration {
  symbolId: string;
  name: string;
  tintBg: string;
  renderSvg: () => ReactNode;
}

export const CARD_ILLUSTRATIONS: CardIllustration[] = [
  {
    symbolId: 'rubah',
    name: 'Rubah',
    tintBg: '#FFF3E8',
    renderSvg: () => (
      <svg viewBox="0 0 96 96" className="w-full h-full" aria-hidden="true">
        {/* Ears */}
        <path d="M18 20 L40 30 L24 48 Z" fill="#EA580C" />
        <path d="M78 20 L56 30 L72 48 Z" fill="#EA580C" />
        <path d="M22 25 L35 32 L26 42 Z" fill="#FED7AA" />
        <path d="M74 25 L61 32 L70 42 Z" fill="#FED7AA" />
        {/* Head */}
        <path d="M16 44 C16 30, 80 30, 80 44 C80 64, 58 78, 48 80 C38 78, 16 64, 16 44 Z" fill="#F97316" />
        {/* Cheeks */}
        <path d="M16 48 C26 46, 38 56, 48 80 C34 76, 18 64, 16 48 Z" fill="#FFF7ED" />
        <path d="M80 48 C70 46, 58 56, 48 80 C62 76, 78 64, 80 48 Z" fill="#FFF7ED" />
        {/* Eyes */}
        <circle cx="34" cy="49" r="4.5" fill="#1E293B" />
        <circle cx="62" cy="49" r="4.5" fill="#1E293B" />
        <circle cx="35.5" cy="47.5" r="1.5" fill="#FFFFFF" />
        <circle cx="63.5" cy="47.5" r="1.5" fill="#FFFFFF" />
        {/* Nose */}
        <ellipse cx="48" cy="65" rx="6" ry="4.5" fill="#1E293B" />
        <ellipse cx="46.5" cy="63.8" rx="1.8" ry="1" fill="#94A3B8" />
      </svg>
    ),
  },
  {
    symbolId: 'paus',
    name: 'Paus',
    tintBg: '#EBF5FF',
    renderSvg: () => (
      <svg viewBox="0 0 96 96" className="w-full h-full" aria-hidden="true">
        {/* Water spout */}
        <path d="M44 26 C44 16, 34 14, 30 20" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M48 26 C48 16, 58 14, 62 20" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Tail */}
        <path d="M70 58 C78 52, 86 44, 84 36 C78 40, 74 44, 72 48 C70 42, 66 36, 62 34 C62 42, 66 48, 66 54 Z" fill="#0284C7" />
        {/* Body */}
        <path d="M14 54 C14 34, 32 28, 48 28 C64 28, 74 40, 74 56 C74 68, 62 74, 44 74 C24 74, 14 66, 14 54 Z" fill="#0EA5E9" />
        {/* Belly */}
        <path d="M16 58 C24 58, 36 60, 50 60 C58 60, 66 56, 72 58 C70 68, 58 74, 44 74 C26 74, 18 68, 16 58 Z" fill="#E0F2FE" />
        {/* Eye */}
        <circle cx="30" cy="48" r="4.2" fill="#0F172A" />
        <circle cx="31.3" cy="46.7" r="1.4" fill="#FFFFFF" />
        {/* Blush & Smile */}
        <circle cx="37" cy="54" r="3" fill="#FDA4AF" opacity="0.7" />
        <path d="M20 55 C23 59, 28 59, 31 56" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    symbolId: 'semangka',
    name: 'Semangka',
    tintBg: '#FEF2F2',
    renderSvg: () => (
      <svg viewBox="0 0 96 96" className="w-full h-full" aria-hidden="true">
        {/* Outer green rind */}
        <path d="M12 40 A36 36 0 0 0 84 40 L76 40 A28 28 0 0 1 20 40 Z" fill="#15803D" />
        {/* White pith */}
        <path d="M16 40 A32 32 0 0 0 80 40 L74 40 A26 26 0 0 1 22 40 Z" fill="#ECFDF5" />
        {/* Red flesh */}
        <path d="M21 40 A27 27 0 0 0 75 40 Z" fill="#EF4444" />
        {/* Highlight */}
        <path d="M28 43 A20 20 0 0 0 42 58" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.65" />
        {/* Seeds */}
        <ellipse cx="37" cy="47" rx="2.2" ry="3.4" transform="rotate(-18 37 47)" fill="#1E293B" />
        <ellipse cx="48" cy="54" rx="2.2" ry="3.4" fill="#1E293B" />
        <ellipse cx="59" cy="47" rx="2.2" ry="3.4" transform="rotate(18 59 47)" fill="#1E293B" />
        <ellipse cx="48" cy="44" rx="2" ry="3" fill="#1E293B" />
      </svg>
    ),
  },
  {
    symbolId: 'nanas',
    name: 'Nanas',
    tintBg: '#FEFCE8',
    renderSvg: () => (
      <svg viewBox="0 0 96 96" className="w-full h-full" aria-hidden="true">
        {/* Crown leaves */}
        <path d="M48 12 L55 34 L41 34 Z" fill="#16A34A" />
        <path d="M32 18 L47 35 L36 38 Z" fill="#22C55E" />
        <path d="M64 18 L60 38 L49 35 Z" fill="#22C55E" />
        {/* Body */}
        <rect x="28" y="34" width="40" height="48" rx="19" fill="#F59E0B" />
        <rect x="33" y="38" width="30" height="40" rx="14" fill="#FBBF24" />
        {/* Crisscross texture */}
        <path d="M32 48 L56 72 M40 38 L64 62 M32 62 L48 78" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M64 48 L40 72 M56 38 L32 62 M64 62 L48 78" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    symbolId: 'kaktus',
    name: 'Kaktus',
    tintBg: '#ECFDF5',
    renderSvg: () => (
      <svg viewBox="0 0 96 96" className="w-full h-full" aria-hidden="true">
        {/* Left & Right arms */}
        <path d="M39 50 H28 C23 50, 23 44, 23 38 V34" stroke="#16A34A" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M57 44 H68 C73 44, 73 38, 73 32 V28" stroke="#16A34A" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Main stem */}
        <rect x="38" y="20" width="20" height="44" rx="10" fill="#22C55E" />
        {/* Flower on top */}
        <circle cx="48" cy="17" r="5" fill="#F43F5E" />
        <circle cx="43" cy="19" r="3.5" fill="#FB7185" />
        <circle cx="53" cy="19" r="3.5" fill="#FB7185" />
        <circle cx="48" cy="17" r="2" fill="#FDE047" />
        {/* Spine accents */}
        <path d="M44 30 V35 M52 38 V43 M44 46 V51 M52 52 V57" stroke="#DCFCE7" strokeWidth="2" strokeLinecap="round" />
        {/* Terracotta pot */}
        <path d="M30 62 H66 L61 82 H35 Z" fill="#C2410C" />
        <rect x="27" y="57" width="42" height="7" rx="3" fill="#EA580C" />
      </svg>
    ),
  },
  {
    symbolId: 'roket',
    name: 'Roket',
    tintBg: '#EEF2FF',
    renderSvg: () => (
      <svg viewBox="0 0 96 96" className="w-full h-full" aria-hidden="true">
        {/* Exhaust Flame */}
        <path d="M41 68 L48 85 L55 68 Z" fill="#F59E0B" />
        <path d="M44 68 L48 78 L52 68 Z" fill="#FDE047" />
        {/* Side Fins */}
        <path d="M34 50 L20 66 L34 64 Z" fill="#E11D48" />
        <path d="M62 50 L76 66 L62 64 Z" fill="#E11D48" />
        {/* Rocket Body */}
        <path d="M48 12 C60 22, 64 42, 60 66 H36 C32 42, 36 22, 48 12 Z" fill="#4F46E5" />
        {/* Nose Cone */}
        <path d="M48 12 C54 18, 57 24, 59 30 H37 C39 24, 42 18, 48 12 Z" fill="#F43F5E" />
        {/* Window */}
        <circle cx="48" cy="43" r="8.5" fill="#E0E7FF" stroke="#312E81" strokeWidth="3" />
        <circle cx="45.5" cy="40.5" r="2.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    symbolId: 'kamera',
    name: 'Kamera',
    tintBg: '#F0FDFA',
    renderSvg: () => (
      <svg viewBox="0 0 96 96" className="w-full h-full" aria-hidden="true">
        {/* Top shutter & viewfinder hump */}
        <path d="M34 26 L38 20 H58 L62 26 Z" fill="#334155" />
        <rect x="22" y="22" width="10" height="4" rx="1.5" fill="#F59E0B" />
        {/* Camera body */}
        <rect x="14" y="26" width="68" height="48" rx="10" fill="#1E293B" />
        {/* Teal stripe */}
        <rect x="14" y="37" width="68" height="24" fill="#0D9488" />
        {/* Flash */}
        <rect x="64" y="30" width="11" height="6" rx="2" fill="#FEF08A" />
        {/* Lens */}
        <circle cx="48" cy="50" r="16" fill="#F8FAFC" />
        <circle cx="48" cy="50" r="12" fill="#0F172A" />
        <circle cx="48" cy="50" r="7" fill="#38BDF8" />
        <circle cx="44.5" cy="46.5" r="2.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    symbolId: 'burung-hantu',
    name: 'Burung Hantu',
    tintBg: '#FAF5FF',
    renderSvg: () => (
      <svg viewBox="0 0 96 96" className="w-full h-full" aria-hidden="true">
        {/* Feet */}
        <path d="M36 78 L33 84 M39 78 L39 84 M42 78 L45 84" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        <path d="M54 78 L51 84 M57 78 L57 84 M60 78 L63 84" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        {/* Ear tufts */}
        <path d="M26 20 L38 26 L26 36 Z" fill="#6D28D9" />
        <path d="M70 20 L58 26 L70 36 Z" fill="#6D28D9" />
        {/* Body */}
        <rect x="22" y="22" width="52" height="58" rx="24" fill="#7C3AED" />
        {/* Belly */}
        <ellipse cx="48" cy="60" rx="16" ry="15" fill="#EDE9FE" />
        <path d="M40 56 Q43 60 46 56 M50 56 Q53 60 56 56 M45 64 Q48 68 51 64" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Eyes */}
        <circle cx="37" cy="40" r="10.5" fill="#FFFFFF" />
        <circle cx="59" cy="40" r="10.5" fill="#FFFFFF" />
        <circle cx="37" cy="40" r="5" fill="#1E293B" />
        <circle cx="59" cy="40" r="5" fill="#1E293B" />
        <circle cx="38.8" cy="38.2" r="1.8" fill="#FFFFFF" />
        <circle cx="60.8" cy="38.2" r="1.8" fill="#FFFFFF" />
        {/* Beak */}
        <path d="M43 45 H53 L48 53 Z" fill="#F59E0B" />
      </svg>
    ),
  },
];

export interface DeckCard {
  uid: string;
  symbolId: string;
  name: string;
  tintBg: string;
  isMatched: boolean;
}

/**
 * Fisher-Yates shuffle algorithm (in-place on copied array).
 * Ensures unbiased uniform random permutation of all cards.
 */
export function fisherYatesShuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export function createShuffledDeck(difficulty: DifficultyId): DeckCard[] {
  const { pairs } = DIFFICULTIES[difficulty];
  const chosenSymbols = fisherYatesShuffle(CARD_ILLUSTRATIONS).slice(0, pairs);

  const pairedCards: DeckCard[] = chosenSymbols.flatMap((item) => [
    {
      uid: `${item.symbolId}-a-${Math.random().toString(36).slice(2, 7)}`,
      symbolId: item.symbolId,
      name: item.name,
      tintBg: item.tintBg,
      isMatched: false,
    },
    {
      uid: `${item.symbolId}-b-${Math.random().toString(36).slice(2, 7)}`,
      symbolId: item.symbolId,
      name: item.name,
      tintBg: item.tintBg,
      isMatched: false,
    },
  ]);

  return fisherYatesShuffle(pairedCards);
}

export function calculateStars(difficulty: DifficultyId, attempts: number): 1 | 2 | 3 {
  const { threeStarsMaxAttempts, twoStarsMaxAttempts } = DIFFICULTIES[difficulty].starThresholds;
  if (attempts <= threeStarsMaxAttempts) return 3;
  if (attempts <= twoStarsMaxAttempts) return 2;
  return 1;
}

export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
