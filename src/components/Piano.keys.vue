<template>
  <div>
    <div class="piano-container">
      <div class="keys-wrapper">
        <div class="white-keys-wrapper">
          <div
              v-for="key in whiteKeys"
              :key="key.note"
              class="white-key"
              :class="active[key.activeClass]"
          >
            {{key.note[0]}}
          </div>
        </div>
        <div class="black-keys-wrapper">
          <div
              v-for="key in blackKeys"
              :key="key.note"
              class="black-key"
              :class="active[key.activeClass]"
          >
            {{key.note}}
          </div>
        </div>
      </div>
    </div>
    <div class="input-container">
      <p class="subheading font-weight-regular">{{setChordInput}}</p>
      <v-btn
          round
          :disabled="disablePlayChordButton"
          @click="playInput"
      >
        Play Chord
      </v-btn>
      <v-btn
          round
          :disabled="disableClearAndCheckButtons"
          @click="clearInput"
      >
        Clear
      </v-btn>
      <v-btn
          round
          :disabled="disableClearAndCheckButtons"
          @click="checkInput"
      >
        Check
      </v-btn>
      <v-btn
          round
          @click="updateRedirect"
      >
        Update
      </v-btn>
      <p class="subheading font-weight-regular pt-3" :class="taskCompletionClass">{{taskStatus}}</p>
    </div>
  </div>
</template>

<script>
import * as Tone from 'tone';
import { musicNote, pianoKeys } from '@/constants/music.constants';

export default {
  name: 'Piano.keys',
  props: {
    octave: {
      type: String,
      required: true
    },
    taskGoal: {
      type: Array,
      required: true
    },
  },
  data() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    return {
      whiteKeys: [
        { note: musicNote.C, activeClass: pianoKeys.C },
        { note: musicNote.D, activeClass: pianoKeys.D },
        { note: musicNote.E, activeClass: pianoKeys.E },
        { note: musicNote.F, activeClass: pianoKeys.F },
        { note: musicNote.G, activeClass: pianoKeys.G },
        { note: musicNote.A, activeClass: pianoKeys.A },
        { note: musicNote.B, activeClass: pianoKeys.B },
        { note: musicNote.C2, activeClass: pianoKeys.C2 },
      ],
      blackKeys: [
        { note: musicNote.Csharp, activeClass: pianoKeys.Csharp },
        { note: musicNote.Dsharp, activeClass: pianoKeys.Dsharp },
        { note: musicNote.Fsharp, activeClass: pianoKeys.Fsharp },
        { note: musicNote.Gsharp, activeClass: pianoKeys.Gsharp },
        { note: musicNote.Asharp, activeClass: pianoKeys.Asharp },
      ],
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
      taskCompletionClass: ''
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
    },
    disablePlayChordButton() {
      return this.chordInput.length > 4 || this.chordInput.length < 1;
    },
    disableClearAndCheckButtons() {
      return this.chordInput.length === 0;
    }
  },
  methods: {
    playPiano(event) {
      let key = String.fromCharCode(event.keyCode).toLowerCase();
      switch (key) {
        case 'a':
          return this.playWhiteKey(musicNote.C);
        case 's':
          return this.playWhiteKey(musicNote.D);
        case 'd':
          return this.playWhiteKey(musicNote.E);
        case 'f':
          return this.playWhiteKey(musicNote.F);
        case 'g':
          return this.playWhiteKey(musicNote.G);
        case 'h':
          return this.playWhiteKey(musicNote.A);
        case 'j':
          return this.playWhiteKey(musicNote.B);
        case 'k':
          return this.playWhiteKey(musicNote.C2);
        case 'w':
          return this.playBlackKey(musicNote.Csharp);
        case 'e':
          return this.playBlackKey(musicNote.Dsharp);
        case 't':
          return this.playBlackKey(musicNote.Fsharp);
        case 'y':
          return this.playBlackKey(musicNote.Gsharp);
        case 'u':
          return this.playBlackKey(musicNote.Asharp);
        default:
          return null;
      }
    },
    playWhiteKey(key) {
      this.enableActiveClass('key' + key);
      let note = '';
      if (key === 'C2') {
        note = 'C' + (+this.octave + 1);
      } else {
        note = key + this.octave;
      }
      this.synth.triggerAttackRelease(note, '2n');
      this.addToChordInput(note);
    },
    playBlackKey(key) {
      this.enableActiveClass('key' + key[0] + 'sharp');
      const note = key + this.octave;
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
    },
    playInput() {
      if (this.chordInput.length < 6) {
        return this.synth.triggerAttackRelease(this.chordInput, '2n');
      }
      return this.chordInput = 'Play piano to complete your task.'
    },
    clearInput() {
      this.chordInput = [];
      this.taskStatus = null;
      this.taskCompletionClass = '';
    },
    checkInput() {
      const taskGoal = this.taskGoal.map((task) => task + this.octave);

      if (!this.chordInput.join(',').localeCompare(taskGoal.join(','))) {
        this.taskStatus = 'WELL DONE! Task successfully completed.';
        this.taskCompletionClass = 'task-success';
      } else {
        this.taskStatus = 'Aww, this is bad. Please try again.';
        this.taskCompletionClass = 'task-failure';
      }
    },
    updateRedirect() {
      this.$router.push({name: 'updateTasks', params: { taskID: this.$route.params.taskID}})
    }
  },
  mounted() {
    window.addEventListener("keypress", this.playPiano);
    window.addEventListener("keyup", this.disableActiveClass);
  },
  destroyed() {
    window.removeEventListener("keypress", this.playPiano);
    window.removeEventListener("keyup", this.disableActiveClass);
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
