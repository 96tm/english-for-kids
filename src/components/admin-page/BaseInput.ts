import Component from '../Component';
import IValidatedInput from './IValidatedInput';
import IInputValidationResult from './IInputValidationResult';

export default abstract class BaseValidatedInput
  extends Component
  implements IValidatedInput
{
  abstract validatingFunctions: Array<() => IInputValidationResult>;

  abstract value: File | string | undefined;

  validate(): IInputValidationResult[] {
    return this.validatingFunctions.map((validatingFunction) =>
      validatingFunction.call(this)
    );
  }
}
