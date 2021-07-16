import Controller from './Controller';

import IComponent from '../components/IComponent';

import LoginPage from '../pages/LoginPage';
import Events from '../util/Events';
import LoginInfo from '../models/LoginInfo';
import RouterService from '../util/RouterService';
import Constants from '../util/constants';
import Api from '../util/Api';
import userService from '../util/UserService';

export default class LoginController extends Controller {
  component: IComponent;

  constructor(private global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new LoginPage(global, rootComponent);
    Events.loginShow.add(this.handleLoginShow);
    Events.loginAttempt.add(this.handleLoginAttempt);
  }

  private handleLoginAttempt: (loginInfo: LoginInfo) => Promise<void> = async (
    loginInfo
  ) => {
    const authResult = await this.validate();
    if (authResult) {
      this.hide();
      Events.login.emit(loginInfo.login);
      userService.login();
      RouterService.setHash(Constants.Labels.adminCategoriesRoute);
    }
  };

  private async validate(): Promise<boolean> {
    const { login, password } = (this.component as LoginPage).getLoginData();
    const response = await Api.login(login, password);
    return response.ok;
  }

  private handleLoginShow: () => Promise<void> = async () => {
    this.show();
  };
}
