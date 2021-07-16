import Component from '../Component';
import IComponent from '../IComponent';
import Constants from '../../util/constants';

export default abstract class BaseCategoryCardContent extends Component {
  buttonsWrap: IComponent;

  constructor(global: Window, rootComponent: IComponent, classes: string[]) {
    super(global, rootComponent, 'div', classes);
    this.buttonsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardButtonsWrap,
    ]);
  }

  protected createButtonCancel(): IComponent {
    const button = new Component(this.global, this.buttonsWrap, 'button', [
      Constants.CSSClasses.adminCategoryCardButtonCancel,
    ]);
    button.textContent = Constants.Labels.adminCategoryCardButtonCancel;
    return button;
  }
}
