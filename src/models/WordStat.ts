import IWordStat from './IWordStat';
import ICard from './ICard';

export default class WordStat implements IWordStat {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;

  constructor(
    public category: string,
    { word, translation, image, audioSrc }: Omit<ICard, 'category'>,
    public training = 0,
    public right = 0,
    public wrong = 0
  ) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
  }

  [key: string]: string | number;
}
