var prod = process.env.NODE_ENV === 'production';
var dotenv = require('dotenv');
const _ = require('lodash');

module.exports = {
  wpyExt   : '.wpy',
  eslint   : false,
  compilers: {
    less : {
      'compress': true
    },
    /*sass: {
      outputStyle: 'compressed'
    },*/
    babel: {
      'sourceMap': true,
      'presets'  : [
        'env'
      ],
      'plugins'  : [
        'babel-plugin-transform-class-properties',
        'transform-export-extensions',
        'transform-decorators-legacy',
        'syntax-export-extensions'
      ]
    }
  },
  plugins  : {},
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
};

if (prod) {
  dotenv.config({path: '.env.prod'});
  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {
    compress: true
  };

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        'jpg': {
          quality: 80
        },
        'png': {
          quality: 80
        }
      }
    },
    filemin : {
      filter: /\.(json|wxml|xml)$/
    },
  }
} else {
  dotenv.config({path: '.env'});
}

module.exports.plugins.replace = [
  {
    filter: /common\/env\.js$/,
    config: replaceEnvConfig()
  }
];

function replaceEnvConfig() {
  let config = [];
  _.forEach(process.env, (value, key) => {
    config.push({
      find   : new RegExp(`exports\.${key}\\s+=\\s+(.*);`),
      replace: function () {
        return `exports.${key}='${value}'`;
      }
    })
  });

  return config;
}
