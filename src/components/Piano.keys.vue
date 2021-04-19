<template>
  <div>
    <div class="piano-container">
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
          <div class="black-key" :class="active.keyCsharp">C#</div>
          <div class="black-key" :class="active.keyDsharp">D#</div>
          <div class="black-key" :class="active.keyFsharp">F#</div>
          <div class="black-key" :class="active.keyGsharp">G#</div>
          <div class="black-key" :class="active.keyAsharp">A#</div>
        </div>
      </div>
    </div>
    <div class="input-container">
      <p class="subheading font-weight-regular">{{setChordInput}}</p>
      <v-btn
          round
          @click="playInput"
      >
        Play Chord
      </v-btn>
      <v-btn
          round
          @click="clearInput"
      >
        Clear
      </v-btn>
      <v-btn
          round
          @click="checkInput"
      >
        Check
      </v-btn>
      <p class="subheading font-weight-regular pt-3" :class="taskMessage">{{taskStatus}}</p>
    </div>
  </div>
</template>

<script>
import * as Tone from 'tone';

export default {
  name: 'Piano.keys',
  props: ['octave', 'taskGoal'],
  data() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    return {
      synth,
      chordInput: [],
      taskStatus: null,
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
      },
      taskMessage: ''
    }
  },
  computed: {
    setChordInput() {
      if (this.chordInput.length > 12) {
        return 'Chord input is too long to display.';
      }
      if (this.chordInput.length > 0) {
        return 'Chord input: ' + this.chordInput;
      }
      return 'Play piano to complete your task.';
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
        case 'w':
          return this.playKeyCsharp();
        case 'e':
          return this.playKeyDsharp();
        case 't':
          return this.playKeyFsharp();
        case 'y':
          return this.playKeyGsharp();
        case 'u':
          return this.playKeyAsharp();
        default:
          return null;
      }
    },
    playKeyC() {
      this.enableActiveClass('keyC');
      const note = 'C' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note)
    },
    playKeyD() {
      this.enableActiveClass('keyD');
      const note = 'D' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyE() {
      this.enableActiveClass('keyE');
      const note = 'E' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyF() {
      this.enableActiveClass('keyF');
      const note = 'F' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyG() {
      this.enableActiveClass('keyG');
      const note = 'G' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyA() {
      this.enableActiveClass('keyA');
      const note = 'A' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyB() {
      this.enableActiveClass('keyB');
      const note = 'B' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyC2() {
      this.enableActiveClass('keyC2');
      const note = 'C' + (+this.octave + 1);
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyCsharp() {
      this.enableActiveClass('keyCsharp');
      const note = 'C#' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyDsharp() {
      this.enableActiveClass('keyDsharp');
      const note = 'D#' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyFsharp() {
      this.enableActiveClass('keyFsharp');
      const note = 'F#' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyGsharp() {
      this.enableActiveClass('keyGsharp');
      const note = 'G#' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playKeyAsharp() {
      this.enableActiveClass('keyAsharp');
      const note = 'A#' + this.octave;
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
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
    },
    addToChordInput(note) {
      this.chordInput.push(note);
      this.setChordInput();
    },
    playInput() {
      if (this.chordInput.length < 5) {
        return this.synth.triggerAttackRelease(this.chordInput, '2n');
      }
      return this.chordInput = 'Play piano to complete your task.'
    },
    clearInput() {
      this.chordInput = [];
      this.taskStatus = null;
      this.taskMessage = '';
    },
    checkInput() {
      const goal = [];
      for (let i = 0; i < this.taskGoal.length; i++) {
        goal.push(this.taskGoal[i] + this.octave);
      }
      const chordInput = this.chordInput;

      if (JSON.stringify(chordInput) === JSON.stringify(goal)) {
        this.taskStatus = 'WELL DONE! Task successfully completed.';
        this.taskMessage = 'task-success';
      } else {
        this.taskStatus = 'Aww, this is bad. Please try again.';
        this.taskMessage = 'task-failure';
      }
    }
  },
  mounted() {
    window.addEventListener("keypress", this.playKey);
    window.addEventListener("keyup", this.disableActiveClass);
  }
}
</script>

<style scoped>
.piano-container, .keys-wrapper, .white-keys-wrapper, .black-keys-wrapper, .white-key, .black-key {
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
  color: black;
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
  color: #fffff0;
  background-color: black;
  width: 30px;
  height: 120px;
  border-radius: 0 0 5px 5px;
  font-weight: bold;
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

.input-container {
  margin-top: 30px;
}

.task-success {
  color: green;
}

.task-failure {
  color: red;
}
</style>
