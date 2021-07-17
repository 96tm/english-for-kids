import Signal from './Signal';

import GameMode from '../models/GameMode';
import IGameFinishedRecord from '../models/IGameFinishedRecord';
import IWordStatDTO from '../models/IWordStatDTO';
import SortType from '../models/SortType';
import SortOrder from '../models/SortOrder';
import ICard from '../models/ICard';
import LoginInfo from '../models/LoginInfo';
import CategoryCardButton from '../models/CategoryCardButton';
import WordCardButton from '../models/WordCardButton';
import IWordCardDTO from '../models/IWordCardDTO';
import IWordCardUpdateDTO from '../models/IWordCardUpdateDTO';

const menuClick = new Signal<string, Promise<void>>();
const modeButtonClick = new Signal<string, Promise<void>>();
const routeChange = new Signal<string, Promise<void>>();
const cardTurn = new Signal<string, Promise<void>>();
const cardClick = new Signal<string, Promise<void>>();
const gameModeChange = new Signal<GameMode, Promise<void>>();
const gameButtonClick = new Signal<void, Promise<void>>();
const cardClickRight = new Signal<void, Promise<void>>();
const cardGuess = new Signal<boolean, Promise<void>>();
const gameFinished = new Signal<void, Promise<void>>();
const cardsLoad = new Signal<void, Promise<void>>();
const finishScreenShow = new Signal<IGameFinishedRecord, Promise<void>>();
const gameStopped = new Signal<void, Promise<void>>();
const gameStarted = new Signal<void, Promise<void>>();
const boardDisabled = new Signal<void, Promise<void>>();
const boardEnabled = new Signal<void, Promise<void>>();
const statsTrainingClick = new Signal<IWordStatDTO, Promise<void>>();
const statsRightClick = new Signal<IWordStatDTO, Promise<void>>();
const statsWrongClick = new Signal<IWordStatDTO, Promise<void>>();
const statsCleared = new Signal<void, Promise<void>>();
const statsTableSorted = new Signal<[SortType, SortOrder], Promise<void>>();
const statsButtonRepeatClick = new Signal<void, Promise<void>>();
const statsRepeatDifficult = new Signal<ICard[], Promise<void>>();
const loginShow = new Signal<void, Promise<void>>();
const loginAttempt = new Signal<LoginInfo, Promise<void>>();
const login = new Signal<string, Promise<void>>();
const logout = new Signal<void, Promise<void>>();
const categoryCardClick = new Signal<
  { button: CategoryCardButton; name: string; newName: string },
  void
>();
const categoryUpdate = new Signal<
  { name: string; newName: string },
  Promise<void>
>();
const categoryCreate = new Signal<string, Promise<void>>();
const categoryRemove = new Signal<string, Promise<void>>();
const wordCardClick = new Signal<
  { button: WordCardButton; wordInfo: IWordCardUpdateDTO },
  void
>();
const wordCreate = new Signal<IWordCardDTO, Promise<void>>();
const wordRemove = new Signal<IWordCardDTO, Promise<void>>();
const wordUpdate = new Signal<IWordCardUpdateDTO, Promise<void>>();
const adminErrorShow = new Signal<string, Promise<void>>();

const Events = {
  menuClick,
  modeButtonClick,
  routeChange,
  cardTurn,
  cardClick,
  gameModeChange,
  gameButtonClick,
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
  loginShow,
  loginAttempt,
  login,
  logout,
  categoryCardClick,
  categoryUpdate,
  categoryCreate,
  categoryRemove,
  wordCardClick,
  wordCreate,
  wordRemove,
  wordUpdate,
  adminErrorShow,
};

export default Events;
