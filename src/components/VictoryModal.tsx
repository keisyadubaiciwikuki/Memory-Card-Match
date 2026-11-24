import { RotateCcw, SlidersHorizontal, Star, Trophy } from 'lucide-react';
import {
  calculateStars,
  DIFFICULTIES,
  formatTime,
  type DifficultyId,
} from '../data/cardDeck';

interface VictoryModalProps {
  difficulty: DifficultyId;
  elapsedSeconds: number;
  attempts: number;
  isNewBest: boolean;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

export function VictoryModal({
  difficulty,
  elapsedSeconds,
  attempts,
  isNewBest,
  onPlayAgain,
  onChangeDifficulty,
}: VictoryModalProps) {
  const stars = calculateStars(difficulty, attempts);
  const config = DIFFICULTIES[difficulty];

  const ratingLabel =
    stars === 3
      ? 'Ingatan Luar Biasa!'
      : stars === 2
        ? 'Permainan Sangat Baik!'
        : 'Berhasil Diselesaikan!';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="victory-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#500724]/55 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-2xl bg-white border border-pink-200 shadow-[0_28px_70px_-15px_rgba(80,7,36,0.4)] p-6 sm:p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center">
          <Trophy className="w-7 h-7 text-[#BE185D]" aria-hidden="true" />
        </div>

        <h2
          id="victory-title"
          className="mt-4 text-xl sm:text-2xl font-extrabold tracking-tight text-[#500724] [text-wrap:balance]"
        >
          Semua Pasangan Ditemukan!
        </h2>
        <p className="mt-1 text-sm font-medium text-[#831843]">
          Tingkat {config.label} · {ratingLabel}
        </p>

        {/* Rating Bintang */}
        <div
          className="mt-5 flex items-center justify-center gap-2.5"
          aria-label={`Rating ${stars} dari 3 bintang`}
        >
          {[1, 2, 3].map((value) => {
            const active = value <= stars;
            return (
              <Star
                key={value}
                className={`w-9 h-9 sm:w-10 sm:h-10 transition-transform ${
                  active
                    ? 'text-amber-400 fill-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.35)]'
                    : 'text-pink-200 fill-pink-100'
                }`}
                aria-hidden="true"
              />
            );
          })}
        </div>

        {isNewBest && (
          <p className="mt-3 text-xs font-bold text-[#BE185D]">
            Rekor Terbaik Baru untuk Tingkat {config.label}
          </p>
        )}

        {/* Ringkasan Waktu & Percobaan */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-xl bg-pink-50 border border-pink-200 px-4 py-3">
            <span className="text-xs font-semibold text-[#9D174D]">
              Total Waktu
            </span>
            <p className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#500724] mt-0.5">
              {formatTime(elapsedSeconds)}
            </p>
          </div>

          <div className="rounded-xl bg-pink-50 border border-pink-200 px-4 py-3">
            <span className="text-xs font-semibold text-[#9D174D]">
              Total Percobaan
            </span>
            <p className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#500724] mt-0.5">
              {attempts}
            </p>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onChangeDifficulty}
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-[#831843] border border-pink-200 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-600"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            <span>Ubah Kesulitan</span>
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl bg-[#BE185D] hover:bg-[#DB2777] text-white text-sm font-extrabold transition-colors whitespace-nowrap cursor-pointer shadow-md shadow-pink-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-900"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Main Lagi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
