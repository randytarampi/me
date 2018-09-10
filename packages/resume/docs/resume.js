/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([319,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _email__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(223);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _email__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _sms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(224);
/* harmony import */ var _tel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(225);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "m", function() { return _tel__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony import */ var _web__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(226);
/* harmony import */ var _branded__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(227);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _branded__WEBPACK_IMPORTED_MODULE_5__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _branded__WEBPACK_IMPORTED_MODULE_5__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _branded__WEBPACK_IMPORTED_MODULE_5__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _branded__WEBPACK_IMPORTED_MODULE_5__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "g", function() { return _branded__WEBPACK_IMPORTED_MODULE_5__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _branded__WEBPACK_IMPORTED_MODULE_5__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "k", function() { return _branded__WEBPACK_IMPORTED_MODULE_5__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "l", function() { return _branded__WEBPACK_IMPORTED_MODULE_5__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "n", function() { return _branded__WEBPACK_IMPORTED_MODULE_5__["i"]; });

/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(237);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "i", function() { return _internal__WEBPACK_IMPORTED_MODULE_6__["a"]; });

/* harmony import */ var _campaign__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(243);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _campaign__WEBPACK_IMPORTED_MODULE_7__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "j", function() { return _link__WEBPACK_IMPORTED_MODULE_0__["a"]; });

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();










var _default = _link__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"];
/* harmony default export */ __webpack_exports__["o"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var printable_namespaceObject = {};
__webpack_require__.r(printable_namespaceObject);
__webpack_require__.d(printable_namespaceObject, "PrintableHeader", function() { return header["a" /* PrintableHeader */]; });
__webpack_require__.d(printable_namespaceObject, "PrintableFooter", function() { return footer["a" /* PrintableFooter */]; });
__webpack_require__.d(printable_namespaceObject, "PrintableSection", function() { return section["c" /* PrintableSection */]; });
__webpack_require__.d(printable_namespaceObject, "LeftDescriptionSection", function() { return section["a" /* LeftDescriptionSection */]; });
__webpack_require__.d(printable_namespaceObject, "LeftPullSection", function() { return section["b" /* LeftPullSection */]; });
__webpack_require__.d(printable_namespaceObject, "RightDescriptionSection", function() { return section["e" /* RightDescriptionSection */]; });
__webpack_require__.d(printable_namespaceObject, "RightPushSection", function() { return section["f" /* RightPushSection */]; });
__webpack_require__.d(printable_namespaceObject, "RawHtmlLetterSection", function() { return section["d" /* RawHtmlLetterSection */]; });

// EXTERNAL MODULE: ../jsx/lib/clientReduxRoot.jsx
var clientReduxRoot = __webpack_require__(198);

// EXTERNAL MODULE: ../jsx/lib/components/loadingSpinner.jsx
var loadingSpinner = __webpack_require__(121);

// EXTERNAL MODULE: ../jsx/lib/components/printable/header.jsx
var header = __webpack_require__(244);

// EXTERNAL MODULE: ../jsx/lib/components/printable/footer.jsx
var footer = __webpack_require__(245);

// EXTERNAL MODULE: ../jsx/lib/components/printable/section/index.jsx
var section = __webpack_require__(246);

// CONCATENATED MODULE: ../jsx/lib/components/printable/index.jsx



// EXTERNAL MODULE: ../jsx/lib/components/rowBlock.jsx
var rowBlock = __webpack_require__(252);

// EXTERNAL MODULE: ../jsx/lib/containers/error.jsx
var error = __webpack_require__(120);

// EXTERNAL MODULE: ../jsx/lib/containers/errorWrapper.jsx
var errorWrapper = __webpack_require__(82);

// EXTERNAL MODULE: ../jsx/lib/containers/posts.jsx
var posts = __webpack_require__(253);

// EXTERNAL MODULE: ../jsx/lib/data/reducers.js
var reducers = __webpack_require__(259);

// EXTERNAL MODULE: ../jsx/lib/data/selectors.js
var selectors = __webpack_require__(15);

// EXTERNAL MODULE: ../jsx/lib/logger/index.js
var logger = __webpack_require__(30);

// EXTERNAL MODULE: ../jsx/lib/serverReduxRoot.jsx
var serverReduxRoot = __webpack_require__(261);

// EXTERNAL MODULE: ../jsx/lib/store/configureStore.js
var configureStore = __webpack_require__(262);

// EXTERNAL MODULE: ../jsx/lib/util/computePostHeight.js
var computePostHeight = __webpack_require__(123);

// EXTERNAL MODULE: ../jsx/lib/util/getComponentForType.js
var getComponentForType = __webpack_require__(124);

// CONCATENATED MODULE: ../jsx/lib/util/index.js


// EXTERNAL MODULE: ../jsx/lib/components/link/index.jsx
var components_link = __webpack_require__(6);

// EXTERNAL MODULE: ../jsx/lib/containers/emoji/index.jsx
var emoji = __webpack_require__(118);

// CONCATENATED MODULE: ../jsx/esm.js
/* unused concated harmony import EmailLink */
/* unused concated harmony import SmsLink */
/* unused concated harmony import TelLink */
/* unused concated harmony import WebLink */
/* unused concated harmony import CampaignLink */
/* concated harmony reexport Link */__webpack_require__.d(__webpack_exports__, "b", function() { return components_link["j" /* Link */]; });
/* unused concated harmony import AngelListLink */
/* unused concated harmony import F00pxLink */
/* unused concated harmony import FacebookLink */
/* unused concated harmony import FlickrLink */
/* unused concated harmony import GitHubLink */
/* unused concated harmony import InstagramLink */
/* unused concated harmony import LinkedInLink */
/* unused concated harmony import StackOverflowLink */
/* unused concated harmony import TwitterLink */
/* unused concated harmony import BrandedLink */
/* unused concated harmony import BlogAppLink */
/* unused concated harmony import CodeAppLink */
/* unused concated harmony import PhotosAppLink */
/* unused concated harmony import ResumeAppLink */
/* unused concated harmony import WordsAppLink */
/* unused concated harmony import InternalLink */
/* unused concated harmony import connectEmoji */
/* unused concated harmony import Emoji */
/* unused concated harmony import connectBear */
/* unused concated harmony import Bear */
/* unused concated harmony import connectHelloBear */
/* unused concated harmony import HelloBear */
/* unused concated harmony import LoadingSpinner */
/* unused concated harmony import RowBlock */
/* concated harmony reexport Printable */__webpack_require__.d(__webpack_exports__, "c", function() { return printable_namespaceObject; });
/* unused concated harmony import Posts */
/* unused concated harmony import Error */
/* unused concated harmony import ErrorWrapper */
/* concated harmony reexport reducers */__webpack_require__.d(__webpack_exports__, "e", function() { return reducers["a" /* default */]; });
/* unused concated harmony import selectors */
/* concated harmony reexport configureStore */__webpack_require__.d(__webpack_exports__, "d", function() { return configureStore["a" /* default */]; });
/* unused concated harmony import logger */
/* concated harmony reexport ClientReduxRoot */__webpack_require__.d(__webpack_exports__, "a", function() { return clientReduxRoot["a" /* default */]; });
/* unused concated harmony import ServerReduxRoot */
/* unused concated harmony import util */

















/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _lib_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96);
/* harmony import */ var _lib_photo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(115);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _lib_photo__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _lib_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "i", function() { return _lib_post__WEBPACK_IMPORTED_MODULE_2__["b"]; });

/* harmony import */ var _lib_sizedPhoto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(97);
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "l", function() { return _lib_util__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _lib_emoji__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(116);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _lib_emoji__WEBPACK_IMPORTED_MODULE_5__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _lib_emoji__WEBPACK_IMPORTED_MODULE_5__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _lib_emoji__WEBPACK_IMPORTED_MODULE_5__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _lib_emoji__WEBPACK_IMPORTED_MODULE_5__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _lib_emoji__WEBPACK_IMPORTED_MODULE_5__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _lib_emoji__WEBPACK_IMPORTED_MODULE_5__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "g", function() { return _lib_emoji__WEBPACK_IMPORTED_MODULE_5__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "j", function() { return _lib_emoji__WEBPACK_IMPORTED_MODULE_5__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "k", function() { return _lib_emoji__WEBPACK_IMPORTED_MODULE_5__["j"]; });









/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _emoji__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(62);
/* harmony import */ var _posts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43);
/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(130);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var _default = {
  hasError: function hasError(state) {
    return Object(_error__WEBPACK_IMPORTED_MODULE_2__[/* hasError */ "f"])(state.get("error"));
  },
  getError: function getError(state) {
    return Object(_error__WEBPACK_IMPORTED_MODULE_2__[/* getError */ "b"])(state.get("error"));
  },
  getErrorCode: function getErrorCode(state) {
    return Object(_error__WEBPACK_IMPORTED_MODULE_2__[/* getErrorCode */ "c"])(state.get("error"));
  },
  getErrorMessage: function getErrorMessage(state) {
    return Object(_error__WEBPACK_IMPORTED_MODULE_2__[/* getErrorMessage */ "d"])(state.get("error"));
  },
  getErrorState: function getErrorState(state) {
    return Object(_error__WEBPACK_IMPORTED_MODULE_2__[/* getErrorState */ "e"])(state.get("error"));
  },
  getPosts: function getPosts(state) {
    return Object(_posts__WEBPACK_IMPORTED_MODULE_3__[/* getPosts */ "f"])(state.get("posts"));
  },
  getPhotoPosts: function getPhotoPosts(state) {
    return Object(_posts__WEBPACK_IMPORTED_MODULE_3__[/* getPhotoPosts */ "d"])(state.get("posts"));
  },
  getWordPosts: function getWordPosts(state) {
    return Object(_posts__WEBPACK_IMPORTED_MODULE_3__[/* getWordPosts */ "h"])(state.get("posts"));
  },
  getPostsSortedByDate: function getPostsSortedByDate(state) {
    return Object(_posts__WEBPACK_IMPORTED_MODULE_3__[/* getPostsSortedByDate */ "g"])(state.get("posts"));
  },
  getPhotoPostsSortedByDate: function getPhotoPostsSortedByDate(state) {
    return Object(_posts__WEBPACK_IMPORTED_MODULE_3__[/* getPhotoPostsSortedByDate */ "e"])(state.get("posts"));
  },
  getWordPostsSortedByDate: function getWordPostsSortedByDate(state) {
    return Object(_posts__WEBPACK_IMPORTED_MODULE_3__[/* getWordPostsSortedByDate */ "i"])(state.get("posts"));
  },
  getOldestPost: function getOldestPost(state) {
    return Object(_posts__WEBPACK_IMPORTED_MODULE_3__[/* getOldestPost */ "c"])(state.get("posts"));
  },
  getNewestPost: function getNewestPost(state) {
    return Object(_posts__WEBPACK_IMPORTED_MODULE_3__[/* getNewestPost */ "b"])(state.get("posts"));
  },
  getApiState: function getApiState(state) {
    return Object(_api__WEBPACK_IMPORTED_MODULE_0__[/* getApiState */ "d"])(state.get("api"));
  },
  getApiStateForUrl: function getApiStateForUrl(state, url) {
    return Object(_api__WEBPACK_IMPORTED_MODULE_0__[/* getApiStateForUrl */ "e"])(state.get("api"), url);
  },
  getLocation: function getLocation(state) {
    return Object(_routing__WEBPACK_IMPORTED_MODULE_4__[/* getLocation */ "b"])(state.get("routing"));
  },
  getEmoji: function getEmoji(state, emojiId) {
    return Object(_emoji__WEBPACK_IMPORTED_MODULE_1__[/* getEmoji */ "b"])(state.get("emoji"), emojiId);
  },
  hasEmoji: function hasEmoji(state, emojiId) {
    return Object(_emoji__WEBPACK_IMPORTED_MODULE_1__[/* hasEmoji */ "c"])(state.get("emoji"), emojiId);
  }
};
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/selectors.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export BrandedLink */
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/brandedLink.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var BrandedLink = function BrandedLink(_ref) {
  var serviceName = _ref.serviceName,
      serviceType = _ref.serviceType,
      serviceUrl = _ref.serviceUrl,
      username = _ref.username,
      useBranding = _ref.useBranding,
      props = _objectWithoutProperties(_ref, ["serviceName", "serviceType", "serviceUrl", "username", "useBranding"]);

  // eslint-disable-line no-unused-vars
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"], _extends({
    text: username,
    href: "".concat(serviceUrl, "/").concat(username)
  }, props, {
    className: ["link--".concat(serviceType), useBranding ? "" : "link--no-branding", props.className].join(" ").trim(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
BrandedLink.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  useBranding: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  serviceName: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  serviceType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  serviceUrl: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
BrandedLink.defaultProps = {
  useBranding: true
};
var _default = BrandedLink;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BrandedLink, "BrandedLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/brandedLink.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/brandedLink.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return defaultBearComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BearGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bear; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(116);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultBearComponents = {
  leftAction: {
    id: "leftAction",
    position: 1
  },
  leftLeaningLeftArm: {
    id: "leftLeaningLeftArm",
    position: 2
  },
  leftEar: {
    id: "leftEar",
    character: "ʕ",
    position: 3
  },
  rightLeaningLeftArm: {
    id: "rightLeaningLeftArm",
    position: 4
  },
  leftEye: {
    id: "leftEye",
    character: "•",
    position: 5
  },
  nose: {
    id: "nose",
    character: "ᴥ",
    position: 6
  },
  rightEye: {
    id: "rightEye",
    character: "•",
    position: 7
  },
  leftLeaningRightArm: {
    id: "leftLeaningRightArm",
    position: 8
  },
  rightEar: {
    id: "rightEar",
    character: "ʔ",
    position: 9
  },
  rightLeaningRightArm: {
    id: "rightLeaningRightArm",
    position: 10
  },
  rightAction: {
    id: "rightAction",
    position: 11
  }
};
var BearGenerator = function BearGenerator(otherProperties) {
  return Object(___WEBPACK_IMPORTED_MODULE_0__[/* EmojiClassGenerator */ "f"])(_objectSpread({
    type: "bear",
    components: defaultBearComponents
  }, otherProperties));
};
var Bear =
/*#__PURE__*/
function (_BearGenerator) {
  _inherits(Bear, _BearGenerator);

  function Bear() {
    _classCallCheck(this, Bear);

    return _possibleConstructorReturn(this, _getPrototypeOf(Bear).apply(this, arguments));
  }

  return Bear;
}(BearGenerator({}));
var _default = Bear;
/* harmony default export */ __webpack_exports__["c"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultBearComponents, "defaultBearComponents", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/bear.js");
  reactHotLoader.register(BearGenerator, "BearGenerator", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/bear.js");
  reactHotLoader.register(Bear, "Bear", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/bear.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/bear.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Link; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/link.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var Link = function Link(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", _extends({
    target: "__blank",
    rel: "noopener noreferrer",
    "data-metrics-event-name": "anchor",
    "data-metrics-type": props.onClick ? "onClick" : props.href ? "href" : undefined,
    "data-metrics-name": props.name || props["aria-label"] || props.children || props.text,
    "data-metrics-label": props["aria-label"] || props.children || props.text,
    "data-metrics-value": props.onClick ? props.onClick.name : props.href ? props.href : undefined
  }, props, {
    className: ["link", props.className].join(" ").trim(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), props.children || props.text);
};
Link.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  href: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  "aria-label": prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  text: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
};
var _default = Link;
/* harmony default export */ __webpack_exports__["b"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Link, "Link", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/link.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/link.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UPDATE_EMOJI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return updateEmoji; });
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();



var UPDATE_EMOJI = "UPDATE_EMOJI";

var _default = function _default(emoji) {
  return function (dispatch, getState) {
    var state = getState();

    if (_data_selectors__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].hasEmoji(state, emoji.id)) {
      dispatch(updateEmoji(emoji));
    }
  };
};

/* harmony default export */ __webpack_exports__["b"] = (_default);
var updateEmoji = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(UPDATE_EMOJI);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UPDATE_EMOJI, "UPDATE_EMOJI", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/updateEmoji.js");
  reactHotLoader.register(updateEmoji, "updateEmoji", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/updateEmoji.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/updateEmoji.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 29 */,
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildRavenConfiguration; });
/* unused harmony export buildBunyanConfiguration */
/* unused harmony export createLogger */
/* harmony import */ var browser_bunyan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(90);
/* harmony import */ var bunyan_sentry_stream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(275);
/* harmony import */ var bunyan_sentry_stream__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bunyan_sentry_stream__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var raven_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(128);
/* harmony import */ var raven_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(raven_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _consoleStream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(276);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

/* global window */





var getWindowVariables = function getWindowVariables() {
  if (typeof window !== "undefined" && window) {
    return {
      windowName: window.NAME,
      windowEnvironment: window.ENVIRONMENT,
      windowVersion: window.VERSION,
      windowSentryDsn: window.SENTRY_DSN,
      windowLogger: window.LOGGER
    };
  }

  return {};
};

var buildRavenConfiguration = function buildRavenConfiguration() {
  var _getWindowVariables = getWindowVariables(),
      windowName = _getWindowVariables.windowName,
      windowEnvironment = _getWindowVariables.windowEnvironment,
      windowVersion = _getWindowVariables.windowVersion,
      windowLogger = _getWindowVariables.windowLogger;

  return {
    logger: windowName,
    autoBreadcrumbs: true,
    captureUnhandledRejections: true,
    maxBreadcrumbs: 100,
    environment: windowEnvironment,
    release: windowVersion,
    debug: windowLogger ? ["trace", "debug"].includes(windowLogger.level) : false
  };
};
var buildBunyanConfiguration = function buildBunyanConfiguration() {
  var _getWindowVariables2 = getWindowVariables(),
      windowName = _getWindowVariables2.windowName,
      windowEnvironment = _getWindowVariables2.windowEnvironment,
      windowVersion = _getWindowVariables2.windowVersion,
      windowSentryDsn = _getWindowVariables2.windowSentryDsn,
      windowLogger = _getWindowVariables2.windowLogger;

  if (windowLogger) {
    var bunyanStreams = [];
    var enabledStreams = windowLogger.streams;
    var minimumLevel = windowLogger.level;

    if (enabledStreams.console) {
      bunyanStreams.push({
        stream: new _consoleStream__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"](),
        level: minimumLevel,
        type: "raw"
      });
    }

    if (enabledStreams.sentry) {
      if (windowSentryDsn) {
        raven_js__WEBPACK_IMPORTED_MODULE_2___default.a.config(windowSentryDsn, buildRavenConfiguration()).install();
        bunyanStreams.push({
          level: "warn",
          type: "raw",
          stream: new bunyan_sentry_stream__WEBPACK_IMPORTED_MODULE_1__["SentryStream"](raven_js__WEBPACK_IMPORTED_MODULE_2___default.a)
        });
      }
    }

    return {
      name: windowName || "jsx",
      streams: bunyanStreams,
      src: false,
      // NOTE-RT: Needs to be false because it needs DTrace
      version: windowVersion,
      environment: windowEnvironment,
      serializers: browser_bunyan__WEBPACK_IMPORTED_MODULE_0__[/* stdSerializers */ "c"]
    };
  }

  return {
    name: "jsx",
    src: false,
    // NOTE-RT: Needs to be false because it needs DTrace
    serializers: browser_bunyan__WEBPACK_IMPORTED_MODULE_0__[/* stdSerializers */ "c"]
  };
};
var createLogger = function createLogger() {
  return Object(browser_bunyan__WEBPACK_IMPORTED_MODULE_0__[/* createLogger */ "a"])(buildBunyanConfiguration());
};

var _default = createLogger();

/* harmony default export */ __webpack_exports__["b"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getWindowVariables, "getWindowVariables", "/home/travis/build/randytarampi/me/packages/jsx/lib/logger/index.js");
  reactHotLoader.register(buildRavenConfiguration, "buildRavenConfiguration", "/home/travis/build/randytarampi/me/packages/jsx/lib/logger/index.js");
  reactHotLoader.register(buildBunyanConfiguration, "buildBunyanConfiguration", "/home/travis/build/randytarampi/me/packages/jsx/lib/logger/index.js");
  reactHotLoader.register(createLogger, "createLogger", "/home/travis/build/randytarampi/me/packages/jsx/lib/logger/index.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/logger/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InternalLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/internalLink.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var InternalLinkInternal = function InternalLinkInternal(_ref) {
  var serviceName = _ref.serviceName,
      serviceType = _ref.serviceType,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["serviceName", "serviceType", "className"]);

  // eslint-disable-line no-unused-vars
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"], _extends({
    target: "_self",
    text: serviceName
  }, props, {
    className: ["link--".concat(serviceType), className].join(" ").trim(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }));
};

