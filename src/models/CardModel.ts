import ICard from './ICard';

import Constants from '../util/constants';

export default class CardModel implements ICard {
  audio: HTMLAudioElement;
  image: string;
  audioSrc: string;

  constructor(
    public category: string,
    public word: string,
    public translation: string,
    image = '',
    audioSrc = ''
  ) {
    this.image = `${Constants.HOMEPAGE}/public/${image}`;
    this.audioSrc = `${Constants.HOMEPAGE}/public/${audioSrc}`;
    this.audio = new Audio(this.audioSrc);
  }

  async playCardAudio(): Promise<void> {
    this.audio.currentTime = 0;
    return new Promise((resolve) => {
      this.audio.addEventListener(
        'ended',
        () => {
          resolve();
        },
        { once: true }
      );
      this.audio.play();
    });
  }
}
