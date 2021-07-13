import IComponent from '../components/IComponent';

import Controller from './Controller';
import AdminWordsPage from '../pages/AdminWordsPage';

export default class AdminWordsController extends Controller {
  component: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super();
    this.component = new AdminWordsPage(global, rootComponent);
  }
}
