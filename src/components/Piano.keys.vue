<template>
  <div class="container">
    <div class="keys-wrapper">
      <div class="white-keys-wrapper">
        <div class="white-key">C</div>
        <div class="white-key">D</div>
        <div class="white-key">E</div>
        <div class="white-key">F</div>
        <div class="white-key">G</div>
        <div class="white-key">A</div>
        <div class="white-key">B</div>
      </div>
      <div class="black-keys-wrapper">
        <div class="black-key"></div>
        <div class="black-key"></div>
        <div class="black-key"></div>
        <div class="black-key"></div>
        <div class="black-key"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Tone from 'tone';

export default {
  name: 'Piano.keys',
  data() {
    const synth = new Tone.Synth().toDestination();
    return {
      synth,
    }
  },
  methods: {
    playKey(event) {
      let key = String.fromCharCode(event.keyCode).toLowerCase();
      switch (key) {
        case 's': {
          return this.playKeyC4();
        } case 'd':
          return this.playKeyD4();
        case 'f':
          return this.playKeyE4();
        case 'g':
          return this.playKeyF4();
        case 'h':
          return this.playKeyG4();
        case 'j':
          return this.playKeyA4();
        case 'k':
          return this.playKeyB4();
        case 'e':
          return this.playKeyCsharp4();
        case 'r':
          return this.playKeyDsharp4();
        case 'y':
          return this.playKeyFsharp4();
        case 'u':
          return this.playKeyGsharp4();
        case 'i':
          return this.playKeyAsharp4();
        default:
          return null;
      }
    },
    playKeyC4() {
      this.synth.triggerAttackRelease('C4', '4n');
    },
    playKeyD4() {
      this.synth.triggerAttackRelease('D4', '4n');
    },
    playKeyE4() {
      this.synth.triggerAttackRelease('E4', '4n');
    },
    playKeyF4() {
      this.synth.triggerAttackRelease('F4', '4n');
    },
    playKeyG4() {
      this.synth.triggerAttackRelease('G4', '4n');
    },
    playKeyA4() {
      this.synth.triggerAttackRelease('A4', '4n');
    },
    playKeyB4() {
      this.synth.triggerAttackRelease('B4', '4n');
    },
    playKeyCsharp4() {
      this.synth.triggerAttackRelease('C#4', '4n');
    },
    playKeyDsharp4() {
      this.synth.triggerAttackRelease('D#4', '4n');
    },
    playKeyFsharp4() {
      this.synth.triggerAttackRelease('F#4', '4n');
    },
    playKeyGsharp4() {
      this.synth.triggerAttackRelease('G#4', '4n');
    },
    playKeyAsharp4() {
      this.synth.triggerAttackRelease('A#4', '4n');
    },
  },
  mounted() {
    window.addEventListener("keypress", this.playKey);
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

.active-key {
  background-color: seagreen;
  color: white;
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

</style>