InternalLinkInternal.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  href: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  serviceName: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  serviceType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
InternalLinkInternal.defaultProps = {
  serviceType: "internal"
};
var InternalLink = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(null, function (dispatch, ownProps) {
  return {
    onClick: function onClick(event) {
      event.preventDefault();
      dispatch(Object(react_router_redux__WEBPACK_IMPORTED_MODULE_3__[/* push */ "c"])(ownProps.href));
    }
  };
})(InternalLinkInternal);
var _default = InternalLink;
/* harmony default export */ __webpack_exports__["b"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(InternalLinkInternal, "InternalLinkInternal", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/internalLink.jsx");
  reactHotLoader.register(InternalLink, "InternalLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/internalLink.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/internalLink.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export SectionWrapper */
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/sectionWrapper.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var SectionWrapper = function SectionWrapper(_ref) {
  var printableType = _ref.printableType,
      type = _ref.type,
      hideOnPrint = _ref.hideOnPrint,
      showOnLetter = _ref.showOnLetter,
      showOnA4 = _ref.showOnA4,
      showOnLegal = _ref.showOnLegal,
      hideOnScreen = _ref.hideOnScreen,
      verticallyAlignContent = _ref.verticallyAlignContent,
      className = _ref.className,
      children = _ref.children;
  var classNames = ["printable-section", "printable-" + type, "".concat(printableType, "-").concat(type)];

  if (hideOnScreen) {
    classNames.push("hide-on-screen");
  }

  if (showOnA4) {
    classNames.push("show-on-a4");
  }

  if (showOnLetter) {
    classNames.push("show-on-letter");
  }

  if (showOnLegal) {
    classNames.push("show-on-legal");
  }

  if (hideOnPrint && !showOnA4 && !showOnLetter && !showOnLegal) {
    classNames.push("hide-on-print");
  }

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
    id: type,
    className: classNames.concat(className).join(" ").trim(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: verticallyAlignContent ? "valign-wrapper" : null,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, children));
};
SectionWrapper.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  printableType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  hideOnPrint: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  hideOnScreen: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnA4: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLegal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLetter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  verticallyAlignContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
SectionWrapper.defaultProps = {
  hideOnPrint: false,
  hideOnScreen: false,
  showOnA4: false,
  showOnLegal: false,
  showOnLetter: false,
  verticallyAlignContent: false
};
var _default = SectionWrapper;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SectionWrapper, "SectionWrapper", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/sectionWrapper.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/sectionWrapper.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getPosts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getPhotoPosts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getWordPosts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getPostsSortedByDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getPhotoPostsSortedByDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getWordPostsSortedByDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getOldestPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getNewestPost; });
/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions_fetchPosts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Map"])({
    posts: Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Set"])([])
  });
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_fetchPosts__WEBPACK_IMPORTED_MODULE_3__[/* FETCHING_POSTS_SUCCESS */ "d"]:
      {
        if (action.payload.posts) {
          return state.set("posts", state.get("posts").union(action.payload.posts));
        }

        return state;
      }

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
var getPosts = function getPosts(state) {
  return state.get("posts");
};
var getPhotoPosts = Object(reselect__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(getPosts, function (posts) {
  return posts.filter(function (post) {
    return post instanceof _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* Photo */ "h"];
  });
});
var getWordPosts = Object(reselect__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(getPosts, function (posts) {
  return posts.filter(function (post) {
    return post instanceof _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* Post */ "i"];
  });
});
var getPostsSortedByDate = Object(reselect__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(getPosts, function (posts) {
  return posts.sort(_randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* util */ "l"].sortPostsByDate);
});
var getPhotoPostsSortedByDate = Object(reselect__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(getPhotoPosts, function (posts) {
  return posts.sort(_randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* util */ "l"].sortPostsByDate);
});
var getWordPostsSortedByDate = Object(reselect__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(getWordPosts, function (posts) {
  return posts.sort(_randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* util */ "l"].sortPostsByDate);
});
var getOldestPost = Object(reselect__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(getPostsSortedByDate, function (sortedPosts) {
  return sortedPosts.last();
});
var getNewestPost = Object(reselect__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(getPostsSortedByDate, function (sortedPosts) {
  return sortedPosts.first();
});
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getPosts, "getPosts", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/posts.js");
  reactHotLoader.register(getPhotoPosts, "getPhotoPosts", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/posts.js");
  reactHotLoader.register(getWordPosts, "getWordPosts", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/posts.js");
  reactHotLoader.register(getPostsSortedByDate, "getPostsSortedByDate", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/posts.js");
  reactHotLoader.register(getPhotoPostsSortedByDate, "getPhotoPostsSortedByDate", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/posts.js");
  reactHotLoader.register(getWordPostsSortedByDate, "getWordPostsSortedByDate", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/posts.js");
  reactHotLoader.register(getOldestPost, "getOldestPost", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/posts.js");
  reactHotLoader.register(getNewestPost, "getNewestPost", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/posts.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/posts.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getApiState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getApiStateForUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isUrlStateLoading; });
/* unused harmony export getErrorForUrlState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createIsLoadingUrlSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createGetErrorForUrlSelector; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions_fetchPosts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_fetchPosts__WEBPACK_IMPORTED_MODULE_3__[/* FETCHING_POSTS */ "a"]:
      {
        var currentFetchUrlState = state.get(action.payload.fetchUrl) || Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();
        return state.set(action.payload.fetchUrl, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(_objectSpread({}, currentFetchUrlState.toJS(), {
          isLoading: true
        })));
      }

    case _actions_fetchPosts__WEBPACK_IMPORTED_MODULE_3__[/* FETCHING_POSTS_CANCELLED */ "b"]:
      {
        var _currentFetchUrlState = state.get(action.payload.fetchUrl) || Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();

        return state.set(action.payload.fetchUrl, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(_objectSpread({}, _currentFetchUrlState.toJS(), {
          isLoading: false
        })));
      }

    case _actions_fetchPosts__WEBPACK_IMPORTED_MODULE_3__[/* FETCHING_POSTS_FAILURE */ "c"]:
      {
        var _currentFetchUrlState2 = state.get(action.payload.fetchUrl) || Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();

        return state.set(action.payload.fetchUrl, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(_objectSpread({}, _currentFetchUrlState2.toJS(), {
          error: action.payload.error,
          isLoading: false
        })));
      }

    case _actions_fetchPosts__WEBPACK_IMPORTED_MODULE_3__[/* FETCHING_POSTS_SUCCESS */ "d"]:
      {
        var _currentFetchUrlState3 = state.get(action.payload.fetchUrl) || Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();

        return state.set(action.payload.fetchUrl, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(_objectSpread({}, _currentFetchUrlState3.toJS(), {
          oldest: action.payload.oldest && luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(action.payload.oldest),
          newest: action.payload.newest && luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(action.payload.newest),
          isLoading: false
        })));
      }

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["c"] = (_default); // NOTE-RT: Global selectors

var getApiState = function getApiState(state) {
  return state;
};
var getApiStateForUrl = function getApiStateForUrl(state, url) {
  return getApiState(state).get(url);
}; // NOTE-RT: Utility functions

var isUrlStateLoading = function isUrlStateLoading(urlState) {
  return urlState && urlState.get("isLoading");
};
var getErrorForUrlState = function getErrorForUrlState(urlState) {
  return urlState && urlState.get("error");
};

var getApiStateForUrlFromGlobalState = function getApiStateForUrlFromGlobalState(state, url) {
  return getApiStateForUrl(state.get("api"), url);
}; // NOTE-RT: Private selectors for individual containers


var createIsLoadingUrlSelector = function createIsLoadingUrlSelector() {
  return Object(reselect__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(getApiStateForUrlFromGlobalState, isUrlStateLoading);
};
var createGetErrorForUrlSelector = function createGetErrorForUrlSelector() {
  return Object(reselect__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(getApiStateForUrlFromGlobalState, getErrorForUrlState);
};
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getApiState, "getApiState", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/api.js");
  reactHotLoader.register(getApiStateForUrl, "getApiStateForUrl", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/api.js");
  reactHotLoader.register(isUrlStateLoading, "isUrlStateLoading", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/api.js");
  reactHotLoader.register(getErrorForUrlState, "getErrorForUrlState", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/api.js");
  reactHotLoader.register(getApiStateForUrlFromGlobalState, "getApiStateForUrlFromGlobalState", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/api.js");
  reactHotLoader.register(createIsLoadingUrlSelector, "createIsLoadingUrlSelector", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/api.js");
  reactHotLoader.register(createGetErrorForUrlSelector, "createGetErrorForUrlSelector", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/api.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/api.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostClassGenerator; });
/* unused harmony export AbstractPost */
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _creator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var PostClassGenerator = function PostClassGenerator(otherProperties) {
  return (
    /*#__PURE__*/
    function (_Record) {
      _inherits(AbstractPost, _Record);

      function AbstractPost() {
        _classCallCheck(this, AbstractPost);

        return _possibleConstructorReturn(this, _getPrototypeOf(AbstractPost).apply(this, arguments));
      }

      _createClass(AbstractPost, [{
        key: "toJS",
        value: function toJS() {
          return _objectSpread({}, _get(_getPrototypeOf(AbstractPost.prototype), "toJS", this).call(this), {
            type: this.type,
            datePublished: this.datePublished
          });
        }
      }, {
        key: "toJSON",
        value: function toJSON() {
          return _objectSpread({}, _get(_getPrototypeOf(AbstractPost.prototype), "toJSON", this).call(this), {
            type: this.type,
            datePublished: this.datePublished
          });
        }
      }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
          // @ts-ignore
          this[key] = eval(code);
        }
      }, {
        key: "uid",
        get: function get() {
          return "".concat(this.source).concat(_util__WEBPACK_IMPORTED_MODULE_3__["compositeKeySeparator"]).concat(this.id);
        }
      }, {
        key: "type",
        get: function get() {
          if (this.get("type")) {
            return this.get("type");
          }

          return this.constructor.name;
        }
      }, {
        key: "date",
        get: function get() {
          return this.datePublished || this.dateCreated;
        }
      }, {
        key: "datePublished",
        get: function get() {
          if (this.get("datePublished")) {
            return this.get("datePublished");
          }

          return this.dateCreated;
        }
      }], [{
        key: "parsePropertiesFromJs",
        value: function parsePropertiesFromJs(js) {
          return _objectSpread({}, js, {
            dateCreated: js.dateCreated && !(js.dateCreated instanceof luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"]) ? js.dateCreated.valueOf ? luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromMillis(js.dateCreated.valueOf()) : null : js.dateCreated,
            datePublished: js.datePublished && !(js.datePublished instanceof luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"]) ? js.datePublished.valueOf ? luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromMillis(js.datePublished.valueOf()) : null : js.datePublished,
            creator: js.creator ? _creator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fromJS(js.creator) : null
          });
        }
      }, {
        key: "fromJS",
        value: function fromJS(js) {
          return new this(this.parsePropertiesFromJs(js));
        }
      }, {
        key: "parsePropertiesFromJson",
        value: function parsePropertiesFromJson(json) {
          return _objectSpread({}, json, {
            dateCreated: json.dateCreated ? luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(json.dateCreated) : null,
            datePublished: json.datePublished ? luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(json.datePublished) : null,
            creator: json.creator ? _creator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fromJSON(json.creator) : null
          });
        }
      }, {
        key: "fromJSON",
        value: function fromJSON(json) {
          return new this(this.parsePropertiesFromJson(json));
        }
      }]);

      return AbstractPost;
    }(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])(_objectSpread({
      id: null,
      type: null,
      source: null,
      datePublished: null,
      dateCreated: null,
      title: null,
      body: null,
      sourceUrl: null,
      creator: null
    }, otherProperties)))
  );
};
var AbstractPost = PostClassGenerator();

var Post =
/*#__PURE__*/
function (_PostClassGenerator) {
  _inherits(Post, _PostClassGenerator);

  function Post() {
    _classCallCheck(this, Post);

    return _possibleConstructorReturn(this, _getPrototypeOf(Post).apply(this, arguments));
  }

  return Post;
}(PostClassGenerator());

var _default = Post;
/* harmony default export */ __webpack_exports__["b"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PostClassGenerator, "PostClassGenerator", "/home/travis/build/randytarampi/me/packages/js/lib/post.js");
  reactHotLoader.register(AbstractPost, "AbstractPost", "/home/travis/build/randytarampi/me/packages/js/lib/post.js");
  reactHotLoader.register(Post, "Post", "/home/travis/build/randytarampi/me/packages/js/lib/post.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/post.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FETCHING_POSTS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FETCHING_POSTS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FETCHING_POSTS_CANCELLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCHING_POSTS; });
/* unused harmony export FETCHING_POSTS_PER_PAGE */
/* unused harmony export fetchingPosts */
/* unused harmony export fetchingCancelled */
/* unused harmony export fetchingSuccess */
/* unused harmony export fetchingFailure */
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _api_fetchPosts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(273);
/* harmony import */ var _data_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _setError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(98);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var FETCHING_POSTS_FAILURE = "FETCHING_POSTS_FAILURE";
var FETCHING_POSTS_SUCCESS = "FETCHING_POSTS_SUCCESS";
var FETCHING_POSTS_CANCELLED = "FETCHING_POSTS_CANCELLED";
var FETCHING_POSTS = "FETCHING_POSTS";
var FETCHING_POSTS_PER_PAGE = 16;

var _default = function _default(fetchUrl) {
  return function (dispatch, getState) {
    var state = getState();
    var urlState = _data_selectors__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getApiStateForUrl(state, fetchUrl);
    var isLoading = Object(_data_api__WEBPACK_IMPORTED_MODULE_2__[/* isUrlStateLoading */ "f"])(urlState);

    if (isLoading) {
      dispatch(fetchingCancelled({
        fetchUrl: fetchUrl,
        isLoading: isLoading
      }));
      return Promise.resolve();
    }

    var oldestLoadedPost = _data_selectors__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getOldestPost(state);
    var oldestLoadedPostDate = oldestLoadedPost && oldestLoadedPost.datePublished;
    var oldestPostAvailableDate = urlState && urlState.get("oldest");

    if (oldestPostAvailableDate && oldestLoadedPostDate && oldestLoadedPostDate.diff(oldestPostAvailableDate) <= 0) {
      dispatch(fetchingCancelled({
        fetchUrl: fetchUrl,
        oldestPostAvailableDate: oldestPostAvailableDate,
        oldestLoadedPostDate: oldestLoadedPostDate
      }));
      return Promise.resolve();
    }

    var searchParams = _objectSpread({
      perPage: FETCHING_POSTS_PER_PAGE
    }, oldestLoadedPostDate ? {
      orderBy: "datePublished",
      orderOperator: "lt",
      orderComparator: oldestLoadedPostDate && oldestLoadedPostDate.toISO(),
      orderComparatorType: "String"
    } : null);

    dispatch(fetchingPosts({
      fetchUrl: fetchUrl,
      searchParams: searchParams
    }));
    return Object(_api_fetchPosts__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(fetchUrl, searchParams).then(function (postsResponse) {
      dispatch(fetchingSuccess(_objectSpread({
        fetchUrl: fetchUrl
      }, postsResponse)));

      if (!postsResponse || !postsResponse.posts || !postsResponse.posts.length) {
        dispatch(Object(_setError__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"])(undefined, "ENOPOSTS"));
      }
    }).catch(function (error) {
      dispatch(fetchingFailure({
        fetchUrl: fetchUrl,
        error: error
      }));
      dispatch(Object(_setError__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"])(error, "EFETCH"));
      throw error;
    });
  };
};

/* harmony default export */ __webpack_exports__["e"] = (_default);
var fetchingPosts = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(FETCHING_POSTS);
var fetchingCancelled = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(FETCHING_POSTS_CANCELLED);
var fetchingSuccess = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(FETCHING_POSTS_SUCCESS);
var fetchingFailure = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(FETCHING_POSTS_FAILURE);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FETCHING_POSTS_FAILURE, "FETCHING_POSTS_FAILURE", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  reactHotLoader.register(FETCHING_POSTS_SUCCESS, "FETCHING_POSTS_SUCCESS", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  reactHotLoader.register(FETCHING_POSTS_CANCELLED, "FETCHING_POSTS_CANCELLED", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  reactHotLoader.register(FETCHING_POSTS, "FETCHING_POSTS", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  reactHotLoader.register(FETCHING_POSTS_PER_PAGE, "FETCHING_POSTS_PER_PAGE", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  reactHotLoader.register(fetchingPosts, "fetchingPosts", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  reactHotLoader.register(fetchingCancelled, "fetchingCancelled", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  reactHotLoader.register(fetchingSuccess, "fetchingSuccess", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  reactHotLoader.register(fetchingFailure, "fetchingFailure", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/fetchPosts.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compositeKeySeparator", function() { return compositeKeySeparator; });
/* harmony import */ var _getEntityForType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(208);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEntityForType", function() { return _getEntityForType__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _sortCharactersByPosition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(209);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortCharactersByPosition", function() { return _sortCharactersByPosition__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _sortPhotosByWidth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(210);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortPhotosByWidth", function() { return _sortPhotosByWidth__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var _sortPostsByDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(211);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortPostsByDate", function() { return _sortPostsByDate__WEBPACK_IMPORTED_MODULE_3__["a"]; });

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

var compositeKeySeparator = "--@me/sep!-";




;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(compositeKeySeparator, "compositeKeySeparator", "/home/travis/build/randytarampi/me/packages/js/lib/util/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 61 */,
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return hasError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getErrorState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getErrorMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getErrorCode; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _actions_clearError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87);
/* harmony import */ var _actions_setError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_setError__WEBPACK_IMPORTED_MODULE_2__[/* SET_ERROR */ "a"]:
      {
        return state.set("error", action.payload.error).set("errorMessage", action.payload.errorMessage).set("errorCode", action.payload.errorCode);
      }

    case _actions_clearError__WEBPACK_IMPORTED_MODULE_1__[/* CLEAR_ERROR */ "a"]:
      {
        return Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();
      }

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
var hasError = function hasError(state) {
  return !!getError(state) || !!getErrorMessage(state) || !!getErrorCode(state);
};
var getErrorState = function getErrorState(state) {
  return state;
};
var getError = function getError(state) {
  return getErrorState(state).get("error");
};
var getErrorMessage = function getErrorMessage(state) {
  return getErrorState(state).get("errorMessage");
};
var getErrorCode = function getErrorCode(state) {
  return getErrorState(state).get("errorCode");
};
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(hasError, "hasError", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/error.js");
  reactHotLoader.register(getErrorState, "getErrorState", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/error.js");
  reactHotLoader.register(getError, "getError", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/error.js");
  reactHotLoader.register(getErrorMessage, "getErrorMessage", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/error.js");
  reactHotLoader.register(getErrorCode, "getErrorCode", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/error.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/error.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_errorWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(272);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(120);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var ConnectedErrorWrapper = Object(_error__WEBPACK_IMPORTED_MODULE_2__[/* connectError */ "a"])(_components_errorWrapper__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
ConnectedErrorWrapper.propTypes = {
  redirectionLocation: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  redirectionTimeout: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
};
ConnectedErrorWrapper.defaultProps = {
  redirectionLocation: "/",
  redirectionTimeout: 10
};
var _default = ConnectedErrorWrapper;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ConnectedErrorWrapper, "ConnectedErrorWrapper", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/errorWrapper.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/errorWrapper.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return connectBear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bear; });
/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(118);
/* harmony import */ var _actions_emoji_onBearComponentClick__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(277);
/* harmony import */ var _components_emoji__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(89);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();







var connectBear = function connectBear(emoji) {
  return Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(null, function (dispatch, ownProps) {
    return {
      onComponentClick: ownProps.onComponentClick ? ownProps.onComponentClick : function (componentId, clickEvent) {
        return dispatch(Object(_actions_emoji_onBearComponentClick__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(ownProps.id, componentId, clickEvent));
      }
    };
  })(Object(___WEBPACK_IMPORTED_MODULE_3__[/* connectEmoji */ "a"])(emoji));
};
var Bear = connectBear(_components_emoji__WEBPACK_IMPORTED_MODULE_5__[/* Emoji */ "a"]);
Bear.propTypes = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  emoji: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
Bear.defaultProps = {
  emoji: new _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* Bear */ "a"]()
};
var _default = Bear;
/* harmony default export */ __webpack_exports__["c"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(connectBear, "connectBear", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/bear/bear.jsx");
  reactHotLoader.register(Bear, "Bear", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/bear/bear.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/bear/bear.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 84 */,
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export Character */
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Character =
/*#__PURE__*/
function (_Record) {
  _inherits(Character, _Record);

  function Character() {
    _classCallCheck(this, Character);

    return _possibleConstructorReturn(this, _getPrototypeOf(Character).apply(this, arguments));
  }

  _createClass(Character, [{
    key: "toString",
    value: function toString() {
      return this.character;
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      return Character.fromJS(json);
    }
  }, {
    key: "fromJS",
    value: function fromJS(_ref) {
      var meta = _ref.meta,
          js = _objectWithoutProperties(_ref, ["meta"]);

      return new this(_objectSpread({}, js, {
        meta: meta ? Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(meta) : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])()
      }));
    }
  }]);

  return Character;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  id: null,
  position: null,
  character: null,
  meta: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])()
}));
var _default = Character;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Character, "Character", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/character.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/character.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _bear__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _helloBear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(222);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var _default = _bear__WEBPACK_IMPORTED_MODULE_0__[/* default */ "c"];
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/bear/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLEAR_ERROR; });
/* unused harmony export clearError */
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();


var CLEAR_ERROR = "CLEAR_ERROR";

var _default = function _default() {
  return function (dispatch) {
    dispatch(clearError());
  };
};

/* harmony default export */ __webpack_exports__["b"] = (_default);
var clearError = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(CLEAR_ERROR);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CLEAR_ERROR, "CLEAR_ERROR", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/clearError.js");
  reactHotLoader.register(clearError, "clearError", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/clearError.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/clearError.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export HANDLE_COMPONENT_CLICK */
/* unused harmony export onComponentClick */
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _updateEmoji__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var HANDLE_COMPONENT_CLICK = "HANDLE_COMPONENT_CLICK";

var _default = function _default(emojiId, componentId, event) {
  return function (dispatch, getState) {
    // eslint-disable-line no-unused-vars
    var state = getState();
    var emoji = _data_selectors__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getEmoji(state, emojiId);
    var clickCountPath = ["components", componentId, "meta", "clicks"];
    var clicks = emoji.getIn(clickCountPath) || 0;
    clicks += 1;
    dispatch(onComponentClick({
      emojiId: emojiId,
      componentId: componentId,
      clicks: clicks
    }));
    dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_2__[/* updateEmoji */ "c"])(emoji.setIn(clickCountPath, clicks)));
  };
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
var onComponentClick = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(HANDLE_COMPONENT_CLICK);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(HANDLE_COMPONENT_CLICK, "HANDLE_COMPONENT_CLICK", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/onComponentClick.js");
  reactHotLoader.register(onComponentClick, "onComponentClick", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/onComponentClick.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/onComponentClick.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Emoji; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/emoji.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Emoji =
/*#__PURE__*/
function (_Component) {
  _inherits(Emoji, _Component);

  function Emoji(props, context, updater) {
    var _this;

    _classCallCheck(this, Emoji);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Emoji).call(this, props, context, updater));

    _this.props.instantiateEmoji(props.emoji);

    return _this;
  }

  _createClass(Emoji, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.props.persistentEmoji) {
        this.props.clearEmoji(this.props.emoji);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var emoji = this.props.emoji;
      var emojiString = emoji.toString();
      var TextEffectWrapper = this.props.textEffect ? function (props) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
          className: "text",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          },
          __self: this
        }, props.children);
      } : react__WEBPACK_IMPORTED_MODULE_1__["Fragment"];
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: this.props.htmlId || emoji.id,
        className: [emoji.type, "".concat(emoji.type, "--").concat(emojiString)].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TextEffectWrapper, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }, emoji.components.map(function (component) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
          key: component.id,
          "data-metrics-event-name": "emoji-component",
          "data-metrics-type": "onClick",
          "data-metrics-name": "".concat(emoji.id, "__").concat(component.id),
          "data-metrics-label": component.character,
          "data-metrics-value": _this2.props.onComponentClick && _this2.props.onComponentClick.name,
          className: ["".concat(emoji.id, "__").concat(component.id), "".concat(emoji.type, "__").concat(component.id), "".concat(emoji.type, "__").concat(component.id, "--").concat(emojiString)].join(" "),
          onClick: function onClick(event) {
            return _this2.props.onComponentClick && _this2.props.onComponentClick(component.id, event);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          },
          __self: this
        }, component.character);
      })), this.props.children ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: ["".concat(emoji.type, "__children"), "".concat(emoji.type, "__children--").concat(emojiString)].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, this.props.children) : null);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Emoji;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);
Emoji.propTypes = {
  htmlId: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  emoji: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  persistentEmoji: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  instantiateEmoji: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  clearEmoji: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onComponentClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  textEffect: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
Emoji.defaultProps = {
  persistentEmoji: true,
  textEffect: false
};
var _default = Emoji;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Emoji, "Emoji", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/emoji.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/emoji.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Creator =
/*#__PURE__*/
function (_Record) {
  _inherits(Creator, _Record);

  function Creator() {
    _classCallCheck(this, Creator);

    return _possibleConstructorReturn(this, _getPrototypeOf(Creator).apply(this, arguments));
  }

  _createClass(Creator, null, [{
    key: "fromJS",
    value: function fromJS(js) {
      return new Creator(js);
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      return Creator.fromJS(json);
    }
  }]);

  return Creator;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  id: null,
  username: null,
  name: null,
  sourceUrl: null,
  imageUrl: null
}));

var _default = Creator;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Creator, "Creator", "/home/travis/build/randytarampi/me/packages/js/lib/creator.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/creator.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var SizedPhoto =
/*#__PURE__*/
function (_Record) {
  _inherits(SizedPhoto, _Record);

  function SizedPhoto() {
    _classCallCheck(this, SizedPhoto);

    return _possibleConstructorReturn(this, _getPrototypeOf(SizedPhoto).apply(this, arguments));
  }

  _createClass(SizedPhoto, [{
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }, {
    key: "size",
    get: function get() {
      if (this.get("size")) {
        return this.get("size");
      }

      return this.width && this.width.toString();
    }
  }], [{
    key: "fromJS",
    value: function fromJS(js) {
      return new SizedPhoto(js);
    }
  }, {
    key: "fromJSON",
    value: function fromJSON() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var width = _ref.width,
          height = _ref.height,
          json = _objectWithoutProperties(_ref, ["width", "height"]);

      return SizedPhoto.fromJS(_objectSpread({}, json, {
        width: width && Number(width),
        height: height && Number(height)
      }));
    }
  }]);

  return SizedPhoto;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  url: null,
  width: null,
  height: null,
  size: null
}));

var _default = SizedPhoto;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SizedPhoto, "SizedPhoto", "/home/travis/build/randytarampi/me/packages/js/lib/sizedPhoto.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/sizedPhoto.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SET_ERROR; });
/* unused harmony export setError */
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();



var SET_ERROR = "SET_ERROR";

var _default = function _default(error, errorCode, errorMessage) {
  return function (dispatch) {
    if (error) {
      _logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].error(error);
    } else {
      _logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].warn(errorCode, errorMessage);
    }

    dispatch(setError({
      error: error,
      errorCode: errorCode,
      errorMessage: errorMessage
    }));
  };
};

/* harmony default export */ __webpack_exports__["b"] = (_default);
var setError = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(SET_ERROR);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SET_ERROR, "SET_ERROR", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/setError.js");
  reactHotLoader.register(setError, "setError", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/setError.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/setError.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getEmoji; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasEmoji; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _actions_emoji_clearEmoji__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(127);
/* harmony import */ var _actions_emoji_instantiateEmoji__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(129);
/* harmony import */ var _actions_emoji_updateEmoji__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_emoji_instantiateEmoji__WEBPACK_IMPORTED_MODULE_2__[/* INSTANTIATE_EMOJI */ "a"]:
    case _actions_emoji_updateEmoji__WEBPACK_IMPORTED_MODULE_3__[/* UPDATE_EMOJI */ "a"]:
      return state.set(action.payload.id, action.payload);

    case _actions_emoji_clearEmoji__WEBPACK_IMPORTED_MODULE_1__[/* CLEAR_EMOJI */ "a"]:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
var getEmoji = function getEmoji(state, emojiId) {
  return state.get(emojiId);
};
var hasEmoji = function hasEmoji(state, emojiId) {
  return !!getEmoji(state, emojiId);
};
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getEmoji, "getEmoji", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/emoji.js");
  reactHotLoader.register(hasEmoji, "hasEmoji", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/emoji.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/emoji.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildEventDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return buildReduxActionEventDetails; });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_0__);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var buildEventDetails = function buildEventDetails(details) {
  var dateTime = luxon__WEBPACK_IMPORTED_MODULE_0__["DateTime"].utc();
  return _objectSpread({
    name: "",
    value: "",
    type: ""
  }, details, {
    timestamp: dateTime.valueOf(),
    dateTime: dateTime.toISO()
  });
};
var buildReduxActionEventDetails = function buildReduxActionEventDetails(action, supplementaryDetails) {
  return buildEventDetails(_objectSpread({}, supplementaryDetails, {
    type: action.type
  }));
};
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(buildEventDetails, "buildEventDetails", "/home/travis/build/randytarampi/me/packages/jsx/lib/metrics/util.js");
  reactHotLoader.register(buildReduxActionEventDetails, "buildReduxActionEventDetails", "/home/travis/build/randytarampi/me/packages/jsx/lib/metrics/util.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_metrics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(125);
/* harmony import */ var react_metrics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_metrics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(131);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var _default = Object(react_metrics__WEBPACK_IMPORTED_MODULE_0__["createMetrics"])(_config__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/metrics/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
/* harmony import */ var _sizedPhoto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Photo =
/*#__PURE__*/
function (_PostClassGenerator) {
  _inherits(Photo, _PostClassGenerator);

  function Photo() {
    _classCallCheck(this, Photo);

    return _possibleConstructorReturn(this, _getPrototypeOf(Photo).apply(this, arguments));
  }

  _createClass(Photo, [{
    key: "getSizedPhotoForDisplay",
    value: function getSizedPhotoForDisplay(width) {
      var widthAppropriatePhotos = this.sortedSizedPhotos.filter(function (sizedPhoto) {
        return sizedPhoto.width >= width && sizedPhoto.size !== "raw";
      });
      return widthAppropriatePhotos.first() || this.sortedSizedPhotos.last();
    }
  }, {
    key: "getSizedPhotoForLoading",
    value: function getSizedPhotoForLoading() {
      return this.sortedSizedPhotos.first();
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }, {
    key: "sortedSizedPhotos",
    get: function get() {
      return this.sizedPhotos.sort(_util__WEBPACK_IMPORTED_MODULE_3__["sortPhotosByWidth"]);
    }
  }], [{
    key: "parsePropertiesFromJs",
    value: function parsePropertiesFromJs(js) {
      return _objectSpread({}, _post__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].parsePropertiesFromJs(js), {
        sizedPhotos: js.sizedPhotos ? Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])(js.sizedPhotos.map(function (sizedPhoto) {
          return _sizedPhoto__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fromJS(ensureSizedPhotoHasHeight(sizedPhoto, js.width, js.height));
        })) : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])()
      });
    }
  }, {
    key: "parsePropertiesFromJson",
    value: function parsePropertiesFromJson(json) {
      return _objectSpread({}, _post__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].parsePropertiesFromJson(json), {
        sizedPhotos: json.sizedPhotos ? Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])(json.sizedPhotos.map(function (sizedPhoto) {
          return _sizedPhoto__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fromJSON(ensureSizedPhotoHasHeight(sizedPhoto, json.width, json.height));
        })) : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])()
      });
    }
  }]);

  return Photo;
}(Object(_post__WEBPACK_IMPORTED_MODULE_1__[/* PostClassGenerator */ "a"])({
  width: null,
  height: null,
  sizedPhotos: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])()
}));

