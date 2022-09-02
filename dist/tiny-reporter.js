(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.tReporter = factory());
})(this, (function () { 'use strict';

  var Store = /** @class */ (function () {
      function Store() {
          this.value = [];
      }
      Store.prototype.push = function (data) {
          this.value.push(data);
      };
      Store.prototype.get = function () {
          return this.value;
      };
      Store.prototype.clear = function () {
          this.value = [];
      };
      return Store;
  }());
  var store = new Store();

  // 生成 uuid
  var uuid = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) >>> 0;
          var v = c === 'x' ? r : (r & 0x3) >>> 0x8;
          return v.toString(16);
      });
  };
  var addExtraInfo = function (obj, recordType) {
      if (!obj.recordType) {
          obj.recordType = recordType;
      }
      if (!obj.uuid) {
          obj.uuid = uuid();
      }
      if (!obj.recordTime) {
          obj.recordTime = +new Date();
      }
  };

  var dispatch = function (data, type) {
      addExtraInfo(data, type);
      store.push(data);
      var value = store.value;
      // 是否需要发送数据
      if (value.length >= 10) {
          return value;
      }
  };

  var performance = function () {
      var timing = window.performance.getEntriesByType('navigation')[0].toJSON();
      /**
       * domInteractive, // 页面可交互
       * domComplete, // DOM 加载完成
       * duration, // 页面加载完成
       * loadEventStart, // 文档开始加载
       * loadEventEnd, // 文档加载完毕
       * requestStart, // 第一个请求发起
       * responseStart, // 第一个字节响应
       */
      for (var key in timing) {
          if (typeof timing[key] === 'number') {
              timing[key] = Math.ceil(timing[key]);
          }
      }
      return timing;
  };
  // load 后延时收集
  var task = function () {
      return setTimeout(function () { return dispatch(performance(), 'performance'); }, 300);
  };
  var performance$1 = (function () {
      window.addEventListener('load', task, false);
  });

  function device() {
      var screen = window.screen;
      var _a = document.documentElement, clientWidth = _a.clientWidth, clientHeight = _a.clientHeight;
      var width = screen.width, height = screen.height, colorDepth = screen.colorDepth, pixelDepth = screen.pixelDepth;
      var map = {
          clientHeight: clientHeight,
          clientWidth: clientWidth,
          colorDepth: colorDepth,
          pixelDepth: pixelDepth,
          screenWidth: width,
          screenHeight: height,
          language: navigator.language,
          userAgent: navigator.userAgent,
          vendor: navigator.vendor,
          platform: navigator.platform, // 浏览器平台的环境,不是电脑系统的x64这样的(浏览器平台的环境可能是x32)
      };
      // 这里简单判断是否是对象即可
      // if (typeof connection === 'object') {
      //   map.downlink = connection.downlink
      //   map.effectiveType = connection.effectiveType
      //   map.rtt = connection.rtt
      // }
      return map;
  }
  var device$1 = (function () {
      dispatch(device(), 'device');
  });

  function reporter (url) {
      document.addEventListener('visibilitychange', function () {
          if (document.visibilityState === 'hidden') {
              if (!store.value.length)
                  return;
              var params = JSON.stringify(store.value);
              console.log('1234', params);
              navigator.sendBeacon(url, params);
              store.clear();
          }
      });
  }

  function index (options) {
      var key = options.key, url = options.url, _a = options.isPerformance, isPerformance = _a === void 0 ? true : _a, _b = options.isDevice, isDevice = _b === void 0 ? true : _b;
      if (!key) {
          throw new Error('params error: `key` is required');
      }
      if (!url) {
          throw new Error('params error: `url` is required');
      }
      reporter(url);
      if (isDevice) {
          device$1();
      }
      if (isPerformance) {
          performance$1();
      }
  }

  return index;

}));
//# sourceMappingURL=tiny-reporter.js.map
