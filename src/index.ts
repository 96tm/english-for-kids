import './assets/css/base.scss';

import GameController from './controllers/GameController';

import RouterService from './util/RouterService';
import Component from './components/Component';
import Constants from './util/constants';
import ContainerController from './controllers/ContainerController';
import MainPageController from './controllers/MainPageController';
import ContainerPage from './pages/ContainerPage';
import StatisticsController from './controllers/StatisticsController';
import StatsService from './util/StatsService';
import LoginController from './controllers/LoginController';
import AdminController from './controllers/AdminController';
import AdminCategoriesController from './controllers/AdminCategoriesController';
import AdminContainerPage from './pages/AdminContainerPage';
import AdminWordsController from './controllers/AdminWordsController';

(async () => {
  const global = window;
  const statsService = new StatsService(global);
  const root = new Component(global, null, 'div', [Constants.CSSClasses.root]);
  root.render();

  const containerController = new ContainerController(global, root);
  await containerController.init();

  const loginController = new LoginController(
    global,
    containerController.component
  );

  const gameController = new GameController(
    global,
    (containerController.component as ContainerPage).contentWrap
  );
  await gameController.init();

  const mainPageController = new MainPageController(
    global,
    (containerController.component as ContainerPage).contentWrap
  );

  const statisticsController = new StatisticsController(
    global,
    (containerController.component as ContainerPage).contentWrap
  );

  const adminController = new AdminController(global, root);
  const adminCategoriesController = new AdminCategoriesController(
    global,
    (adminController.component as AdminContainerPage).container
  );
  const adminWordsController = new AdminWordsController(
    global,
    (adminController.component as AdminContainerPage).container
  );

  await RouterService.init({
    [Constants.Labels.gameRoute]: gameController,
    [Constants.Labels.mainRoute]: mainPageController,
    [Constants.Labels.statsRoute]: statisticsController,
    [Constants.Labels.adminRoute]: adminController,
    [Constants.Labels.adminWordsRoute]: adminWordsController,
    [Constants.Labels.adminCategoriesRoute]: adminCategoriesController,
  });
  await RouterService.showRoute(Constants.Labels.mainRoute);
  await mainPageController.init();
})();
