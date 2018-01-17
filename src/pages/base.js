import wepy from 'wepy';
import Http from '../mixins/http';

export default class BasePage extends wepy.page {
  mixins = [Http];
}
