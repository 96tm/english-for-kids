import Controller from './Controller';

import IComponent from '../components/IComponent';

import MainPage from '../pages/MainPage';

import ICategoryDTO from '../models/ICategoryDTO';

import Api from '../util/Api';
import Events from '../util/Events';
import Constants from '../util/constants';

export default class MainPageController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new MainPage(global, rootComponent);
  }

  async init(): Promise<void> {
    let categories: ICategoryDTO[] = [];
    try {
      categories = await Api.getAllCategories().then((response) =>
        response.json()
      );
    } catch (err) {
      Events.gameErrorShow.emit(Constants.Labels.connectionProblem);
    }
    (this.component as MainPage).init(categories);
  }

  async show(): Promise<void> {
    await this.init();
    super.show();
  }
}
