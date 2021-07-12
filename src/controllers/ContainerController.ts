import Controller from './Controller';

import IComponent from '../components/IComponent';
import ContainerPage from '../pages/ContainerPage';
import FinishScreen from '../components/game-page/FinishScreen';

import Events from '../util/Events';

import Constants from '../util/constants';

import IGameFinishedRecord from '../models/IGameFinishedRecord';

export default class ContainerController extends Controller {
  component: IComponent;

  constructor(private global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new ContainerPage(global, rootComponent);
    Events.menuClick.add(this.handleMenuClick);
    Events.finishScreenShow.add(this.showFinishScreen);
    Events.login.add(this.handleLogin);
    Events.logout.add(this.handleLogout);
  }

  private handleLogout: () => void = () => {
    this.show();
  };

  private handleLogin: (login: string) => void = (login) => {
    this.hide();
  };

  private handleMenuClick: (menuItem: string) => void = (menuItem) => {
    const { gameMenu } = this.component as ContainerPage;
    gameMenu.setActiveMenuItem(menuItem);
  };

  async init(): Promise<void> {
    ((await this.component) as ContainerPage).init();
  }

  showFinishScreen: ({ message, isWin }: IGameFinishedRecord) => Promise<void> =
    async ({ message, isWin }) => {
      this.component.element.classList.add(Constants.CSSClasses.hidden);
      const screen = new FinishScreen(
        this.global,
        this.component.rootComponent as IComponent,
        message,
        isWin
      );
      await new Promise((resolve) => {
        setTimeout(resolve, Constants.FINISH_SCREEN_DURATION);
      });
      screen.remove();
      this.component.element.classList.remove(Constants.CSSClasses.hidden);
    };
}
