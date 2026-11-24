import { RotateCcw, SlidersHorizontal, Volume2, VolumeX } from 'lucide-react';
import { DIFFICULTIES, formatTime, type DifficultyId } from '../data/cardDeck';

interface GameHeaderProps {
  difficulty: DifficultyId;
  elapsedSeconds: number;
  attempts: number;
  matchedPairs: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRestart: () => void;
  onChangeDifficulty: () => void;
}

export function GameHeader({
  difficulty,
  elapsedSeconds,
  attempts,
  matchedPairs,
  soundEnabled,
  onToggleSound,
  onRestart,
  onChangeDifficulty,
}: GameHeaderProps) {
  const config = DIFFICULTIES[difficulty];

  return (
    <header className="w-full max-w-4xl mx-auto">
      {/* Baris Atas: Judul Permainan & Tombol Aksi */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-pink-300/70">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#500724] truncate">
            Tebak Gambar Berpasangan
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#9D174D] mt-0.5">
            Tingkat {config.label} · {config.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Matikan efek suara' : 'Nyalakan efek suara'}
            aria-pressed={soundEnabled}
            className="inline-flex items-center gap-1.5 min-h-[42px] px-3 py-2 rounded-lg bg-white/90 hover:bg-white text-[#831843] border border-pink-200 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-600"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#DB2777]" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 text-pink-400" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{soundEnabled ? 'Suara Nyala' : 'Suara Mati'}</span>
          </button>

          <button
            type="button"
            onClick={onChangeDifficulty}
            className="inline-flex items-center gap-1.5 min-h-[42px] px-3 py-2 rounded-lg bg-white/90 hover:bg-white text-[#831843] border border-pink-200 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-600"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#DB2777]" aria-hidden="true" />
            <span>Kesulitan</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 rounded-lg bg-[#BE185D] hover:bg-[#DB2777] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-900"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Ulangi</span>
          </button>
        </div>
      </div>

      {/* Baris Statistik Permainan: Waktu, Percobaan, Pasangan Ditemukan */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
        <div className="rounded-xl bg-white/92 border border-pink-200 shadow-[0_4px_14px_-6px_rgba(157,23,77,0.16)] px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold text-[#9D174D]">
            Waktu
          </span>
          <span className="font-mono-tabular text-lg sm:text-2xl font-bold text-[#500724] tracking-tight mt-0.5">
            {formatTime(elapsedSeconds)}
          </span>
        </div>

        <div className="rounded-xl bg-white/92 border border-pink-200 shadow-[0_4px_14px_-6px_rgba(157,23,77,0.16)] px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold text-[#9D174D]">
            Percobaan
          </span>
          <span className="font-mono-tabular text-lg sm:text-2xl font-bold text-[#500724] tracking-tight mt-0.5">
            {attempts}
          </span>
        </div>

        <div className="rounded-xl bg-white/92 border border-pink-200 shadow-[0_4px_14px_-6px_rgba(157,23,77,0.16)] px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold text-[#9D174D]">
            Pasangan
          </span>
          <span className="font-mono-tabular text-lg sm:text-2xl font-bold text-[#BE185D] tracking-tight mt-0.5">
            {matchedPairs}
            <span className="text-pink-400 text-sm sm:text-base font-semibold">
              {' '}
              / {config.pairs}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
