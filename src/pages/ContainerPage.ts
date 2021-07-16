import Component from '../components/Component';
import IComponent from '../components/IComponent';
import GameMenuToggleButton from '../components/shared/GameMenuToggleButton';
import GameMenu from '../components/shared/GameMenu';
import GameHeader from '../components/shared/GameHeader';
import GameFooter from '../components/shared/GameFooter';

import Constants from '../util/constants';

import Events from '../util/Events';
import ErrorMessage from '../components/shared/ErrorMessage';

export default class ContainerPage extends Component {
  gameToggleCheckbox: IComponent;
  gameToggleButton: IComponent;
  gameMenu: GameMenu;
  gameHeader: IComponent;
  contentWrap: IComponent;
  footer: IComponent;
  innerContainer: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.container]);
    this.gameToggleCheckbox = new Component(
      global,
      this,
      'input',
      [Constants.CSSClasses.gameMenuToggleCheckbox],
      { type: 'checkbox' }
    );
    this.gameToggleButton = new GameMenuToggleButton(global, this);
    this.gameMenu = new GameMenu(global, this);
    this.innerContainer = new Component(global, this, 'div', [
      Constants.CSSClasses.innerContainer,
    ]);
    this.gameHeader = new GameHeader(global, this.innerContainer);
    this.contentWrap = new Component(global, this.innerContainer, 'div', [
      Constants.CSSClasses.contentWrap,
    ]);
    this.footer = new GameFooter(global, this.innerContainer);
    Events.routeChange.add(this.handleRouteChange);
    this.addEventListeners();
  }

  private showError(text: string): void {
    const error = new ErrorMessage(this.global, text);
    error.attachTo(this.contentWrap);
  }

  async init(): Promise<void> {
    await this.gameMenu.init();
  }

  addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  private handleRouteChange: () => Promise<void> = async () => {
    (this.gameToggleCheckbox.element as HTMLInputElement).checked = false;
  };

  handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (
      !target.closest(`.${Constants.CSSClasses.gameMenu}`) &&
      target !== this.gameToggleCheckbox.element
    ) {
      (this.gameToggleCheckbox.element as HTMLInputElement).checked = false;
    }
  };
}
