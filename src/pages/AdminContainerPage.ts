import Component from '../components/Component';
import IComponent from '../components/IComponent';

import Constants from '../util/constants';
import Nav from '../components/admin-page/Nav';

export default class AdminContainerPage extends Component {
  nav: IComponent;
  container: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.adminContainer]);
    this.nav = new Nav(global, this);
    this.container = new Component(global, this, 'div', [
      Constants.CSSClasses.adminContent,
    ]);
  }
}
