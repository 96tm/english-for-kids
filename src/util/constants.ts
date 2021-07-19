const YEAR = 2021;
const NUMBER_OF_STARS = 3;
const SCHOOL_LINK = 'https://rs.school/js';
const GITHUB_LINK = 'https://github.com/96tm';
const NUMBER_OF_CARDS = 8;
const NUMBER_OF_CATEGORIES = 8;
const FINISH_SCREEN_DURATION = 2000;
const HOMEPAGE = '';
const SERVER_URL = 'http://localhost:4000';
const FETCH_TIMEOUT = 8000;
const MAX_FILE_SIZE = 1024 ** 2;
const VALID_STRING = /^[a-zA-Z0-9]*$/;

const CSSClasses = {
  root: 'root',
  container: 'container',
  innerContainer: 'inner-container',
  contentWrap: 'content-wrap',
  categoriesWrap: 'categories-wrap',
  categoryWrap: 'category-wrap',
  category: 'category',
  categoryLink: 'category-link',
  categoryImage: 'category-image',
  categoryImageWrap: 'category-image-wrap',
  categoryText: 'category-text',
  finishScreen: 'finish-screen',
  finishScreenLose: 'finish-screen-lose',
  finishScreenMessage: 'finish-screen__message',

  gameMenuToggleCheckbox: 'game-menu-toggle-checkbox',
  gameMenuToggleButton: 'game-menu-toggle-bar-wrap',
  gameMenuToggleBar: 'game-menu-toggle-bar',
  gamePageWrap: 'page-wrap',
  gamePageMain: 'main',

  gameBoard: 'cards',
  gameCard: 'card',
  gameButtonWrap: 'button-game-wrap',
  gameButton: 'button-game',
  gameButtonText: 'button-game__text',
  gameButtonRepeat: 'button-game-repeat',

  card: 'card',
  cardFull: 'card-full',
  cardInner: 'card__inner',
  cardFront: 'card__front',
  cardFrontImage: 'card__image-front',
  cardFrontTextPanel: 'card__text-panel-front',
  cardFrontText: 'card__text-front',
  cardBack: 'card__back',
  cardBackImage: 'card__image-back',
  cardBackTextPanel: 'card__text-panel-back',
  cardBackText: 'card__text-back',
  cardOverlay: 'card__overlay',
  cardButtonTurn: 'card__button-turn',
  cardRight: 'card-right',

  gameMenu: 'game-menu',
  gameMenuTitle: 'game-menu__title',
  gameMenuStats: 'game-menu__stats',
  gameMenuList: 'game-menu__list',
  gameMenuLogin: 'game-menu__login',
  gameMenuItem: 'game-menu__item',
  gameMenuLink: 'game-menu__link',
  gameMenuItemsWrap: 'game-menu__items',

  statsResetButton: 'stats-reset-button',
  statsRepeatButton: 'stats-repeat-button',
  statsPageWrap: 'stats-page-wrap',
  statsTableWrap: 'stats-table-wrap',
  statsTable: 'stats-table',
  statsTableHeadingCategory: 'stats-table__heading-category',
  statsTableHeadingItem: 'stats-table__heading-item',
  statsTableHeadingTraining: 'stats-table__heading-training',
  statsTableHeadingRight: 'stats-table__heading-right',
  statsTableHeadingWrong: 'stats-table__heading-wrong',
  statsTableHeadingPercentage: 'stats-table__heading-percentage',
  statsTableWordItem: 'stats-table__word-item',
  statsTableChosenHeading: 'chosen',
  statsColumnCategory: 'word-item__category',
  statsColumnWord: 'word-item__word',
  statsColumnTranslation: 'word-item__translation',
  statsColumnTraining: 'word-item__training',
  statsColumnRight: 'word-item__right',
  statsColumnWrong: 'word-item__wrong',
  statsColumnPercentage: 'word-item__percentage',

  gameHeader: 'game-header',
  gameHeaderScoreWrap: 'game-header__score-wrap',
  gameHeaderModeWrap: 'game-header__mode-wrap',
  gameHeaderScoreStar: 'game-header__score-star',
  gameHeaderModeCheckbox: 'game-header__mode-checkbox',
  gameHeaderMode: 'game-header__mode',
  gameHeaderModeMixin: 'game-header-mode',
  gameHeaderModeTrain: 'game-header-mode__train',
  gameHeaderModePlay: 'game-header-mode__play',
  gameHeaderModeCircle: 'game-header-mode__circle',
  gameHeaderHeading: 'game-header__heading',

  loginPage: 'login',
  loginWrap: 'login-wrap',
  loginHeading: 'login__heading',
  loginForm: 'login__form',
  loginFieldset: 'login__fieldset',
  loginInputWrap: 'login__input-wrap',
  loginInputLabel: 'login__input-label',
  loginInput: 'login__input',
  loginInputLogin: 'login__input-login',
  loginInputPassword: 'login__input-password',
  loginButtonsWrap: 'login__buttons-wrap',
  loginButtonLogin: 'login__button-login',
  loginButtonCancel: 'login__button-cancel',

  footer: 'footer',
  footerItems: 'footer__items',
  footerItem: 'footer__item',
  footerItemYear: 'footer__item-year',
  footerLink: 'footer__link',
  footerLinkSchool: 'footer__link-course',
  footerLinkGithub: 'footer__link-github',

  adminNav: 'admin__nav',
  adminNavMixin: 'admin-nav',
  adminNavList: 'admin-nav__list',
  adminNavItem: 'admin-nav__item',
  adminNavItemInactive: 'admin-nav__item-inactive',
  adminNavLink: 'admin-nav__link',
  adminContainer: 'admin__container',
  adminContent: 'admin__content',
  adminEditCategory: 'admin__edit-category',
  adminEditCategoryHeading: 'admin-edit-category__heading',
  adminCategories: 'admin__categories',
  adminCategoriesWrap: 'admin__categories-wrap',
  adminCategoryCard: 'admin__category-card',
  adminCardInputWrap: 'admin-input-wrap',
  adminCardFileInputWrap: 'admin-file-input-wrap',
  adminCardFileInputInnerWrap: 'admin-file-input-inner-wrap',
  adminCardFileInputDataWrap: 'admin-file-input-data-wrap',

  adminCardInput: 'admin-input',
  adminCardFileInput: 'admin-file-input',
  adminCardFileInputName: 'admin-file-input-name',
  adminCardFileInputSize: 'admin-file-input-size',
  adminCardInputLabel: 'admin-input-label',
  adminCardFileInputLabel: 'admin-file-input-label',
  adminCardFileInputWrapLabel: 'admin-file-input-wrap-label',
  adminCategoryCardContentNormal: 'admin__category-card-normal',
  adminCategoryCardContentAdd: 'admin__category-card-add',
  adminCategoryCardContentEdit: 'admin__category-card-edit',
  adminCategoryCardContentCreate: 'admin__category-card-create',
  adminCategoryCardHeading: 'admin-category-card__heading',
  adminCategoryCardWordCountLink: 'admin-category-card__word-count-link',
  adminCategoryCardWordCount: 'admin-category-card__word-count',
  adminCategoryCardButtonCreate: 'admin-category-card__create',
  adminCategoryCardButtonCancel: 'admin-category-card__cancel',
  adminCategoryCardButtonRemove: 'admin-category-card__remove',
  adminCategoryCardButtonUpdate: 'admin-category-card__update',
  adminCategoryCardButtonAdd: 'admin-category-card__add',
  adminCategoryCardButtonSave: 'admin-category-card__save',
  adminCreateCategoryCardButton: 'admin-add-category-card__button',
  adminCreateWordCardButton: 'admin-create-word-card__button',
  adminCategoryCardButtonsWrap: 'admin-category-card__buttons-wrap',
  adminWordCardImageTitleWrap: 'admin-word-card__image-title-wrap',
  adminWordCardButtonsWrap: 'admin-word-card__buttons-wrap',
  adminWordCardImageWrap: 'admin-word-card__image-wrap',
  adminWordCardImage: 'admin-word-card__image',
  adminWordCardContentNormal: 'admin-word-card-normal',
  adminWordCardContentAdd: 'admin-word-card-add',
  adminWordCardContentCreate: 'admin-word-card-create',
  adminWordCardContentEdit: 'admin-word-card-edit',
  adminWordCardEditWrap: 'admin-word-card__edit-wrap',
  adminWordCardButtonChange: 'admin-word-card__change',
  adminWordCardButtonSave: 'admin-word-card__save',
  adminWordCardButtonCreate: 'admin-word-card__create',
  adminWordCardButtonCancel: 'admin-word-card__cancel',
  adminWordCardButtonRemove: 'admin-word-card__remove',
  adminWordCardWord: 'admin-word-card__word',
  adminWordCardTranslation: 'admin-word-card__translation',
  adminWordCardAudio: 'admin-word-card__audio',
  adminWordCard: 'admin__word-card',
  adminWordCardHeading: 'admin-word-card__heading',
  adminWords: 'admin__words',
  adminWordsHeading: 'admin__words-heading',
  adminWordsWrap: 'admin__words-wrap',

  buttonRemove: 'button-remove',
  loader: 'loader',
  checked: 'checked',
  hidden: 'hidden',
  invisible: 'invisible',
  active: 'active',
  animated: 'animated',
  noClicks: 'no-clicks',
  overlay: 'overlay',
  error: 'error',
  infoMessage: 'info-message',
  errorContainer: 'error-container',
  loaderContainer: 'loader-container',
};

