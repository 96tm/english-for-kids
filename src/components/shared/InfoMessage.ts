import Constants from '../../util/constants';
import BaseMessage from './BaseMessage';

export default class InfoMessage extends BaseMessage {
  constructor(global: Window, text: string) {
    super(global, [Constants.CSSClasses.infoMessage], text);
  }
}
