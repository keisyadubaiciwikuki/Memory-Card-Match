import { Play, Volume2, VolumeX } from 'lucide-react';
import {
  CARD_ILLUSTRATIONS,
  DIFFICULTIES,
  formatTime,
  type DifficultyId,
} from '../data/cardDeck';

export interface BestRecord {
  bestTime: number;
  bestAttempts: number;
}

interface StartScreenProps {
  selectedDifficulty: DifficultyId;
  onSelectDifficulty: (difficulty: DifficultyId) => void;
  onStartGame: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  bestRecords: Partial<Record<DifficultyId, BestRecord>>;
}

const difficultyOrder: DifficultyId[] = ['mudah', 'sedang', 'sulit'];

export function StartScreen({
  selectedDifficulty,
  onSelectDifficulty,
  onStartGame,
  soundEnabled,
  onToggleSound,
  bestRecords,
}: StartScreenProps) {
  const previewIcons = CARD_ILLUSTRATIONS.slice(0, 4);

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center min-h-[100dvh]">
      <section className="rounded-2xl bg-white/95 border border-pink-200 shadow-[0_24px_60px_-15px_rgba(157,23,77,0.2)] p-6 sm:p-10">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#BE185D] tracking-wide">
              Permainan Kartu Memori
            </p>
            <h1 className="mt-1.5 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#500724] [text-wrap:balance]">
              Tebak Gambar Berpasangan
            </h1>
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Matikan efek suara' : 'Nyalakan efek suara'}
            aria-pressed={soundEnabled}
            className="inline-flex items-center gap-2 min-h-[42px] px-3 py-2 rounded-lg bg-pink-50 hover:bg-pink-100 text-[#831843] border border-pink-200 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-600"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#DB2777]" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 text-pink-400" aria-hidden="true" />
            )}
            <span>{soundEnabled ? 'Suara Nyala' : 'Suara Mati'}</span>
          </button>
        </div>

        {/* Pratinjau Kartu Ilustrasi & Ringkasan Cara Main */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3 text-sm sm:text-base text-[#6B2148] leading-relaxed">
            <p>
              Balikkan dua kartu secara bergantian untuk menemukan semua pasangan gambar yang sama dengan jumlah percobaan dan waktu seefisien mungkin.
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#831843]/85">
              <li>1. Pilih tingkat kesulitan di bawah, lalu tekan Mulai Main.</li>
              <li>2. Ketuk dua kartu untuk melihat dan membandingkan gambarnya.</li>
              <li>3. Temukan seluruh pasangan kartu untuk meraih rating 3 bintang.</li>
            </ul>
          </div>

          <div className="md:col-span-5 grid grid-cols-4 gap-2 sm:gap-2.5">
            {previewIcons.map((item) => (
              <div
                key={item.symbolId}
                className="aspect-square rounded-xl p-2 shadow-sm border border-pink-200/80 flex items-center justify-center"
                style={{ backgroundColor: item.tintBg }}
                title={item.name}
              >
                <div className="w-full h-full">{item.renderSvg()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pilihan Tingkat Kesulitan */}
        <div className="mt-8 pt-6 border-t border-pink-100">
          <h2 className="text-sm font-bold text-[#500724]">Pilih Tingkat Kesulitan</h2>

          <div
            role="radiogroup"
            aria-label="Tingkat kesulitan permainan"
            className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {difficultyOrder.map((id) => {
              const item = DIFFICULTIES[id];
              const isSelected = selectedDifficulty === id;
              const record = bestRecords[id];

              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelectDifficulty(id)}
                  className={`text-left rounded-xl p-4 transition-all cursor-pointer border focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 ${
                    isSelected
                      ? 'bg-pink-50 border-[#DB2777] shadow-[0_0_0_1px_#DB2777]'
                      : 'bg-white border-pink-200 hover:bg-pink-50/60 hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-bold text-[#500724]">
                      {item.label}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#BE185D] bg-[#BE185D]'
                          : 'border-pink-300'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </div>

                  <p className="mt-1 text-xs sm:text-sm font-medium text-[#831843]/85">
                    {item.description}
                  </p>

                  {record && (
                    <p className="mt-2 pt-2 border-t border-pink-200/60 text-xs text-[#BE185D] font-semibold font-mono-tabular">
                      Rekor: {formatTime(record.bestTime)} · {record.bestAttempts}x
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tombol Utama: Mulai Main */}
        <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#9D174D]">
            Posisi kartu diacak secara adil di setiap sesi permainan.
          </p>

          <button
            type="button"
            onClick={onStartGame}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-xl bg-[#BE185D] hover:bg-[#DB2777] active:bg-[#9D174D] text-white text-base font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-pink-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-900"
          >
            <Play className="w-5 h-5 fill-white" aria-hidden="true" />
            <span>Mulai Main</span>
          </button>
        </div>
      </section>
    </main>
  );
}
