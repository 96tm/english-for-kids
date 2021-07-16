import IComponent from '../components/IComponent';

import Controller from './Controller';
import AdminWordsPage from '../pages/AdminWordsPage';
import Events from '../util/Events';
import Constants from '../util/constants';
import IWordCardDTO from '../models/IWordCardDTO';
import Api from '../util/Api';

export default class AdminWordsController extends Controller {
  component: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent | null,
    private category = ''
  ) {
    super();
    this.component = new AdminWordsPage(global, rootComponent);
    Events.routeChange.add(this.handleRouteChange);
    Events.wordCreate.add(this.handleWordCreate);
    Events.wordRemove.add(this.handleWordRemove);
  }

  private handleRouteChange: (route: string) => Promise<void> = async (
    route
  ) => {
    if (route.split('/').slice(-1)[0] === Constants.Labels.adminWordsRoute) {
      await this.init(route.split('/')[0]);
    }
  };

  private handleWordCreate: (wordInfo: IWordCardDTO) => Promise<void> = async (
    wordInfo
  ) => {
    await Api.createWord({ ...wordInfo });
    await (this.component as AdminWordsPage).init(wordInfo.category);
  };

  private handleWordRemove: (wordInfo: IWordCardDTO) => Promise<void> = async (
    wordInfo
  ) => {
    await Api.removeWord(wordInfo.category, wordInfo.word);
  };

  async init(category: string): Promise<void> {
    await (this.component as AdminWordsPage).init(category);
  }
}
