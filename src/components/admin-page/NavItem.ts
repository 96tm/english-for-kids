import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default class NavItem extends Component {
  navLink: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    text: string,
    href: string
  ) {
    super(global, rootComponent, 'li', [Constants.CSSClasses.adminNavItem]);
    this.navLink = new Component(
      global,
      this,
      'a',
      [Constants.CSSClasses.adminNavLink],
      { href }
    );
    this.navLink.textContent = text;
  }
}
