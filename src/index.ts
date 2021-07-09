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

(async () => {
  const global = window;
  const statsService = new StatsService(global);
  const root = new Component(global, null, 'div', [Constants.CSSClasses.root]);
  const containerController = new ContainerController(global, root);
  await containerController.init();

  const gameController = new GameController(
    global,
    (containerController.component as ContainerPage).contentWrap
  );
  await gameController.init();

  root.render();

  const mainPageController = new MainPageController(
    global,
    (containerController.component as ContainerPage).contentWrap
  );

  const statisticsController = new StatisticsController(
    global,
    (containerController.component as ContainerPage).contentWrap
  );

  await RouterService.init({
    game: gameController,
    main: mainPageController,
    stats: statisticsController,
  });
  await RouterService.showRoute('main');
  await mainPageController.init();
})();
