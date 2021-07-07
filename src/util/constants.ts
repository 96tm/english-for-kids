const SERVER_URL = '';
const NUMBER_OF_STARS = 3;
const SCHOOL_LINK = 'https://rs.school/js';
const NUMBER_OF_CARDS = 8;
const NUMBER_OF_CATEGORIES = 8;
const FINISH_SCREEN_DURATION = 2000;

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
  gameMenuList: 'game-menu__list',
  gameMenuLogin: 'game-menu__login',
  gameMenuItem: 'game-menu__item',
  gameMenuLink: 'game-menu__link',
  gameMenuItemsWrap: 'game-menu__items',

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

  footer: 'footer',
  footerItems: 'footer__items',
  footerItem: 'footer__item',
  footerLink: 'footer__link',
  footerLinkSchool: 'footer__link-course',

  checked: 'checked',
  hidden: 'hidden',
  active: 'active',
  animated: 'animated',
  noClicks: 'no-clicks',
};

const Labels = {
  train: 'Train',
  play: 'Play',
  login: 'Login',
  start: 'Start',
  mainMenu: 'Main Page',
  gameRoute: 'game',
  mainRoute: 'main',
  wordIllustration: 'Word illustration',
  winMessage: 'Win!',
};

const Constants = {
  CSSClasses,
  Labels,
  SERVER_URL,
  NUMBER_OF_STARS,
  SCHOOL_LINK,
  NUMBER_OF_CARDS,
  NUMBER_OF_CATEGORIES,
  FINISH_SCREEN_DURATION,
};

export default Constants;
