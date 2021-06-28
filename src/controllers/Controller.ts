import IController from './IController';
import IComponent from '../components/IComponent';

export default abstract class Controller implements IController {
  abstract component: IComponent;

  show(): void {
    this.component.render();
  }

  hide(): void {
    this.component.remove();
  }
}
