import { useCallback, useEffect, useRef, useState } from 'react';
import { GameHeader } from './components/GameHeader';
import { MemoryCard } from './components/MemoryCard';
import { StartScreen, type BestRecord } from './components/StartScreen';
import { VictoryModal } from './components/VictoryModal';
import {
  createShuffledDeck,
  DIFFICULTIES,
  type DeckCard,
  type DifficultyId,
} from './data/cardDeck';
import { soundFX } from './utils/soundEffects';

type GamePhase = 'MENU' | 'PLAYING' | 'FINISHED';

const BEST_RECORDS_STORAGE_KEY = 'tebak_gambar_best_records_v1';

function loadBestRecords(): Partial<Record<DifficultyId, BestRecord>> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(BEST_RECORDS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<Record<DifficultyId, BestRecord>>;
  } catch {
    return {};
  }
}

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('MENU');
  const [difficulty, setDifficulty] = useState<DifficultyId>('mudah');
  const [cards, setCards] = useState<DeckCard[]>(() => createShuffledDeck('mudah'));
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [mismatchUids, setMismatchUids] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState(
    'Ketuk kartu pertama untuk mulai membuka gambar.',
  );
  const [bestRecords, setBestRecords] = useState<Partial<Record<DifficultyId, BestRecord>>>(
    () => loadBestRecords(),
  );
  const [isNewBest, setIsNewBest] = useState(false);

  const timeoutsRef = useRef<number[]>([]);

  const clearPendingTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const scheduleTimeout = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(() => {
      timeoutsRef.current = timeoutsRef.current.filter((item) => item !== id);
      fn();
    }, delayMs);
    timeoutsRef.current.push(id);
  }, []);

  useEffect(() => {
    return () => {
      clearPendingTimeouts();
    };
  }, [clearPendingTimeouts]);

  useEffect(() => {
    soundFX.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (!timerActive) return;
    const intervalId = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [timerActive]);

  const startRound = useCallback(
    (targetDifficulty: DifficultyId) => {
      clearPendingTimeouts();
      setDifficulty(targetDifficulty);
      setCards(createShuffledDeck(targetDifficulty));
      setFlippedUids([]);
      setMismatchUids([]);
      setIsLocked(false);
      setAttempts(0);
      setMatchedPairs(0);
      setElapsedSeconds(0);
      setTimerActive(true);
      setIsNewBest(false);
      setFeedbackMessage('Ketuk kartu pertama untuk mulai membuka gambar.');
      setPhase('PLAYING');
    },
    [clearPendingTimeouts],
  );

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const handleReturnToMenu = useCallback(() => {
    clearPendingTimeouts();
    setTimerActive(false);
    setIsLocked(false);
    setFlippedUids([]);
    setMismatchUids([]);
    setPhase('MENU');
  }, [clearPendingTimeouts]);

  const finalizeVictory = useCallback(
    (finalAttempts: number) => {
      setTimerActive(false);
      setIsLocked(true);

      setBestRecords((prevRecords) => {
        const existing = prevRecords[difficulty];
        const better =
          !existing ||
          finalAttempts < existing.bestAttempts ||
          (finalAttempts === existing.bestAttempts && elapsedSeconds < existing.bestTime);

        if (!better) {
          setIsNewBest(false);
          return prevRecords;
        }

        const updated: Partial<Record<DifficultyId, BestRecord>> = {
          ...prevRecords,
          [difficulty]: {
            bestAttempts: finalAttempts,
            bestTime: elapsedSeconds,
          },
        };
        setIsNewBest(true);
        try {
          window.localStorage.setItem(BEST_RECORDS_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Abaikan jika penyimpanan lokal tidak tersedia
        }
        return updated;
      });

      scheduleTimeout(() => {
        soundFX.playVictory();
        setPhase('FINISHED');
      }, 450);
    },
    [difficulty, elapsedSeconds, scheduleTimeout],
  );

  const handleCardSelect = useCallback(
    (uid: string) => {
      if (phase !== 'PLAYING' || isLocked) return;

      const selectedCard = cards.find((card) => card.uid === uid);
      if (!selectedCard || selectedCard.isMatched) return;
      if (flippedUids.includes(uid)) return;

      // Kartu Pertama
      if (flippedUids.length === 0) {
        soundFX.playFlip();
        setFlippedUids([uid]);
        setFeedbackMessage(`Terbuka: ${selectedCard.name}. Pilih kartu kedua.`);
        return;
      }

      // Kartu Kedua
      if (flippedUids.length === 1) {
        const firstUid = flippedUids[0];
        const firstCard = cards.find((card) => card.uid === firstUid);
        if (!firstCard) return;

        soundFX.playFlip();
        setFlippedUids([firstUid, uid]);
        setIsLocked(true);

        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);

        const isMatch = firstCard.symbolId === selectedCard.symbolId;

        if (isMatch) {
          const nextMatchedPairs = matchedPairs + 1;
          const totalPairs = DIFFICULTIES[difficulty].pairs;

          scheduleTimeout(() => {
            soundFX.playMatch();
            setCards((prevCards) =>
              prevCards.map((card) =>
                card.uid === firstUid || card.uid === uid
                  ? { ...card, isMatched: true }
                  : card,
              ),
            );
            setFlippedUids([]);
            setMatchedPairs(nextMatchedPairs);

            if (nextMatchedPairs >= totalPairs) {
              setFeedbackMessage('Semua pasangan berhasil ditemukan!');
              finalizeVictory(nextAttempts);
            } else {
              setFeedbackMessage(`Cocok! Pasangan ${selectedCard.name} ditemukan.`);
              setIsLocked(false);
            }
          }, 280);
        } else {
          // Tidak cocok: biarkan terbuka sebentar agar pemain sempat mengingat posisinya
          scheduleTimeout(() => {
            soundFX.playMismatch();
            setMismatchUids([firstUid, uid]);
            setFeedbackMessage('Belum cocok. Ingat posisi kedua kartu ini.');
          }, 260);

          scheduleTimeout(() => {
            setMismatchUids([]);
            setFlippedUids([]);
            setIsLocked(false);
          }, 980);
        }
      }
    },
    [
      attempts,
      cards,
      difficulty,
      finalizeVictory,
      flippedUids,
      isLocked,
      matchedPairs,
      phase,
      scheduleTimeout,
    ],
  );

  const gridClassName =
    difficulty === 'mudah'
      ? 'grid-cols-2 sm:grid-cols-4 max-w-[330px] sm:max-w-3xl gap-3 sm:gap-4'
      : difficulty === 'sedang'
        ? 'grid-cols-3 sm:grid-cols-4 max-w-[430px] sm:max-w-3xl gap-2.5 sm:gap-4'
        : 'grid-cols-4 max-w-[460px] sm:max-w-3xl gap-2 sm:gap-3.5';

  return (
    <div className="pink-table-bg min-h-[100dvh] w-full text-[#500724] flex flex-col">
      {phase === 'MENU' ? (
        <StartScreen
          selectedDifficulty={difficulty}
          onSelectDifficulty={setDifficulty}
          onStartGame={() => startRound(difficulty)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          bestRecords={bestRecords}
        />
      ) : (
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-5 sm:py-8 flex flex-col justify-between gap-5">
          <GameHeader
            difficulty={difficulty}
            elapsedSeconds={elapsedSeconds}
            attempts={attempts}
            matchedPairs={matchedPairs}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onRestart={() => startRound(difficulty)}
            onChangeDifficulty={handleReturnToMenu}
          />

          <main className="flex-1 flex flex-col items-center justify-center py-1">
            <div
              className={`w-full mx-auto grid ${gridClassName}`}
              role="grid"
              aria-label="Papan kartu tebak gambar berpasangan"
            >
              {cards.map((card, index) => (
                <MemoryCard
                  key={card.uid}
                  card={card}
                  index={index}
                  isFlipped={flippedUids.includes(card.uid)}
                  isMismatch={mismatchUids.includes(card.uid)}
                  isDisabled={isLocked || phase !== 'PLAYING'}
                  compact={difficulty === 'sulit'}
                  onSelect={handleCardSelect}
                />
              ))}
            </div>
          </main>

          <footer className="text-center pb-1">
            <p
              aria-live="polite"
              className="text-xs sm:text-sm font-semibold text-[#831843] min-h-[1.25rem]"
            >
              {feedbackMessage}
            </p>
          </footer>
        </div>
      )}

      {phase === 'FINISHED' && (
        <VictoryModal
          difficulty={difficulty}
          elapsedSeconds={elapsedSeconds}
          attempts={attempts}
          isNewBest={isNewBest}
          onPlayAgain={() => startRound(difficulty)}
          onChangeDifficulty={handleReturnToMenu}
        />
      )}
    </div>
  );
}
