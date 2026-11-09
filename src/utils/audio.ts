// Audio helper for Gemini TTS and Web Speech API fallback

class SoundFX {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Soft pleasant chime when sending message
  playSend() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // ignore
    }
  }

  // Welcoming warm chime when model responds
  playReceive() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // ignore
    }
  }

  // Click chime
  playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }
}

export const soundFX = new SoundFX();

// Current active audio tracking to prevent overlapping
let currentAudioElement: HTMLAudioElement | null = null;

export function stopCurrentAudio() {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch (e) {
      console.warn('Error pausing audio element', e);
    }
    currentAudioElement = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn('Error cancelling speech synthesis', e);
    }
  }
}

// Request TTS audio from server Gemini endpoint with fallback to SpeechSynthesis
export async function speakText(
  text: string,
  voiceName: string = 'Puck',
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<string | null> {
  stopCurrentAudio();
  onStart?.();

  // Strip markdown, asterisks, brackets, suggestion headers for speech
  const cleanText = text
    .replace(/---SUGGESTIONS---[\s\S]*/, '')
    .replace(/[*#_~`\[\]()]/g, '')
    .trim();

  if (!cleanText) {
    onEnd?.();
    return null;
  }

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, voice: voiceName }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        currentAudioElement = audio;

        audio.onended = () => {
          currentAudioElement = null;
          onEnd?.();
        };

        audio.onerror = (e) => {
          console.warn('Audio playback error, falling back to Web Speech API', e);
          currentAudioElement = null;
          fallbackWebSpeech(cleanText, onEnd, onError);
        };

        await audio.play();
        return data.audioUrl;
      }
    }
  } catch (err) {
    console.warn('Server TTS failed, using Web Speech API fallback', err);
  }

  // Fallback to browser SpeechSynthesis
  fallbackWebSpeech(cleanText, onEnd, onError);
  return null;
}

function fallbackWebSpeech(
  text: string,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Try to pick an Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(
      (v) => v.lang.startsWith('ar') || v.name.toLowerCase().includes('arabic')
    );
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error', e);
      onError?.(e);
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    onError?.(err);
    onEnd?.();
  }
}

// Speech to text recognizer (Microphone input)
export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onEnd: () => void,
  onError: (err: any) => void
) {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const resultText = finalTranscript || interimTranscript;
      if (resultText) {
        onResult(resultText);
      }
    };

    recognition.onerror = (event: any) => {
      onError(event.error);
    };

    recognition.onend = () => {
      onEnd();
    };

    return recognition;
  } catch {
    return null;
  }
}
