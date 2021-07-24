import AttributeRecord from '../util/AttributeRecord';

export default interface IComponent {
  element: HTMLElement;
  rootComponent: IComponent | null;

  append(
    tagName: string,
    classList?: string[],
    attributes?: AttributeRecord
  ): IComponent;

  getTagName(): string;
  getClassList(): string[];
  getAttributes(): AttributeRecord;
  getTextContent(): string;
  setTextContent(value: string): void;

  render(): void;

  remove(): void;
}
