import './assets/css/base.scss';

import GameController from './controllers/GameController';

import RouterService from './util/RouterService';

(async () => {
  const global = window;

  const gameController = new GameController(global, null);
  await gameController.init();
  RouterService.init({
    game: gameController,
  });
})();
