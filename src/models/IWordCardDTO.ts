interface IWordCardDTO {
  category: string;
  word: string;
  translation: string;
  audio?: File;
  image?: File;
}
export default IWordCardDTO;
