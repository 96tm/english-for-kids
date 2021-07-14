import Component from '../Component';
import IComponent from '../IComponent';
import Constants from '../../util/constants';

export default class CreateWordCard extends Component {
  heading: IComponent;
  buttonAdd: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.adminWordCard]);
    this.heading = new Component(global, this, 'div', [
      Constants.CSSClasses.adminWordCardHeading,
    ]);
    this.heading.textContent = Constants.Labels.adminCreateWordCardHeading;
    this.heading.textContent = Constants.Labels.adminCreateWordCardHeading;
    this.buttonAdd = new Component(global, this, 'button', [
      Constants.CSSClasses.adminCreateWordCardButton,
    ]);
  }
}
