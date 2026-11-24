import { Check, HelpCircle } from 'lucide-react';
import { CARD_ILLUSTRATIONS, type DeckCard } from '../data/cardDeck';

interface MemoryCardProps {
  card: DeckCard;
  index: number;
  isFlipped: boolean;
  isMismatch: boolean;
  isDisabled: boolean;
  compact?: boolean;
  onSelect: (uid: string) => void;
}

const illustrationMap = new Map(
  CARD_ILLUSTRATIONS.map((item) => [item.symbolId, item]),
);

export function MemoryCard({
  card,
  index,
  isFlipped,
  isMismatch,
  isDisabled,
  compact = false,
  onSelect,
}: MemoryCardProps) {
  const illustration = illustrationMap.get(card.symbolId);
  const revealed = isFlipped || card.isMatched;

  const ariaLabel = card.isMatched
    ? `Kartu ${index + 1}: ${card.name}, sudah cocok`
    : revealed
      ? `Kartu ${index + 1}: ${card.name}, terbuka`
      : `Kartu ${index + 1}, masih tertutup. Ketuk untuk membalik`;

  return (
    <div className="card-perspective w-full aspect-[4/4.6] sm:aspect-[4/4.4]">
      <button
        type="button"
        onClick={() => onSelect(card.uid)}
        disabled={isDisabled || revealed}
        aria-label={ariaLabel}
        aria-pressed={revealed}
        className={`group relative w-full h-full rounded-xl sm:rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCE7F3] ${
          !revealed && !isDisabled
            ? 'cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'
            : 'cursor-default'
        }`}
      >
        <div
          className={`card-inner ${revealed ? 'is-flipped' : ''} ${
            card.isMatched ? 'is-matched' : ''
          } ${isMismatch ? 'is-mismatch' : ''}`}
        >
          {/* Sisi Belakang Kartu (Tertutup) */}
          <div className="card-face rounded-xl sm:rounded-2xl bg-white p-1 sm:p-1.5 shadow-[0_8px_20px_-6px_rgba(157,23,77,0.28)] border border-pink-200/90">
            <div className="card-back-pattern w-full h-full rounded-lg sm:rounded-xl border border-white/35 flex items-center justify-center relative overflow-hidden transition-colors duration-150 group-hover:border-white/70">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#9D174D]/85 border border-white/40 flex items-center justify-center shadow-inner">
                <HelpCircle
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Sisi Depan Kartu (Terbuka) */}
          <div
            className={`card-face card-face-front rounded-xl sm:rounded-2xl bg-white p-1.5 sm:p-2 shadow-[0_10px_24px_-8px_rgba(157,23,77,0.22)] border-2 transition-colors duration-200 flex flex-col justify-between ${
              card.isMatched
                ? 'border-emerald-500 ring-2 ring-emerald-400/30'
                : isMismatch
                  ? 'border-rose-600 ring-2 ring-rose-400/35'
                  : 'border-pink-400'
            }`}
          >
            {/* Indikator Status Cocok (Ikon Centang, bukan warna saja) */}
            {card.isMatched && (
              <span
                className="absolute top-2 right-2 z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm"
                title="Pasangan ditemukan"
              >
                <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
            )}

            <div
              className="w-full flex-1 rounded-lg sm:rounded-xl flex items-center justify-center p-2 sm:p-3 overflow-hidden"
              style={{ backgroundColor: card.tintBg }}
            >
              <div className={compact ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-14 h-14 sm:w-20 sm:h-20'}>
                {illustration?.renderSvg()}
              </div>
            </div>

            <div className="pt-1 sm:pt-1.5 pb-0.5 text-center">
              <span
                className={`block font-bold tracking-tight text-slate-900 truncate px-1 ${
                  compact ? 'text-[11px] sm:text-xs' : 'text-xs sm:text-sm'
                }`}
              >
                {card.name}
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
