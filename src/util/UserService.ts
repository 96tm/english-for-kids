import Api from './Api';
import Events from './Events';
import Constants from './constants';
import ILoginDTO from '../models/ILoginDTO';
import LoginInfo from '../models/LoginInfo';

class UserService {
  isAuthenticated = false;

  async login({ login: loginString, password }: LoginInfo): Promise<boolean> {
    try {
      const response = await Api.login(loginString, password);
      if (response.ok) {
        const { message, token }: ILoginDTO = await response.json();
        localStorage.setItem('token', token);
        Events.adminMessageShow.emit(message);
        Events.login.emit(loginString);
        this.isAuthenticated = true;
        return true;
      }
      const error = await response.json();
      Events.loginErrorShow.emit(error.message);
    } catch (err) {
      Events.loginErrorShow.emit(Constants.Labels.noServerResponse);
    }
    return false;
  }

  removeAuthData(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  async logout(): Promise<void> {
    try {
      await Api.logout();
      Events.gameMessageShow.emit('Logged out');
    } catch (err) {
      Events.gameErrorShow.emit(Constants.Labels.noServerResponse);
    } finally {
      this.removeAuthData();
    }
  }
}
const userService = new UserService();
export default userService;
