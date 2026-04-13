/**
 * 音频管理器（文件版）
 * 使用 HTMLAudioElement 播放纪元背景 MP3，Web Audio API 保留给音效
 */

const AUDIO_BASE_PATH = 'assets/audio/';

export class AudioManager {
    constructor() {
        this.ctx = null;          // Web Audio 上下文（仅用于音效）
        this.isPlaying = false;
        this.epoch = 1;
        this.tracks = {};
        this.currentTrack = null;
        this.fadeInterval = null;
        this.targetVolume = 0.45;
        this.fadeDuration = 600; // ms
        this._initTracks();
    }

    _initTracks() {
        [1, 2, 3].forEach((e) => {
            const audio = new Audio(`${AUDIO_BASE_PATH}epoch${e}.mp3`);
            audio.loop = true;
            audio.volume = 0;
            audio.preload = 'auto';
            this.tracks[e] = audio;
        });
    }

    init() {
        // 恢复 Web Audio 上下文（用于音效）
        if (!this.ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AC();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setEpoch(epoch) {
        if (this.epoch !== epoch) {
            this.epoch = epoch;
            if (this.isPlaying) {
                this._crossfade(epoch);
            }
        }
    }

    playAmbient() {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;
        const track = this.tracks[this.epoch];
        this.currentTrack = track;
        track.currentTime = 0;
        const playPromise = track.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch((err) => {
                // 自动播放被阻止，常见，待用户交互后再次调用即可
                console.warn('Audio play prevented (autoplay policy):', err.name);
                this.isPlaying = false;
            });
        }
        this._fadeVolume(track, this.targetVolume, this.fadeDuration);
    }

    stopAmbient() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        if (this.currentTrack) {
            this._fadeVolume(this.currentTrack, 0, this.fadeDuration, () => {
                this.currentTrack.pause();
                this.currentTrack.currentTime = 0;
            });
        }
    }

    toggle() {
        this.init();
        if (this.isPlaying) {
            this.stopAmbient();
            return false;
        } else {
            this.playAmbient();
            return true;
        }
    }

    _crossfade(newEpoch) {
        const oldTrack = this.currentTrack;
        const newTrack = this.tracks[newEpoch];
        this.currentTrack = newTrack;
        if (oldTrack && oldTrack !== newTrack) {
            this._fadeVolume(oldTrack, 0, this.fadeDuration, () => {
                oldTrack.pause();
                oldTrack.currentTime = 0;
            });
        }
        newTrack.currentTime = 0;
        const playPromise = newTrack.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch((err) => {
                console.warn('Audio crossfade play prevented:', err.name);
            });
        }
        this._fadeVolume(newTrack, this.targetVolume, this.fadeDuration);
    }

    _fadeVolume(audio, target, durationMs, onDone) {
        const startVol = audio.volume;
        const delta = target - startVol;
        const steps = Math.max(1, Math.floor(durationMs / 30));
        let step = 0;
        if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
        }
        this.fadeInterval = setInterval(() => {
            step++;
            const ratio = step / steps;
            audio.volume = Math.max(0, Math.min(1, startVol + delta * ratio));
            if (step >= steps) {
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
                audio.volume = target;
                if (onDone) onDone();
            }
        }, 30);
    }

    // ========== 音效（仍用 Web Audio API） ==========
    playSfx(type) {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        const now = this.ctx.currentTime;

        switch (type) {
            case 'modal':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
                break;
            case 'epoch':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.linearRampToValueAtTime(440, now + 0.4);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.6);
                osc.start(now);
                osc.stop(now + 0.6);
                break;
            case 'end':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.exponentialRampToValueAtTime(110, now + 1);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 1.2);
                osc.start(now);
                osc.stop(now + 1.2);
                break;
            case 'dice':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(600, now + 0.15);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
            case 'floatUp':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
                break;
            case 'click':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
                break;
        }
    }
}
