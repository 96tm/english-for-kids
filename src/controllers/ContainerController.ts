import Controller from './Controller';

import IComponent from '../components/IComponent';
import ContainerPage from '../pages/ContainerPage';
import FinishScreen from '../components/game-page/FinishScreen';

import Events from '../util/Events';

import Constants from '../util/constants';

import IGameFinishedRecord from '../models/IGameFinishedRecord';
import Api from '../util/Api';
import ICategoryDTO from '../models/ICategoryDTO';

export default class ContainerController extends Controller {
  component: IComponent;

  constructor(private global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new ContainerPage(global, rootComponent);
    Events.menuClick.add(this.handleMenuClick);
    Events.finishScreenShow.add(this.showFinishScreen);
    Events.login.add(this.handleLogin);
    Events.logout.add(this.handleLogout);
    Events.gameErrorShow.add(this.handleShowError);
  }

  async show(): Promise<void> {
    await this.init();
    super.show();
  }

  private handleShowError: (text: string) => Promise<void> = async (text) => {
    (this.component as ContainerPage).showError(text);
  };

  private handleLogout: () => Promise<void> = async () => {
    await this.show();
  };

  private handleLogin: (login: string) => Promise<void> = async (login) => {
    this.hide();
  };

  private handleMenuClick: (menuItem: string) => Promise<void> = async (
    menuItem
  ) => {
    const { gameMenu } = this.component as ContainerPage;
    gameMenu.setActiveMenuItem(menuItem);
  };

  async init(): Promise<void> {
    let categories: ICategoryDTO[] = [];
    try {
      categories = await Api.getAllCategories().then((response) =>
        response.json()
      );
    } catch (err) {
      Events.gameErrorShow.emit(Constants.Labels.connectionProblem);
    }
    (this.component as ContainerPage).init(categories);
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
