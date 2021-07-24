import './assets/css/base.scss';
import Component from './components/Component';
import GameController from './controllers/GameController';
import MainPageController from './controllers/MainPageController';
import ContainerController from './controllers/ContainerController';
import StatisticsController from './controllers/StatisticsController';
import Constants from './util/constants';
import StatsService from './util/StatsService';
import RouterService from './util/RouterService';

(async () => {
  const global = window;
  const statsService = new StatsService(global);
  await statsService.init();
  const root = new Component(global, null, 'div', [Constants.CSS_CLASSES.root]);
  const containerController = new ContainerController(global, root);
  await containerController.init();

  const gameController = new GameController(
    global,
    containerController.component.contentWrap
  );
  await gameController.init();

  root.render();

  const mainPageController = new MainPageController(
    global,
    containerController.component.contentWrap
  );
  const statisticsController = new StatisticsController(
    global,
    containerController.component.contentWrap,
    statsService
  );

  await RouterService.init({
    game: gameController,
    main: mainPageController,
    stats: statisticsController,
  });
  await RouterService.showRoute('main');
  await mainPageController.init();
})();
