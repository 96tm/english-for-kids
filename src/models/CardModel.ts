import ICard from './ICard';

import Constants from '../util/constants';

export default class CardModel implements ICard {
  audio: HTMLAudioElement;

  constructor(
    public category: string,
    public word: string,
    public translation: string,
    public image: string = '',
    public audioSrc: string = ''
  ) {
    this.audio = new Audio(`${Constants.HOMEPAGE}/public/${this.audioSrc}`);
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
