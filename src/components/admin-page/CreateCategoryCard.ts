import Component from '../Component';
import IComponent from '../IComponent';
import Constants from '../../util/constants';

export default class CreateCategoryCard extends Component {
  heading: IComponent;
  buttonAdd: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminCategoryCard,
    ]);
    this.heading = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardHeading,
    ]);
    this.heading.textContent = Constants.Labels.adminCreateCategoryCardHeading;
    this.buttonAdd = new Component(global, this, 'button', [
      Constants.CSSClasses.adminCreateCategoryCardButton,
    ]);
  }
}