var _default = Photo;
/* harmony default export */ __webpack_exports__["a"] = (_default);

var scaleHeightToWidth = function scaleHeightToWidth(limitedWidth, originalWidth, originalHeight) {
  return ~~(originalHeight / originalWidth * limitedWidth);
};

var ensureSizedPhotoHasHeight = function ensureSizedPhotoHasHeight(sizedPhotoJs, fullWidth, fullHeight) {
  if (sizedPhotoJs.height) {
    return sizedPhotoJs;
  }

  return _objectSpread({}, sizedPhotoJs, {
    height: scaleHeightToWidth(sizedPhotoJs.width, fullWidth, fullHeight)
  });
};

;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Photo, "Photo", "/home/travis/build/randytarampi/me/packages/js/lib/photo.js");
  reactHotLoader.register(scaleHeightToWidth, "scaleHeightToWidth", "/home/travis/build/randytarampi/me/packages/js/lib/photo.js");
  reactHotLoader.register(ensureSizedPhotoHasHeight, "ensureSizedPhotoHasHeight", "/home/travis/build/randytarampi/me/packages/js/lib/photo.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/photo.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _emoji__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(117);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _emoji__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _emoji__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(212);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _bear__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _bear__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _bear__WEBPACK_IMPORTED_MODULE_1__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _bear__WEBPACK_IMPORTED_MODULE_1__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "g", function() { return _bear__WEBPACK_IMPORTED_MODULE_1__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _bear__WEBPACK_IMPORTED_MODULE_1__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "i", function() { return _bear__WEBPACK_IMPORTED_MODULE_1__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "j", function() { return _bear__WEBPACK_IMPORTED_MODULE_1__["h"]; });

/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var _default = _emoji__WEBPACK_IMPORTED_MODULE_0__[/* default */ "c"];
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export defaultComponents */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EmojiClassGenerator; });
/* unused harmony export AbstractEmoji */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Emoji; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60);
/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var defaultComponents = {
  leftEye: {
    id: "leftEye",
    character: "•",
    position: 1
  },
  nose: {
    id: "nose",
    character: "ᴥ",
    position: 2
  },
  rightEye: {
    id: "rightEye",
    character: "•",
    position: 3
  }
};
var EmojiClassGenerator = function EmojiClassGenerator() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref$components = _ref.components,
      components = _ref$components === void 0 ? defaultComponents : _ref$components,
      otherProperties = _objectWithoutProperties(_ref, ["components"]);

  return (
    /*#__PURE__*/
    function (_Record) {
      _inherits(AbstractEmoji, _Record);

      function AbstractEmoji() {
        _classCallCheck(this, AbstractEmoji);

        return _possibleConstructorReturn(this, _getPrototypeOf(AbstractEmoji).apply(this, arguments));
      }

      _createClass(AbstractEmoji, [{
        key: "toString",
        value: function toString() {
          return this.components.join("");
        }
      }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
          // @ts-ignore
          this[key] = eval(code);
        }
      }, {
        key: "components",
        get: function get() {
          return this.get("components").filter(function (character) {
            return !!character.character;
          }).sort(_util__WEBPACK_IMPORTED_MODULE_1__["sortCharactersByPosition"]).toList().toArray();
        }
      }], [{
        key: "parsePropertiesFromJs",
        value: function parsePropertiesFromJs() {
          var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var components = _ref2.components,
              js = _objectWithoutProperties(_ref2, ["components"]);

          return _objectSpread({}, js, {
            components: components && new immutable__WEBPACK_IMPORTED_MODULE_0__["Map"](Object.entries(components).reduce(function (map, _ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  characterKey = _ref4[0],
                  character = _ref4[1];

              map[characterKey] = _character__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fromJS(character);
              return map;
            }, {}))
          });
        }
      }, {
        key: "fromJS",
        value: function fromJS(js) {
          return new this(this.parsePropertiesFromJs(js));
        }
      }, {
        key: "parsePropertiesFromJson",
        value: function parsePropertiesFromJson() {
          var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var components = _ref5.components,
              json = _objectWithoutProperties(_ref5, ["components"]);

          return _objectSpread({}, json, {
            components: components && new immutable__WEBPACK_IMPORTED_MODULE_0__["Map"](Object.entries(components).reduce(function (map, _ref6) {
              var _ref7 = _slicedToArray(_ref6, 2),
                  characterKey = _ref7[0],
                  character = _ref7[1];

              map[characterKey] = _character__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fromJSON(character);
              return map;
            }, {}))
          });
        }
      }, {
        key: "fromJSON",
        value: function fromJSON(json) {
          return new this(this.parsePropertiesFromJson(json));
        }
      }]);

      return AbstractEmoji;
    }(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])(_objectSpread({
      id: null,
      type: null,
      components: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])(Object.entries(components).reduce(function (map, _ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
            characterKey = _ref9[0],
            character = _ref9[1];

        map[characterKey] = _character__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fromJS(character);
        return map;
      }, {}))
    }, otherProperties)))
  );
};
var AbstractEmoji = EmojiClassGenerator();
var Emoji =
/*#__PURE__*/
function (_EmojiClassGenerator) {
  _inherits(Emoji, _EmojiClassGenerator);

  function Emoji() {
    _classCallCheck(this, Emoji);

    return _possibleConstructorReturn(this, _getPrototypeOf(Emoji).apply(this, arguments));
  }

  return Emoji;
}(EmojiClassGenerator({
  type: "emoji"
}));
var _default = Emoji;
/* harmony default export */ __webpack_exports__["c"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultComponents, "defaultComponents", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/emoji.js");
  reactHotLoader.register(EmojiClassGenerator, "EmojiClassGenerator", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/emoji.js");
  reactHotLoader.register(AbstractEmoji, "AbstractEmoji", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/emoji.js");
  reactHotLoader.register(Emoji, "Emoji", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/emoji.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/emoji.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _emoji__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(119);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _emoji__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var _default = _emoji__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"];
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return connectEmoji; });
/* unused harmony export Emoji */
/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _actions_emoji_clearEmoji__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(127);
/* harmony import */ var _actions_emoji_instantiateEmoji__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _actions_emoji_onComponentClick__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88);
/* harmony import */ var _components_emoji__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(89);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();









var connectEmoji = function connectEmoji(emoji) {
  return Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(function (state, ownProps) {
    var emoji = _data_selectors__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].getEmoji(state, ownProps.id) || ownProps.emoji.set("id", ownProps.id);
    return {
      emoji: emoji
    };
  }, function (dispatch, ownProps) {
    return {
      clearEmoji: ownProps.clearEmoji ? ownProps.clearEmoji : function () {
        return dispatch(Object(_actions_emoji_clearEmoji__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(ownProps.emoji));
      },
      instantiateEmoji: ownProps.instantiateEmoji ? ownProps.instantiateEmoji : function () {
        return dispatch(Object(_actions_emoji_instantiateEmoji__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"])(ownProps.emoji.set("id", ownProps.id)));
      },
      onComponentClick: ownProps.onComponentClick ? ownProps.onComponentClick : function (componentId, clickEvent) {
        return dispatch(Object(_actions_emoji_onComponentClick__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(ownProps.id, componentId, clickEvent));
      }
    };
  })(emoji);
};
var Emoji = connectEmoji(_components_emoji__WEBPACK_IMPORTED_MODULE_6__[/* Emoji */ "a"]);
Emoji.propTypes = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  emoji: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
Emoji.defaultProps = {
  emoji: new _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* Emoji */ "e"]()
};
var _default = Emoji;
/* harmony default export */ __webpack_exports__["b"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(connectEmoji, "connectEmoji", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/emoji.jsx");
  reactHotLoader.register(Emoji, "Emoji", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/emoji.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/emoji.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return connectError; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var _actions_clearError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(87);
/* harmony import */ var _components_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(126);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();







var connectError = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[/* connect */ "b"])(function (state) {
  return {
    location: _data_selectors__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].getLocation(state),
    hasError: _data_selectors__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].hasError(state),
    error: _data_selectors__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].getError(state),
    errorCode: _data_selectors__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].getErrorCode(state),
    errorMessage: _data_selectors__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].getErrorMessage(state)
  };
}, function (dispatch, ownProps) {
  return {
    timedRedirect: function timedRedirect() {
      return new Promise(function (resolve) {
        return setTimeout(function () {
          if (window.location && window.location.pathname !== ownProps.redirectionLocation) {
            dispatch(Object(_actions_clearError__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])());
            dispatch(Object(react_router_redux__WEBPACK_IMPORTED_MODULE_2__[/* push */ "c"])(ownProps.redirectionLocation));
          }

          resolve();
        }, ownProps.redirectionTimeout * 1000);
      });
    }
  };
});
var ConnectedError = connectError(_components_error__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
ConnectedError.propTypes = {
  redirectionLocation: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  redirectionTimeout: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
};
ConnectedError.defaultProps = {
  redirectionLocation: "/",
  redirectionTimeout: 10
};
var _default = ConnectedError;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(connectError, "connectError", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/error.jsx");
  reactHotLoader.register(ConnectedError, "ConnectedError", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/error.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/error.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/loadingSpinner.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();



var LoadingSpinner = function LoadingSpinner() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "loading-spinner",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "preloader-wrapper big active",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "spinner-layer spinner-blue",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle-clipper left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gap-patch",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle-clipper right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "spinner-layer spinner-red",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle-clipper left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gap-patch",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle-clipper right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "spinner-layer spinner-yellow",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle-clipper left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gap-patch",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle-clipper right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "spinner-layer spinner-green",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle-clipper left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gap-patch",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle-clipper right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  })))));
};

var _default = LoadingSpinner;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LoadingSpinner, "LoadingSpinner", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/loadingSpinner.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/loadingSpinner.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintableSection; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sectionWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/section.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var PrintableSection = function PrintableSection(_ref) {
  var printableType = _ref.printableType,
      type = _ref.type,
      label = _ref.label,
      labelNode = _ref.labelNode,
      description = _ref.description,
      descriptionNode = _ref.descriptionNode,
      hideOnPrint = _ref.hideOnPrint,
      showOnLetter = _ref.showOnLetter,
      showOnA4 = _ref.showOnA4,
      showOnLegal = _ref.showOnLegal,
      hideOnScreen = _ref.hideOnScreen,
      verticallyAlignContent = _ref.verticallyAlignContent,
      className = _ref.className,
      children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_sectionWrapper__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _extends({
    printableType: printableType,
    type: type,
    hideOnPrint: hideOnPrint,
    showOnLetter: showOnLetter,
    showOnA4: showOnA4,
    showOnLegal: showOnLegal,
    hideOnScreen: hideOnScreen,
    verticallyAlignContent: verticallyAlignContent,
    className: className
  }, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("aside", {
    className: "col m3 s12 printable-section__header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, labelNode ? labelNode : label ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
    className: "printable-section__label",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, label)) : null, descriptionNode || description ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    s: 9,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, descriptionNode ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "printable-section__description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, descriptionNode) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    className: "printable-section__description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, description)))) : null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    m: 9,
    s: 11,
    offset: "s1",
    className: "printable-section__content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, children));
};
PrintableSection.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node]),
  labelNode: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  description: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node]),
  descriptionNode: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  printableType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  hideOnPrint: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  hideOnScreen: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnA4: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLegal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLetter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  verticallyAlignContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
