import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';
import AttributeRecord from '../../util/AttributeRecord';

export default class GameFooter extends Component {
  footerItems: IComponent;

  items: IComponent[] = [];

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.footer]);
    this.footerItems = new Component(global, this, 'ul', [
      Constants.CSSClasses.footerItems,
    ]);
    this.init();
  }

  init(): void {
    const courseItem = this.append('li', [Constants.CSSClasses.footerItem], {});
    courseItem.append(
      'a',
      [Constants.CSSClasses.footerLink, Constants.CSSClasses.footerLinkSchool],
      { href: Constants.SCHOOL_LINK }
    );
    const yearItem = this.append(
      'li',
      [Constants.CSSClasses.footerItem, Constants.CSSClasses.footerItemYear],
      {}
    );
    yearItem.textContent = String(Constants.YEAR);
    const githubItem = this.append('li', [Constants.CSSClasses.footerItem], {});
    githubItem.append(
      'a',
      [Constants.CSSClasses.footerLink, Constants.CSSClasses.footerLinkGithub],
      { href: Constants.GITHUB_LINK }
    );
  }

  append(
    tagName: string,
    classList: string[],
    attributes: AttributeRecord
  ): IComponent {
    const item = this.footerItems.append(tagName, classList, attributes);
    this.items.push(item);
    return item;
  }
}
