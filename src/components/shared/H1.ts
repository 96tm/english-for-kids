import Component from '../Component';
import Constants from '../../util/constants';

export default class H1 extends Component {
  constructor(global: Window, rootComponent: Component, text: string) {
    super(global, rootComponent, 'h1', [Constants.CSS_CLASSES.h1]);
    this.setTextContent(text);
  }
}
