import Signal from './Signal';

const menuClick = new Signal<string, void>();
const modeButtonClick = new Signal<string, void>();

const Events = {
  menuClick,
  modeButtonClick,
};

export default Events;
