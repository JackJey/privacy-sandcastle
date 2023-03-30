"use strict";
(() => {
var exports = {};
exports.id = 883;
exports.ids = [883];
exports.modules = {

/***/ 75:
/***/ ((module) => {

module.exports = require("iron-session");

/***/ }),

/***/ 7595:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2233);
/* harmony import */ var _lib_withSession__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5295);
/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */ 

async function handler(req, res) {
    const id = req.query.id;
    const item = await (0,_lib_items__WEBPACK_IMPORTED_MODULE_0__/* .getItem */ .rV)(id);
    res.json(item);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_lib_withSession__WEBPACK_IMPORTED_MODULE_1__/* .withSessionRoute */ .j)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [534,945], () => (__webpack_exec__(7595)));
module.exports = __webpack_exports__;

})();