import IComponent from '../IComponent';

interface IInput extends IComponent {
  value: string | File | undefined;
}
export default IInput;
