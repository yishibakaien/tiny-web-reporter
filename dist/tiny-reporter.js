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

  var saveData = function (data) {
      store.push(data);
      var value = store.value;
      // 是否需要发送数据
      if (value.length >= 10) {
          return value;
      }
  };

  // 监听用户浏览器信息
  var performance = function () {
      var timing = window.performance.timing;
      if (typeof window.PerformanceNavigationTiming === 'function') {
          try {
              var nt2Timing = window.performance.getEntriesByType('navigation')[0];
              if (nt2Timing) {
                  timing = nt2Timing;
              }
          }
          catch (error) { } // eslint-disable-line
      }
      return {
          type: 'performance',
          // dns查询时间
          dns: timing.domainLookupEnd - timing.domainLookupStart,
          // tcp连接耗时
          tcp: timing.connectEnd - timing.connectStart,
          // 读取页面第一个字节的时间
          ttfb: timing.responseStart - timing.fetchStart,
          // 白屏时间
          bt: timing.domInteractive - timing.fetchStart,
          // 解析dom树耗时
          dt: timing.domComplete - timing.domInteractive,
          // dom完成时间
          drt: timing.domContentLoadedEventEnd - timing.fetchStart,
          // request请求耗时
          rt: timing.responseEnd - timing.responseStart,
          lt: timing.loadEventEnd - timing.fetchStart,
          //跳转方式
          nv: window.performance.navigation.type,
      };
  };
  //一定时间后开始监听performance
  var _listenerPerformance = function () {
      return setTimeout(function () { return saveData(performance()); }, 300);
  };
  function listenerPerformance() {
      window.addEventListener('load', _listenerPerformance, false);
  }

  function reporter (url) {
      document.addEventListener('visibilitychange', function () {
          var params = JSON.stringify({ data: store.value });
          if (document.visibilityState === 'hidden') {
              console.log('123', params);
              navigator.sendBeacon(url, params);
              store.clear();
          }
      });
  }

  function index (options) {
      var key = options.key, url = options.url, isPerformance = options.isPerformance;
      if (!key) {
          throw new Error('params error: `key` is required');
      }
      if (!url) {
          throw new Error('params error: `url` is required');
      }
      reporter(url);
      if (isPerformance) {
          listenerPerformance();
      }
  }

  return index;

}));
//# sourceMappingURL=tiny-reporter.js.map
