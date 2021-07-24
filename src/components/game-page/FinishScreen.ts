import Component from '../Component';
import IComponent from '../IComponent';

import Constants from '../../util/constants';

export default class FinishScreen extends Component {
  message: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent,
    message: string,
    isWin: boolean
  ) {
    super(global, rootComponent, 'div', [Constants.CSS_CLASSES.finishScreen]);
    if (!isWin) {
      this.element.classList.add(Constants.CSS_CLASSES.finishScreenLose);
    }
    this.message = new Component(global, this, 'div', [
      Constants.CSS_CLASSES.finishScreenMessage,
    ]);
    this.message.setTextContent(message);
  }
}
