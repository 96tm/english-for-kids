import IWordCardDTO from './IWordCardDTO';

export default class WordCardDTO implements IWordCardDTO {
  constructor(
    public category = '',
    public word = '',
    public translation = '',
    public audio?: File,
    public image?: File
  ) {}
}
