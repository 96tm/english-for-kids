import BaseMessage from './BaseMessage';

import Constants from '../../util/constants';

export default class ErrorMessage extends BaseMessage {
  constructor(global: Window, text: string) {
    super(global, [Constants.CSSClasses.error], text);
  }
}
