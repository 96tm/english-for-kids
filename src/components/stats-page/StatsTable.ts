import IComponent from '../IComponent';
import Constants from '../../util/constants';
import Component from '../Component';
import SortType from '../../models/SortType';
import SortOrder from '../../models/SortOrder';
import Events from '../../util/Events';

export default class StatsTable extends Component {
  table: IComponent;

  tableBody: IComponent;

  tableHeadingRow: IComponent;

  tableHeadingCategory: IComponent;

  tableHeadingWord: IComponent;

  tableHeadingTranslation: IComponent;

  tableHeadingTraining: IComponent;

  tableHeadingRight: IComponent;

  tableHeadingWrong: IComponent;

  tableHeadingPercentage: IComponent;

  headingItems: IComponent[];

  constructor(global: Window, rootElement: IComponent) {
    super(global, rootElement, 'div', [Constants.CSSClasses.statsTableWrap]);
    this.table = new Component(this.global, this, 'table', [
      Constants.CSSClasses.statsTable,
    ]);
    const heading = new Component(global, this.table, 'thead');
    this.tableHeadingRow = new Component(this.global, heading, 'tr');
    this.tableHeadingCategory = this.createTableHeadingItem(
      SortType.category,
      Constants.Labels.category,
      [Constants.CSSClasses.statsTableHeadingCategory]
    );
    this.tableHeadingWord = this.createTableHeadingItem(
      SortType.word,
      Constants.Labels.word
    );
    this.tableHeadingTranslation = this.createTableHeadingItem(
      SortType.translation,
      Constants.Labels.translation
    );
    this.tableHeadingTraining = this.createTableHeadingItem(
      SortType.training,
      Constants.Labels.training,
      [Constants.CSSClasses.statsTableHeadingTraining]
    );
    this.tableHeadingRight = this.createTableHeadingItem(
      SortType.right,
      Constants.Labels.right,
      [Constants.CSSClasses.statsTableHeadingRight]
    );
    this.tableHeadingWrong = this.createTableHeadingItem(
      SortType.wrong,
      Constants.Labels.wrong,
      [Constants.CSSClasses.statsTableHeadingWrong]
    );
    this.tableHeadingPercentage = this.createTableHeadingItem(
      SortType.percentage,
      Constants.Labels.percentage,
      [Constants.CSSClasses.statsTableHeadingPercentage]
    );
    this.tableBody = new Component(this.global, this.table, 'tbody');
    this.headingItems = [
      this.tableHeadingCategory,
      this.tableHeadingWord,
      this.tableHeadingTranslation,
      this.tableHeadingTraining,
      this.tableHeadingRight,
      this.tableHeadingWrong,
      this.tableHeadingPercentage,
    ];
    this.addEventListeners();
  }

  private createTableHeadingItem(
    sortType: SortType,
    text: string,
    classes: string[] = []
  ): IComponent {
    const item = new Component(
      this.global,
      this.tableHeadingRow,
      'th',
      classes.concat([Constants.CSSClasses.statsTableHeadingItem]),
      { 'data-sort-type': sortType }
    );
    item.textContent = text;
    return item;
  }

  markHeadingChosen(heading: HTMLElement): [SortType, SortOrder] {
    this.headingItems.forEach((item) => {
      if (item.element !== heading) {
        item.element.classList.remove(
          Constants.CSSClasses.statsTableChosenHeading
        );
        item.element.removeAttribute('data-sort-order');
      }
    });
    const sortAttribute = heading.getAttribute('data-sort-order');
    if (sortAttribute) {
      if (sortAttribute === SortOrder.ascending) {
        heading.setAttribute('data-sort-order', SortOrder.descending);
      } else {
        heading.setAttribute('data-sort-order', SortOrder.ascending);
      }
    } else {
      heading.classList.add(Constants.CSSClasses.statsTableChosenHeading);
      heading.setAttribute('data-sort-order', SortOrder.ascending);
    }
    return [
      heading.dataset.sortType as SortType,
      heading.getAttribute('data-sort-order') as SortOrder,
    ];
  }

  private handleTableClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    const headingItem = target.closest(
      `.${Constants.CSSClasses.statsTableHeadingItem}`
    );
    if (headingItem) {
      const [sortType, sortOrder] = this.markHeadingChosen(
        headingItem as HTMLElement
      );
      Events.statsTableSorted.emit([sortType, sortOrder]);
    }
  };

  private addEventListeners(): void {
    this.table.element.addEventListener('click', this.handleTableClick);
  }

  private removeEventListeners(): void {
    this.table.element.removeEventListener('click', this.handleTableClick);
  }
}
