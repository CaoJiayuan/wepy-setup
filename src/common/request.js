import wepy from 'wepy';

const request = {};

const defaultOptions = {
  data        : {},
  header      : {
    'Accept' : 'application/json',
    'X-Requested-With' : 'XmlHttpRequest'
  },
  meta : {}
};
request.interceptors = {
  fail: error => Promise.reject(error),
  success : response => Promise.resolve(response),
  config : config => Promise.resolve(config)
}

request.request = (url, method, option) => {
  let options = Object.assign(defaultOptions, option);
  options.method = method;
  options.url = url;
  return resolveConfig(options).then(config => {

    return wepy.request({
      url         : config.url,
      method      : config.method.toUpperCase(),
      data        : config.data,
      header      : config.header,
      responseType: config.responseType,
      meta        : config.meta,
      dataType    : config.dataType
    }).then(response => {
      if (response.statusCode !== 200) {
        return Promise.reject(response)
      }

      return request.interceptors.success(response, config);
    }).catch(error => request.interceptors.fail(error, config));
  })
};

['get', 'post', 'put', 'delete', 'options', 'head', 'trace', 'connect'].forEach(method => {
  request[method] = (url, data, option) => {
    option = option || {};
    data = data || {};
    option.data = data;
    return request.request(url, method, option);
  }
});

function resolveConfig(options) {
  return new Promise((resolve, reject) => {
    let config = request.interceptors.config(options)

    if (config instanceof Promise) {
      config.then(c => resolve(c))
    } else {
      resolve(config)
    }
  })
}


export default request;
