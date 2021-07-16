import IController from '../controllers/IController';
import IRootOptions from '../models/IRouteOptions';

interface RoutingRecord {
  pattern: string;
  controller: IController;
  options?: IRootOptions;
}
export default RoutingRecord;
