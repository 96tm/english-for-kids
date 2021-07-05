export default class CardModel {
  audio: HTMLAudioElement;

  constructor(
    public word: string,
    public translation: string,
    public image: string = '',
    public audioSrc: string = ''
  ) {
    this.audio = new Audio(`../public/${this.audioSrc}`);
  }

  playAudio(): void {
    this.audio.currentTime = 0;
    this.audio.play();
  }
}