PrintableSection.defaultProps = {
  hideOnPrint: false,
  hideOnScreen: false,
  showOnA4: false,
  showOnLegal: false,
  showOnLetter: false,
  verticallyAlignContent: false
};
var _default = PrintableSection;
/* harmony default export */ __webpack_exports__["b"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/section.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/section.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export computePostHeight */
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

var computePostHeight = function computePostHeight(containerWidth) {
  return function (post) {
    if (post.height && post.width) {
      return containerWidth * post.height / post.width;
    }

    if (typeof document !== "undefined" && document.getElementById(post.uid)) {
      return document.getElementById(post.uid).clientHeight;
    }

    return typeof window !== "undefined" && window.innerHeight || 600;
  };
};
var _default = computePostHeight;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(computePostHeight, "computePostHeight", "/home/travis/build/randytarampi/me/packages/jsx/lib/util/computePostHeight.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/util/computePostHeight.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export getComponentForType */
/* harmony import */ var _components_photo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(283);
/* harmony import */ var _components_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(132);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();



var getComponentForType = function getComponentForType(type) {
  switch (type) {
    case "Photo":
      return _components_photo__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];

    case "Post":
      return _components_post__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"];

    default:
      throw new Error("Can't `getComponentForType` for `".concat(type, "`"));
  }
};
var _default = getComponentForType;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getComponentForType, "getComponentForType", "/home/travis/build/randytarampi/me/packages/jsx/lib/util/getComponentForType.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/util/getComponentForType.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 125 */,
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _containers_emoji_bear__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(86);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/error.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Error =
/*#__PURE__*/
function (_Component) {
  _inherits(Error, _Component);

  function Error() {
    _classCallCheck(this, Error);

    return _possibleConstructorReturn(this, _getPrototypeOf(Error).apply(this, arguments));
  }

  _createClass(Error, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.errorCode || [404, "ENOTFOUND"].includes(this.props.errorCode)) {
        this.props.timedRedirect();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var errorContent;

      switch (this.props.errorCode) {
        case 500:
        case "EFETCH":
          errorContent = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_containers_emoji_bear__WEBPACK_IMPORTED_MODULE_6__[/* Bear */ "a"], {
            emoji: _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* DeadBear */ "b"].fromJS(),
            id: "error-dead-bear",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 27
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h2", {
            className: "error__message--header",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 28
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
            className: "text",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 29
            },
            __self: this
          }, "He's dead, Jim.")), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
            className: "error__message",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            },
            __self: this
          }, "You've just tripped something and I've been notified. ", react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_7__[/* EmailLink */ "c"], {
            useBranding: false,
            subject: "I broke something at ".concat(luxon__WEBPACK_IMPORTED_MODULE_2__["DateTime"].local().toLocaleString(luxon__WEBPACK_IMPORTED_MODULE_2__["DateTime"].DATETIME_FULL)),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 32
            },
            __self: this
          }, "Let me know"), " if you're super keen and I can probably walk you through what happened."));
          break;

        case "ENOPOSTS":
          errorContent = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_containers_emoji_bear__WEBPACK_IMPORTED_MODULE_6__[/* Bear */ "a"], {
            emoji: _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* ShrugBear */ "j"].fromJS(),
            id: "error-shrug-bear",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 42
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h2", {
            className: "error__message--header",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 43
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
            className: "text",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 44
            },
            __self: this
          }, "Nothing to see here... yet.")), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
            className: "error__message",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 46
            },
            __self: this
          }, "There's no content to serve up just yet, but come back soon and there'll probably be something here."));
          break;

        case 404:
        case "ENOTFOUND":
        default:
          errorContent = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_containers_emoji_bear__WEBPACK_IMPORTED_MODULE_6__[/* Bear */ "a"], {
            emoji: _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* DoubtBear */ "d"].fromJS(),
            id: "error-doubt-bear",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 58
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h2", {
            className: "error__message--header",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
            className: "text",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 60
            },
            __self: this
          }, "What are you looking for?")), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
            className: "error__message",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 62
            },
            __self: this
          }, "I don't know who told you to come to ", react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("code", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 64
            },
            __self: this
          }, "".concat(window.location.origin).concat(this.props.location.get("pathname"))), ", but there's nothing here. You'll be redirected to the ", react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_7__[/* InternalLink */ "i"], {
            target: "_self",
            href: "".concat(this.props.redirectionLocation),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 66
            },
            __self: this
          }, "home page"), " in ", this.props.redirectionTimeout, " seconds."));
          break;
      }

      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        className: "error",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        },
        __self: this
      }, errorContent)));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Error;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);

Error.propTypes = {
  error: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,
  errorCode: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string]),
  errorMessage: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  location: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.instanceOf(immutable__WEBPACK_IMPORTED_MODULE_1__["Map"]).isRequired,
  redirectionLocation: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired,
  redirectionTimeout: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number.isRequired,
  timedRedirect: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired
};
var _default = Error;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Error, "Error", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/error.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/error.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLEAR_EMOJI; });
/* unused harmony export clearEmoji */
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();



var CLEAR_EMOJI = "CLEAR_EMOJI";

var _default = function _default(emoji) {
  return function (dispatch, getState) {
    var state = getState();

    if (_data_selectors__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].hasEmoji(state, emoji.id)) {
      dispatch(clearEmoji(emoji));
    }
  };
};

/* harmony default export */ __webpack_exports__["b"] = (_default);
var clearEmoji = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(CLEAR_EMOJI);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CLEAR_EMOJI, "CLEAR_EMOJI", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/clearEmoji.js");
  reactHotLoader.register(clearEmoji, "clearEmoji", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/clearEmoji.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/clearEmoji.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 128 */,
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INSTANTIATE_EMOJI; });
/* unused harmony export instantiateEmoji */
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();



var INSTANTIATE_EMOJI = "INSTANTIATE_EMOJI";

var _default = function _default(emoji) {
  return function (dispatch, getState) {
    var state = getState();

    if (!_data_selectors__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].hasEmoji(state, emoji.id)) {
      dispatch(instantiateEmoji(emoji));
    }
  };
};

/* harmony default export */ __webpack_exports__["b"] = (_default);
var instantiateEmoji = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(INSTANTIATE_EMOJI);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(INSTANTIATE_EMOJI, "INSTANTIATE_EMOJI", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/instantiateEmoji.js");
  reactHotLoader.register(instantiateEmoji, "instantiateEmoji", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/instantiateEmoji.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/instantiateEmoji.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getLocation; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();



var initialState = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])({
  location: null,
  action: null
}); // NOTE-RT: Lifted directly from https://github.com/gajus/redux-immutable/pull/71/files#diff-04c6e90faac2675aa89e2176d2eec7d8R105

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case react_router_redux__WEBPACK_IMPORTED_MODULE_1__[/* LOCATION_CHANGE */ "b"]:
      {
        var location = action.payload.location || action.payload;
        var actionPayloadAction = action.payload.action;
        return state.set("location", Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(location)).set("action", Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(actionPayloadAction));
      }

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
var getLocation = function getLocation(state) {
  return state.get("location");
};
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(initialState, "initialState", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/routing.js");
  reactHotLoader.register(getLocation, "getLocation", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/routing.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/routing.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export gtmClient */
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(100);
/* harmony import */ var _vendors_gtm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(279);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();



var gtmClient = new _vendors_gtm__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
var _default = {
  vendors: [{
    api: gtmClient
  }],
  pageDefaults: function pageDefaults(routeState) {
    return Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* buildEventDetails */ "a"])({
      value: routeState.pathname,
      pathname: routeState.pathname,
      search: routeState.search,
      hash: routeState.hash,
      params: routeState.params
    });
  }
};
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(gtmClient, "gtmClient", "/home/travis/build/randytarampi/me/packages/jsx/lib/metrics/config.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/metrics/config.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostComponent; });
/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var is_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(91);
/* harmony import */ var is_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/post.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var PostComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(PostComponent, _Component);

  function PostComponent() {
    _classCallCheck(this, PostComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(PostComponent).apply(this, arguments));
  }

  _createClass(PostComponent, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        className: "post",
        id: this.props.post.uid,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        className: "post-metadata",
        s: 12,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h1", {
        className: "post-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, this.props.post.sourceUrl ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_6__[/* default */ "o"], {
        className: "post-title__link",
        href: this.props.post.sourceUrl,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, this.title) : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        className: "post-title__text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, this.title)), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
        className: "post-date",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("strong", {
        className: "post-date__label post-date__label--published",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, "Posted:"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        className: "post-date__date post-date__date--published",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: this
      }, this.date.toLocaleString(luxon__WEBPACK_IMPORTED_MODULE_2__["DateTime"].DATETIME_MED)), this.props.post.dateCreated ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("strong", {
        className: "post-date__label post-date__label--created",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      }, "Created:"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        className: "post-date__date post-date__date--created",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      }, this.props.post.dateCreated.toLocaleString(luxon__WEBPACK_IMPORTED_MODULE_2__["DateTime"].DATETIME_MED))) : null), typeof this.props.post.body === "string" ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        className: "post-body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }, is_html__WEBPACK_IMPORTED_MODULE_1___default()(this.props.post.body) ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: this.props.post.body
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        className: "post-body__text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, this.props.post.body))) : null, Array.isArray(this.props.post.body) ? this.props.post.body.map(function (maybeHtmlString, index) {
        return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
          className: "post-body",
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 82
          },
          __self: this
        }, is_html__WEBPACK_IMPORTED_MODULE_1___default()(maybeHtmlString) ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: maybeHtmlString
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 85
          },
          __self: this
        }) : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 86
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
          className: "post-body__text",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 86
          },
          __self: this
        }, maybeHtmlString)));
      }) : null));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }, {
    key: "width",
    get: function get() {
      return this.containerWidth;
    }
  }, {
    key: "height",
    get: function get() {
      return this.containerHeight;
    }
  }, {
    key: "containerWidth",
    get: function get() {
      return this.props.containerWidth;
    }
  }, {
    key: "containerHeight",
    get: function get() {
      return this.props.containerHeight;
    }
  }, {
    key: "scaledHeight",
    get: function get() {
      return Math.round(this.containerWidth * this.height / this.width);
    }
  }, {
    key: "title",
    get: function get() {
      return this.props.post.title || "Untitled";
    }
  }, {
    key: "date",
    get: function get() {
      return this.props.post.datePublished;
    }
  }]);

  return PostComponent;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);
PostComponent.propTypes = {
  post: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.instanceOf(_randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* Post */ "i"]).isRequired,
  containerWidth: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
  containerHeight: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number
};
var _default = PostComponent;
/* harmony default export */ __webpack_exports__["b"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PostComponent, "PostComponent", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/post.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/post.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_metrics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var react_metrics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_metrics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(133);
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39);
/* harmony import */ var _containers_errorWrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(82);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _metrics_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(131);
/* harmony import */ var sniffr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(280);
/* harmony import */ var sniffr__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(sniffr__WEBPACK_IMPORTED_MODULE_9__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/clientReduxRoot.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var ClientReduxRoot =
/*#__PURE__*/
function (_Component) {
  _inherits(ClientReduxRoot, _Component);

  function ClientReduxRoot(props) {
    var _this;

    _classCallCheck(this, ClientReduxRoot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClientReduxRoot).call(this, props));
    _logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].info("Hey! I see you looking over there.");
    _logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].info("Looking for this?\n\t\thttps://www.randytarampi.ca/resume");
    _logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].info("Or was it this?\n\t\thttps://github.com/randytarampi/me/#readme");
    _logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].info("Or maybe even this?\n\t\thttps://waffle.io/randytarampi/randytarampi.github.io");
    var sniffr = new sniffr__WEBPACK_IMPORTED_MODULE_9___default.a();
    sniffr.sniff();

    if (sniffr.browser) {
      if (sniffr.browser.name === "firefox") {
        _logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].info("If you don't already have them, these should make your analysis a bit more interesting.\n\t\thttps://addons.mozilla.org/en-US/firefox/addon/react-devtools\n\t\thttps://addons.mozilla.org/en-US/firefox/addon/remotedev");
      } else if (sniffr.browser.name === "chrome") {
        _logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].info("If you don't already have them, these should make your analysis a bit more interesting.\n\t\thttps://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi\n\t\thttps://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd");
      } else if (sniffr.browser.name === "ie") {
        _logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].warn("Do yourself a favour and go here before you do anything else:\n\t\thttp://outdatedbrowser.com");
      } else {
        _logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"].warn("If you're a developer and you're reading this message, do the right thing, give me a fair shake and come back in Chrome or Firefox.\n\t\thttps://www.mozilla.org/firefox\n\t\thttps://www.google.com/chrome");
      }
    }

    return _this;
  }

  _createClass(ClientReduxRoot, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          store = _this$props.store,
          history = _this$props.history,
          routes = _this$props.routes,
          props = _objectWithoutProperties(_this$props, ["store", "history", "routes"]);

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__[/* Provider */ "a"], {
        store: store,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_containers_errorWrapper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_redux__WEBPACK_IMPORTED_MODULE_5__[/* ConnectedRouter */ "a"], {
        history: history,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }, Object(react_router_config__WEBPACK_IMPORTED_MODULE_4__[/* renderRoutes */ "a"])(routes, props))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return ClientReduxRoot;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

ClientReduxRoot.propTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  history: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  routes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array.isRequired
};

var _default = Object(react_metrics__WEBPACK_IMPORTED_MODULE_2__["metrics"])(_metrics_config__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ClientReduxRoot);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ClientReduxRoot, "ClientReduxRoot", "/home/travis/build/randytarampi/me/packages/jsx/lib/clientReduxRoot.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/clientReduxRoot.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _photo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(115);
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var _default = function _default(type) {
  switch (type) {
    case "Photo":
      return _photo__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];

    case "Post":
      return _post__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"];

    default:
      throw new Error("Can't `getEntityForType` for `".concat(type, "`"));
  }
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/util/getEntityForType.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

var _default = function _default(a, b) {
  if (a.position < b.position) {
    return -1;
  } else if (a.position > b.position) {
    return 1;
  } else {
    return 0;
  }
};

/**
 * @function Sort two [Characters]{@link Character} by position, ascending.
 * @param a {Character}
 * @param b {Character}
 * @returns {number}
 */
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/util/sortCharactersByPosition.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

var _default = function _default(a, b) {
  if (a.width < b.width) {
    return -1;
  } else if (a.width > b.width) {
    return 1;
  } else {
    return 0;
  }
};

/**
 * @function Sort two [Photos]{@link Photo} by width, ascending.
 * @param a {Photo}
 * @param b {Photo}
 * @returns {number}
 */
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/util/sortPhotosByWidth.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

var _default = function _default(a, b) {
  if (a.date.valueOf() > b.date.valueOf()) {
    return -1;
  } else if (a.date.valueOf() < b.date.valueOf()) {
    return 1;
  } else {
    return 0;
  }
};

/**
 * @function Sort two [Posts]{@link Post} by date, descending.
 * @param a {Post}
 * @param b {Post}
 * @returns {number}
 */
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/util/sortPostsByDate.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _bear__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _bear__WEBPACK_IMPORTED_MODULE_0__["d"]; });

/* harmony import */ var _deadBear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(213);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _deadBear__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _disBear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(214);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _disBear__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var _doubtBear__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(215);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _doubtBear__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony import */ var _helloBear__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(216);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _helloBear__WEBPACK_IMPORTED_MODULE_4__["a"]; });

/* harmony import */ var _lennyBear__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(217);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _lennyBear__WEBPACK_IMPORTED_MODULE_5__["a"]; });

/* harmony import */ var _shrugBear__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(218);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "g", function() { return _shrugBear__WEBPACK_IMPORTED_MODULE_6__["a"]; });

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();









var _default = _bear__WEBPACK_IMPORTED_MODULE_0__[/* default */ "c"];
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeadBear; });
/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultComponents = _objectSpread({}, _bear__WEBPACK_IMPORTED_MODULE_0__[/* defaultBearComponents */ "d"], {
  leftEye: {
    id: "leftEye",
    character: "×",
    position: 5
  },
  rightEye: {
    id: "rightEye",
    character: "×",
    position: 7
  }
});

var DeadBear =
/*#__PURE__*/
function (_BearGenerator) {
  _inherits(DeadBear, _BearGenerator);

  function DeadBear() {
    _classCallCheck(this, DeadBear);

    return _possibleConstructorReturn(this, _getPrototypeOf(DeadBear).apply(this, arguments));
  }

  return DeadBear;
}(Object(_bear__WEBPACK_IMPORTED_MODULE_0__[/* BearGenerator */ "b"])({
  components: defaultComponents
}));
var _default = DeadBear;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultComponents, "defaultComponents", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/deadBear.js");
  reactHotLoader.register(DeadBear, "DeadBear", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/deadBear.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/deadBear.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisBear; });
/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultComponents = _objectSpread({}, _bear__WEBPACK_IMPORTED_MODULE_0__[/* defaultBearComponents */ "d"], {
  leftEye: {
    id: "leftEye",
    character: "ಠ",
    position: 5
  },
  rightEye: {
    id: "rightEye",
    character: "ಠ",
    position: 7
  }
});

var DisBear =
/*#__PURE__*/
function (_BearGenerator) {
  _inherits(DisBear, _BearGenerator);

  function DisBear() {
    _classCallCheck(this, DisBear);

    return _possibleConstructorReturn(this, _getPrototypeOf(DisBear).apply(this, arguments));
  }

  return DisBear;
}(Object(_bear__WEBPACK_IMPORTED_MODULE_0__[/* BearGenerator */ "b"])({
  components: defaultComponents
}));
var _default = DisBear;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultComponents, "defaultComponents", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/disBear.js");
  reactHotLoader.register(DisBear, "DisBear", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/disBear.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/disBear.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DoubtBear; });
/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultComponents = _objectSpread({}, _bear__WEBPACK_IMPORTED_MODULE_0__[/* defaultBearComponents */ "d"], {
  leftEye: {
    id: "leftEye",
    character: "ಠಿ",
    position: 5
  },
  rightEye: {
    id: "rightEye",
    character: "ಠ",
    position: 7
  }
});

var DoubtBear =
/*#__PURE__*/
function (_BearGenerator) {
  _inherits(DoubtBear, _BearGenerator);

  function DoubtBear() {
    _classCallCheck(this, DoubtBear);

    return _possibleConstructorReturn(this, _getPrototypeOf(DoubtBear).apply(this, arguments));
  }

  return DoubtBear;
}(Object(_bear__WEBPACK_IMPORTED_MODULE_0__[/* BearGenerator */ "b"])({
  components: defaultComponents
}));
var _default = DoubtBear;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultComponents, "defaultComponents", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/doubtBear.js");
  reactHotLoader.register(DoubtBear, "DoubtBear", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/doubtBear.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/doubtBear.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelloBear; });
/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultComponents = _objectSpread({}, _bear__WEBPACK_IMPORTED_MODULE_0__[/* defaultBearComponents */ "d"], {
  rightLeaningRightArm: {
    id: "rightLeaningRightArm",
    character: "ﾉ゛",
    position: 10
  }
});

var HelloBear =
/*#__PURE__*/
function (_BearGenerator) {
  _inherits(HelloBear, _BearGenerator);

  function HelloBear() {
    _classCallCheck(this, HelloBear);

    return _possibleConstructorReturn(this, _getPrototypeOf(HelloBear).apply(this, arguments));
  }

  return HelloBear;
}(Object(_bear__WEBPACK_IMPORTED_MODULE_0__[/* BearGenerator */ "b"])({
  components: defaultComponents
}));
var _default = HelloBear;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultComponents, "defaultComponents", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/helloBear.js");
  reactHotLoader.register(HelloBear, "HelloBear", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/helloBear.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/helloBear.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LennyBear; });
/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultComponents = _objectSpread({}, _bear__WEBPACK_IMPORTED_MODULE_0__[/* defaultBearComponents */ "d"], {
  leftEye: {
    id: "leftEye",
    character: " ͡°",
    position: 5
  },
  rightEye: {
    id: "rightEye",
    character: " ͡°",
    position: 7
  }
});

var LennyBear =
/*#__PURE__*/
function (_BearGenerator) {
  _inherits(LennyBear, _BearGenerator);

  function LennyBear() {
    _classCallCheck(this, LennyBear);

    return _possibleConstructorReturn(this, _getPrototypeOf(LennyBear).apply(this, arguments));
  }

  return LennyBear;
}(Object(_bear__WEBPACK_IMPORTED_MODULE_0__[/* BearGenerator */ "b"])({
  components: defaultComponents
}));
var _default = LennyBear;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultComponents, "defaultComponents", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/lennyBear.js");
  reactHotLoader.register(LennyBear, "LennyBear", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/lennyBear.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/lennyBear.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShrugBear; });
/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultComponents = _objectSpread({}, _bear__WEBPACK_IMPORTED_MODULE_0__[/* defaultBearComponents */ "d"], {
  leftAction: {
    id: "leftAction",
    character: "¯",
    position: 1
  },
  leftLeaningLeftArm: {
    id: "leftLeaningLeftArm",
    character: "\\_",
    position: 2
  },
  rightLeaningRightArm: {
    id: "rightLeaningRightArm",
    character: "_/",
    position: 10
  },
  rightAction: {
    id: "rightAction",
    character: "¯",
    position: 11
  }
});

var ShrugBear =
/*#__PURE__*/
function (_BearGenerator) {
  _inherits(ShrugBear, _BearGenerator);

  function ShrugBear() {
    _classCallCheck(this, ShrugBear);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShrugBear).apply(this, arguments));
  }

  return ShrugBear;
}(Object(_bear__WEBPACK_IMPORTED_MODULE_0__[/* BearGenerator */ "b"])({
  components: defaultComponents
}));
var _default = ShrugBear;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultComponents, "defaultComponents", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/shrugBear.js");
  reactHotLoader.register(ShrugBear, "ShrugBear", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/shrugBear.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/js/lib/emoji/bear/shrugBear.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export connectHelloBear */
/* unused harmony export HelloBear */
/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _actions_emoji_onHelloBearComponentClick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(278);
/* harmony import */ var _components_emoji__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89);
/* harmony import */ var _bear__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(83);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();







