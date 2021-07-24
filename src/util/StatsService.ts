import ICard from '../models/ICard';
import IWordStatDTO from '../models/IWordStatDTO';
import WordStat from '../models/WordStat';
import StatsObject from '../models/StatsObject';
import StatsParameter from '../models/StatsParameter';

import Api from './Api';
import Events from './Events';
import Constants from './constants';

export default class StatsService {
  storage: StatsObject | null = null;

  constructor(private global: Window) {
    Events.statsTrainingClick.add(this.handleStatsTrainingClick);
    Events.statsRightClick.add(this.handleStatsRightClick);
    Events.statsWrongClick.add(this.handleStatsWrongClick);
    Events.statsButtonResetClick.add(this.handleStatsButtonResetClick);
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
    if (!this.storage?.[category]) {
      (this.storage as StatsObject)[category] = [];
    }
    const words = (this.storage as StatsObject)[category];
    const wordToUpdate = words.find((foundWord) => foundWord.word === word);
    if (wordToUpdate) {
      wordToUpdate[parameter] += 1;
    } else {
      const newWord = new WordStat(category, {
        word,
        translation,
        image,
        audioSrc,
      });
      newWord[parameter] = 1;
      words.push(newWord);
    }
    this.commit();
  };

  private commit(): void {
    this.global.localStorage.setItem(
      Constants.LABELS.statsStorage,
      JSON.stringify(this.storage)
    );
  }

  private handleStatsButtonResetClick: () => void = async () => {
    this.global.localStorage.removeItem(Constants.LABELS.statsStorage);
    this.storage = await this.getStorage();
    Events.statsCleared.emit();
  };

  async init(): Promise<void> {
    this.storage = await this.getStorage();
  }

  async getStorage(): Promise<StatsObject> {
    const storage = this.global.localStorage.getItem(
      Constants.LABELS.statsStorage
    );
    if (storage) {
      return JSON.parse(storage);
    }
    const newStorage: StatsObject = {};
    const categories = await Api.getCategories().then((response) =>
      response.json()
    );
    Object.keys(categories).forEach((category) => {
      newStorage[category] = [];
      const words: Omit<ICard, 'category'>[] = categories[category];
      words.forEach((word) => {
        const statsObject = new WordStat(category, { ...word });
        newStorage[category].push(statsObject);
      });
    });
    this.global.localStorage.setItem(
      Constants.LABELS.statsStorage,
      JSON.stringify(newStorage)
    );
    return newStorage;
  }
}
