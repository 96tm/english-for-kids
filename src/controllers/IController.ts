import IComponent from '../components/IComponent';

export default interface IController {
  component: IComponent;

  show(): void;
  hide(): void;
}
