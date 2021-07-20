import Constants from './constants';

import IInput from '../components/admin-page/IInput';
import IInputValidationResult from '../components/admin-page/IInputValidationResult';

function validateNonEmpty(this: IInput): IInputValidationResult {
  return { isValid: !!this.value, errorMessage: '' };
}

function validateEnglishWord(
  fieldName: string
): (this: IInput) => IInputValidationResult {
  return function (this: IInput) {
    let isValid = false;
    let errorMessage = '';
    if (!Constants.VALID_STRING.test(this.value as string)) {
      errorMessage = Constants.Labels.invalidEnglishWord(fieldName);
    } else {
      isValid = true;
    }
    return {
      isValid,
      errorMessage,
    };
  };
}

function validateFileSize(
  size: number
): (this: IInput) => IInputValidationResult {
  return function (this: IInput) {
    let errorMessage = '';
    let isValid = true;
    if (this.value) {
      const condition = (this.value as File).size <= size;
      if (!condition) {
        isValid = false;
        errorMessage = `File must be at most ${
          Constants.MAX_FILE_SIZE / 1024 ** 2
        }Mb`;
      }
    }
    return { isValid, errorMessage };
  };
}

export { validateNonEmpty, validateEnglishWord, validateFileSize };
