interface IWordStat {
  [key: string]: string | number;
  word: string;
  translation: string;
  category: string;
  image: string;
  audioSrc: string;
  training: number;
  right: number;
  wrong: number;
}
export default IWordStat;
