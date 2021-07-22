import Signal from './Signal';

import ICard from '../models/ICard';
import IGameFinishedRecord from '../models/IGameFinishedRecord';
import IWordStatDTO from '../models/IWordStatDTO';
import IWordCardDTO from '../models/IWordCardDTO';
import IWordCardUpdateDTO from '../models/IWordCardUpdateDTO';

import GameMode from '../models/GameMode';
import SortType from '../models/SortType';
import SortOrder from '../models/SortOrder';
import LoginInfo from '../models/LoginInfo';
import WordCardButton from '../models/WordCardButton';
import CategoryCardButton from '../models/CategoryCardButton';

const menuClick = new Signal<string>();
const modeButtonClick = new Signal<string>();
const routeChange = new Signal<string>();
const cardTurn = new Signal<string>();
const cardClick = new Signal<string>();
const gameModeChange = new Signal<GameMode>();
const gameButtonClick = new Signal<void>();
const cardClickRight = new Signal<void>();
const cardGuess = new Signal<boolean>();
const gameFinished = new Signal<void>();
const cardsLoad = new Signal<void>();
const finishScreenShow = new Signal<IGameFinishedRecord>();
const gameStopped = new Signal<void>();
const gameStarted = new Signal<void>();
const boardDisabled = new Signal<void>();
const boardEnabled = new Signal<void>();
const statsTrainingClick = new Signal<IWordStatDTO>();
const statsRightClick = new Signal<IWordStatDTO>();
const statsWrongClick = new Signal<IWordStatDTO>();
const statsCleared = new Signal<void>();
const statsTableSorted = new Signal<[SortType, SortOrder]>();
const statsButtonRepeatClick = new Signal<void>();
const statsRepeatDifficult = new Signal<ICard[]>();
const loginShow = new Signal<void>();
const loginAttempt = new Signal<LoginInfo>();
const login = new Signal<string>();
const logout = new Signal<void>();
const categoryCardClick = new Signal<
  { button: CategoryCardButton; name: string; newName: string },
  void
>();
const categoryUpdate = new Signal<
  { name: string; newName: string },
  Promise<void>
>();
const categoryCreate = new Signal<string>();
const categoryRemove = new Signal<string>();
const wordCardClick = new Signal<
  { button: WordCardButton; wordInfo: IWordCardUpdateDTO },
  void
>();
const wordCreate = new Signal<IWordCardDTO>();
const wordRemove = new Signal<IWordCardDTO>();
const wordUpdate = new Signal<IWordCardUpdateDTO>();
const adminErrorShow = new Signal<string>();
const adminMessageShow = new Signal<string>();
const gameMessageShow = new Signal<string>();
const gameErrorShow = new Signal<string>();
const loginErrorShow = new Signal<string>();
const scrollToEnd = new Signal<void>();
const unauthorizedAccess = new Signal<void>();

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
  adminMessageShow,
  gameErrorShow,
  gameMessageShow,
  loginErrorShow,
  scrollToEnd,
  unauthorizedAccess,
};

export default Events;
