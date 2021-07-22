import IComponent from '../components/IComponent';
import WordCard from '../components/admin-page/WordCard';

import Controller from './Controller';

import AdminWordsPage from '../pages/AdminWordsPage';

import Events from '../util/Events';
import Constants from '../util/constants';
import Api from '../util/Api';

import ICard from '../models/ICard';
import IWordCardDTO from '../models/IWordCardDTO';
import IWordCardUpdateDTO from '../models/IWordCardUpdateDTO';
import IRESTError from '../models/IRESTError';

export default class AdminWordsController extends Controller {
  component: IComponent;
  private page = 1;

  constructor(
    public global: Window,
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

  private addEventListeners() {
    Events.scrollToEnd.add(this.handleScrollToEnd);
  }

  private removeEventListeners() {
    Events.scrollToEnd.remove(this.handleScrollToEnd);
  }

  async show(): Promise<void> {
    this.addEventListeners();
    this.page = 1;
    await super.show();
  }

  hide(): void {
    this.removeEventListeners();
    super.hide();
  }

  async init(category: string, words: ICard[]): Promise<void> {
    await (this.component as AdminWordsPage).init(category, words);
  }

  private handleScrollToEnd: () => Promise<void> = async () => {
    const words = await this.getWords(this.category, this.page + 1);
    if (words.length) {
      this.page += 1;
      (this.component as AdminWordsPage).appendWords(words);
    }
    const { scrollTop } = this.global.document.documentElement;
    this.global.document.documentElement.scrollTop =
      scrollTop * Constants.AUTO_SCROLL_VALUE;
  };

  private handleRouteChange: (route: string) => Promise<void> = async (
    route
  ) => {
    if (route.split('/').slice(-1)[0] === Constants.Labels.adminWordsRoute) {
      [this.category] = route.split('/');
      this.loaderAnimation.render();
      const words = await this.getWords(this.category);
      await this.init(this.category, words);
      this.loaderAnimation.remove();
    }
  };

  async getWords(
    category: string,
    page = 1,
    limit = Constants.NUMBER_OF_CARDS
  ): Promise<ICard[]> {
    let words: ICard[] = [];
    try {
      this.loaderAnimation.render();
      const response = await Api.getWordsByCategory(category, page, limit);
      if (response.ok) {
        words = await response.json();
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(Constants.Labels.connectionProblem);
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
        const updatedWordCard = (this.component as AdminWordsPage).getCard(
          wordUpdateInfo.word
        );
        const { category, word, translation } = wordUpdateInfo;
        const updatedWord: Partial<ICard> = { category, word, translation };
        if (wordUpdateInfo.image) {
          updatedWord.image = URL.createObjectURL(wordUpdateInfo.image);
        }
        if (wordUpdateInfo.audio) {
          updatedWord.audioSrc = URL.createObjectURL(wordUpdateInfo.audio);
        }
        Events.adminMessageShow.emit(
          Constants.Labels.uploadTimeNotification('Word updated -')
        );
        (this.component as AdminWordsPage).updateWords(
          wordUpdateInfo.word,
          wordUpdateInfo.newWord as string
        );
        (updatedWordCard as WordCard)?.setModeNormal({
          ...updatedWord,
          word: wordUpdateInfo.newWord,
        });
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(Constants.Labels.connectionProblem);
    } finally {
      this.loaderAnimation.remove();
    }
  };

  private handleWordCreate: (wordInfo: IWordCardDTO) => Promise<void> = async (
    wordInfo
  ) => {
    try {
      this.loaderAnimation.render();
      const response = await Api.createWord({ ...wordInfo });
      if (response.ok) {
        let image = '';
        if (wordInfo.image) {
          image = URL.createObjectURL(wordInfo.image);
        }
        const audioSrc = URL.createObjectURL(wordInfo.audio);
        (this.component as AdminWordsPage).addOneWord({
          ...wordInfo,
          image,
          audioSrc,
        });
        Events.adminMessageShow.emit(
          Constants.Labels.uploadTimeNotification('Word created -')
        );
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        Events.adminErrorShow.emit(Constants.Labels.noServerResponse);
      } else {
        Events.adminErrorShow.emit(Constants.Labels.serverError);
      }
    } finally {
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
        (this.component as AdminWordsPage).removeCard(removedCard.word);
        Events.adminMessageShow.emit('Word removed');
      } else {
        const error: IRESTError = await response.json();
        Events.adminErrorShow.emit(error.message);
      }
    } catch (err) {
      Events.adminErrorShow.emit(Constants.Labels.connectionProblem);
    } finally {
      this.loaderAnimation.remove();
    }
  };
}