var connectHelloBear = function connectHelloBear(emoji) {
  return Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(null, function (dispatch, ownProps) {
    return {
      onComponentClick: ownProps.onComponentClick ? ownProps.onComponentClick : function (componentId, clickEvent) {
        return dispatch(Object(_actions_emoji_onHelloBearComponentClick__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(ownProps.id, componentId, clickEvent));
      }
    };
  })(Object(_bear__WEBPACK_IMPORTED_MODULE_5__[/* connectBear */ "b"])(emoji));
};
var HelloBear = connectHelloBear(_components_emoji__WEBPACK_IMPORTED_MODULE_4__[/* Emoji */ "a"]);
HelloBear.propTypes = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  emoji: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
HelloBear.defaultProps = {
  emoji: _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* HelloBear */ "f"].fromJS()
};
var _default = HelloBear;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(connectHelloBear, "connectHelloBear", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/bear/helloBear.jsx");
  reactHotLoader.register(HelloBear, "HelloBear", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/bear/helloBear.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/emoji/bear/helloBear.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/email.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var EmailLink = function EmailLink(_ref) {
  var useBranding = _ref.useBranding,
      props = _objectWithoutProperties(_ref, ["useBranding"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"], _extends({}, props, {
    className: ["link--email", useBranding ? "" : "link--no-branding", props.className].join(" ").trim(),
    target: "_self",
    href: "mailto:".concat(props.email).concat(props.body || props.subject ? "?".concat(query_string__WEBPACK_IMPORTED_MODULE_1___default.a.stringify({
      body: props.body,
      subject: props.subject
    })) : ""),
    text: props.text || props.email,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }));
};
EmailLink.propTypes = {
  useBranding: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  text: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  body: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  subject: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  email: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
EmailLink.defaultProps = {
  useBranding: true,
  email: "jobs@randytarampi.ca"
};
var _default = EmailLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(EmailLink, "EmailLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/email.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/email.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export SmsLink */
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/sms.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var SmsLink = function SmsLink(_ref) {
  var useBranding = _ref.useBranding,
      props = _objectWithoutProperties(_ref, ["useBranding"]);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"], _extends({}, props, {
    className: ["link--sms", useBranding ? "" : "link--no-branding", props.className].join(" ").trim(),
    href: "sms:".concat(props.tel).concat(props.body ? ";?&body=".concat(encodeURIComponent(props.body)) : ""),
    text: props.text || props.tel,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
SmsLink.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  text: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  tel: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  body: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  useBranding: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
SmsLink.defaultProps = {
  useBranding: true,
  tel: "+16043747128"
};
var _default = SmsLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SmsLink, "SmsLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/sms.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/sms.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TelLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/tel.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var TelLink = function TelLink(_ref) {
  var useBranding = _ref.useBranding,
      props = _objectWithoutProperties(_ref, ["useBranding"]);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"], _extends({}, props, {
    className: ["link--tel", useBranding ? "" : "link--no-branding", props.className].join(" ").trim(),
    href: "tel:".concat(props.tel),
    text: props.text || props.tel,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
TelLink.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  text: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  tel: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  useBranding: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
TelLink.defaultProps = {
  useBranding: true,
  tel: "+16043747128"
};
var _default = TelLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TelLink, "TelLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/tel.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/tel.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export WebLink */
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/web.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var WebLink = function WebLink(_ref) {
  var useBranding = _ref.useBranding,
      props = _objectWithoutProperties(_ref, ["useBranding"]);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"], _extends({}, props, {
    className: ["link--web", useBranding ? "" : "link--no-branding", props.className].join(" ").trim(),
    text: props.text || props.href,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
WebLink.propTypes = {
  useBranding: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  href: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  text: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
};
WebLink.defaultProps = {
  useBranding: true
};
var _default = WebLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(WebLink, "WebLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/web.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/web.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _angelList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(228);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _angelList__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _f00px__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(229);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _f00px__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var _facebook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(230);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _facebook__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony import */ var _flickr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(231);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _flickr__WEBPACK_IMPORTED_MODULE_4__["a"]; });

/* harmony import */ var _github__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(232);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _github__WEBPACK_IMPORTED_MODULE_5__["a"]; });

/* harmony import */ var _instagram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(233);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _instagram__WEBPACK_IMPORTED_MODULE_6__["a"]; });

/* harmony import */ var _linkedIn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(234);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "g", function() { return _linkedIn__WEBPACK_IMPORTED_MODULE_7__["a"]; });

/* harmony import */ var _stackOverflow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(235);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _stackOverflow__WEBPACK_IMPORTED_MODULE_8__["a"]; });

/* harmony import */ var _twitter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(236);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "i", function() { return _twitter__WEBPACK_IMPORTED_MODULE_9__["a"]; });

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();












var _default = _brandedLink__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AngelListLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/angelList.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var AngelListLink = function AngelListLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_brandedLink__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    serviceName: "AngelList",
    serviceType: "angelList",
    serviceUrl: "https://angel.co",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
AngelListLink.propTypes = {
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
AngelListLink.defaultProps = {
  username: "randytarampi"
};
var _default = AngelListLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AngelListLink, "AngelListLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/angelList.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/angelList.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return F00pxLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/f00px.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var F00pxLink = function F00pxLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_brandedLink__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    serviceType: "f00px",
    serviceName: "500px",
    serviceUrl: "https://www.500px.com",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
F00pxLink.propTypes = {
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
F00pxLink.defaultProps = {
  username: "randytarampi"
};
var _default = F00pxLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(F00pxLink, "F00pxLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/f00px.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/f00px.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/facebook.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var FacebookLink = function FacebookLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_brandedLink__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    serviceName: "Facebook",
    serviceType: "facebook",
    serviceUrl: "https://www.facebook.com",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
FacebookLink.propTypes = {
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
FacebookLink.defaultProps = {
  username: "randytarampi"
};
var _default = FacebookLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FacebookLink, "FacebookLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/facebook.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/facebook.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlickrLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/flickr.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var FlickrLink = function FlickrLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_brandedLink__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    serviceName: "Flickr",
    serviceType: "flickr",
    serviceUrl: "https://www.flickr.com/people",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
FlickrLink.propTypes = {
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
FlickrLink.defaultProps = {
  username: "randytarampi"
};
var _default = FlickrLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FlickrLink, "FlickrLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/flickr.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/flickr.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GitHubLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/github.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var GitHubLink = function GitHubLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_brandedLink__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    serviceName: "GitHub",
    serviceType: "github",
    serviceUrl: "https://www.github.com",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
GitHubLink.propTypes = {
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
GitHubLink.defaultProps = {
  username: "randytarampi"
};
var _default = GitHubLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GitHubLink, "GitHubLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/github.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/github.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstagramLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/instagram.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var InstagramLink = function InstagramLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_brandedLink__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    serviceName: "Instagram",
    serviceType: "instagram",
    serviceUrl: "https://www.instagram.com",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
InstagramLink.propTypes = {
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
InstagramLink.defaultProps = {
  username: "randytarampi"
};
var _default = InstagramLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(InstagramLink, "InstagramLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/instagram.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/instagram.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkedInLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/linkedIn.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var LinkedInLink = function LinkedInLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_brandedLink__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    serviceName: "LinkedIn",
    serviceType: "linkedin",
    serviceUrl: "https://www.linkedin.com/in",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
LinkedInLink.propTypes = {
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
LinkedInLink.defaultProps = {
  username: "randytarampi"
};
var _default = LinkedInLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LinkedInLink, "LinkedInLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/linkedIn.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/linkedIn.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StackOverflowLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/stackOverflow.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var StackOverflowLink = function StackOverflowLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_brandedLink__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    serviceName: "StackOverflow",
    serviceType: "stackOverflow",
    serviceUrl: "https://stackoverflow.com/story",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
StackOverflowLink.propTypes = {
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
StackOverflowLink.defaultProps = {
  username: "randytarampi"
};
var _default = StackOverflowLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(StackOverflowLink, "StackOverflowLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/stackOverflow.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/stackOverflow.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _brandedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/twitter.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var TwitterLink = function TwitterLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_brandedLink__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    serviceName: "Twitter",
    serviceType: "twitter",
    serviceUrl: "https://www.twitter.com",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};
TwitterLink.propTypes = {
  username: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
TwitterLink.defaultProps = {
  username: "randytarampi"
};
var _default = TwitterLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TwitterLink, "TwitterLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/twitter.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/branded/twitter.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _internalLink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _blog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(238);
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(239);
/* harmony import */ var _photos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(240);
/* harmony import */ var _resume__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(241);
/* harmony import */ var _words__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(242);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _internalLink__WEBPACK_IMPORTED_MODULE_0__["a"]; });

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();








var _default = _internalLink__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"];
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export BlogAppLink */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _internalLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/blog.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var BlogAppLink = function BlogAppLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_internalLink__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"], _extends({}, props, {
    serviceType: "blog",
    serviceName: "Blog",
    href: "/blog",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }));
};
var _default = BlogAppLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BlogAppLink, "BlogAppLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/blog.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/blog.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export CodeAppLink */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _internalLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/code.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var CodeAppLink = function CodeAppLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_internalLink__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"], _extends({}, props, {
    serviceType: "code",
    serviceName: "Code",
    href: "/code",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }));
};
var _default = CodeAppLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CodeAppLink, "CodeAppLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/code.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/code.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export PhotosAppLink */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _internalLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/photos.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var PhotosAppLink = function PhotosAppLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_internalLink__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"], _extends({}, props, {
    serviceType: "photos",
    serviceName: "Photos",
    href: "/photos",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }));
};
var _default = PhotosAppLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PhotosAppLink, "PhotosAppLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/photos.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/photos.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeAppLink */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _internalLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/resume.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var ResumeAppLink = function ResumeAppLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_internalLink__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"], _extends({}, props, {
    serviceType: "resume",
    serviceName: "Resume",
    href: "/resume",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }));
};
var _default = ResumeAppLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ResumeAppLink, "ResumeAppLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/resume.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/resume.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export WordsAppLink */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _internalLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/words.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var WordsAppLink = function WordsAppLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_internalLink__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"], _extends({}, props, {
    serviceType: "words",
    serviceName: "Words",
    href: "/words",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }));
};
var _default = WordsAppLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(WordsAppLink, "WordsAppLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/words.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/internal/words.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CampaignLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/campaign.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var CampaignLink = function CampaignLink(_ref) {
  var useBranding = _ref.useBranding,
      href = _ref.href,
      source = _ref.source,
      medium = _ref.medium,
      name = _ref.name,
      term = _ref.term,
      content = _ref.content,
      props = _objectWithoutProperties(_ref, ["useBranding", "href", "source", "medium", "name", "term", "content"]);

  var parsedHref = query_string__WEBPACK_IMPORTED_MODULE_1___default.a.parseUrl(href);
  var hrefUrl = parsedHref.url;
  var hrefQueryParameters = parsedHref.query;
  var passedCampaignParameters = {
    utm_source: source,
    utm_medium: medium,
    utm_name: name,
    utm_term: term,
    utm_content: content
  };
  var combinedQueryString = query_string__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(_objectSpread({}, passedCampaignParameters, hrefQueryParameters));
  var augmentedHref = hrefUrl + (combinedQueryString ? "?" + combinedQueryString : "");
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"], _extends({}, props, {
    className: ["link--campaign", useBranding ? "" : "link--no-branding", props.className].join(" ").trim(),
    href: augmentedHref,
    text: props.text || href,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }));
};
CampaignLink.propTypes = {
  useBranding: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  href: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  text: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  source: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  medium: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  term: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  content: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
};
CampaignLink.defaultProps = {
  useBranding: true,
  source: "" || undefined,
  medium: "" || undefined,
  name: "" || undefined,
  term: "" || undefined,
  content: "" || undefined
};
var _default = CampaignLink;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CampaignLink, "CampaignLink", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/campaign.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/link/campaign.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintableHeader; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _link_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/header.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var PrintableHeader = function PrintableHeader(_ref) {
  var printable = _ref.printable;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("header", {
    id: "header",
    className: "printable-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "valign-wrapper",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    s: 3,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, printable.basics.picture ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    className: "printable-header__picture",
    src: printable.basics.picture,
    alt: printable.basics.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }) : null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    s: 9,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    className: "printable-header__name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, printable.basics.name)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
    className: "printable-header__label hide-on-print",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, printable.basics.label), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "printable-header__contact",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "valign-wrapper hide-on-screen",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    s: 6,
    className: "printable-header__email",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_link_index__WEBPACK_IMPORTED_MODULE_3__[/* EmailLink */ "c"], {
    email: printable.basics.email,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    s: 6,
    className: "printable-header__tel",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_link_index__WEBPACK_IMPORTED_MODULE_3__[/* TelLink */ "m"], {
    tel: printable.basics.phone,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }))), printable.basics.website || printable.basics.location && printable.basics.location.address ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "valign-wrapper hide-on-screen",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, printable.basics.website ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    m: 6,
    s: 12,
    className: "printable-header__web",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_link_index__WEBPACK_IMPORTED_MODULE_3__[/* CampaignLink */ "b"], {
    href: printable.basics.website,
    className: "link--web",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  })) : null, printable.basics.location && printable.basics.location.city ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    m: 6,
    s: 12,
    className: "printable-header__location",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "fas fa-map-marker-alt",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }), "\xA0", printable.basics.location.city, ", ", printable.basics.location.region, ", ", printable.basics.location.countryCode)) : null) : null)))));
};
PrintableHeader.propTypes = {
  printable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired
};
var _default = PrintableHeader;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableHeader, "PrintableHeader", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/header.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/header.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintableFooter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/footer.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();


var PrintableFooter = function PrintableFooter(_ref) {
  var children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
    id: "footer",
    className: "printable-footer",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, children));
};
var _default = PrintableFooter;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableFooter, "PrintableFooter", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/footer.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/footer.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(122);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _section__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _leftDescriptionSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(247);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _leftDescriptionSection__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _leftPullSection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(248);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _leftPullSection__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var _rightDescriptionSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(249);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _rightDescriptionSection__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony import */ var _rightPushSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(250);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _rightPushSection__WEBPACK_IMPORTED_MODULE_4__["a"]; });

/* harmony import */ var _rawHtmlSection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(251);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _rawHtmlSection__WEBPACK_IMPORTED_MODULE_5__["a"]; });

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();








var _default = _section__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"];
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeftDescriptionSection; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sectionWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/leftDescriptionSection.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var LeftDescriptionSection = function LeftDescriptionSection(_ref) {
  var printableType = _ref.printableType,
      type = _ref.type,
      label = _ref.label,
      labelNode = _ref.labelNode,
      description = _ref.description,
      descriptionNode = _ref.descriptionNode,
      hideOnPrint = _ref.hideOnPrint,
      showOnLetter = _ref.showOnLetter,
      showOnA4 = _ref.showOnA4,
      showOnLegal = _ref.showOnLegal,
      hideOnScreen = _ref.hideOnScreen,
      verticallyAlignContent = _ref.verticallyAlignContent,
      className = _ref.className,
      children = _ref.children;
  var sectionClassNames = ["printable-section--description", "printable-section--description-left"];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_sectionWrapper__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _extends({
    printableType: printableType,
    type: type,
    hideOnPrint: hideOnPrint,
    showOnLetter: showOnLetter,
    showOnA4: showOnA4,
    showOnLegal: showOnLegal,
    hideOnScreen: hideOnScreen,
    verticallyAlignContent: verticallyAlignContent,
    className: sectionClassNames.concat(className).join(" ").trim()
  }, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("aside", {
    className: "col m3 printable-section__header hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, labelNode ? labelNode : label ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
    className: "printable-section__label",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, label)) : null, descriptionNode || description ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    s: 9,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, descriptionNode ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "printable-section__description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, descriptionNode) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    className: "printable-section__description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, description)))) : null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    m: 9,
    className: "printable-section__content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, children));
};
LeftDescriptionSection.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node]),
  labelNode: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  description: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node]),
  descriptionNode: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  printableType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  hideOnPrint: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  hideOnScreen: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnA4: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLegal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLetter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  verticallyAlignContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
LeftDescriptionSection.defaultProps = {
  hideOnPrint: false,
  hideOnScreen: false,
  showOnA4: false,
  showOnLegal: false,
  showOnLetter: false,
  verticallyAlignContent: false
};
var _default = LeftDescriptionSection;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LeftDescriptionSection, "LeftDescriptionSection", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/leftDescriptionSection.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/leftDescriptionSection.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeftPullSection; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sectionWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/leftPullSection.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var LeftPullSection = function LeftPullSection(_ref) {
  var printableType = _ref.printableType,
      type = _ref.type,
      hideOnPrint = _ref.hideOnPrint,
      showOnLetter = _ref.showOnLetter,
      showOnA4 = _ref.showOnA4,
      showOnLegal = _ref.showOnLegal,
      hideOnScreen = _ref.hideOnScreen,
      verticallyAlignContent = _ref.verticallyAlignContent,
      className = _ref.className,
      children = _ref.children,
      sideContent = _ref.sideContent;
  var sectionClassNames = ["printable-section--pull", "printable-section--pull-left"];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_sectionWrapper__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _extends({
    printableType: printableType,
    type: type,
    hideOnPrint: hideOnPrint,
    showOnLetter: showOnLetter,
    showOnA4: showOnA4,
    showOnLegal: showOnLegal,
    hideOnScreen: hideOnScreen,
    verticallyAlignContent: verticallyAlignContent,
    className: sectionClassNames.concat(className).join(" ").trim()
  }, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    m: 9,
    className: "printable-section__content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, children), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("aside", {
    className: "col m3 printable-section__footer hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, sideContent));
};
LeftPullSection.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  sideContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  printableType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  hideOnPrint: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  hideOnScreen: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnA4: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLegal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLetter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  verticallyAlignContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
LeftPullSection.defaultProps = {
  hideOnPrint: false,
  hideOnScreen: false,
  showOnA4: false,
  showOnLegal: false,
  showOnLetter: false,
  verticallyAlignContent: false
};
var _default = LeftPullSection;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LeftPullSection, "LeftPullSection", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/leftPullSection.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/leftPullSection.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RightDescriptionSection; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sectionWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/rightDescriptionSection.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var RightDescriptionSection = function RightDescriptionSection(_ref) {
  var printableType = _ref.printableType,
      type = _ref.type,
      label = _ref.label,
      labelNode = _ref.labelNode,
      description = _ref.description,
      descriptionNode = _ref.descriptionNode,
      hideOnPrint = _ref.hideOnPrint,
      showOnLetter = _ref.showOnLetter,
      showOnA4 = _ref.showOnA4,
      showOnLegal = _ref.showOnLegal,
      hideOnScreen = _ref.hideOnScreen,
      verticallyAlignContent = _ref.verticallyAlignContent,
      className = _ref.className,
      children = _ref.children;
  var sectionClassNames = ["printable-section--description", "printable-section--description-right"];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_sectionWrapper__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _extends({
    printableType: printableType,
    type: type,
    hideOnPrint: hideOnPrint,
    showOnLetter: showOnLetter,
    showOnA4: showOnA4,
    showOnLegal: showOnLegal,
    hideOnScreen: hideOnScreen,
    verticallyAlignContent: verticallyAlignContent,
    className: sectionClassNames.concat(className).join(" ").trim()
  }, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    m: 9,
    className: "printable-section__content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, children), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("aside", {
    className: "col m3 printable-section__header hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, labelNode ? labelNode : label ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
    className: "printable-section__label",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, label)) : null, descriptionNode || description ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    s: 9,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, descriptionNode ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "printable-section__description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, descriptionNode) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    className: "printable-section__description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, description)))) : null));
};
RightDescriptionSection.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node]),
  labelNode: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  description: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node]),
  descriptionNode: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  printableType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  hideOnPrint: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  hideOnScreen: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnA4: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLegal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLetter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  verticallyAlignContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
