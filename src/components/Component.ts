import IComponent from './IComponent';

import AttributeRecord from '../util/AttributeRecord';

export default class Component implements IComponent {
  private textContent = '';
  private tagName: string;
  private classList: string[];
  private attributes: AttributeRecord;
  element: HTMLElement;

  constructor(
    public global: Window,
    public rootComponent: IComponent | null,
    tagName = 'div',
    classList: string[] = [],
    attributes: AttributeRecord = {}
  ) {
    this.element = this.global.document.createElement(tagName);
    this.tagName = tagName;
    this.classList = classList;
    this.attributes = attributes;
    this.rootComponent?.element.append(this.element);
    this.element.classList.add(...classList);
    Object.keys(attributes).forEach((name) => {
      this.element.setAttribute(name, attributes[name]);
    });
  }

  getTextContent(): string {
    return this.textContent;
  }

  setTextContent(value: string): void {
    this.element.textContent = value;
    this.textContent = value;
  }

  getTagName(): string {
    return this.tagName;
  }

  getClassList(): string[] {
    return this.classList;
  }

  getAttributes(): AttributeRecord {
    return this.attributes;
  }

  append(
    tagName: string,
    classList: string[] = [],
    attributes: AttributeRecord = {}
  ): Component {
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
