const SERVER_URL = '';
const NUMBER_OF_STARS = 3;
const SCHOOL_LINK = 'https://rs.school/js';
const NUMBER_OF_CARDS = 8;
const NUMBER_OF_CATEGORIES = 8;

const CSSClasses = {
  root: 'root',
  container: 'container',
  innerContainer: 'inner-container',
  contentWrap: 'content-wrap',
  categoriesWrap: 'categories-wrap',
  category: 'category',
  categoryLink: 'category-link',
  categoryImage: 'category-image',

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

  card: 'card',
  cardInner: 'card__inner',
  cardFront: 'card__front',
  cardBack: 'card__back',
  cardOverlay: 'card__overlay',

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

  footer: 'footer',
  footerItems: 'footer__items',
  footerItem: 'footer__item',
  footerLink: 'footer__link',
  footerLinkSchool: 'footer__link-course',

  checked: 'checked',
  hidden: 'hidden',
  active: 'active',
};

const Labels = {
  train: 'Train',
  play: 'Play',
  login: 'Login',
  start: 'Start',
  mainMenu: 'Main Page',
  gameRoute: 'game',
};

const Constants = {
  CSSClasses,
  Labels,
  SERVER_URL,
  NUMBER_OF_STARS,
  SCHOOL_LINK,
  NUMBER_OF_CARDS,
  NUMBER_OF_CATEGORIES,
};

export default Constants;
