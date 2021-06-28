import './assets/css/base.scss';

import GameController from './controllers/GameController';

import RouterService from './util/RouterService';

const global = window;

const gameController = new GameController(global, null);

RouterService.init({
  game: gameController,
});