RightDescriptionSection.defaultProps = {
  hideOnPrint: false,
  hideOnScreen: false,
  showOnA4: false,
  showOnLegal: false,
  showOnLetter: false,
  verticallyAlignContent: false
};
var _default = RightDescriptionSection;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RightDescriptionSection, "RightDescriptionSection", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/rightDescriptionSection.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/rightDescriptionSection.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RightPushSection; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sectionWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/rightPushSection.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var RightPushSection = function RightPushSection(_ref) {
  var printableType = _ref.printableType,
      type = _ref.type,
      hideOnPrint = _ref.hideOnPrint,
      showOnLetter = _ref.showOnLetter,
      showOnA4 = _ref.showOnA4,
      showOnLegal = _ref.showOnLegal,
      hideOnScreen = _ref.hideOnScreen,
      verticallyAlignContent = _ref.verticallyAlignContent,
      className = _ref.className,
      children = _ref.children,
      sideContent = _ref.sideContent;
  var sectionClassNames = ["printable-section--push", "printable-section--push-right"];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_sectionWrapper__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _extends({
    printableType: printableType,
    type: type,
    hideOnPrint: hideOnPrint,
    showOnLetter: showOnLetter,
    showOnA4: showOnA4,
    showOnLegal: showOnLegal,
    hideOnScreen: hideOnScreen,
    verticallyAlignContent: verticallyAlignContent,
    className: sectionClassNames.concat(className).join(" ").trim()
  }, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("aside", {
    className: "col m3 printable-section__header hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, sideContent), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    m: 9,
    className: "printable-section__content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, children));
};
RightPushSection.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  sideContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  printableType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  hideOnPrint: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  hideOnScreen: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnA4: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLegal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLetter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  verticallyAlignContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
RightPushSection.defaultProps = {
  hideOnPrint: false,
  hideOnScreen: false,
  showOnA4: false,
  showOnLegal: false,
  showOnLetter: false,
  verticallyAlignContent: false
};
var _default = RightPushSection;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RightPushSection, "RightPushSection", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/rightPushSection.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/rightPushSection.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RawHtmlLetterSection; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sectionWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/rawHtmlSection.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var RawHtmlLetterSection = function RawHtmlLetterSection(_ref) {
  var printableType = _ref.printableType,
      type = _ref.type,
      rawHtml = _ref.rawHtml,
      hideOnPrint = _ref.hideOnPrint,
      showOnLetter = _ref.showOnLetter,
      showOnA4 = _ref.showOnA4,
      showOnLegal = _ref.showOnLegal,
      hideOnScreen = _ref.hideOnScreen,
      verticallyAlignContent = _ref.verticallyAlignContent,
      className = _ref.className;
  var sectionClassNames = ["printable-section__raw-html"];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_sectionWrapper__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _extends({
    printableType: printableType,
    type: type,
    hideOnPrint: hideOnPrint,
    showOnLetter: showOnLetter,
    showOnA4: showOnA4,
    showOnLegal: showOnLegal,
    hideOnScreen: hideOnScreen,
    verticallyAlignContent: verticallyAlignContent,
    className: sectionClassNames.concat(className).join(" ").trim()
  }, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    className: "printable-section__content",
    dangerouslySetInnerHtml: {
      __html: rawHtml
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }));
};
RawHtmlLetterSection.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  rawHtml: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  printableType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  hideOnPrint: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  hideOnScreen: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnA4: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLegal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showOnLetter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  verticallyAlignContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
RawHtmlLetterSection.defaultProps = {
  hideOnPrint: false,
  hideOnScreen: false,
  showOnA4: false,
  showOnLegal: false,
  showOnLetter: false,
  verticallyAlignContent: false
};
var _default = RawHtmlLetterSection;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RawHtmlLetterSection, "RawHtmlLetterSection", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/rawHtmlSection.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/printable/section/rawHtmlSection.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/rowBlock.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var RowBlock = function RowBlock(_ref) {
  var name = _ref.name,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["name", "className"]);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Row"], _extends({
    id: name,
    name: name
  }, props, {
    className: ["block", className].join(" ").trim(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
};

RowBlock.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
};
RowBlock.defaultProps = {
  className: ""
};
var _default = RowBlock;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RowBlock, "RowBlock", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/rowBlock.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/rowBlock.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var _actions_fetchPosts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56);
/* harmony import */ var _components_posts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(281);
/* harmony import */ var _data_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();







var ConnectedPosts = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[/* connect */ "b"])(function (state, ownProps) {
  var isLoadingUrlSelector = Object(_data_api__WEBPACK_IMPORTED_MODULE_4__[/* createIsLoadingUrlSelector */ "b"])();
  var errorForUrlSelector = Object(_data_api__WEBPACK_IMPORTED_MODULE_4__[/* createGetErrorForUrlSelector */ "a"])();
  return {
    isLoading: isLoadingUrlSelector(state, ownProps.fetchUrl),
    error: errorForUrlSelector(state, ownProps.fetchUrl),
    posts: _data_selectors__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].getPostsSortedByDate(state)
  };
}, function (dispatch, ownProps) {
  return {
    fetchPosts: function fetchPosts() {
      return dispatch(Object(_actions_fetchPosts__WEBPACK_IMPORTED_MODULE_2__[/* default */ "e"])(ownProps.fetchUrl));
    }
  };
})(_components_posts__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
ConnectedPosts.propTypes = {
  fetchUrl: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
};
ConnectedPosts.defaultProps = {
  fetchUrl: "/posts"
};
var _default = ConnectedPosts;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ConnectedPosts, "ConnectedPosts", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/posts.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/containers/posts.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var redux_immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(285);
/* harmony import */ var redux_immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _emoji__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(99);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(62);
/* harmony import */ var _posts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);
/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(130);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();








var _default = Object(redux_immutable__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  api: _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "c"],
  error: _error__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"],
  emoji: _emoji__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
  posts: _posts__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],
  routing: _routing__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]
});

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/data/reducers.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 260 */,
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(133);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(593);
/* harmony import */ var _containers_errorWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(82);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/serverReduxRoot.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var ServerReduxRoot = function ServerReduxRoot(_ref) {
  var store = _ref.store,
      context = _ref.context,
      routes = _ref.routes,
      props = _objectWithoutProperties(_ref, ["store", "context", "routes"]);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* Provider */ "a"], {
    store: store,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_containers_errorWrapper__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    context: context,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, Object(react_router_config__WEBPACK_IMPORTED_MODULE_3__[/* renderRoutes */ "a"])(routes, props))));
};

ServerReduxRoot.propTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  context: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  routes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array.isRequired
};
ServerReduxRoot.defaultProps = {
  context: {}
};
var _default = ServerReduxRoot;
/* unused harmony default export */ var _unused_webpack_default_export = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ServerReduxRoot, "ServerReduxRoot", "/home/travis/build/randytarampi/me/packages/jsx/lib/serverReduxRoot.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/serverReduxRoot.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84);
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(286);
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(287);
/* harmony import */ var _middleware_metrics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(288);
/* harmony import */ var _middleware_raven__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(290);
/* harmony import */ var _middleware_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(292);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();










var configureStore = function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();
  var history = arguments.length > 1 ? arguments[1] : undefined;
  var reducers = arguments.length > 2 ? arguments[2] : undefined;
  var middlewares = [redux_thunk__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _middleware_metrics__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], Object(react_router_redux__WEBPACK_IMPORTED_MODULE_1__[/* routerMiddleware */ "d"])(history), _middleware_router__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]];

  if (typeof window !== "undefined" && window.SENTRY_DSN && window.LOGGER && window.LOGGER.streams.sentry) {
    middlewares.unshift(Object(_middleware_raven__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])());
  } //noinspection UnnecessaryLocalVariableJS


  var store = Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])(reducers, initialState, Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__["composeWithDevTools"])(redux__WEBPACK_IMPORTED_MODULE_2__["applyMiddleware"].apply(void 0, middlewares)));
  return store;
};

var _default = configureStore;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(configureStore, "configureStore", "/home/travis/build/randytarampi/me/packages/jsx/lib/store/configureStore.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/store/configureStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 263 */,
/* 264 */,
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(293);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/views/hotApp.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var history = Object(history__WEBPACK_IMPORTED_MODULE_1__[/* createBrowserHistory */ "a"])();
var store = Object(_randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* configureStore */ "d"])(undefined, history, _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* reducers */ "e"]);

var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* ClientReduxRoot */ "a"], {
    history: history,
    routes: _routes__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],
    store: store,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  });
};

var _default = Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(App);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(history, "history", "/home/travis/build/randytarampi/me/packages/resume/public/views/hotApp.jsx");
  reactHotLoader.register(store, "store", "/home/travis/build/randytarampi/me/packages/resume/public/views/hotApp.jsx");
  reactHotLoader.register(App, "App", "/home/travis/build/randytarampi/me/packages/resume/public/views/hotApp.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/views/hotApp.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(126);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/errorWrapper.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var ErrorWrapper = function ErrorWrapper(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, props.hasError ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_error__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  })) : children);
};

ErrorWrapper.propTypes = {
  hasError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
};
ErrorWrapper.defaultProps = {
  hasError: false
};
var _default = ErrorWrapper;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ErrorWrapper, "ErrorWrapper", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/errorWrapper.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/errorWrapper.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(274);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var _default = function _default(fetchUrl, searchParams) {
  var parsedFetchUrl = query_string__WEBPACK_IMPORTED_MODULE_2___default.a.parseUrl(fetchUrl);
  return isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1___default()("".concat(parsedFetchUrl.url, "?").concat(query_string__WEBPACK_IMPORTED_MODULE_2___default.a.stringify(_objectSpread({}, parsedFetchUrl.query, searchParams))), {
    headers: {
      "Accept": "application/json",
      "Accept-Charset": "utf-8",
      "ME-API-VERSION": 2
    }
  }).then(function (body) {
    return body.json();
  }).then(function (postsResponse) {
    return _objectSpread({}, postsResponse, {
      posts: postsResponse.posts.map(function (postJson) {
        var Constructor = _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* util */ "l"].getEntityForType(postJson.type);
        return Constructor.fromJSON(postJson);
      })
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/api/fetchPosts.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 274 */,
/* 275 */,
/* 276 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var browser_bunyan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var bears = {
  lennyBear: new _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* LennyBear */ "g"](),
  shrugBear: new _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* ShrugBear */ "j"](),
  bear: new _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* Bear */ "a"](),
  doubtBear: new _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* DoubtBear */ "d"](),
  disBear: new _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* DisBear */ "c"](),
  deadBear: new _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* DeadBear */ "b"]()
};

