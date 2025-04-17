export default class AudioManager {
  #whipAudio;
  #canOpeningAudio;
  #elevatorMusicAudio;

  #canPlayMusic;
  #canPlaySfx;

  constructor() {
    this.#whipAudio = this.#initAudio("/audio/whip.mp3");
    this.#canOpeningAudio = this.#initAudio("/audio/can_opening.mp3");
    this.#elevatorMusicAudio = this.#initAudio(
      "/audio/elevator_music.mp3",
      true
    );

    this.#canPlayMusic = true;
    this.#canPlaySfx = true;
  }

  setMusicEnabled(value) {
    this.#canPlayMusic = value;
  }

  setSfxEnabled(value) {
    this.#canPlaySfx = value;
  }

  playWhipSoundEffect() {
    if (this.#canPlaySfx) {
      this.#playAudio(this.#whipAudio);
    }
  }

  playCanOpeningSoundEffect() {
    if (this.#canPlaySfx) {
      this.#playAudio(this.#canOpeningAudio);
    }
  }

  playElevatorMusic() {
    if (this.#canPlayMusic) {
      this.#playAudio(this.#elevatorMusicAudio);
    }
  }

  #playAudio(audio) {
    const clip = audio.cloneNode();
    clip.play();
  }

  #initAudio(src, loop = false) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.preload = "auto";

    return audio;
  }
}
