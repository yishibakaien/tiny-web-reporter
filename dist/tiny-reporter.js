(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.tReporter = factory());
})(this, (function () { 'use strict';

  function index (options) {
      console.log(options);
  }

  return index;

}));
//# sourceMappingURL=tiny-reporter.js.map
