interface IWordCardUpdateDTO {
  word: string;
  category: string;
  translation: string;
  newWord?: string;
  audio?: File;
  image?: File;
}
export default IWordCardUpdateDTO;
