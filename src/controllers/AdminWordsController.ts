import IComponent from '../components/IComponent';

import Controller from './Controller';
import AdminWordsPage from '../pages/AdminWordsPage';
import Events from '../util/Events';
import Constants from '../util/constants';
import IWordCardDTO from '../models/IWordCardDTO';
import Api from '../util/Api';
import WordCard from '../components/admin-page/WordCard';
import ICard from '../models/ICard';
import IWordCardUpdateDTO from '../models/IWordCardUpdateDTO';
import IRESTError from '../models/IRESTError';

export default class AdminWordsController extends Controller {
  component: IComponent;

  constructor(
    global: Window,
    rootComponent: IComponent | null,
    private loaderAnimation: IComponent,
    private category = ''
  ) {
    super();
    this.component = new AdminWordsPage(global, rootComponent);
    Events.routeChange.add(this.handleRouteChange);
    Events.wordCreate.add(this.handleWordCreate);
    Events.wordRemove.add(this.handleWordRemove);
    Events.wordUpdate.add(this.handleWordUpdate);
  }

  private handleRouteChange: (route: string) => Promise<void> = async (
    route
  ) => {
    if (route.split('/').slice(-1)[0] === Constants.Labels.adminWordsRoute) {
      const category = route.split('/')[0];
      this.loaderAnimation.render();
      const words = await this.getWords(category);
      await this.init(category, words);
      this.loaderAnimation.remove();
    }
  };

  async getWords(category: string): Promise<ICard[]> {
    let words: ICard[] = [];
    try {
      this.loaderAnimation.render();
      const response = await Api.getAllWordsByCategory(category);
      if (response.ok) {
        words = await response.json();
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(
        `Server doesn't respond, please check your network connection`
      );
    } finally {
      this.loaderAnimation.remove();
    }
    return words;
  }

  private handleWordUpdate: (
    wordUpdateInfo: IWordCardUpdateDTO
  ) => Promise<void> = async (wordUpdateInfo) => {
    try {
      this.loaderAnimation.render();
      const response = await Api.updateWord({
        ...wordUpdateInfo,
      });
      if (response.ok) {
        const updatedWord: ICard = await response.json();
        const updatedWordCard = (this.component as AdminWordsPage).getCard(
          wordUpdateInfo.word
        );
        (updatedWordCard as WordCard)?.setModeNormal({ ...updatedWord });
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(
        `Server doesn't respond, please check your network connection`
      );
    } finally {
      this.loaderAnimation.remove();
    }
  };

  private handleWordCreate: (wordInfo: IWordCardDTO) => Promise<void> = async (
    wordInfo
  ) => {
    let words: ICard[] = [];
    try {
      words = await this.getWords(wordInfo.category);
      this.loaderAnimation.render();
      const response = await Api.createWord({ ...wordInfo });
      if (!response.ok) {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(
        `Server doesn't respond, please check your network connection`
      );
    } finally {
      await this.init(wordInfo.category, words);
      this.loaderAnimation.remove();
    }
  };

  private handleWordRemove: (wordInfo: IWordCardDTO) => Promise<void> = async (
    wordInfo
  ) => {
    try {
      this.loaderAnimation.render();
      const response = await Api.removeWord(wordInfo.category, wordInfo.word);
      if (response.ok) {
        const removedCard: ICard = await response.json();
        (this.component as AdminWordsPage).words = (
          this.component as AdminWordsPage
        ).words.filter(
          (wordCard) => (wordCard as WordCard).word !== removedCard.word
        );
        (this.component as AdminWordsPage).getCard(removedCard.word)?.remove();
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(
        `Server doesn't respond, please check your network connection`
      );
    } finally {
      this.loaderAnimation.remove();
    }
  };

  async init(category: string, words: ICard[]): Promise<void> {
    await (this.component as AdminWordsPage).init(category, words);
  }
}
