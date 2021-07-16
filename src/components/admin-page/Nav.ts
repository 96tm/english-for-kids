import Component from '../Component';
import IComponent from '../IComponent';
import Constants from '../../util/constants';
import NavItem from './NavItem';
import Events from '../../util/Events';

export default class Nav extends Component {
  navList: IComponent;
  navItems: IComponent[] = [];
  categoriesItem: IComponent;
  wordsItem: IComponent;
  logoutItem: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'nav', [
      Constants.CSSClasses.adminNav,
      Constants.CSSClasses.adminNavMixin,
    ]);
    this.navList = new Component(global, this, 'ul', [
      Constants.CSSClasses.adminNavList,
    ]);
    this.categoriesItem = new NavItem(
      this.global,
      this.navList,
      Constants.Labels.category,
      `#${Constants.Labels.adminCategoriesRoute}`
    );
    this.wordsItem = new Component(global, this.navList, 'li', [
      Constants.CSSClasses.adminNavItemInactive,
    ]);
    this.wordsItem.textContent = Constants.Labels.words;
    this.logoutItem = this.createLogoutItem();
    this.navItems = [this.categoriesItem, this.wordsItem, this.logoutItem];
    this.addEventListeners();
    Events.routeChange.add(this.handleRouteChange);
  }

  private handleRouteChange: (route: string) => Promise<void> = async (
    route
  ) => {
    if (route === Constants.Labels.adminCategoriesRoute) {
      this.activateItem(this.categoriesItem);
    } else if (
      route.split('/').slice(-1)[0] === Constants.Labels.adminWordsRoute
    ) {
      this.activateItem(this.wordsItem);
    }
  };

  private addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (target === (this.logoutItem as NavItem).navLink.element) {
      Events.logout.emit();
    }
  };

  private createLogoutItem(): IComponent {
    const logoutItem = new NavItem(
      this.global,
      this.navList,
      Constants.Labels.logout,
      `#${Constants.Labels.mainRoute}`
    );
    return logoutItem;
  }

  private activateItem(itemToActivate: IComponent): void {
    this.navItems.forEach((item) => {
      if (item === itemToActivate) {
        item.element.classList.add(Constants.CSSClasses.active);
      } else {
        item.element.classList.remove(Constants.CSSClasses.active);
      }
    });
  }
}
