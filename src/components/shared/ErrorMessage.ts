import Constants from '../../util/constants';
import BaseMessage from './BaseMessage';

export default class ErrorMessage extends BaseMessage {
  constructor(global: Window, text: string) {
    super(global, [Constants.CSSClasses.error], text);
  }
}
