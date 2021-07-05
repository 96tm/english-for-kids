import Signal from './Signal';

const menuClick = new Signal<string, void>();
const modeButtonClick = new Signal<string, void>();
const boardClick = new Signal<string, void>();
const routeChange = new Signal<string, void>();

const Events = {
  menuClick,
  modeButtonClick,
  boardClick,
  routeChange,
};

export default Events;
