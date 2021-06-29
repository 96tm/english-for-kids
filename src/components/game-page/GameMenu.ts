import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import AttributeRecord from '../../util/AttributeRecord';

class GameMenu extends Component {
  menuTitle: IComponent;

  menuItemsWrap: Component;

  menuList: IComponent;

  menuItems: IComponent[] = [];

  menuLinks: IComponent[] = [];

  activeItem: IComponent;

  loginButton: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'aside', [Constants.CSSClasses.gameMenu]);
    this.menuItemsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.gameMenuItemsWrap,
    ]);
    this.menuTitle = new Component(
      global,
      this.menuItemsWrap,
      'a',
      [
        Constants.CSSClasses.gameMenuTitle,
        Constants.CSSClasses.gameMenuLink,
        Constants.CSSClasses.active,
      ],
      { href: '' }
    );
    this.menuTitle.textContent = Constants.Labels.mainMenu;
    this.activeItem = this.menuTitle;
    this.menuList = new Component(global, this.menuItemsWrap, 'ul', [
      Constants.CSSClasses.gameMenuList,
    ]);
    this.loginButton = new Component(
      global,
      this.menuItemsWrap,
      'a',
      [Constants.CSSClasses.gameMenuLogin],
      { href: '' }
    );
    this.loginButton.textContent = Constants.Labels.login;
  }

  async init(): Promise<void> {
    const categories = await fetch('../../images.json').then((response) =>
      response.json()
    );
    Object.keys(categories).forEach((key) => {
      const action = this.append();
      action.textContent = key;
    });
  }

  append(
    tagName: string = 'a',
    classList: string[] = [Constants.CSSClasses.gameMenuLink],
    attributes: AttributeRecord = { href: '' }
  ): IComponent {
    const li = new Component(this.global, this.menuList, 'li', [
      Constants.CSSClasses.gameMenuItem,
    ]);
    const link = li.append(tagName, classList, attributes);
    this.menuItems.push(li);
    this.menuLinks.push(link);
    return link;
  }
}

export default GameMenu;
