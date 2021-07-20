import Component from '../components/Component';
import IComponent from '../components/IComponent';
import Nav from '../components/admin-page/Nav';
import GameFooter from '../components/shared/GameFooter';
import ErrorMessage from '../components/shared/ErrorMessage';
import InfoMessage from '../components/shared/InfoMessage';

import Constants from '../util/constants';
import Events from '../util/Events';

export default class AdminContainerPage extends Component {
  nav: IComponent;
  container: IComponent;
  footer: IComponent;
  errorContainer: IComponent;

  constructor(public global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.adminContainer]);
    this.nav = new Nav(global, this);
    this.container = new Component(global, this, 'div', [
      Constants.CSSClasses.adminContent,
    ]);
    this.errorContainer = new Component(global, this.container, 'div', [
      Constants.CSSClasses.errorContainer,
    ]);
    this.footer = new GameFooter(global, this);
  }

  showError(text: string): void {
    const error = new ErrorMessage(this.global, text);
    error.attachTo(this.errorContainer as IComponent);
  }

  showInfoMessage(text: string): void {
    const message = new InfoMessage(this.global, text);
    message.attachTo(this.errorContainer as IComponent);
  }
}
