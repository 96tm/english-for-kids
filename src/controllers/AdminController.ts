import Controller from './Controller';
import IComponent from '../components/IComponent';
import AdminContainerPage from '../pages/AdminContainerPage';
import Events from '../util/Events';

export default class AdminController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super();
    this.component = new AdminContainerPage(global, rootComponent);
    Events.login.add(this.handleLogin);
    Events.logout.add(this.handleLogout);
  }

  private handleLogin: (login: string) => void = (loginInfo) => {
    this.show();
  };

  private handleLogout: () => void = () => {
    this.hide();
  };
}
