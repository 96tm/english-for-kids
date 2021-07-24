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
    super(global, rootElement, 'div', [Constants.CSS_CLASSES.statsTableWrap]);
    this.table = new Component(this.global, this, 'table', [
      Constants.CSS_CLASSES.statsTable,
    ]);
    const heading = new Component(global, this.table, 'thead');
    this.tableHeadingRow = new Component(this.global, heading, 'tr');
    [
      this.tableHeadingCategory,
      this.tableHeadingWord,
      this.tableHeadingTranslation,
    ] = this.initHeadingWordComponents();
    [
      this.tableHeadingTraining,
      this.tableHeadingRight,
      this.tableHeadingWrong,
      this.tableHeadingPercentage,
    ] = this.initHeadingStatsComponents();
    this.tableBody = new Component(this.global, this.table, 'tbody');
    this.headingItems = this.initHeadingItems();
    this.addEventListeners();
  }

  private initHeadingStatsComponents(): IComponent[] {
    const tableHeadingTraining = this.createTableHeadingItem(
      SortType.training,
      Constants.LABELS.training,
      [Constants.CSS_CLASSES.statsTableHeadingTraining]
    );
    const tableHeadingRight = this.createTableHeadingItem(
      SortType.right,
      Constants.LABELS.right,
      [Constants.CSS_CLASSES.statsTableHeadingRight]
    );
    const tableHeadingWrong = this.createTableHeadingItem(
      SortType.wrong,
      Constants.LABELS.wrong,
      [Constants.CSS_CLASSES.statsTableHeadingWrong]
    );
    const tableHeadingPercentage = this.createTableHeadingItem(
      SortType.percentage,
      Constants.LABELS.percentage,
      [Constants.CSS_CLASSES.statsTableHeadingPercentage]
    );
    return [
      tableHeadingTraining,
      tableHeadingRight,
      tableHeadingWrong,
      tableHeadingPercentage,
    ];
  }

  private initHeadingWordComponents(): IComponent[] {
    const tableHeadingCategory = this.createTableHeadingItem(
      SortType.category,
      Constants.LABELS.category,
      [Constants.CSS_CLASSES.statsTableHeadingCategory]
    );
    const tableHeadingWord = this.createTableHeadingItem(
      SortType.word,
      Constants.LABELS.word
    );
    const tableHeadingTranslation = this.createTableHeadingItem(
      SortType.translation,
      Constants.LABELS.translation
    );
    return [tableHeadingCategory, tableHeadingWord, tableHeadingTranslation];
  }

  private initHeadingItems(): IComponent[] {
    return [
      this.tableHeadingCategory,
      this.tableHeadingWord,
      this.tableHeadingTranslation,
      this.tableHeadingTraining,
      this.tableHeadingRight,
      this.tableHeadingWrong,
      this.tableHeadingPercentage,
    ];
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
      classes.concat([Constants.CSS_CLASSES.statsTableHeadingItem]),
      { 'data-sort-type': sortType }
    );
    item.textContent = text;
    return item;
  }

  markHeadingChosen(heading: HTMLElement): [SortType, SortOrder] {
    this.headingItems.forEach((item) => {
      if (item.element !== heading) {
        item.element.classList.remove(
          Constants.CSS_CLASSES.statsTableChosenHeading
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
      heading.classList.add(Constants.CSS_CLASSES.statsTableChosenHeading);
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
      `.${Constants.CSS_CLASSES.statsTableHeadingItem}`
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
