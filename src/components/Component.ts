import IComponent from './IComponent';
import AttributeRecord from '../util/AttributeRecord';

export default class Component implements IComponent {
  element: HTMLElement;

  _textContent: string;

  _tagName: string;

  _classList: string[];

  _attributes: AttributeRecord;

  constructor(
    public global: Window,
    public rootComponent: IComponent | null,
    tagName = 'div',
    classList: string[] = [],
    attributes: AttributeRecord = {}
  ) {
    this.element = this.global.document.createElement(tagName);
    this._textContent = '';
    this._tagName = tagName;
    this._classList = classList;
    this._attributes = attributes;
    this.rootComponent?.element.append(this.element);
    this.element.classList.add(...classList);
    Object.keys(attributes).forEach((name) => {
      this.element.setAttribute(name, attributes[name]);
    });
  }

  get textContent(): string {
    return this._textContent;
  }

  set textContent(value: string) {
    this.element.textContent = value;
    this._textContent = value;
  }

  get tagName() {
    return this._tagName;
  }

  get classList() {
    return this._classList;
  }

  get attributes() {
    return this._attributes;
  }

  append(
    tagName: string,
    classList: string[] = [],
    attributes: AttributeRecord = {}
  ): IComponent {
    return new Component(this.global, this, tagName, classList, attributes);
  }

  render(): void {
    if (this.rootComponent) {
      this.rootComponent.element.append(this.element);
    } else {
      this.global.document.body.append(this.element);
    }
  }

  remove(): void {
    this.element.remove();
  }
}
