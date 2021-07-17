import AttributeRecord from '../util/AttributeRecord';

export default interface IComponent {
  element: HTMLElement;
  tagName: string;
  classList: string[];
  textContent: string;
  attributes: AttributeRecord;
  rootComponent: IComponent | null;

  append(
    tagName: string,
    classList?: string[],
    attributes?: AttributeRecord
  ): IComponent;

  attachTo(rootComponent: IComponent): void;
  render(): void;
  remove(): void;
  enable(): void;
  disable(): void;
}