const Labels = {
  train: 'Train',
  play: 'Play',
  login: 'Login',
  start: 'Start',
  mainMenu: 'Main Page',
  stats: 'Statistics',
  statsReset: 'Reset',
  statsRepeat: 'Repeat difficult words',
  statsRepeatHeading: 'Repeat',
  adminCategoriesRoute: 'categories',
  adminWordsRoute: 'words',
  adminRoute: 'admin',
  gameRoute: 'game',
  mainRoute: 'main',
  statsRoute: 'stats',
  wordIllustration: 'Word illustration',
  winMessage: 'Win!',
  category: 'Category',
  mainPageHeading: 'Categories',
  word: 'Word',
  words: 'Words',
  logout: 'Logout',
  translation: 'Translation',
  training: 'Training guesses',
  right: 'Right guesses',
  wrong: 'Wrong guesses',
  percentage: 'Right guesses percentage',
  statsStorage: 'statsStorage',
  loginHeading: 'Login',
  loginButtonLogin: 'Login',
  loginButtonCancel: 'Cancel',
  loginInputLoginPlaceholder: 'login',
  loginInputPasswordPlaceholder: 'password',
  adminCategoryCardButtonCreate: 'Create',
  adminCategoryCardButtonCancel: 'Cancel',
  adminCategoryCardButtonUpdate: 'Update',
  adminCategoryCardButtonAdd: 'Add word',
  adminCategoryCardButtonSave: 'Save',
  adminCategoryCardWordCountTitle: 'Words: ',
  adminCategoryEditInputId: 'category-input-id',
  adminWordEditWordInputId: 'word-input-id',
  adminWordEditAudioInputId: 'audio-input-id',
  adminWordEditImageInputId: 'image-input-id',
  adminWordEditTranslationInputId: 'translation-input-id',
  adminCategoryEditInputLabel: 'Category Name',
  adminCreateCategoryCardHeading: 'Create new category',
  adminCreateWordCardHeading: 'Add new word',
  adminWordsHeading: 'Category: ',
  adminWordCardImageAlt: 'Word illustration',
  adminWordCardButtonChange: 'Change',
  adminWordCardButtonSave: 'Save',
  adminWordCardButtonCreate: 'Create',
  adminWordCardButtonCancel: 'Cancel',
  adminWordCardWord: 'Word: ',
  adminWordCardSound: 'Sound:',
  adminWordCardTranslation: 'Translation: ',
  adminWordCardAudio: 'Sound file: ',
  adminWordCardImage: 'Image: ',
  selectFile: 'Select file',
  noServerResponse: `Server doesn't respond`,
  connectionProblem: `Can't connect to the server, please check your network connection`,
  serverError: 'Server error',
  invalidEnglishWord: (fieldName: string): string =>
    `Field "${fieldName}" must contain only letters form the English alphabet and/or digits`,
  fileSizeExceeded: (size: number): string =>
    `File size must be at most ${size}Mb`,
};

const Constants = {
  HOMEPAGE,
  YEAR,
  CSSClasses,
  Labels,
  SERVER_URL,
  NUMBER_OF_STARS,
  SCHOOL_LINK,
  GITHUB_LINK,
  NUMBER_OF_CARDS,
  NUMBER_OF_CATEGORIES,
  FINISH_SCREEN_DURATION,
  FETCH_TIMEOUT,
  MAX_FILE_SIZE,
  VALID_STRING,
};

export default Constants;
