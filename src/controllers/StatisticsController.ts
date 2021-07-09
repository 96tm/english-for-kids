import Controller from './Controller';
import IComponent from '../components/IComponent';
import StatisticsPage from '../pages/StatisticsPage';
import StatsTable from '../components/stats-page/StatsTable';
import Constants from '../util/constants';
import StatsObject from '../models/StatsObject';
import SortType from '../models/SortType';
import SortOrder from '../models/SortOrder';
import Events from '../util/Events';
import IWordStat from '../models/IWordStat';
import RouterService from '../util/RouterService';
import ICard from '../models/ICard';
import CardModel from '../models/CardModel';
import StatsService from '../util/StatsService';

export default class StatisticsController extends Controller {
  component: IComponent;

  sortType = SortType.category;

  sortOrder = SortOrder.ascending;

  constructor(private global: Window, rootComponent: IComponent) {
    super();
    this.component = new StatisticsPage(global, rootComponent);
    Events.statsTableSorted.add(this.handleStatsTableSorted);
    Events.statsButtonRepeatClick.add(this.handleStatsButtonRepeatClick);
  }

  private handleStatsButtonRepeatClick: () => void = () => {
    RouterService.setHash(Constants.Labels.gameRoute);
    Events.statsRepeatDifficult.emit(this.getDifficultWords());
  };

  getDifficultWords(): ICard[] {
    const words = this.sortStatsByParameter(
      this.getAllWords(),
      SortType.percentage
    );
    const difficultWords: ICard[] = [];
    for (let i = 0; i < Constants.NUMBER_OF_CARDS && i < words.length; i += 1) {
      const word = words[i];
      const card = new CardModel(
        word.category,
        word.word,
        word.translation,
        word.image,
        word.audioSrc
      );
      difficultWords.push(card);
    }
    return difficultWords;
  }

  private handleStatsTableSorted: ([sortType, sortOrder]: [
    SortType,
    SortOrder
  ]) => void = ([sortType, sortOrder]) => {
    [this.sortType, this.sortOrder] = [sortType, sortOrder];
    this.showSortedTable();
  };

  showSortedTable(): void {
    const page = this.component as StatisticsPage;
    (page.table as StatsTable).tableBody.element.innerHTML = '';
    const stats = this.global.localStorage.getItem(
      Constants.Labels.statsStorage
    );
    if (stats) {
      let statsObject: StatsObject = JSON.parse(stats);
      if (this.sortType === SortType.category) {
        statsObject = this.sortStatsByCategory(statsObject);
        Object.keys(statsObject).forEach((category) => {
          const words = statsObject[category];
          page.renderOneCategory(category, words);
        });
      } else {
        let words = this.getAllWords();
        words = this.sortStatsByParameter(words);
        words.forEach((word) => {
          page.renderOneWord(word, word.category);
        });
      }
    }
  }

  private getAllWords(): IWordStat[] {
    let words: IWordStat[] = [];
    const stats = this.global.localStorage.getItem(
      Constants.Labels.statsStorage
    );
    if (stats) {
      const statsObject: StatsObject = JSON.parse(stats);
      Object.keys(statsObject).forEach((category) => {
        words = words.concat(statsObject[category]);
      });
    }
    return words;
  }

  sortStatsByCategory(statsObject: StatsObject): StatsObject {
    const result: StatsObject = {};
    const keys = Object.keys(statsObject).sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      if (this.sortOrder === SortOrder.ascending) {
        return aLower < bLower ? -1 : Number(aLower > bLower);
      }
      return aLower > bLower ? -1 : Number(aLower < bLower);
    });
    keys.forEach((key) => {
      result[key] = statsObject[key];
    });
    return result;
  }

  sortStatsByParameter(
    words: IWordStat[],
    sortType = this.sortType
  ): IWordStat[] {
    if (sortType === SortType.percentage) {
      return words.sort((a, b) => {
        const aPercentage = StatsService.calcRightPercentage(a.right, a.wrong);
        const bPercentage = StatsService.calcRightPercentage(b.right, b.wrong);
        if (this.sortOrder === SortOrder.ascending) {
          return aPercentage - bPercentage;
        }
        return bPercentage - aPercentage;
      });
    }
    return words.sort((a, b) => {
      const aParameter = a[sortType];
      const bParameter = b[sortType];

      if (this.sortOrder === SortOrder.ascending) {
        return aParameter < bParameter ? -1 : Number(aParameter > bParameter);
      }
      return aParameter > bParameter ? -1 : Number(aParameter < bParameter);
    });
  }

  show(): void {
    super.show();
    this.showSortedTable();
  }
}
