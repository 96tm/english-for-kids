import ICard from './ICard';

export default class WordInfo implements ICard {
  constructor(
    public category = '',
    public word = '',
    public translation = '',
    public audioSrc = '',
    public image = ''
  ) {}
}
