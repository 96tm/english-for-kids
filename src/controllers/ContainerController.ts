import Controller from './Controller';
import IComponent from '../components/IComponent';
import FinishScreen from '../components/game-page/FinishScreen';
import ContainerPage from '../pages/ContainerPage';
import Events from '../util/Events';
import Constants from '../util/constants';
import IGameFinishedRecord from '../models/IGameFinishedRecord';

export default class ContainerController extends Controller {
  component: ContainerPage;

  constructor(private global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new ContainerPage(global, rootComponent);
    Events.menuClick.add(this.handleMenuClick);
    Events.finishScreenShow.add(this.showFinishScreen);
  }

  private handleMenuClick: (menuItem: string) => void = (menuItem) => {
    const { gameMenu } = this.component;
    gameMenu.setActiveMenuItem(menuItem);
  };

  async init(): Promise<void> {
    await this.component.init();
  }

  showFinishScreen: ({ message, isWin }: IGameFinishedRecord) => Promise<void> =
    async ({ message, isWin }) => {
      this.component.element.classList.add(Constants.CSS_CLASSES.hidden);
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
      this.component.element.classList.remove(Constants.CSS_CLASSES.hidden);
    };
}
