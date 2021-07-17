import Component from '../Component';
import Constants from '../../util/constants';
import IComponent from '../IComponent';

export default class LoaderAnimation extends Component {
  loader: IComponent;
  overlay: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.loaderContainer]);
    this.overlay = new Component(global, this, 'div', [
      Constants.CSSClasses.overlay,
    ]);
    this.loader = new Component(global, this, 'div', [
      Constants.CSSClasses.loader,
    ]);
  }
}
