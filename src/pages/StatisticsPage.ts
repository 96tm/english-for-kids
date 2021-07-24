import Component from '../components/Component';
import IComponent from '../components/IComponent';
import StatsTable from '../components/stats-page/StatsTable';

import IWordStat from '../models/IWordStat';

import Events from '../util/Events';
import Constants from '../util/constants';
import StatsService from '../util/StatsService';

export default class StatisticsPage extends Component {
  resetButton: IComponent;
  repeatButton: IComponent;
  table: StatsTable;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSS_CLASSES.statsPageWrap]);
    this.resetButton = new Component(global, this, 'button', [
      Constants.CSS_CLASSES.statsResetButton,
    ]);
    this.resetButton.setTextContent(Constants.LABELS.statsReset);
    this.repeatButton = new Component(global, this, 'button', [
      Constants.CSS_CLASSES.statsRepeatButton,
    ]);
    this.repeatButton.setTextContent(Constants.LABELS.statsRepeat);
    this.table = new StatsTable(global, this);
    this.addEventListeners();
  }

  addEventListeners(): void {
    this.resetButton.element.addEventListener(
      'click',
      this.handleResetButtonClick
    );
    this.repeatButton.element.addEventListener(
      'click',
      this.handleRepeatButton
    );
  }

  removeEventListeners(): void {
    this.resetButton.element.removeEventListener(
      'click',
      this.handleResetButtonClick
    );
    this.repeatButton.element.removeEventListener(
      'click',
      this.handleRepeatButton
    );
  }

  private handleRepeatButton: () => void = () => {
    Events.statsButtonRepeatClick.emit();
  };

  private handleResetButtonClick: () => void = () => {
    Events.statsButtonResetClick.emit();
  };

  renderOneWord(wordStat: IWordStat, category = ''): IComponent {
    const row = new Component(this.global, this.table.tableBody, 'tr', [
      Constants.CSS_CLASSES.statsTableWordItem,
    ]);
    const percentage = StatsService.calcRightPercentage(
      wordStat.right,
      wordStat.wrong
    );
    let percentageString = String(percentage);
    if (Math.floor(percentage) !== percentage) {
      percentageString = percentage.toFixed(2);
    }
    row.element.innerHTML = `
      <td class="${Constants.CSS_CLASSES.statsColumnWord}">${wordStat.word}</td>
      <td class="${Constants.CSS_CLASSES.statsColumnTranslation}">${wordStat.translation}</td>
      <td class="${Constants.CSS_CLASSES.statsColumnTraining}">${wordStat.training}</td>
      <td class="${Constants.CSS_CLASSES.statsColumnRight}">${wordStat.right}</td>
      <td class="${Constants.CSS_CLASSES.statsColumnWrong}">${wordStat.wrong}</td>
      <td class="${Constants.CSS_CLASSES.statsColumnPercentage}">${percentageString}%</td>
    `;
    if (category) {
      const tdCategory = `
      <td class="${Constants.CSS_CLASSES.statsColumnCategory}">${category}</td>
      `;
      row.element.insertAdjacentHTML('afterbegin', tdCategory);
    }
    return row;
  }

  renderOneCategory(category: string, words: IWordStat[]): void {
    words.forEach((word, index) => {
      const row = this.renderOneWord(word);
      if (index === 0) {
        const categoryColumn = `
          <td class="${Constants.CSS_CLASSES.statsColumnCategory}"
              rowspan=${words.length}>${category}
          </td>`;
        row.element.insertAdjacentHTML('afterbegin', categoryColumn);
      }
    });
  }
}
