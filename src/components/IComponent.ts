import AttributeRecord from '../util/AttributeRecord';

export default interface IComponent {
  element: HTMLElement;

  rootComponent: IComponent | null;

  tagName: string;

  classList: string[];

  attributes: AttributeRecord;

  textContent: string;

  append(
    tagName: string,
    classList?: string[],
    attributes?: AttributeRecord
  ): IComponent;

  render(): void;

  remove(): void;
}
