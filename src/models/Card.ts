import ICard from './ICard';

export default class CardModel implements ICard {
  constructor(
    public category = '',
    public word = '',
    public translation = '',
    public image = '',
    public audioSrc = ''
  ) {}
}
