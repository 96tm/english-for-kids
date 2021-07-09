import IWordStat from './IWordStat';

export default class WordStat implements IWordStat {
  constructor(
    public category: string,
    public word: string,
    public translation: string,
    public image: string,
    public audioSrc: string,
    public training = 0,
    public right = 0,
    public wrong = 0
  ) {}

  [key: string]: string | number;
}
