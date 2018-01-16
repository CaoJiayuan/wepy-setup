import wepy from 'wepy';
import request from '../common/request';

export default class Http extends wepy.mixin {
  $http = request;
}
