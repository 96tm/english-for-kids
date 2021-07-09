import Signal from './Signal';
import GameMode from '../models/GameMode';
import IGameFinishedRecord from '../models/IGameFinishedRecord';
import IWordStatDTO from '../models/IWordStatDTO';
import SortType from '../models/SortType';
import SortOrder from '../models/SortOrder';
import ICard from '../models/ICard';

const menuClick = new Signal<string, void>();
const modeButtonClick = new Signal<string, void>();
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
const statsTrainingClick = new Signal<IWordStatDTO, void>();
const statsRightClick = new Signal<IWordStatDTO, void>();
const statsWrongClick = new Signal<IWordStatDTO, void>();
const statsCleared = new Signal<void, void>();
const statsTableSorted = new Signal<[SortType, SortOrder], void>();
const statsButtonRepeatClick = new Signal<void, void>();
const statsRepeatDifficult = new Signal<ICard[], void>();

const Events = {
  menuClick,
  modeButtonClick,
  routeChange,
  cardTurn,
  cardClick,
  gameModeChange,
  gameButtonClick,
  gameButtonReady, //
  cardClickRight,
  cardGuess,
  gameFinished,
  cardsLoad,
  finishScreenShow,
  gameStopped,
  gameStarted,
  boardDisabled,
  boardEnabled,
  statsTrainingClick,
  statsCleared,
  statsRightClick,
  statsWrongClick,
  statsTableSorted,
  statsButtonRepeatClick,
  statsRepeatDifficult,
};

export default Events;
