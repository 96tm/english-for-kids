import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import AttributeRecord from '../../util/AttributeRecord';
import Events from '../../util/Events';

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
      { href: '#main' }
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
    this.addEventListeners();
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

  addEventListeners(): void {
    this.menuItemsWrap.element.addEventListener('click', this.handleMenuClick);
  }

  private handleMenuClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (
      target.classList.contains(Constants.CSSClasses.gameMenuLink) ||
      target.classList.contains(Constants.CSSClasses.gameMenuLogin)
    ) {
      // event.preventDefault();
      Events.menuClick.emit(`'hehehey', ${target}, ${target.tagName}`);
    }
  };

  append(
    tagName = 'a',
    classList: string[] = [Constants.CSSClasses.gameMenuLink],
    attributes: AttributeRecord = { href: '#game' }
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
