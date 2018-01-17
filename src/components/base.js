import wepy from 'wepy';
import Http from '../mixins/http';

export default class BaseComponent extends wepy.component {
  mixins = [Http];
}
