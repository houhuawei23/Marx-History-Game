/**
 * 音频管理器
 * 使用 Web Audio API 合成氛围音乐与音效
 * 无需外部音频文件
 */

export class AudioManager {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.gainNode = null;
        this.oscillators = [];
        this.nextNoteTime = 0;
        this.timerID = null;
        this.epoch = 1;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setEpoch(epoch) {
        this.epoch = epoch;
    }

    playAmbient() {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.gainNode = this.ctx.createGain();
        this.gainNode.connect(this.ctx.destination);
        this.gainNode.gain.value = 0.06;

        // 基础低频氛围
        const baseFreqs = this.epoch === 3 ? [55, 82.41] : [55, 65.41];
        baseFreqs.forEach(f => {
            const osc = this.ctx.createOscillator();
            osc.type = this.epoch === 3 ? 'sawtooth' : 'sine';
            osc.frequency.value = f;
            const oscGain = this.ctx.createGain();
            oscGain.gain.value = this.epoch === 3 ? 0.15 : 0.5;
            osc.connect(oscGain);
            oscGain.connect(this.gainNode);
            osc.start();
            this.oscillators.push({ osc, oscGain });
        });

        this.nextNoteTime = this.ctx.currentTime;
        this.scheduleNotes();
    }

    scheduleNotes() {
        if (!this.isPlaying) return;
        const lookahead = 0.5;
        while (this.nextNoteTime < this.ctx.currentTime + lookahead) {
            this.playNote(this.nextNoteTime);
            this.nextNoteTime += this.epoch === 3 ? 1.2 + Math.random() : (this.epoch === 2 ? 1.8 + Math.random() * 1.2 : 2.5 + Math.random() * 2);
        }
        this.timerID = setTimeout(() => this.scheduleNotes(), 200);
    }

    playNote(when) {
        if (!this.ctx) return;
        let scale;
        if (this.epoch === 1) {
            scale = [110, 130.81, 146.83, 164.81, 196.00, 220.00];
        } else if (this.epoch === 2) {
            scale = [130.81, 164.81, 196.00, 261.63, 329.63];
        } else {
            scale = [164.81, 196.00, 261.63, 329.63, 392.00, 523.25];
        }
        const freq = scale[Math.floor(Math.random() * scale.length)];
        const osc = this.ctx.createOscillator();
        osc.type = this.epoch === 3 ? 'square' : (this.epoch === 2 ? 'triangle' : 'sine');
        osc.frequency.value = freq;
        const noteGain = this.ctx.createGain();
        noteGain.gain.setValueAtTime(0, when);
        noteGain.gain.linearRampToValueAtTime(this.epoch === 3 ? 0.06 : 0.1, when + 0.4);
        noteGain.gain.exponentialRampToValueAtTime(0.001, when + (this.epoch === 3 ? 1.2 : 2));
        osc.connect(noteGain);
        noteGain.connect(this.gainNode);
        osc.start(when);
        osc.stop(when + (this.epoch === 3 ? 1.4 : 2.2));
    }

    stopAmbient() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        if (this.timerID) {
            clearTimeout(this.timerID);
            this.timerID = null;
        }
        if (this.gainNode) {
            const now = this.ctx.currentTime;
            this.gainNode.gain.cancelScheduledValues(now);
            this.gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
        }
        setTimeout(() => {
            this.oscillators.forEach(({ osc }) => { try { osc.stop(); } catch (e) { } });
            this.oscillators = [];
        }, 600);
    }

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
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.stopAmbient();
            return false;
        } else {
            this.playAmbient();
            return true;
        }
    }
}