var ConsoleStream =
/*#__PURE__*/
function () {
  function ConsoleStream() {
    _classCallCheck(this, ConsoleStream);
  }

  _createClass(ConsoleStream, [{
    key: "write",
    value: function write(record) {
      var consoleLogger = ConsoleStream.consoleLoggerFromLevel(record.level);

      if (consoleLogger) {
        consoleLogger("%c｢%s｣ %c%s%c: %s", "color: grey", bears.bear.toString(), "color: ".concat(ConsoleStream.colorFromLevel(record.level)), browser_bunyan__WEBPACK_IMPORTED_MODULE_1__[/* nameFromLevel */ "b"][record.level].toUpperCase(), "color: unset", record.msg);
      }
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }], [{
    key: "colorFromLevel",
    // NOTE-RT: Lifted directly from `bunyan-format`
    value: function colorFromLevel(level) {
      if (level >= 60) {
        return "brightRed";
      }

      if (level >= 50) {
        return "red";
      }

      if (level >= 40) {
        return "magenta";
      }

      if (level >= 30) {
        return "cyan";
      }

      if (level >= 20) {
        return "brightBlack";
      }

      return "brightBlack";
    }
  }, {
    key: "nameFromLevel",
    value: function nameFromLevel(level) {
      if (level >= 60) {
        return bears.deadBear.toString();
      }

      if (level >= 50) {
        return bears.disBear.toString();
      }

      if (level >= 40) {
        return bears.doubtBear.toString();
      }

      if (level >= 30) {
        return bears.bear.toString();
      }

      if (level >= 20) {
        return bears.shrugBear.toString();
      }

      return bears.lennyBear.toString();
    }
  }, {
    key: "consoleLoggerFromLevel",
    value: function consoleLoggerFromLevel(level) {
      var console = typeof window !== "undefined" && window.console;

      if (level >= 50 && console && console.error) {
        // NOTE-RT: There is no `console.fatal`, so just combine `FATAL` and `ERROR` into `console.error`
        return console.error;
      }

      if (level >= 40 && console && console.warn) {
        return console.warn;
      }

      if (level >= 30 && console && console.info) {
        return console.info;
      }

      if (level >= 10 && console && console.debug) {
        // NOTE-RT: There is no `console.trace`, so just combine `DEBUG` and `TRACE` into `console.debug`
        return console.debug;
      }

      return console && console.log || null;
    }
  }]);

  return ConsoleStream;
}();

var _default = ConsoleStream;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(bears, "bears", "/home/travis/build/randytarampi/me/packages/jsx/lib/logger/consoleStream.js");
  reactHotLoader.register(ConsoleStream, "ConsoleStream", "/home/travis/build/randytarampi/me/packages/jsx/lib/logger/consoleStream.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/logger/consoleStream.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 277 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export HANDLE_BEAR_COMPONENT_CLICK */
/* unused harmony export onBearComponentClick */
/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _onComponentClick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(88);
/* harmony import */ var _updateEmoji__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var HANDLE_BEAR_COMPONENT_CLICK = "HANDLE_BEAR_COMPONENT_CLICK";

var _default = function _default(emojiId, componentId, event) {
  return function (dispatch, getState) {
    dispatch(Object(_onComponentClick__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(emojiId, componentId, event));
    var state = getState();
    var emoji = _data_selectors__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].getEmoji(state, emojiId);
    var leftEye = ["components", "leftEye", "character"];
    var rightEye = ["components", "rightEye", "character"];
    var noseClickCount = ["components", "nose", "meta", "clicks"];
    var noseClicks = emoji.getIn(noseClickCount) || 0;
    dispatch(onBearComponentClick({
      emojiId: emojiId,
      componentId: componentId,
      noseClicks: noseClicks
    }));

    switch (noseClicks % 3) {
      case 1:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"])(emoji.setIn(leftEye, "ಠಿ").setIn(rightEye, "ಠ")));
        break;

      case 2:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"])(emoji.setIn(leftEye, "ಠ").setIn(rightEye, "ಠ")));
        break;

      case 3:
      case 0:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"])(emoji.setIn(leftEye, _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* defaultBearComponents */ "k"].leftEye.character).setIn(rightEye, _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* defaultBearComponents */ "k"].rightEye.character)));
        break;
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
var onBearComponentClick = Object(redux_actions__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(HANDLE_BEAR_COMPONENT_CLICK);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(HANDLE_BEAR_COMPONENT_CLICK, "HANDLE_BEAR_COMPONENT_CLICK", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/onBearComponentClick.js");
  reactHotLoader.register(onBearComponentClick, "onBearComponentClick", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/onBearComponentClick.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/onBearComponentClick.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 278 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export HANDLE_HELLO_BEAR_COMPONENT_CLICK */
/* unused harmony export onHelloBearComponentClick */
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _data_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _onComponentClick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);
/* harmony import */ var _updateEmoji__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var HANDLE_HELLO_BEAR_COMPONENT_CLICK = "HANDLE_HELLO_BEAR_COMPONENT_CLICK";

var _default = function _default(emojiId, componentId, event) {
  return function (dispatch, getState) {
    dispatch(Object(_onComponentClick__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(emojiId, componentId, event));
    var state = getState();
    var emoji = _data_selectors__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getEmoji(state, emojiId);
    var rightLeaningLeftArm = ["components", "rightLeaningLeftArm", "character"];
    var leftEye = ["components", "leftEye", "character"];
    var rightEye = ["components", "rightEye", "character"];
    var rightLeaningRightArm = ["components", "rightLeaningRightArm", "character"];
    var rightAction = ["components", "rightAction", "character"];
    var noseClickCount = ["components", "nose", "meta", "clicks"];
    var noseClicks = emoji.getIn(noseClickCount) || 0;
    dispatch(onHelloBearComponentClick({
      emojiId: emojiId,
      componentId: componentId,
      noseClicks: noseClicks
    }));

    switch (noseClicks % 38) {
      case 1:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(emoji.setIn(rightLeaningLeftArm, null).setIn(rightLeaningRightArm, null).setIn(rightAction, null)));
        break;

      case 2:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(emoji.setIn(leftEye, "ಠಿ").setIn(rightEye, "ಠ")));
        break;

      case 3:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(emoji.setIn(leftEye, "ಠ").setIn(rightEye, "ಠ")));
        break;

      case 5:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(emoji.setIn(leftEye, "◕").setIn(rightEye, "◕")));
        break;

      case 8:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(emoji.setIn(leftEye, "°").setIn(rightEye, "°")));
        break;

      case 13:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(emoji.setIn(rightLeaningLeftArm, null).setIn(leftEye, "–").setIn(rightEye, "–").setIn(rightLeaningRightArm, null).setIn(rightAction, null)));
        break;

      case 21:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(emoji.setIn(rightLeaningLeftArm, null).setIn(leftEye, " ͡°").setIn(rightEye, " ͡°").setIn(rightLeaningRightArm, null).setIn(rightAction, null)));
        break;

      case 34:
        dispatch(Object(_updateEmoji__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(emoji.setIn(rightLeaningRightArm, "ﾉ゛")));
        window.open("mailto:rt@randytarampi.ca?subject=ʕ•ᴥ•ʔﾉ゛&body=I got to the end and couldn't stop clicking!", "_self");
        break;

      case 35:
        window.open("mailto:rt@randytarampi.ca?subject=ʕಠᴥಠʔﾉ゛&body=These windows won't stop popping up!", "_self");
        break;

      case 36:
        window.open("mailto:rt@randytarampi.ca?subject=Hey there…&body=I reached the end of the line and finally stopped at " + noseClicks + " clicks. What is this?", "_self");
        break;
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
var onHelloBearComponentClick = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(HANDLE_HELLO_BEAR_COMPONENT_CLICK);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(HANDLE_HELLO_BEAR_COMPONENT_CLICK, "HANDLE_HELLO_BEAR_COMPONENT_CLICK", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/onHelloBearComponentClick.js");
  reactHotLoader.register(onHelloBearComponentClick, "onHelloBearComponentClick", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/onHelloBearComponentClick.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/actions/emoji/onHelloBearComponentClick.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 279 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(100);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var GtmMetrics =
/*#__PURE__*/
function () {
  function GtmMetrics() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$name = _ref.name,
        name = _ref$name === void 0 ? "GTM" : _ref$name,
        options = _objectWithoutProperties(_ref, ["name"]);

    _classCallCheck(this, GtmMetrics);

    var GTM_DATALAYER = typeof window !== "undefined" && window.GTM_DATALAYER;
    this.name = name;
    this.options = options || {};
    this.dataLayer = this.options.dataLayer || GTM_DATALAYER || [];
  }

  _createClass(GtmMetrics, [{
    key: "track",
    value: function track(eventName, details) {
      var _this = this;

      return new Promise(function (resolve) {
        return resolve(_this.dataLayer.push(_objectSpread({
          event: eventName
        }, Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* buildEventDetails */ "a"])(details))));
      });
    }
  }, {
    key: "pageView",
    value: function pageView(eventName, details) {
      return this.track(eventName, details);
    }
  }, {
    key: "trackReduxAction",
    value: function trackReduxAction(action) {
      var supplementaryDetails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.track("action", Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* buildReduxActionEventDetails */ "b"])(action, supplementaryDetails));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return GtmMetrics;
}();

var _default = GtmMetrics;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GtmMetrics, "GtmMetrics", "/home/travis/build/randytarampi/me/packages/jsx/lib/metrics/vendors/gtm.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/metrics/vendors/gtm.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 280 */,
/* 281 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export PostsComponent */
/* unused harmony export DimensionsWrappedPosts */
/* unused harmony export DimensionsContainerWrappedPosts */
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dimensions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(282);
/* harmony import */ var react_infinite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134);
/* harmony import */ var react_infinite__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_infinite__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_loadingSpinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(121);
/* harmony import */ var _util_computePostHeight__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(123);
/* harmony import */ var _util_getComponentForType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(124);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/posts.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }









var PostsComponent = function PostsComponent(props) {
  var postsArray = props.posts && props.posts.toArray();
  var elementHeight = postsArray ? postsArray.map(Object(_util_computePostHeight__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(props.containerWidth)) : [window.innerHeight];
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_infinite__WEBPACK_IMPORTED_MODULE_4___default.a, {
    containerHeight: props.containerHeight,
    useWindowAsScrollContainer: true,
    elementHeight: elementHeight,
    infiniteLoadBeginEdgeOffset: window.innerHeight,
    preloadBatchSize: react_infinite__WEBPACK_IMPORTED_MODULE_4___default.a.containerHeightScaleFactor(4),
    preloadAdditionalHeight: react_infinite__WEBPACK_IMPORTED_MODULE_4___default.a.containerHeightScaleFactor(4),
    onInfiniteLoad: props.fetchPosts,
    isInfiniteLoading: props.isLoading,
    loadingSpinnerDelegate: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_loadingSpinner__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, postsArray ? postsArray.map(function (post) {
    var Constructor = Object(_util_getComponentForType__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(post.type);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Constructor, {
      key: post.uid,
      post: post,
      containerHeight: props.containerHeight,
      containerWidth: props.containerWidth,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    });
  }) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }));
};
PostsComponent.propTypes = {
  containerHeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  containerWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  fetchPosts: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  posts: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.instanceOf(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])
};
PostsComponent.defaultProps = {
  isLoading: false
};
var DimensionsWrappedPosts = Object(react_dimensions__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
  elementResize: true
})(PostsComponent);
var DimensionsContainerWrappedPosts = function DimensionsContainerWrappedPosts(props) {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "dimensions-container--posts",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(DimensionsWrappedPosts, _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  })));
};
var _default = DimensionsContainerWrappedPosts;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PostsComponent, "PostsComponent", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/posts.jsx");
  reactHotLoader.register(DimensionsWrappedPosts, "DimensionsWrappedPosts", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/posts.jsx");
  reactHotLoader.register(DimensionsContainerWrappedPosts, "DimensionsContainerWrappedPosts", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/posts.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/posts.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 282 */,
/* 283 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export PhotoComponent */
/* unused harmony export ProgressiveImageWrappedPhotoComponent */
/* harmony import */ var _randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var is_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(91);
/* harmony import */ var is_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_progressive_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(284);
/* harmony import */ var react_progressive_image__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_progressive_image__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6);
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(132);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/jsx/lib/components/photo.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var PhotoComponent =
/*#__PURE__*/
function (_PostComponent) {
  _inherits(PhotoComponent, _PostComponent);

  function PhotoComponent() {
    _classCallCheck(this, PhotoComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(PhotoComponent).apply(this, arguments));
  }

  _createClass(PhotoComponent, [{
    key: "render",
    value: function render() {
      var _this = this;

      var rowClassName = ["post post--photo"];

      if (this.props.isLoading) {
        rowClassName.push("post--loading");
      }

      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        className: rowClassName.join(" "),
        id: this.props.post.uid,
        style: {
          backgroundImage: "url(".concat(this.props.source, ")"),
          height: this.scaledHeight
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        className: "post-metadata hide-on-med-and-up",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h1", {
        className: "post-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_7__[/* default */ "o"], {
        className: "post-title__link",
        href: this.props.post.sourceUrl,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, this.title))), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        className: "post-metadata hide-on-small-and-down",
        l: 4,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h1", {
        className: "post-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_7__[/* default */ "o"], {
        className: "post-title__link",
        href: this.props.post.sourceUrl,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, this.title)), typeof this.props.post.body === "string" && this.props.post.body !== "" ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        className: "post-body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, is_html__WEBPACK_IMPORTED_MODULE_1___default()(this.props.post.body) ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: this.props.post.body
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        className: "post-body__text",
        dangerouslySetInnerHTML: {
          __html: this.props.post.body
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        },
        __self: this
      }))) : null, Array.isArray(this.props.post.body) ? this.props.post.body.map(function (htmlString, index) {
        return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
          className: "post-body",
          key: "".concat(_this.props.post.id, ":").concat(_this.props.post.type, ":body:").concat(index),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 73
          },
          __self: this
        }, is_html__WEBPACK_IMPORTED_MODULE_1___default()(htmlString) ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: htmlString
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 77
          },
          __self: this
        }) : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 78
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
          className: "post-body__text",
          dangerouslySetInnerHTML: {
            __html: htmlString
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 79
          },
          __self: this
        })));
      }) : null, this.props.post.datePublished || this.props.post.dateCreated ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
        className: "post-date",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        },
        __self: this
      }, this.props.post.dateCreated && this.props.post.dateCreated.valueOf() !== this.props.post.datePublished.valueOf() ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("strong", {
        className: "post-date__label post-date__label--created",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        },
        __self: this
      }, "Taken:"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        className: "post-date__date post-date__date--created",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        },
        __self: this
      }, this.props.post.dateCreated.toLocaleString(luxon__WEBPACK_IMPORTED_MODULE_2__["DateTime"].DATETIME_MED))) : null, this.props.post.datePublished ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("strong", {
        className: "post-date__label post-date__label--published",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, "Posted:"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        className: "post-date__date post-date__date--published",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, this.props.post.datePublished.toLocaleString(luxon__WEBPACK_IMPORTED_MODULE_2__["DateTime"].DATETIME_MED))) : null) : null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
        className: "post-source",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("strong", {
        className: "post-source__label",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, "More:"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_7__[/* default */ "o"], {
        className: "post-source__link",
        href: this.selected.url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, "Source"), this.props.post.creator ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_7__[/* default */ "o"], {
        className: "post-source__link",
        href: this.props.post.creator.sourceUrl,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, this.props.post.creator.username, " on ", this.props.post.source) : null)));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }, {
    key: "width",
    get: function get() {
      return this.selected.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.selected.height;
    }
  }, {
    key: "selected",
    get: function get() {
      var targetWidth = window.devicePixelRatio ? this.containerWidth * window.devicePixelRatio : this.containerWidth;
      return this.props.post.getSizedPhotoForDisplay(targetWidth);
    }
  }]);

  return PhotoComponent;
}(_post__WEBPACK_IMPORTED_MODULE_8__[/* PostComponent */ "a"]);
PhotoComponent.propTypes = {
  post: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.instanceOf(_randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* Photo */ "h"]).isRequired,
  source: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool.isRequired
};
var ProgressiveImageWrappedPhotoComponent = function ProgressiveImageWrappedPhotoComponent(props) {
  var targetWidth = window.devicePixelRatio ? props.containerWidth * window.devicePixelRatio : props.containerWidth;
  var placeholder = props.post.getSizedPhotoForLoading(targetWidth);
  var selected = props.post.getSizedPhotoForDisplay(targetWidth);
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_progressive_image__WEBPACK_IMPORTED_MODULE_6___default.a, {
    src: selected.url,
    placeholder: placeholder.url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140
    },
    __self: this
  }, function (source, isLoading) {
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(PhotoComponent, _extends({}, props, {
      source: source,
      isLoading: isLoading,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 142
      },
      __self: this
    }));
  });
};
ProgressiveImageWrappedPhotoComponent.propTypes = {
  containerWidth: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number.isRequired,
  post: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.instanceOf(_randy_tarampi_js__WEBPACK_IMPORTED_MODULE_0__[/* Photo */ "h"]).isRequired
};
var _default = ProgressiveImageWrappedPhotoComponent;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PhotoComponent, "PhotoComponent", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/photo.jsx");
  reactHotLoader.register(ProgressiveImageWrappedPhotoComponent, "ProgressiveImageWrappedPhotoComponent", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/photo.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/components/photo.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(289);
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isFunction__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _metrics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(101);


(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();



var _default = function _default() {
  return function (next) {
    return function (action) {
      next(action);
      var trackReduxAction = _metrics__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"] && _metrics__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].api && lodash_isFunction__WEBPACK_IMPORTED_MODULE_0___default()(_metrics__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].api.trackReduxAction) && _metrics__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].api.trackReduxAction;

      if (!trackReduxAction) {
        return;
      }

      switch (action.type) {
        default:
          trackReduxAction([action]);
      }
    };
  };
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/middleware/metrics.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 289 */,
/* 290 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var redux_raven_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(291);
/* harmony import */ var redux_raven_middleware__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_raven_middleware__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var _default = function _default() {
  return new redux_raven_middleware__WEBPACK_IMPORTED_MODULE_0___default.a(window.SENTRY_DSN, Object(_logger__WEBPACK_IMPORTED_MODULE_1__[/* buildRavenConfiguration */ "a"])());
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/middleware/raven.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 291 */,
/* 292 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var _actions_clearError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var _default = function _default(store) {
  return function (next) {
    return function (action) {
      if (action.type === react_router_redux__WEBPACK_IMPORTED_MODULE_0__[/* LOCATION_CHANGE */ "b"]) {
        store.dispatch(Object(_actions_clearError__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"])());
      }

      next(action);
    };
  };
};

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/jsx/lib/middleware/router.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 293 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_resume__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294);
(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

 // eslint-disable-line no-unused-vars


var routes = [{
  component: _components_resume__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"],
  exact: true,
  path: "/"
}];
var _default = routes;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(routes, "routes", "/home/travis/build/randytarampi/me/packages/resume/public/routes/index.js");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/routes/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 294 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export Resume */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(295);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _resume_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(296);
var _resume_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(296, 1);
/* harmony import */ var _content_about__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(297);
/* harmony import */ var _content_awards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(298);
/* harmony import */ var _content_contact__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(300);
/* harmony import */ var _content_education__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(301);
/* harmony import */ var _content_interests__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(303);
/* harmony import */ var _content_languages__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(304);
/* harmony import */ var _content_profiles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(305);
/* harmony import */ var _content_projects__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(306);
/* harmony import */ var _content_publications__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(308);
/* harmony import */ var _content_references__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(310);
/* harmony import */ var _content_skills__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(311);
/* harmony import */ var _content_volunteer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(313);
/* harmony import */ var _content_work__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(315);
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(317);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/index.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




















var PrintableHeader = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableHeader;
var Resume = function Resume(props) {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "printable resume",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_3__["Helmet"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, props.resume.basics.name, " \u2014 ", props.resume.basics.label), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    itemProp: "name",
    content: props.resume.basics.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "twitter:title",
    content: props.resume.basics.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "og:title",
    content: props.resume.basics.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "og:site_name",
    content: props.resume.basics.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "description",
    content: props.resume.basics.label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    itemProp: "description",
    content: props.resume.basics.label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "twitter:description",
    content: props.resume.basics.label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "og:description",
    content: props.resume.basics.label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "image",
    content: "/\u0295\u3064\u2022\u1D25\u2022\u0294\u3064.svg",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    itemProp: "image",
    content: "/\u0295\u3064\u2022\u1D25\u2022\u0294\u3064.svg",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "twitter:image:src",
    content: "/\u0295\u3064\u2022\u1D25\u2022\u0294\u3064.svg",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "og:image",
    content: "/\u0295\u3064\u2022\u1D25\u2022\u0294\u3064.svg",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "twitter:site",
    content: "@randytarampi",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "twitter:creator",
    content: "@randytarampi",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "og:locale",
    content: "en_CA",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "fb:admins",
    content: "831915416",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "fb:app_id",
    content: "1705404522846104",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "og:type",
    content: "website",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
    rel: "canonical",
    href: props.resume.publish_url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "og:url",
    content: props.resume.publish_url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableHeader, {
    printable: props.resume,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "resume-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_contact__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  })), props.resume.basics.summary ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_about__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  })) : null, props.resume.basics.profiles && props.resume.basics.profiles.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_profiles__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: this
  })) : null, props.resume.work && props.resume.work.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_work__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  })) : null, props.resume.projects && props.resume.projects.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_projects__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  })) : null, props.resume.skills && props.resume.skills.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_skills__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: this
  })) : null, props.resume.education && props.resume.education.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_education__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  })) : null, props.resume.awards && props.resume.awards.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_awards__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  })) : null, props.resume.volunteer && props.resume.volunteer.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_volunteer__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  })) : null, props.resume.publications && props.resume.publications.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_publications__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93
    },
    __self: this
  })) : null, props.resume.languages && props.resume.languages.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_languages__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    },
    __self: this
  })) : null, props.resume.interests && props.resume.interests.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_interests__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103
    },
    __self: this
  })) : null, props.resume.references && props.resume.references.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_content_references__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108
    },
    __self: this
  })) : null)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_footer__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113
    },
    __self: this
  })));
};
Resume.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
Resume.defaultProps = {
  resume: _resume_json__WEBPACK_IMPORTED_MODULE_4__
};
var _default = Resume;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableHeader, "PrintableHeader", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/index.jsx");
  reactHotLoader.register(Resume, "Resume", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/index.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 295 */,
/* 296 */
/***/ (function(module) {

module.exports = {"basics":{"name":"Randy Tarampi","label":"Going places | building software","picture":"https://secure.gravatar.com/avatar/2efab7e328dae90b9ff272f9ee4974b8?s=512","email":"jobs@randytarampi.ca","phone":"+1 (604) 374-7128","website":"https://www.randytarampi.ca","summary":"Just another code monkey looking to broaden his skillset and horizons, preferably outside of North America. Prefers fitness balls over fancy chairs and better known in person than on paper or screen","location":{"address":"4663 Todd Street","postalCode":"V5R 3P7","city":"Vancouver","countryCode":"CA","region":"BC"},"profiles":[{"network":"GitHub","username":"randytarampi","url":"https://github.com/randytarampi"},{"network":"Instagram","username":"randytarampi","url":"https://instagram.com/randytarampi"},{"network":"LinkedIn","username":"randytarampi","url":"https://linkedin.com/in/randytarampi"},{"network":"Flickr","username":"randytarampi","url":"https://www.flickr.com/people/randytarampi"},{"network":"AngelList","username":"randytarampi","url":"https://angel.co/randytarampi"},{"network":"StackOverflow","username":"randytarampi","url":"https://stackoverflow.com/story/randytarampi"}]},"work":[{"company":"Fetch Auto","position":"Senior Software Developer","website":"https://fetchauto.ca","startDate":"2017-02-14","endDate":"2018-06-01","summary":"Got called back to Vancouver while travelling abroad by my former team lead at Yardi to help build out the first end-to-end solution for Canadians to buy, sell and finance private sale vehicles","highlights":["Took a UI prototype to a fully integrated, production application in less than 6 months","Rapidly iterated on new features and designs to drive user growth","Implemented a comprehensive user tracking & analytics platform","Designed and developed a serverless service platform","Got asked to be their first employee while passing Sardinia on a container ship"]},{"company":"Yardi Energy | EnerNOC | Pulse Energy","position":"Software Developer","website":"https://pulseenergy.com","startDate":"2014-06-02","endDate":"2016-09-16","summary":"Returned to Pulse Energy as a new grad in Summer 2014 looking to further grow my skillset – by year's end we were acquired by EnerNOC and then in Summer 2016 sold off to Yardi","highlights":["Mentored and developed co-operative education students","Led a year-long, platform wide internationalization effort","Dove deep in support of a platform wide localization effort into Italian","Designed a centralized, platform wide notification and subscription workflow","Visited the office and found that much of the code I wrote was still running – untouched and error free"]},{"company":"Pulse Energy","position":"Software Developer","website":"https://pulseenergy.com","startDate":"2013-01-07","endDate":"2013-08-30","summary":"I cut my chops at a mid-size start-up that gave utilities like British Gas, PG&E and BC Hydro an understanding of their​ commercial and industrial customers while serving up actionable energy intelligence for small, medium and large businesses alike","highlights":["Built out a service oriented node.js platform atop a legacy Java monolith","Designed, prototyped and delivered single page, user facing web applications","Scalably configured applications, services and servers via Chef","Learned how much a little bit of free food served at the right time can keep spirits high"]},{"company":"Metro Vancouver","position":"Project Research Assistant","website":"http://www.metrovancouver.org","startDate":"2012-05-01","endDate":"2012-09-01","summary":"I was curious about how bureaucracy dealt with data and I was equal parts surprised and horrified","highlights":["Maintained and developed internal data manipulation and entry tools","Performed business analysis, wrote & presented annual financial reports","Performed systems and data analysis, database spot checks and ensured database integrity","It turns out that engineers think they can do everything in Excel, and they do"]},{"company":"SAP","position":"Software Developer in Test","website":"https://www.sap.com","startDate":"2011-09-01","endDate":"2011-12-31","summary":"My first \"real\" job in the tech sector, where I gained an appreciation for process and automation assessing the daily build quality for Crystal Reports","highlights":["Administered the daily automated testing of SAP Business Objects Enterprise for the Crystal Reports team"]},{"company":"Simon Fraser University","position":"IT Technician","website":"https://itservices.sfu.ca","startDate":"2011-05-01","endDate":"2014-04-30","summary":"My first \"real\" job, pretty much exactly as it sounds – sat at a desk waiting for problems to arise","highlights":["Helped students and staff with printer, network and other general IT issues","Flamed trolls and policed computing labs, seeking students who could not read the large \"NO FOOD AND DRINK\" signs"]}],"volunteer":[{"organization":"Simon Fraser University","position":"Orientation leader","startDate":"2011-09-01","endDate":"2011-12-31","url":"","summary":"What started off as me making good on a bet to get involved and volunteer in the wider university community ended up being a pretty fun time where I ended up meeting a bunch of cool people","highlights":["Marched a group of 10-15 students around SFU's Burnaby Campus for two days pointing out various points of interest and extolling the benefits of community involvement, meeting new people and in general, making the most their first semester","Mentored the group for the duration of the semester, answering various questions regarding course selection, best/cheapest food on campus, fun things to do on campus, and other common questions for university neophytes"]},{"organization":"Windermere Community Programs","position":"Program Volunteer","startDate":"2006-09-01","endDate":"2009-06-30","url":"","summary":"The Education Ministry of BC mandated that high school students complete some number of civil service hours before graduating – I ended up starting off begrudgingly and ended up loving it so much that I did it for much longer than required","highlights":["Organized and supervised children's activities for various after school programs at a number of East Vancouver elementary schools"]}],"projects":[{"name":"My résumé","description":"This page that you're reading – if I needed to tell you that, we might not be the best of matches","highlights":["Open up Chrome and try to print it out – follow the instructions at the bottom of the page and you might be surprised","Builds off and adheres to the JSON Resume standard"],"keywords":["ES6","react","sass","jsonresume","Print styles","Puppeteer"],"startDate":"2018-08-01","roles":["Developer"],"entity":"Me, myself & I","type":"Application","url":"https://www.randytarampi.ca/resume"},{"name":"My blog","description":"A small project I kicked off shortly after leaving Yardi and then subsequently dropped as I went off travelling around the Mediterranean","highlights":["My choice of technologies here was largely driven by my want to minimize operating costs – almost eveything happens on continuning AWS free tier services","The 2 USD/month I pay for key management services dominates the total bill, which is usually less than 3 USD"],"keywords":["node.js","ES6","react","redux","User tracking","GitHub Pages","serverless","AWS Lambda","DynamoDB","Tumblr","Instagram","Unsplash","Flickr","S3"],"startDate":"2016-10-06","roles":["Developer"],"entity":"Me, myself & I","type":"Application","url":"https://www.randytarampi.ca/blog"}],"education":[{"institution":"Simon Fraser University","area":"Computing Science & Political Science","studyType":"Bachelor's degree","startDate":"2009-09-03","endDate":"2014-06-02","gpa":"3.33","courses":["CMPT 470 – Web Information Systems","CMPT 431 – Distributed Systems","CMPT 305 – Computer Simulation and Modelling","POL 451 – Public Policy Analysis","CMPT 471 – Networking II","CMPT 475 – Software Engineering II","CMPT 363 – User Interface Design","CMPT 300 – Operating Systems"]}],"awards":[],"publications":[],"skills":[{"name":"Front end","level":"Master","keywords":["ES6","react","redux","i18n","a11y","User analytics","sass","User testing","UI design","Data visualization"]},{"name":"Back end","level":"Master","keywords":["node.js","Data architecture","Serverless computing","Performance tuning","Microservices","i18n","Spring","Postgres","Redis","Service architecture","API security"]},{"name":"Operations","level":"Intermediate","keywords":["AWS","CloudFormation","Chef","Configuration as code","Network security","Fault tolerance","Monitoring","Alerting"]},{"name":"Data analysis","level":"Beginner","keywords":["Excel","VBA","Python","Jupyter Notebook","R"]}],"languages":[{"language":"English","fluency":"Native"},{"language":"Italian","fluency":"Beginner"},{"language":"French","fluency":"Intermediate"}],"interests":[{"name":"Auto racing","keywords":["WEC","WTSC","F1","IndyCar"]},{"name":"Photography","keywords":["Landscapes","Night","Long exposures","Events","Weddings"]},{"name":"Food & drink","keywords":["Comfort foods","Baked goods","Iced beverages"]},{"name":"People","keywords":["That have stories to tell","Who have a sense of humor","That read this far down"]}],"references":[]};

/***/ }),
/* 297 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeAbout */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/about.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeAbout = function ResumeAbout(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "about",
    label: "About",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "resume-about__summary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, resume.basics.summary));
};
ResumeAbout.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumeAbout;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/about.jsx");
  reactHotLoader.register(ResumeAbout, "ResumeAbout", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/about.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/about.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 298 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeAwards */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(299);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/awards/index.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeAwards = function ResumeAwards(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "awards",
    label: "Awards",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, resume.awards.map(function (awardsEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_entry__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      awardsEntry: awardsEntry,
      key: index,
      index: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: this
    });
  }));
};
ResumeAwards.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumeAwards;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/awards/index.jsx");
  reactHotLoader.register(ResumeAwards, "ResumeAwards", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/awards/index.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/awards/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 299 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeAwardsEntry */
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/awards/entry.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var ResumeAwardsEntry = function ResumeAwardsEntry(_ref) {
  var awardsEntry = _ref.awardsEntry,
      index = _ref.index;
  var date = luxon__WEBPACK_IMPORTED_MODULE_0__["DateTime"].fromISO(awardsEntry.date);
  var dateString = date.toLocaleString(luxon__WEBPACK_IMPORTED_MODULE_0__["DateTime"].DATE_FULL);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    className: index > 2 ? "hide-on-print" : null,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    s: 12,
    className: "resume-awards-entry",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    s: 12,
    className: "resume-awards-entry__basics",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h5", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "resume-awards-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, dateString)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "resume-awards-entry__title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, awardsEntry.title))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h5", {
    className: "hide-on-med-and-up",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "resume-awards-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, dateString)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "resume-awards-entry__awarder",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, "Awarded\xA0", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("em", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, "by"), "\xA0", awardsEntry.awarder), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "resume-awards-entry__summary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, awardsEntry.summary)))));
};
ResumeAwardsEntry.propTypes = {
  index: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,
  awardsEntry: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumeAwardsEntry;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ResumeAwardsEntry, "ResumeAwardsEntry", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/awards/entry.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/awards/entry.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 300 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeContact */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/contact.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeContact = function ResumeContact(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "contact",
    label: "Contact",
    hideOnPrint: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    m: 6,
    s: 12,
    className: "resume-contact__email",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* EmailLink */ "c"], {
    email: resume.basics.email,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    m: 6,
    s: 12,
    className: "resume-contact__tel",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* TelLink */ "m"], {
    tel: resume.basics.phone,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  })), resume.basics.website ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-contact__web",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* CampaignLink */ "b"], {
    href: resume.basics.website,
    className: "link--web",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  })) : null));
};
ResumeContact.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumeContact;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/contact.jsx");
  reactHotLoader.register(ResumeContact, "ResumeContact", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/contact.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/contact.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 301 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeEducation */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(302);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/education/index.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeEducation = function ResumeEducation(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "education",
    label: "Education",
    descriptionNode: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, "I went to school on top of a mountain for 5 years")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, "I remember some things better than others, like the snow days. For everything else there's ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* default */ "o"], {
      href: "https://www.goodreads.com/book/show/29437996-copying-and-pasting-from-stack-overflow",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, "StackOverflow")))),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, resume.education.map(function (educationEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_entry__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
      educationEntry: educationEntry,
      key: index,
      index: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    });
  }));
};
ResumeEducation.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumeEducation;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/education/index.jsx");
  reactHotLoader.register(ResumeEducation, "ResumeEducation", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/education/index.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/education/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 302 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeEducationEntry */
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/education/entry.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var monthYearFormat = {
  month: "long",
  year: "numeric"
};
var ResumeEducationEntry = function ResumeEducationEntry(_ref) {
  var educationEntry = _ref.educationEntry,
      index = _ref.index;
  var startDate = luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(educationEntry.startDate);
  var endDate = educationEntry.endDate && luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(educationEntry.endDate) || null;
  var dateString = "".concat(startDate.toLocaleString(monthYearFormat), " to ").concat(endDate ? endDate.toLocaleString(monthYearFormat) : "Present");
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    className: index > 2 ? "hide-on-print" : null,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-education-entry",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-education-entry__basics",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-education-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, dateString)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-education-entry__institution",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, educationEntry.website ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__[/* CampaignLink */ "b"], {
    href: educationEntry.website,
    text: educationEntry.institution,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }) : educationEntry.institution))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "hide-on-med-and-up",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-education-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, dateString)))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-education-entry__details",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-education-entry__area",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, educationEntry.area)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-education-entry__study-type",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, educationEntry.studyType))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "hide-on-med-and-up",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-education-entry__area",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, educationEntry.area)))), educationEntry.courses ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, "Highlights")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ul", {
    className: "resume-education-entry__highlights",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, educationEntry.courses.map(function (highlight, index) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", {
      className: "resume-education-entry__highlight".concat(index > 3 ? " hide-on-print" : ""),
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      },
      __self: this
    }, highlight);
  })))) : null));
};
ResumeEducationEntry.propTypes = {
  index: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  educationEntry: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumeEducationEntry;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(monthYearFormat, "monthYearFormat", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/education/entry.jsx");
  reactHotLoader.register(ResumeEducationEntry, "ResumeEducationEntry", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/education/entry.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/education/entry.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 303 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeInterests */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/interests.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeInterests = function ResumeInterests(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "interests",
    label: "Interests",
    showOnLegal: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, resume.interests.map(function (interestEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      m: 4,
      s: 6,
      className: "resume-interests__interest-entry".concat(index > 2 ? " hide-on-print" : ""),
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h5", {
      className: "resume-interests__interest",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, interestEntry.name)), interestEntry.keywords && interestEntry.keywords.length ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", {
      className: "resume-interests__keywords",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, interestEntry.keywords.map(function (keyword, index) {
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
        className: "resume-interests__keyword".concat(index > 3 ? " show-on-legal" : ""),
        key: index,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }, keyword);
    })) : null);
  })));
};
ResumeInterests.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumeInterests;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/interests.jsx");
  reactHotLoader.register(ResumeInterests, "ResumeInterests", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/interests.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/interests.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 304 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeLanguages */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/languages.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeLanguages = function ResumeLanguages(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "languages",
    label: "Languages",
    hideOnPrint: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, resume.languages.map(function (languageEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      l: 4,
      m: 6,
      s: 12,
      className: "resume-languages__language-entry",
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", {
      className: "resume-languages__language",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, languageEntry.language)), "\xA0", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "resume-languages__fluency",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, languageEntry.fluency));
  })));
};
ResumeLanguages.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumeLanguages;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/languages.jsx");
  reactHotLoader.register(ResumeLanguages, "ResumeLanguages", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/languages.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/languages.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 305 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeProfiles */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/profiles.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var networkLinkMap = {
  angellist: _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* AngelListLink */ "a"],
  f00px: _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* F00pxLink */ "d"],
  facebook: _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* FacebookLink */ "e"],
  flickr: _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* FlickrLink */ "f"],
  github: _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* GitHubLink */ "g"],
  instagram: _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* InstagramLink */ "h"],
  linkedin: _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* LinkedInLink */ "k"],
  stackoverflow: _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* StackOverflowLink */ "l"],
  twitter: _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* TwitterLink */ "n"]
};

