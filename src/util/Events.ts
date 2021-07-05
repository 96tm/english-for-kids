import Signal from './Signal';

const menuClick = new Signal<string, void>();
const modeButtonClick = new Signal<string, void>();
const boardClick = new Signal<string, void>();
const routeChange = new Signal<string, void>();
const cardTurn = new Signal<string, void>();
const cardClick = new Signal<string, void>();

const Events = {
  menuClick,
  modeButtonClick,
  boardClick,
  routeChange,
  cardTurn,
  cardClick,
};

export default Events;
