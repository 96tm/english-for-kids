import Component from '../components/Component';
import IComponent from '../components/IComponent';
import StatsTable from '../components/stats-page/StatsTable';

import IWordStat from '../models/IWordStat';

import Constants from '../util/constants';

import Events from '../util/Events';

import StatsService from '../util/StatsService';

export default class StatisticsPage extends Component {
  resetButton: IComponent;
  repeatButton: IComponent;
  table: IComponent;

  constructor(global: Window, rootComponent: IComponent) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.statsPageWrap]);
    this.resetButton = new Component(global, this, 'button', [
      Constants.CSSClasses.statsResetButton,
    ]);
    this.resetButton.textContent = Constants.Labels.statsReset;
    this.repeatButton = new Component(global, this, 'button', [
      Constants.CSSClasses.statsRepeatButton,
    ]);
    this.repeatButton.textContent = Constants.Labels.statsRepeat;
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
    Events.statsCleared.emit();
    (this.table as StatsTable).tableBody.element.innerHTML = '';
  };

  renderOneWord(wordStat: IWordStat, category = ''): IComponent {
    const row = new Component(
      this.global,
      (this.table as StatsTable).tableBody,
      'tr',
      ['stats-table__word-item']
    );
    const percentage = StatsService.calcRightPercentage(
      wordStat.right,
      wordStat.wrong
    );
    let percentageString = String(percentage);
    if (Math.floor(percentage) !== percentage) {
      percentageString = percentage.toFixed(2);
    }
    row.element.innerHTML = `
      <td class="${Constants.CSSClasses.statsColumnWord}">${wordStat.word}</td>
      <td class="${Constants.CSSClasses.statsColumnTranslation}">${wordStat.translation}</td>
      <td class="${Constants.CSSClasses.statsColumnTraining}">${wordStat.training}</td>
      <td class="${Constants.CSSClasses.statsColumnRight}">${wordStat.right}</td>
      <td class="${Constants.CSSClasses.statsColumnWrong}">${wordStat.wrong}</td>
      <td class="${Constants.CSSClasses.statsColumnPercentage}">${percentageString}%</td>
    `;
    if (category) {
      const tdCategory = `
      <td class="${Constants.CSSClasses.statsColumnCategory}">${category}</td>
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
          <td class="${Constants.CSSClasses.statsColumnCategory}"
              rowspan=${words.length}>${category}
          </td>`;
        row.element.insertAdjacentHTML('afterbegin', categoryColumn);
      }
    });
  }
}
