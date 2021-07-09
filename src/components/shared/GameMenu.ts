import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import AttributeRecord from '../../util/AttributeRecord';
import Events from '../../util/Events';

export default class GameMenu extends Component {
  menuTitle: IComponent;

  menuItemsWrap: Component;

  menuList: IComponent;

  menuItems: IComponent[] = [];

  menuLinks: IComponent[] = [];

  activeItem: IComponent;

  loginButton: IComponent;

  menuStats: IComponent;

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
      { href: '#main', 'data-menu-link-title': Constants.Labels.mainMenu }
    );
    this.menuTitle.textContent = Constants.Labels.mainMenu;

    this.menuStats = new Component(
      global,
      this.menuItemsWrap,
      'a',
      [Constants.CSSClasses.gameMenuStats, Constants.CSSClasses.gameMenuLink],
      { href: '#stats', 'data-menu-link-title': Constants.Labels.stats }
    );
    this.menuStats.textContent = Constants.Labels.stats;

    this.activeItem = this.menuTitle;
    this.activeItem.element.classList.add(Constants.CSSClasses.active);
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
    this.menuLinks.push(this.menuTitle, this.menuStats);
    this.addEventListeners();
  }

  async init(): Promise<void> {
    const categories = await fetch(`${Constants.HOMEPAGE}/public/cards.json`, {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());
    Object.keys(categories).forEach((key) => {
      const action = this.append('a', [Constants.CSSClasses.gameMenuLink], {
        href: '#game',
        'data-menu-link-title': key,
      });
      action.textContent = key;
    });
  }

  addEventListeners(): void {
    this.menuItemsWrap.element.addEventListener('click', this.handleMenuClick);
  }

  private handleMenuClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(Constants.CSSClasses.gameMenuLink)) {
      const menuLinkTitle = target.dataset.menuLinkTitle as string;
      if (
        target.classList.contains(Constants.CSSClasses.gameMenuTitle) ||
        target.classList.contains(Constants.CSSClasses.gameMenuStats)
      ) {
        this.setActiveMenuItem(menuLinkTitle);
      } else {
        Events.menuClick.emit(target.dataset.menuLinkTitle as string);
      }
    } else if (target.classList.contains(Constants.CSSClasses.gameMenuLogin)) {
      throw Error('Not implemented');
    }
  };

  setActiveMenuItem(itemName: string): void {
    this.activeItem.element.classList.remove(Constants.CSSClasses.active);
    this.activeItem = this.menuLinks.find(
      (link) => link.element.dataset.menuLinkTitle === itemName
    ) as IComponent;
    this.activeItem.element.classList.add(Constants.CSSClasses.active);
  }

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