var getLinkComponentForProfile = function getLinkComponentForProfile(profile) {
  var network = profile.network;
  var ExistingLinkComponent = networkLinkMap[network.toLowerCase()];
  var linkComponent = null;

  if (!ExistingLinkComponent) {
    if (profile.url) {
      linkComponent = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
        className: "text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, network), "\xA0", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* CampaignLink */ "b"], {
        href: profile.url,
        text: profile.username,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }));
    } else if (profile.username) {
      linkComponent = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
        className: "text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }, network), "\xA0", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }, profile.username));
    }
  } else {
    if (profile.username) {
      linkComponent = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(ExistingLinkComponent, {
        username: profile.username,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      });
    } else if (profile.url) {
      linkComponent = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(ExistingLinkComponent, {
        href: profile.url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      });
    }
  }

  return linkComponent;
};

var ResumeProfiles = function ResumeProfiles(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "profiles",
    label: "Profiles",
    showOnA4: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, resume.basics.profiles.map(function (profile) {
    var linkComponent = getLinkComponentForProfile(profile);

    if (linkComponent) {
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        key: profile.network,
        l: 4,
        m: 4,
        s: 12,
        className: "resume-profiles__profile",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }, linkComponent);
    } else {
      return null;
    }
  })));
};
ResumeProfiles.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumeProfiles;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/profiles.jsx");
  reactHotLoader.register(networkLinkMap, "networkLinkMap", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/profiles.jsx");
  reactHotLoader.register(getLinkComponentForProfile, "getLinkComponentForProfile", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/profiles.jsx");
  reactHotLoader.register(ResumeProfiles, "ResumeProfiles", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/profiles.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/profiles.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 306 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeProjects */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(307);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/projects/index.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeProjects = function ResumeProjects(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "projects",
    label: "Projects",
    hideOnPrint: true,
    descriptionNode: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, "Vanity seems to be in vogue and I'm not usually one for ideas, so these are all about me")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, "Frankly, I'd much rather be outside exploring rather than on my computer in my downtime")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, "Tried to keep myself disciplined here, but I'm a lot better when I have people actually holding me to account")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Link */ "b"], {
      href: "https://uptime.randytarampi.ca",
      "aria-label": "Uptime status",
      name: "Uptime",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: "https://img.shields.io/uptimerobot/ratio/m780949566-9b1b7cc0bdd3be425a9e6ac8.svg?style=flat-square",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Link */ "b"], {
      href: "https://travis-ci.org/randytarampi/me",
      "aria-label": "Travis build",
      name: "Travis",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: "https://img.shields.io/travis/randytarampi/me.svg?style=flat-square",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Link */ "b"], {
      href: "https://coveralls.io/github/randytarampi/me",
      "aria-label": "Coveralls score",
      name: "Coveralls",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: "https://img.shields.io/coveralls/github/randytarampi/me.svg?style=flat-square",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Link */ "b"], {
      href: "https://codeclimate.com/github/randytarampi/me/maintainability",
      "aria-label": "Code Climate score",
      name: "Code Climate",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: "https://img.shields.io/codeclimate/maintainability-percentage/randytarampi/me.svg?style=flat-square",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: this
    })))),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, resume.projects.map(function (projectsEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_entry__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      projectsEntry: projectsEntry,
      key: index,
      index: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    });
  }));
};
ResumeProjects.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumeProjects;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/projects/index.jsx");
  reactHotLoader.register(ResumeProjects, "ResumeProjects", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/projects/index.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/projects/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 307 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeProjectsEntry */
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/projects/entry.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var monthYearFormat = {
  month: "long",
  year: "numeric"
};
var ResumeProjectsEntry = function ResumeProjectsEntry(_ref) {
  var projectsEntry = _ref.projectsEntry,
      index = _ref.index;
  var startDate = luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(projectsEntry.startDate);
  var endDate = projectsEntry.endDate && luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(projectsEntry.endDate) || null;
  var dateString = "".concat(startDate.toLocaleString(monthYearFormat), " to ").concat(endDate ? endDate.toLocaleString(monthYearFormat) : "Present");
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    className: index > 2 ? "hide-on-print" : null,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-projects-entry",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-projects-entry__basics",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-projects-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, dateString)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-projects-entry__name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, projectsEntry.url ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__[/* CampaignLink */ "b"], {
    href: projectsEntry.url,
    text: projectsEntry.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }) : projectsEntry.name))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "hide-on-med-and-up",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-projects-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, dateString)))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-projects-entry__details",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, projectsEntry.url ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__[/* CampaignLink */ "b"], {
    className: "resume-projects-entry__website link--web",
    href: projectsEntry.url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  })) : null, projectsEntry.roles ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-projects-entry__position",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, projectsEntry.roles.join(", ")))) : null)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
    className: "resume-projects-entry__description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, projectsEntry.description))), projectsEntry.highlights ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ul", {
    className: "resume-projects-entry__highlights",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }, projectsEntry.highlights.map(function (highlight, index) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", {
      className: "resume-projects-entry__highlight".concat(index < 3 ? " show-on-letter show-on-a4" : "").concat(index >= 3 ? " show-on-legal" : ""),
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72
      },
      __self: this
    }, highlight);
  })))) : null));
};
ResumeProjectsEntry.propTypes = {
  index: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  projectsEntry: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumeProjectsEntry;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(monthYearFormat, "monthYearFormat", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/projects/entry.jsx");
  reactHotLoader.register(ResumeProjectsEntry, "ResumeProjectsEntry", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/projects/entry.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/projects/entry.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 308 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumePublications */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(309);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/publications/index.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumePublications = function ResumePublications(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "publications",
    label: "Publications",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, resume.publications.map(function (publicationsEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_entry__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      publicationsEntry: publicationsEntry,
      key: index,
      index: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: this
    });
  }));
};
ResumePublications.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumePublications;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/publications/index.jsx");
  reactHotLoader.register(ResumePublications, "ResumePublications", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/publications/index.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/publications/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 309 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumePublicationsEntry */
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/publications/entry.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var ResumePublicationsEntry = function ResumePublicationsEntry(_ref) {
  var publicationsEntry = _ref.publicationsEntry,
      index = _ref.index;
  var date = luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(publicationsEntry.releaseDate);
  var dateString = date.toLocaleString(luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].DATE_FULL);
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    className: index > 2 ? "hide-on-print" : null,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-publications-entry",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-publications-entry__basics",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-publications-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, dateString)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-publications-entry__name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, publicationsEntry.url ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__[/* CampaignLink */ "b"], {
    href: publicationsEntry.url,
    text: publicationsEntry.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }) : publicationsEntry.name))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "hide-on-med-and-up",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-publications-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, dateString)), publicationsEntry.url ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__[/* CampaignLink */ "b"], {
    className: "resume-publications-entry__url link--web",
    href: publicationsEntry.url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  })) : null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
    className: "resume-publications-entry__publisher",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, "Published\xA0", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("em", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, "by"), "\xA0", publicationsEntry.publisher), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
    className: "resume-publications-entry__summary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, publicationsEntry.summary)))));
};
ResumePublicationsEntry.propTypes = {
  index: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  publicationsEntry: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumePublicationsEntry;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ResumePublicationsEntry, "ResumePublicationsEntry", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/publications/entry.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/publications/entry.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 310 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeReferences */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/references.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeReferences = function ResumeReferences(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "references",
    label: "References",
    hideOnPrint: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, resume.references.map(function (referenceEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      s: 12,
      className: "resume-references__reference-entry",
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("blockquote", {
      className: "resume-references__reference",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      className: "resume-references__reference-quote",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, referenceEntry.reference)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      className: "resume-references__reference-referee",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, "\u2014\xA0", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    }, referenceEntry.name))));
  })));
};
ResumeReferences.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumeReferences;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/references.jsx");
  reactHotLoader.register(ResumeReferences, "ResumeReferences", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/references.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/references.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 311 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeSkills */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(312);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/skills/index.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeSkills = function ResumeSkills(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "skills",
    label: "Skills",
    descriptionNode: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, "I'm more or less a full stack JavaScript developer")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, "Ask me about my soft skills \u2014 those are more fun"))),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, resume.skills.map(function (skillsEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_entry__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
      skillsEntry: skillsEntry,
      key: index,
      index: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    });
  })));
};
ResumeSkills.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumeSkills;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/skills/index.jsx");
  reactHotLoader.register(ResumeSkills, "ResumeSkills", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/skills/index.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/skills/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 312 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeSkillsEntry */
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/skills/entry.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();




var ResumeSkillsEntry = function ResumeSkillsEntry(_ref) {
  var skillsEntry = _ref.skillsEntry,
      index = _ref.index;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    m: 4,
    s: 6,
    className: "resume-skills-entry".concat(index > 2 ? " hide-on-print" : ""),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "resume-skills-entry__name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, skillsEntry.name))), skillsEntry.keywords && skillsEntry.keywords.length ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "resume-skills-entry__keywords",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, skillsEntry.keywords.map(function (keyword, index) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
      className: "resume-skills-entry__keyword".concat(index > 5 ? " hide-on-print" : ""),
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, keyword);
  })) : null);
};
ResumeSkillsEntry.propTypes = {
  index: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  skillsEntry: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired
};
var _default = ResumeSkillsEntry;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ResumeSkillsEntry, "ResumeSkillsEntry", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/skills/entry.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/skills/entry.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 313 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeVolunteer */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(314);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/volunteer/index.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();





var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeVolunteer = function ResumeVolunteer(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "volunteer",
    label: "Volunteering",
    hideOnPrint: true,
    descriptionNode: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, "I never really ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("em", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, "want"), " to volunteer, but when it happens it seems that I really enjoy it")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, "People always looked at me as a shy and reserved, but it actually turns out that I've got a knack for leadership and mentorship"))),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, resume.volunteer.map(function (volunteerEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_entry__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      volunteerEntry: volunteerEntry,
      key: index,
      index: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: this
    });
  }));
};
ResumeVolunteer.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var _default = ResumeVolunteer;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/volunteer/index.jsx");
  reactHotLoader.register(ResumeVolunteer, "ResumeVolunteer", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/volunteer/index.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/volunteer/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 314 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeVolunteerEntry */
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/volunteer/entry.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var monthYearFormat = {
  month: "long",
  year: "numeric"
};
var ResumeVolunteerEntry = function ResumeVolunteerEntry(_ref) {
  var volunteerEntry = _ref.volunteerEntry,
      index = _ref.index;
  var startDate = luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(volunteerEntry.startDate);
  var endDate = volunteerEntry.endDate && luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(volunteerEntry.endDate) || null;
  var dateString = "".concat(startDate.toLocaleString(monthYearFormat), " to ").concat(endDate ? endDate.toLocaleString(monthYearFormat) : "Present");
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    className: index > 2 ? "hide-on-print" : null,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-volunteer-entry",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-volunteer-entry__basics",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-volunteer-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, dateString)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-volunteer-entry__organization",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, volunteerEntry.website ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__[/* CampaignLink */ "b"], {
    href: volunteerEntry.website,
    text: volunteerEntry.organization,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }) : volunteerEntry.organization))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "hide-on-med-and-up",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-volunteer-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, dateString)))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-volunteer-entry__details",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, volunteerEntry.website ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__[/* CampaignLink */ "b"], {
    className: "resume-volunteer-entry__website link--web",
    href: volunteerEntry.website,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  })) : null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-volunteer-entry__position",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, volunteerEntry.position))))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
    className: "resume-volunteer-entry__summary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, volunteerEntry.summary))), volunteerEntry.highlights ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    className: "hide-on-print",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ul", {
    className: "resume-volunteer-entry__highlights",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: this
  }, volunteerEntry.highlights.map(function (highlight, index) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", {
      className: "resume-volunteer-entry__highlight".concat(index < 3 ? " show-on-letter show-on-a4" : "").concat(index >= 3 ? " show-on-legal" : ""),
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    }, highlight);
  })))) : null));
};
ResumeVolunteerEntry.propTypes = {
  index: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  volunteerEntry: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumeVolunteerEntry;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(monthYearFormat, "monthYearFormat", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/volunteer/entry.jsx");
  reactHotLoader.register(ResumeVolunteerEntry, "ResumeVolunteerEntry", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/volunteer/entry.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/volunteer/entry.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 315 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeWork */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(316);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/work/index.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var PrintableSection = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableSection;
var ResumeWork = function ResumeWork(_ref) {
  var resume = _ref.resume;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(PrintableSection, {
    printableType: "resume",
    type: "work",
    label: "Work",
    descriptionNode: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, "I met the CTO at Fetch Auto 5 years ago as an intern at Pulse Energy and have been pretty inseparable until now")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, "It's time to strike it out on my own though \u2014 he got me to come back and work with him not once, but twice and I'm looking for a place where I can settle down and build similarly close working relationships")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
      className: "text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, "Ask me about how I ended up learning Italian on the job, my cadres of co-op students, or when I almost ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* default */ "o"], {
      href: "http://www.quickmeme.com/p/3vv8p3",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, "brought down a busy test environment"), " as an intern"))),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, resume.work.map(function (workEntry, index) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_entry__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
      workEntry: workEntry,
      key: index,
      index: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    });
  }));
};
ResumeWork.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumeWork;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableSection, "PrintableSection", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/work/index.jsx");
  reactHotLoader.register(ResumeWork, "ResumeWork", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/work/index.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/work/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 316 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeWorkEntry */
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/work/entry.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var monthYearFormat = {
  month: "long",
  year: "numeric"
};
var ResumeWorkEntry = function ResumeWorkEntry(_ref) {
  var workEntry = _ref.workEntry,
      index = _ref.index;
  var startDate = luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(workEntry.startDate);
  var endDate = workEntry.endDate && luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromISO(workEntry.endDate) || null;
  var dateString = "".concat(startDate.toLocaleString(monthYearFormat), " to ").concat(endDate ? endDate.toLocaleString(monthYearFormat) : "Present");
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    className: index > 2 ? "hide-on-print" : null,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-work-entry",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-work-entry__basics",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-work-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, dateString)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-work-entry__company",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, workEntry.website ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__[/* CampaignLink */ "b"], {
    href: workEntry.website,
    text: workEntry.company,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }) : workEntry.company))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
    className: "hide-on-med-and-up",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-work-entry__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, dateString)))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    className: "resume-work-entry__details",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, workEntry.website ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "right hide-on-small-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_0__[/* CampaignLink */ "b"], {
    className: "resume-work-entry__website link--web",
    href: workEntry.website,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  })) : null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "resume-work-entry__position",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, workEntry.position))))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
    className: "resume-work-entry__summary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, workEntry.summary))), workEntry.highlights ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ul", {
    className: "resume-work-entry__highlights",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  }, workEntry.highlights.map(function (highlight, index) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", {
      className: "resume-work-entry__highlight".concat(index < 3 ? " show-on-letter show-on-a4" : "").concat(index >= 3 ? " show-on-legal" : ""),
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, highlight);
  })))) : null));
};
ResumeWorkEntry.propTypes = {
  index: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  workEntry: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumeWorkEntry;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(monthYearFormat, "monthYearFormat", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/work/entry.jsx");
  reactHotLoader.register(ResumeWorkEntry, "ResumeWorkEntry", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/work/entry.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/content/work/entry.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 317 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export ResumeFooter */
/* harmony import */ var _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_materialize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_materialize__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/footer.jsx";

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();






var PrintableFooter = _randy_tarampi_jsx__WEBPACK_IMPORTED_MODULE_0__[/* Printable */ "c"].PrintableFooter;
var ResumeFooter = function ResumeFooter() {
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(PrintableFooter, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    className: "row valign-wrapper center-align hide-on-screen",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    s: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("em", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, "Print styles are hard to write and one page r\xE9sum\xE9s are harder \u2013 check out the full copy at ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* CampaignLink */ "b"], {
    href: "https://www.randytarampi.ca/resume",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  })))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    className: "row valign-wrapper center-align hide-on-print",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_materialize__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    l: 8,
    offset: "l2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, "If you're going to print this out please do it in Chrome, or with a Chromium backed client \u2014 I didn't work on those print styles for nothing!"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, "It should fit neatly onto a single ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* CampaignLink */ "b"], {
    href: "https://github.com/randytarampi/me.resume/raw/master/a4.pdf",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, "A4"), ", ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* CampaignLink */ "b"], {
    href: "https://github.com/randytarampi/me.resume/raw/master/letter.pdf",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, "US Letter"), ", or ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_randy_tarampi_jsx_lib_components_link__WEBPACK_IMPORTED_MODULE_1__[/* CampaignLink */ "b"], {
    href: "https://github.com/randytarampi/me.resume/raw/master/legal.pdf",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "US Legal"), " sized page, provided you ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("em", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, "set the margins to nil"), ", ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("em", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, "clear the page headers and footers"), ", and for best results, ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("em", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, "include background colours and images")))));
};
ResumeFooter.propTypes = {
  resume: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var _default = ResumeFooter;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PrintableFooter, "PrintableFooter", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/footer.jsx");
  reactHotLoader.register(ResumeFooter, "ResumeFooter", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/footer.jsx");
  reactHotLoader.register(_default, "default", "/home/travis/build/randytarampi/me/packages/resume/public/components/resume/footer.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 318 */,
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(320);
module.exports = __webpack_require__(486);


/***/ }),
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hotApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(265);
var _jsxFileName = "/home/travis/build/randytarampi/me/packages/resume/public/views/index.jsx";



Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hotApp__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6
  },
  __self: undefined
}), document.getElementById("react-root"));

/***/ })
/******/ ]);
//# sourceMappingURL=resume.js.map