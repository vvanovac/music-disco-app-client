<template>
  <div class="container">
    <div class="keys-wrapper">
      <div class="white-keys-wrapper">
        <div class="white-key" :class="active.keyC">C</div>
        <div class="white-key" :class="active.keyD">D</div>
        <div class="white-key" :class="active.keyE">E</div>
        <div class="white-key" :class="active.keyF">F</div>
        <div class="white-key" :class="active.keyG">G</div>
        <div class="white-key" :class="active.keyA">A</div>
        <div class="white-key" :class="active.keyB">B</div>
        <div class="white-key" :class="active.keyC2">C</div>

      </div>
      <div class="black-keys-wrapper">
        <div class="black-key" :class="active.keyCsharp"></div>
        <div class="black-key" :class="active.keyDsharp"></div>
        <div class="black-key" :class="active.keyFsharp"></div>
        <div class="black-key" :class="active.keyGsharp"></div>
        <div class="black-key" :class="active.keyAsharp"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Tone from 'tone';

export default {
  name: 'Piano.keys',
  props: ['octave'],
  data() {
    const synth = new Tone.Synth().toDestination();
    return {
      synth,
      active: {
        keyC: '',
        keyD: '',
        keyE: '',
        keyF: '',
        keyG: '',
        keyA: '',
        keyB: '',
        keyC2: '',
        keyCsharp: '',
        keyDsharp: '',
        keyFsharp: '',
        keyGsharp: '',
        keyAsharp: '',
      }
    }
  },
  methods: {
    playKey(event) {
      let key = String.fromCharCode(event.keyCode).toLowerCase();
      switch (key) {
        case 'a':
          return this.playKeyC();
        case 's':
          return this.playKeyD();
        case 'd':
          return this.playKeyE();
        case 'f':
          return this.playKeyF();
        case 'g':
          return this.playKeyG();
        case 'h':
          return this.playKeyA();
        case 'j':
          return this.playKeyB();
        case 'k':
          return this.playKeyC2();
        case 'e':
          return this.playKeyCsharp();
        case 'r':
          return this.playKeyDsharp();
        case 'y':
          return this.playKeyFsharp();
        case 'u':
          return this.playKeyGsharp();
        case 'i':
          return this.playKeyAsharp();
        default:
          return null;
      }
    },
    playKeyC() {
      this.enableActiveClass('keyC');
      this.synth.triggerAttackRelease('C' + this.octave, '4n');
    },
    playKeyD() {
      this.enableActiveClass('keyD');
      this.synth.triggerAttackRelease('D' + this.octave, '4n');
    },
    playKeyE() {
      this.enableActiveClass('keyE');
      this.synth.triggerAttackRelease('E' + this.octave, '4n');
    },
    playKeyF() {
      this.enableActiveClass('keyF');
      this.synth.triggerAttackRelease('F' + this.octave, '4n');
    },
    playKeyG() {
      this.enableActiveClass('keyG');
      this.synth.triggerAttackRelease('G' + this.octave, '4n');
    },
    playKeyA() {
      this.enableActiveClass('keyA');
      this.synth.triggerAttackRelease('A' + this.octave, '4n');
    },
    playKeyB() {
      this.enableActiveClass('keyB');
      this.synth.triggerAttackRelease('B' + this.octave, '4n');
    },
    playKeyC2() {
      this.enableActiveClass('keyC2');
      this.synth.triggerAttackRelease('C' + (+this.octave + 1), '4n');
    },
    playKeyCsharp() {
      this.enableActiveClass('keyCsharp');
      this.synth.triggerAttackRelease('C#' + this.octave, '4n');
    },
    playKeyDsharp() {
      this.enableActiveClass('keyDsharp');
      this.synth.triggerAttackRelease('D#' + this.octave, '4n');
    },
    playKeyFsharp() {
      this.enableActiveClass('keyFsharp');
      this.synth.triggerAttackRelease('F#' + this.octave, '4n');
    },
    playKeyGsharp() {
      this.enableActiveClass('keyGsharp');
      this.synth.triggerAttackRelease('G#' + this.octave, '4n');
    },
    playKeyAsharp() {
      this.enableActiveClass('keyAsharp');
      this.synth.triggerAttackRelease('A#' + this.octave, '4n');
    },
    enableActiveClass(key) {
      this.active[key] = 'active-key';
    },
    disableActiveClass() {
      this.active.keyC = '';
      this.active.keyD = '';
      this.active.keyE = '';
      this.active.keyF = '';
      this.active.keyG = '';
      this.active.keyA = '';
      this.active.keyB = '';
      this.active.keyC2 = '';
      this.active.keyCsharp = '';
      this.active.keyDsharp = '';
      this.active.keyFsharp = '';
      this.active.keyGsharp = '';
      this.active.keyAsharp = '';
    }
  },
  mounted() {
    window.addEventListener("keypress", this.playKey);
    window.addEventListener("keyup", this.disableActiveClass);
  }
}
</script>

<style scoped>
* {
  display: flex;
  justify-content: center;
}

.white-keys-wrapper, .white-key, .black-key {
  align-items: flex-end;
}

.keys-wrapper {
  justify-content: left;
}

.white-keys-wrapper {
  position: relative;
}

.black-keys-wrapper {
  align-items: flex-start;
  position: absolute;
}

.white-key {
  background-color: #fffff0;
  width: 50px;
  height: 200px;
  border: 1px solid black;
  border-right: none;
  border-radius: 0 0 5px 5px;
  font-weight: bold;
  padding-bottom: 10px;
}

.white-key:first-child {
  border-radius: 5px 0 5px 5px;
}

.white-key:last-child {
  border-right: 1px solid black;
  border-radius: 0 5px 5px 5px;
}

.black-key {
  color: white;
  background-color: black;
  width: 30px;
  height: 120px;
  border-radius: 0 0 5px 5px;
  padding-bottom: 10px;
  margin-left: 20px;
}

.black-key:nth-child(1) {
  margin-left: 35px;
}

.black-key:nth-child(3) {
  margin-left: 70px;
}

.active-key {
  background-color: seagreen;
  color: white;
}
</style>
