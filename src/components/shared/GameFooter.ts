import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

import AttributeRecord from '../../util/AttributeRecord';

export default class GameFooter extends Component {
  footerItems: Component;
  items: Component[] = [];

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSS_CLASSES.footer]);
    this.footerItems = new Component(global, this, 'ul', [
      Constants.CSS_CLASSES.footerItems,
    ]);
    this.init();
  }

  init(): void {
    const courseItem = this.append(
      'li',
      [Constants.CSS_CLASSES.footerItem],
      {}
    );
    courseItem.append(
      'a',
      [
        Constants.CSS_CLASSES.footerLink,
        Constants.CSS_CLASSES.footerLinkSchool,
      ],
      { href: Constants.SCHOOL_LINK }
    );
    const yearItem = this.append(
      'li',
      [Constants.CSS_CLASSES.footerItem, Constants.CSS_CLASSES.footerItemYear],
      {}
    );
    yearItem.textContent = String(Constants.YEAR);
    const githubItem = this.append(
      'li',
      [Constants.CSS_CLASSES.footerItem],
      {}
    );
    githubItem.append(
      'a',
      [
        Constants.CSS_CLASSES.footerLink,
        Constants.CSS_CLASSES.footerLinkGithub,
      ],
      { href: Constants.GITHUB_LINK }
    );
  }

  append(
    tagName: string,
    classList: string[],
    attributes: AttributeRecord
  ): Component {
    const item = this.footerItems.append(
      tagName,
      classList,
      attributes
    ) as Component;
    this.items.push(item);
    return item;
  }
}
