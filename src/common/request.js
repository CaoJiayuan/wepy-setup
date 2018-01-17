import wepy from 'wepy';

const request = {};

const defaultOptions = {
  data        : {},
  header      : {
    'Accept' : 'application/json',
    'X-Requested-With' : 'XmlHttpRequest'
  },
};

request.request = (url, method, option) => {
  let options = Object.assign(defaultOptions, option);

  return wepy.request({
    url         : url,
    method      : method.toUpperCase(),
    data        : options.data,
    header      : options.header,
    responseType: options.responseType,
    dataType    : options.dataType
  });
};

['get', 'post', 'put', 'delete', 'options', 'head', 'trace', 'connect'].forEach(method => {
  request[method] = (url, data, option) => {
    option = option || {};
    data = data || {};
    option.data = data;
    return request.request(url, method, option);
  }
});


export default request;
