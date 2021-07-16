import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';
import Nav from '../components/admin-page/Nav';
import GameFooter from '../components/shared/GameFooter';
import ErrorMessage from '../components/shared/ErrorMessage';

export default class AdminContainerPage extends Component {
  nav: IComponent;
  container: IComponent;
  footer: IComponent;
  errorContainer: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
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

  private showError(text: string): void {
    const error = new ErrorMessage(this.global, text);
    error.attachTo(this.errorContainer as IComponent);
  }
}
