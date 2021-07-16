import IWordCardUpdateDTO from './IWordCardUpdateDTO';

export default class WordCardUpdateDTO implements IWordCardUpdateDTO {
  constructor(
    public category = '',
    public word = '',
    public translation = '',
    public newWord = '',
    public audio?: File,
    public image?: File
  ) {}
}
