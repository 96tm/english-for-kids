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

  private handleScrollToEnd: () => Promise<void> = async () => {
    console.log('gotcha words');
  };

  private addEventListeners() {
    console.log('words added');

    Events.scrollToEnd.add(this.handleScrollToEnd);
  }

  private removeEventListeners() {
    console.log('words removed');

    Events.scrollToEnd.remove(this.handleScrollToEnd);
  }

  async show(): Promise<void> {
    this.addEventListeners();
    await super.show();
  }

  hide(): void {
    this.removeEventListeners();
    super.hide();
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
          "Word updated - uploading media into the cloud may take some time, so audio and image changes won't be reflected immediately."
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
          "Word created - uploading media into the cloud may take some time, so audio and image changes won't be reflected immediately."
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
        (this.component as AdminWordsPage).words = (
          this.component as AdminWordsPage
        ).words.filter(
          (wordCard) => (wordCard as WordCard).word !== removedCard.word
        );
        (this.component as AdminWordsPage).getCard(removedCard.word)?.remove();
        Events.adminMessageShow.emit('Word removed');
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
