import Controller from './Controller';
import IComponent from '../components/IComponent';
import AdminContainerPage from '../pages/AdminContainerPage';

export default class AdminController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super();
    this.component = new AdminContainerPage(global, rootComponent);
  }
}
