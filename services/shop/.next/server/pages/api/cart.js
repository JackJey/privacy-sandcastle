"use strict";
(() => {
var exports = {};
exports.id = 579;
exports.ids = [579];
exports.modules = {

/***/ 75:
/***/ ((module) => {

module.exports = require("iron-session");

/***/ }),

/***/ 3791:
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
    const cart = req.session.cart || [];
    const { url , method , body  } = req;
    if (method === "GET") {
        res.json(cart);
    }
    if (method === "POST") {
        const id = req.body.id;
        const size = req.body.size;
        const quantity = parseInt(req.body.quantity);
        const item = await (0,_lib_items__WEBPACK_IMPORTED_MODULE_0__/* .getItem */ .rV)(id);
        const order = {
            item,
            size,
            quantity
        };
        req.session.cart = (0,_lib_items__WEBPACK_IMPORTED_MODULE_0__/* .addOrder */ .fS)(order, cart);
        await req.session.save();
        res.redirect(302, "/cart");
    }
    if (method === "DELETE") {
        req.session.destroy();
        res.status(204);
        res.send("");
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_lib_withSession__WEBPACK_IMPORTED_MODULE_1__/* .withSessionRoute */ .j)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [534,945], () => (__webpack_exec__(3791)));
module.exports = __webpack_exports__;

})();