"use strict";
exports.id = 190;
exports.ids = [190];
exports.modules = {

/***/ 4190:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vq": () => (/* binding */ displayCategory),
/* harmony export */   "lX": () => (/* binding */ fromSize)
/* harmony export */ });
/* unused harmony exports CATEGORIES, getItems, getItem, toSize, addOrder, removeOrder, updateOrder */
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
 */ const items = [
    {
        id: "1f45e",
        icon: "\uD83D\uDC5E",
        price: 180,
        category: 1,
        name: "Man's Shoe"
    },
    {
        id: "1f45f",
        icon: "\uD83D\uDC5F",
        price: 100,
        category: 0,
        name: "Running Shoe"
    },
    {
        id: "1f460",
        icon: "\uD83D\uDC60",
        price: 200,
        category: 1,
        name: "High-Heeled Shoe"
    },
    {
        id: "1f461",
        icon: "\uD83D\uDC61",
        price: 120,
        category: 0,
        name: "Woman's Sandal"
    },
    {
        id: "1f462",
        icon: "\uD83D\uDC62",
        price: 400,
        category: 1,
        name: "Woman's Boot"
    },
    {
        id: "1f6fc",
        icon: "\uD83D\uDEFC",
        price: 230,
        category: 2,
        name: "Roller Skate"
    },
    {
        id: "1f97e",
        icon: "\uD83E\uDD7E",
        price: 210,
        category: 2,
        name: "Hiking Boot"
    },
    {
        id: "1f97f",
        icon: "\uD83E\uDD7F",
        price: 140,
        category: 0,
        name: "Flat Shoe"
    },
    {
        id: "1fa70",
        icon: "\uD83E\uDE70",
        price: 900,
        category: 2,
        name: "Ballet Shoes"
    },
    {
        id: "1fa74",
        icon: "\uD83E\uDE74",
        price: 12,
        category: 0,
        name: "Thong Sandal"
    },
    {
        id: "1f3bf",
        icon: "\uD83C\uDFBF",
        price: 1120,
        category: 2,
        name: "Ski Boots"
    },
    {
        id: "26f8",
        icon: "⛸",
        price: 1200,
        category: 2,
        name: "Ice Skate"
    }
];
const CATEGORIES = [
    "sale",
    "luxury",
    "sports"
];
async function getItems() {
    return items;
}
async function getItem(id) {
    return items.find((item)=>{
        return item.id === id;
    });
}
function displayCategory(id) {
    return CATEGORIES.at(id) || "N/A";
}
function toSize(num) {
    return `${num / 10 + 20}`;
}
function fromSize(size) {
    return (Number(size) - 20) * 10;
}
const addOrder = (order, state)=>{
    const index = state.findIndex(({ item , size  })=>{
        return order.item.id === item.id && order.size === size;
    });
    if (index > -1) {
        // increase quantity
        const current = state.at(index);
        const next = {
            ...order,
            quantity: order.quantity + current.quantity
        };
        return [
            next,
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ];
    }
    // append
    return [
        order,
        ...state
    ];
};
const removeOrder = (order, state)=>{
    return state.reduce((acc, o)=>{
        if (o.item.id === order.item.id && o.size === order.size) return acc;
        return [
            ...acc,
            o
        ];
    }, []);
};
const updateOrder = (order, state)=>{
    return state.reduce((acc, o)=>{
        if (order.item.id === o.item.id && order.size === o.size) {
            return [
                ...acc,
                order
            ];
        }
        return [
            ...acc,
            o
        ];
    }, []);
};


/***/ })

};
;