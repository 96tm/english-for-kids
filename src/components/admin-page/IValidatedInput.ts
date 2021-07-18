import IInput from './IInput';
import IInputValidationResult from './IInputValidationResult';

interface IValidatedInput extends IInput {
  validatingFunctions: Array<(this: IInput) => IInputValidationResult>;
  validate: () => IInputValidationResult[];
}
export default IValidatedInput;
