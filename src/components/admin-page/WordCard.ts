import IComponent from '../IComponent';
import Component from '../Component';

import WordCardContentNormal from './WordCardContentNormal';
import WordCardContentAdd from './WordCardContentAdd';
import WordCardContentEdit from './WordCardContentEdit';
import WordCardContentCreate from './WordCardContentCreate';

import ICard from '../../models/ICard';
import IWordCardDTO from '../../models/IWordCardDTO';

import Constants from '../../util/constants';

export default class WordCard extends Component {
  content: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    public category = '',
    public word = '',
    public translation = '',
    public audioSrc = '',
    public image = ''
  ) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.adminWordCard]);
    this.content = new WordCardContentNormal(
      global,
      this,
      category,
      word,
      translation,
      audioSrc,
      image
    );
  }

  setModeNormal({
    category = this.category,
    word = this.word,
    translation = this.translation,
    audioSrc = this.audioSrc,
    image = this.image,
  }: Partial<ICard>): void {
    this.element.innerHTML = '';
    this.content.remove();
    this.category = category;
    this.word = word;
    this.translation = translation;
    this.audioSrc = audioSrc;
    this.image = image;
    this.content = new WordCardContentNormal(
      this.global,
      this,
      category,
      word,
      translation,
      audioSrc,
      image
    );
  }

  setModeEdit({ category, word, translation }: IWordCardDTO): void {
    this.element.innerHTML = '';
    this.content.remove();
    this.category = category;
    this.word = word;
    this.translation = translation;
    this.content = new WordCardContentEdit(this.global, this, {
      category,
      word,
      translation,
    });
  }
  setModeCreate(): void {
    this.element.innerHTML = '';
    this.content.remove();
    this.content = new WordCardContentCreate(this.global, this, this.category);
  }

  setModeAdd(): void {
    this.element.innerHTML = '';
    this.content.remove();
    this.content = new WordCardContentAdd(this.global, this);
  }
}
