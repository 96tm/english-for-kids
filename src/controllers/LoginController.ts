import Controller from './Controller';

import IComponent from '../components/IComponent';

import LoginPage from '../pages/LoginPage';
import Events from '../util/Events';
import LoginInfo from '../models/LoginInfo';
import RouterService from '../util/RouterService';
import Constants from '../util/constants';

export default class LoginController extends Controller {
  component: IComponent;

  constructor(private global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new LoginPage(global, rootComponent);
    Events.loginShow.add(this.handleLoginShow);
    Events.loginAttempt.add(this.handleLoginAttempt);
  }

  private handleLoginAttempt: (loginInfo: LoginInfo) => void = (loginInfo) => {
    if (this.validate(loginInfo)) {
      this.hide();
      Events.login.emit(loginInfo.login);
      RouterService.setHash(Constants.Labels.adminCategoriesRoute);
    }
  };

  private validate(loginInfo: LoginInfo): boolean {
    return !!(this.component && loginInfo);
  }

  private handleLoginShow: () => void = () => {
    this.show();
  };
}
