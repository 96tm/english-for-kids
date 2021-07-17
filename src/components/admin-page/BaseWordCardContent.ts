import Component from '../Component';
import IComponent from '../IComponent';
import Constants from '../../util/constants';
import TextInput from './TextInput';
import FileInput from './FileInput';

export default abstract class BaseWordCardContent extends Component {
  buttonsWrap: IComponent;

  constructor(global: Window, rootComponent: IComponent, classes: string[]) {
    super(global, rootComponent, 'div', classes);
    this.buttonsWrap = new Component(global, this, 'div', [
      Constants.CSSClasses.adminCategoryCardButtonsWrap,
    ]);
  }

  protected static checkInputs(
    ...components: Array<TextInput | FileInput>
  ): boolean {
    return components.reduce(
      (result: boolean, component) => result && Boolean(component.value),
      true
    );
  }
}
