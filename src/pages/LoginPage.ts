import IComponent from '../components/IComponent';
import Component from '../components/Component';
import ErrorMessage from '../components/shared/ErrorMessage';

import Constants from '../util/constants';
import Events from '../util/Events';

export default class LoginPage extends Component {
  private loginContainer: IComponent;
  private heading: IComponent;
  private form: IComponent;
  private fieldset: IComponent;
  private inputLogin: IComponent;
  private inputLoginLabel: IComponent;
  private inputPassword: IComponent;
  private inputPasswordLabel: IComponent;
  private buttonsWrap: IComponent;
  private buttonLogin: IComponent;
  private buttonCancel: IComponent;
  private errorContainer: IComponent;
  inputLoginWrap: IComponent;
  inputPasswordWrap: IComponent;

  constructor(global: Window, rootComponent: IComponent | null) {
    super(global, rootComponent, 'div', [Constants.CSSClasses.loginWrap]);
    this.loginContainer = new Component(global, this, 'div', [
      Constants.CSSClasses.loginPage,
    ]);
    this.heading = new Component(global, this.loginContainer, 'h3', [
      Constants.CSSClasses.loginHeading,
    ]);
    this.heading.textContent = Constants.Labels.loginHeading;
    [this.form, this.errorContainer, this.fieldset] = this.initForm();
    [
      this.inputLoginWrap,
      this.inputLogin,
      this.inputPasswordWrap,
      this.inputPassword,
    ] = this.initInputs();
    [this.inputLoginLabel, this.inputPasswordLabel] = this.initInputLabels();
    [this.buttonsWrap, this.buttonLogin, this.buttonCancel] =
      this.initButtons();
    this.addEventListeners();
  }

  showError(text: string): void {
    const error = new ErrorMessage(this.global, text);
    error.attachTo(this.errorContainer);
  }

  remove(): void {
    this.clearInputs();
    super.remove();
  }

  private clearInputs(): void {
    (this.inputLogin.element as HTMLInputElement).value = '';
    (this.inputPassword.element as HTMLInputElement).value = '';
    this.buttonLogin.disable();
  }

  private initForm(): IComponent[] {
    const form = new Component(
      this.global,
      this.loginContainer,
      'form',
      [Constants.CSSClasses.loginForm],
      { action: '#', method: 'POST' }
    );
    const errorContainer = new Component(this.global, form, 'div', [
      Constants.CSSClasses.errorContainer,
    ]);

    const fieldset = new Component(this.global, form, 'fieldset', [
      Constants.CSSClasses.loginFieldset,
    ]);
    return [form, errorContainer, fieldset];
  }

  private initInputs(): IComponent[] {
    const inputLoginWrap = new Component(this.global, this.fieldset, 'div', [
      Constants.CSSClasses.loginInputWrap,
    ]);
    const inputLogin = new Component(
      this.global,
      inputLoginWrap,
      'input',
      [Constants.CSSClasses.loginInputLogin, Constants.CSSClasses.loginInput],
      {
        id: Constants.CSSClasses.loginInputLogin,
        placeholder: ' ',
        value: 'admin',
      }
    );
    const inputPasswordWrap = new Component(this.global, this.fieldset, 'div', [
      Constants.CSSClasses.loginInputWrap,
    ]);
    const inputPassword = new Component(
      this.global,
      inputPasswordWrap,
      'input',
      [
        Constants.CSSClasses.loginInputPassword,
        Constants.CSSClasses.loginInput,
      ],
      {
        type: 'password',
        id: Constants.CSSClasses.loginInputPassword,
        placeholder: ' ',
        value: 'admin',
      }
    );
    inputLogin.element.focus();
    return [inputLoginWrap, inputLogin, inputPasswordWrap, inputPassword];
  }

  private initInputLabels(): IComponent[] {
    const labelLogin = new Component(
      this.global,
      this.inputLoginWrap,
      'label',
      [Constants.CSSClasses.loginInputLabel],
      { for: Constants.CSSClasses.loginInputLogin }
    );
    labelLogin.textContent = Constants.Labels.loginInputLoginPlaceholder;
    const labelPassword = new Component(
      this.global,
      this.inputPasswordWrap,
      'label',
      [Constants.CSSClasses.loginInputLabel],
      { for: Constants.CSSClasses.loginInputPassword }
    );
    labelPassword.textContent = Constants.Labels.loginInputPasswordPlaceholder;
    return [labelLogin, labelPassword];
  }

  private initButtons(): IComponent[] {
    const buttonsWrap = new Component(this.global, this.form, 'div', [
      Constants.CSSClasses.loginButtonsWrap,
    ]);
    const buttonCancel = new Component(this.global, buttonsWrap, 'button', [
      Constants.CSSClasses.loginButtonCancel,
    ]);
    buttonCancel.textContent = Constants.Labels.loginButtonCancel;
    const buttonLogin = new Component(
      this.global,
      buttonsWrap,
      'input',
      [Constants.CSSClasses.loginButtonLogin],
      { type: 'submit', value: Constants.Labels.loginButtonLogin }
    );
    buttonLogin.element as HTMLInputElement;
    return [buttonsWrap, buttonLogin, buttonCancel];
  }

  getLoginData(): { login: string; password: string } {
    const login = (this.inputLogin.element as HTMLInputElement).value;
    const password = (this.inputPassword.element as HTMLInputElement).value;
    this.clearInputs();
    return { login, password };
  }

  private handleClick: (event: MouseEvent) => void = (event) => {
    const target = event.target as HTMLElement;
    if (target === this.buttonLogin.element) {
      event.preventDefault();
      Events.loginAttempt.emit({
        login: String((this.inputLogin.element as HTMLInputElement).value),
        password: String(
          (this.inputPassword.element as HTMLInputElement).value
        ),
      });
    } else if (target === this.buttonCancel.element) {
      event.preventDefault();
      this.remove();
    }
  };

  handleInputChange: (event: Event) => void = (event) => {
    if (
      (this.inputLogin.element as HTMLInputElement).value &&
      (this.inputPassword.element as HTMLInputElement).value
    ) {
      this.buttonLogin.enable();
    } else {
      this.buttonLogin.disable();
    }
  };

  addEventListeners(): void {
    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('input', this.handleInputChange);
  }

  removeEventListeners(): void {
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('change', this.handleInputChange);
  }
}
