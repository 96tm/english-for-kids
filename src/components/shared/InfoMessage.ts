import BaseMessage from './BaseMessage';

import Constants from '../../util/constants';

export default class InfoMessage extends BaseMessage {
  constructor(global: Window, text: string) {
    super(global, [Constants.CSSClasses.infoMessage], text);
  }
}
