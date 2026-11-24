class SoundController {
  private ctx: AudioContext | null = null;
  private enabled = true;

  public setEnabled(value: boolean): void {
    this.enabled = value;
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private playTone(
    frequency: number,
    durationSec: number,
    type: OscillatorType = 'sine',
    volume = 0.08,
    delaySec = 0,
  ): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delaySec;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + durationSec + 0.02);
  }

  public playFlip(): void {
    this.playTone(420, 0.075, 'triangle', 0.06);
  }

  public playMatch(): void {
    this.playTone(523.25, 0.12, 'sine', 0.08, 0);
    this.playTone(659.25, 0.16, 'sine', 0.08, 0.08);
  }

  public playMismatch(): void {
    this.playTone(260, 0.12, 'triangle', 0.055, 0);
    this.playTone(210, 0.16, 'triangle', 0.055, 0.09);
  }

  public playVictory(): void {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.22, 'sine', 0.09, idx * 0.09);
    });
  }
}

export const soundFX = new SoundController();
