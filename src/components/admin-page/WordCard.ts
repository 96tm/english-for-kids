import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import WordCardContentNormal from './WordCardContentNormal';
import WordCardContentAdd from './WordCardContentAdd';
import WordCardContentEdit from './WordCardContentEdit';
import WordCardContentCreate from './WordCardContentCreate';
import ICard from '../../models/ICard';
import IWordCardDTO from '../../models/IWordCardDTO';

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
    this.addEventListeners();
  }

  setModeNormal({ category, word, translation, audioSrc, image }: ICard): void {
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
    console.log('set create', this.category);

    this.content = new WordCardContentCreate(this.global, this, this.category);
  }

  setModeAdd(): void {
    this.element.innerHTML = '';
    this.content.remove();
    this.content = new WordCardContentAdd(this.global, this);
  }

  private addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
  };
}
