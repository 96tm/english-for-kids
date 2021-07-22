import Controller from './Controller';

import IComponent from '../components/IComponent';

import LoginPage from '../pages/LoginPage';

import LoginInfo from '../models/LoginInfo';

import Events from '../util/Events';
import Constants from '../util/constants';
import userService from '../util/UserService';
import RouterService from '../util/RouterService';

export default class LoginController extends Controller {
  component: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent | null,
    private loaderAnimation: IComponent
  ) {
    super();
    this.component = new LoginPage(global, rootComponent);
    Events.loginShow.add(this.handleLoginShow);
    Events.loginAttempt.add(this.handleLoginAttempt);
    Events.loginErrorShow.add(this.handleLoginErrorShow);
  }

  private handleLoginErrorShow: (data: string) => Promise<void> = async (
    data
  ) => {
    (this.component as LoginPage).showError(data);
  };

  private handleLoginAttempt: (loginInfo: LoginInfo) => Promise<void> = async (
    loginInfo
  ) => {
    this.loaderAnimation.render();
    const loginResult = await userService.login({ ...loginInfo });
    if (loginResult) {
      this.hide();
      RouterService.setHash(Constants.Labels.adminCategoriesRoute);
    }
    this.loaderAnimation.render();
  };

  private handleLoginShow: () => Promise<void> = async () => {
    this.show();
  };
}
