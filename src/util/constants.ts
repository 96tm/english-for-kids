const YEAR = 2021;
const SERVER_URL = '';
const NUMBER_OF_STARS = 3;
const SCHOOL_LINK = 'https://rs.school/js';
const GITHUB_LINK = 'https://github.com/96tm';
const NUMBER_OF_CARDS = 8;
const NUMBER_OF_CATEGORIES = 8;
const FINISH_SCREEN_DURATION = 2000;
const HOMEPAGE = '';

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
  adminNavLink: 'admin-nav__link',
  adminContainer: 'admin__container',

  checked: 'checked',
  hidden: 'hidden',
  invisible: 'invisible',
  active: 'active',
  animated: 'animated',
  noClicks: 'no-clicks',
  overlay: 'overlay',
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
  logout: 'logout',
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
};

export default Constants;
