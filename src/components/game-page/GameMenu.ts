import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import AttributeRecord from '../../util/AttributeRecord';

class GameMenu extends Component {
  menuTitle: IComponent;

  menuItemsWrap: Component;

  menuList: IComponent;

  menuItems: IComponent[] = [];

  loginButton: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'aside', [Constants.CSSClasses.gameMenu]);
    this.menuItemsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.gameMenuItemsWrap,
    ]);
    this.menuTitle = new Component(global, this.menuItemsWrap, 'div', [
      Constants.CSSClasses.gameMenuTitle,
    ]);
    this.menuList = new Component(global, this.menuItemsWrap, 'ul', [
      Constants.CSSClasses.gameMenuList,
    ]);
    this.loginButton = new Component(global, this.menuItemsWrap, 'a', [
      Constants.CSSClasses.gameMenuLogin,
    ]);
    this.loginButton.textContent = Constants.Labels.login;

    this.init();
  }

  init(): void {
    const actionA = this.append();
    actionA.textContent = 'Action (set A)';
    const actionB = this.append();
    actionB.textContent = 'Action (set B)';
    const actionC = this.append();
    actionC.textContent = 'Action (set C)';
    const adjective = this.append();
    adjective.textContent = 'Adjective';
    const animalA = this.append();
    animalA.textContent = 'Animal (set A)';
    const animalB = this.append();
    animalB.textContent = 'Animal (set B)';
  }

  append(
    tagName: string = 'a',
    classList: string[] = [Constants.CSSClasses.gameMenuItem],
    attributes: AttributeRecord = { href: '' }
  ): IComponent {
    const item = this.menuList.append(tagName, classList, attributes);
    this.menuItems.push(item);
    return item;
  }
}

export default GameMenu;
