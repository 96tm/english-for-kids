import IController from '../controllers/IController';

interface RoutingRecord {
  pattern: string;
  controller: IController;
}
export default RoutingRecord;
