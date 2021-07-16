import Component from '../Component';
import IComponent from '../IComponent';
import Constants from '../../util/constants';
import Events from '../../util/Events';
import CategoryCardButton from '../../models/CategoryCardButton';

export default class CategoryCardContentAdd extends Component {
  heading: IComponent;
  buttonAdd: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [
      Constants.CSSClasses.adminCategoryCardContentAdd,
    ]);
    this.heading = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardHeading,
    ]);
    this.heading.textContent = Constants.Labels.adminCreateCategoryCardHeading;
    this.buttonAdd = new Component(global, this, 'button', [
      Constants.CSSClasses.adminCreateCategoryCardButton,
    ]);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.buttonAdd.element.addEventListener('click', this.handleClick);
  }

  private removeEventListeners(): void {
    this.buttonAdd.element.removeEventListener('click', this.handleClick);
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (target === this.buttonAdd.element) {
      Events.categoryCardClick.emit({
        button: CategoryCardButton.add,
        name: '',
        newName: '',
      });
    }
  };
}
