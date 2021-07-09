import Events from './Events';
import IWordStatDTO from '../models/IWordStatDTO';
import StatsObject from '../models/StatsObject';
import Constants from './constants';
import WordStat from '../models/WordStat';
import StatsParameter from '../models/StatsParameter';

export default class StatsService {
  storage: StatsObject;

  constructor(private global: Window) {
    this.storage = this.getStorage();
    Events.statsTrainingClick.add(this.handleStatsTrainingClick);
    Events.statsRightClick.add(this.handleStatsRightClick);
    Events.statsWrongClick.add(this.handleStatsWrongClick);
    Events.statsCleared.add(this.handleStatsCleared);
  }

  private handleStatsRightClick: ({
    category,
    word,
    translation,
    image,
    audioSrc,
  }: IWordStatDTO) => void = ({
    category,
    word,
    translation,
    image,
    audioSrc,
  }) => {
    this.updateStats(
      { category, word, translation, image, audioSrc },
      StatsParameter.right
    );
  };

  static calcRightPercentage(right: number, wrong: number): number {
    const total = Math.max(1, right + wrong);
    return (right / total) * 100;
  }

  private handleStatsWrongClick: ({
    category,
    word,
    translation,
    image,
    audioSrc,
  }: IWordStatDTO) => void = ({
    category,
    word,
    translation,
    image,
    audioSrc,
  }) => {
    this.updateStats(
      { category, word, translation, image, audioSrc },
      StatsParameter.wrong
    );
  };

  private handleStatsTrainingClick: ({
    category,
    word,
    translation,
    image,
    audioSrc,
  }: IWordStatDTO) => void = ({
    category,
    word,
    translation,
    image,
    audioSrc,
  }) => {
    this.updateStats(
      { category, word, translation, image, audioSrc },
      StatsParameter.training
    );
  };

  private updateStats: (
    { category, word, translation, image, audioSrc }: IWordStatDTO,
    parameter: StatsParameter
  ) => void = ({ category, word, translation, image, audioSrc }, parameter) => {
    if (!this.storage[category]) {
      this.storage[category] = [];
    }
    const words = this.storage[category];
    const wordToUpdate = words.find((foundWord) => foundWord.word === word);
    if (wordToUpdate) {
      wordToUpdate[parameter] += 1;
    } else {
      const newWord = new WordStat(
        category,
        word,
        translation,
        image,
        audioSrc,
        1
      );
      words.push(newWord);
    }
    this.commit();
  };

  private commit(): void {
    this.global.localStorage.setItem(
      Constants.Labels.statsStorage,
      JSON.stringify(this.storage)
    );
  }

  private handleStatsCleared: () => void = () => {
    this.global.localStorage.removeItem(Constants.Labels.statsStorage);
    this.storage = this.getStorage();
  };

  private getStorage(): StatsObject {
    const storage = this.global.localStorage.getItem(
      Constants.Labels.statsStorage
    );
    if (storage) {
      return JSON.parse(storage);
    }
    this.global.localStorage.setItem(
      Constants.Labels.statsStorage,
      JSON.stringify({})
    );
    return {};
  }
}
