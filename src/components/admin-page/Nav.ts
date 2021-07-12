import Component from '../Component';
import IComponent from '../IComponent';
import Constants from '../../util/constants';
import NavItem from './NavItem';
import Events from '../../util/Events';

export default class Nav extends Component {
  navList: IComponent;
  navItems: IComponent[];
  logoutItem: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'nav', [
      Constants.CSSClasses.adminNav,
      Constants.CSSClasses.adminNavMixin,
    ]);
    this.navList = new Component(global, this, 'ul', [
      Constants.CSSClasses.adminNavList,
    ]);
    this.navItems = this.createNavItems();
    this.logoutItem = this.createLogoutItem();
    this.addEventListeners();
  }

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
    this.navItems.push(logoutItem);
    return logoutItem;
  }

  private createNavItems(): IComponent[] {
    const categoriesItem = new NavItem(
      this.global,
      this.navList,
      Constants.Labels.category,
      `#${Constants.Labels.adminCategoriesRoute}`
    );
    const wordsItem = new NavItem(
      this.global,
      this.navList,
      Constants.Labels.words,
      `#${Constants.Labels.adminWordsRoute}`
    );
    return [categoriesItem, wordsItem];
  }
}
