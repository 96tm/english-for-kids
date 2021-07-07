import Signal from './Signal';
import GameMode from '../models/GameMode';
import IGameFinishedRecord from '../models/IGameFinishedRecord';

const menuClick = new Signal<string, void>();
const modeButtonClick = new Signal<string, void>();
const boardClick = new Signal<string, void>();
const routeChange = new Signal<string, void>();
const cardTurn = new Signal<string, void>();
const cardClick = new Signal<string, void>();
const gameModeChange = new Signal<GameMode, void>();
const gameButtonClick = new Signal<void, void>();
const gameButtonReady = new Signal<void, void>();
const cardClickRight = new Signal<void, void>();
const cardGuess = new Signal<boolean, void>();
const gameFinished = new Signal<void, void>();
const cardsLoad = new Signal<void, void>();
const finishScreenShow = new Signal<IGameFinishedRecord, void>();
const gameStopped = new Signal<void, void>();
const gameStarted = new Signal<void, void>();
const boardDisabled = new Signal<void, void>();
const boardEnabled = new Signal<void, void>();

const Events = {
  menuClick,
  modeButtonClick,
  boardClick,
  routeChange,
  cardTurn,
  cardClick,
  gameModeChange,
  gameButtonClick,
  gameButtonReady,
  cardClickRight,
  cardGuess,
  gameFinished,
  cardsLoad,
  finishScreenShow,
  gameStopped,
  gameStarted,
  boardDisabled,
  boardEnabled,
};

export default Events;
