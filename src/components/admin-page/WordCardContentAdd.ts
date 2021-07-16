import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import Events from '../../util/Events';
import WordCardButton from '../../models/WordCardButton';
import WordInfo from '../../models/WordInfo';
import WordCardDTO from '../../models/WordCardDTO';

export default class WordCardContentAdd extends Component {
  heading: IComponent;
  buttonAdd: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminWordCardContentAdd,
    ]);
    this.heading = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordCardHeading,
    ]);
    this.heading.textContent = Constants.Labels.adminCreateWordCardHeading;
    this.heading.textContent = Constants.Labels.adminCreateWordCardHeading;
    this.buttonAdd = new Component(global, this, 'button', [
      Constants.CSSClasses.adminCreateWordCardButton,
    ]);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  private removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (target === this.buttonAdd.element) {
      Events.wordCardClick.emit({
        button: WordCardButton.add,
        wordInfo: new WordCardDTO(),
      });
    }
  };
}
