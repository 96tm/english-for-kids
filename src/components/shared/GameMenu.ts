import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

import AttributeRecord from '../../util/AttributeRecord';

import Events from '../../util/Events';
import Api from '../../util/Api';

export default class GameMenu extends Component {
  menuTitle: IComponent;
  menuList: IComponent;
  menuItemsWrap: Component;
  activeItem: IComponent;
  loginButton: IComponent;
  menuStats: IComponent;
  menuItems: IComponent[] = [];
  menuLinks: IComponent[] = [];

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'aside', [Constants.CSS_CLASSES.gameMenu]);
    this.menuItemsWrap = new Component(global, this, 'div', [
      Constants.CSS_CLASSES.gameMenuItemsWrap,
    ]);
    this.menuTitle = this.initMenuTitle();
    this.menuStats = this.initMenuStats();
    this.activeItem = this.menuTitle;
    this.activeItem.element.classList.add(Constants.CSS_CLASSES.active);
    this.menuList = new Component(global, this.menuItemsWrap, 'ul', [
      Constants.CSS_CLASSES.gameMenuList,
    ]);
    this.loginButton = new Component(
      global,
      this.menuItemsWrap,
      'a',
      [Constants.CSS_CLASSES.gameMenuLogin],
      { href: '' }
    );
    this.loginButton.setTextContent(Constants.LABELS.login);
    this.menuLinks.push(this.menuTitle, this.menuStats);
    this.addEventListeners();
  }

  private initMenuStats(): IComponent {
    const menuStats = new Component(
      this.global,
      this.menuItemsWrap,
      'a',
      [Constants.CSS_CLASSES.gameMenuStats, Constants.CSS_CLASSES.gameMenuLink],
      { href: '#stats', 'data-menu-link-title': Constants.LABELS.stats }
    );
    menuStats.setTextContent(Constants.LABELS.stats);
    return menuStats;
  }

  private initMenuTitle(): IComponent {
    const menuTitle = new Component(
      this.global,
      this.menuItemsWrap,
      'a',
      [
        Constants.CSS_CLASSES.gameMenuTitle,
        Constants.CSS_CLASSES.gameMenuLink,
        Constants.CSS_CLASSES.active,
      ],
      { href: '#main', 'data-menu-link-title': Constants.LABELS.mainMenu }
    );
    menuTitle.setTextContent(Constants.LABELS.mainMenu);
    return menuTitle;
  }

  async init(): Promise<void> {
    const categories = await Api.getCategories().then((response) =>
      response.json()
    );
    Object.keys(categories).forEach((key) => {
      const action = this.append('a', [Constants.CSS_CLASSES.gameMenuLink], {
        href: '#game',
        'data-menu-link-title': key,
      });
      action.setTextContent(key);
    });
  }

  addEventListeners(): void {
    this.menuItemsWrap.element.addEventListener('click', this.handleMenuClick);
  }

  private handleMenuClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(Constants.CSS_CLASSES.gameMenuLink)) {
      const menuLinkTitle = target.dataset.menuLinkTitle as string;
      if (
        target.classList.contains(Constants.CSS_CLASSES.gameMenuTitle) ||
        target.classList.contains(Constants.CSS_CLASSES.gameMenuStats)
      ) {
        this.setActiveMenuItem(menuLinkTitle);
      } else {
        Events.menuClick.emit(target.dataset.menuLinkTitle as string);
      }
    } else if (target.classList.contains(Constants.CSS_CLASSES.gameMenuLogin)) {
      throw Error('Not implemented');
    }
  };

  setActiveMenuItem(itemName: string): void {
    this.activeItem.element.classList.remove(Constants.CSS_CLASSES.active);
    this.activeItem = this.menuLinks.find(
      (link) => link.element.dataset.menuLinkTitle === itemName
    ) as IComponent;
    this.activeItem.element.classList.add(Constants.CSS_CLASSES.active);
  }

  append(
    tagName = 'a',
    classList: string[] = [Constants.CSS_CLASSES.gameMenuLink],
    attributes: AttributeRecord = { href: '#game' }
  ): Component {
    const li = new Component(this.global, this.menuList, 'li', [
      Constants.CSS_CLASSES.gameMenuItem,
    ]);
    const link = li.append(tagName, classList, attributes);
    this.menuItems.push(li);
    this.menuLinks.push(link);
    return link;
  }
}
