export function useSound() {
    const playAlert = () => {
        if (typeof window === 'undefined') return;

        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const audioCtx = new AudioContextClass();

            const playNote = (freq: number, startTime: number, duration: number, vol: number = 0.3) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc.connect(gain);
                gain.connect(audioCtx.destination);

                // Pure sine for a bell-like quality
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);

                // Soft attack and smooth decay
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(vol, startTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

                osc.start(startTime);
                osc.stop(startTime + duration + 0.1);
            };

            // Elegant Arpeggio: G - B - D - G (Major chord)
            const now = audioCtx.currentTime;
            playNote(392.00, now, 0.8, 0.3);        // G4
            playNote(493.88, now + 0.15, 0.8, 0.3); // B4
            playNote(587.33, now + 0.3, 0.8, 0.3);  // D5
            playNote(783.99, now + 0.45, 1.2, 0.2); // G5 (High tail)
        } catch (error) {
            console.warn("Sound playback failed:", error);
        }
    };

    const playDing = () => {
        if (typeof window === 'undefined') return;
        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const audioCtx = new AudioContextClass();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);
        } catch (e) { }
    };

    return { playAlert, playDing };
}
