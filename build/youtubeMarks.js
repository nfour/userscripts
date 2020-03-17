// ==UserScript==
// @name        youtubeMarks
// @version     0.0.1
// @namespace   nfour
// @description Ability to mark videos to watch, queue etc.
// @include     *.youtube.com/*
// @author      nfour
// @license     MIT
// @homepageURL https://github.com/nfour/userscripts
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/youtubeHighlights/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cash-dom/dist/cash.esm.js":
/*!************************************************!*\
  !*** ./node_modules/cash-dom/dist/cash.esm.js ***!
  \************************************************/
/*! exports provided: default, Cash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cash", function() { return Cash; });
/* MIT https://github.com/kenwheeler/cash */
const propMap = {
    /* GENERAL */
    class: 'className',
    contenteditable: 'contentEditable',
    /* LABEL */
    for: 'htmlFor',
    /* INPUT */
    readonly: 'readOnly',
    maxlength: 'maxLength',
    tabindex: 'tabIndex',
    /* TABLE */
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    /* IMAGE */
    usemap: 'useMap'
};
function attempt(fn, arg) {
    try {
        return fn(arg);
    }
    catch (_a) {
        return arg;
    }
}
const doc = document, win = window, docEle = doc.documentElement, createElement = doc.createElement.bind(doc), div = createElement('div'), table = createElement('table'), tbody = createElement('tbody'), tr = createElement('tr'), { isArray, prototype: ArrayPrototype } = Array, { concat, filter, indexOf, map, push, slice, some, splice } = ArrayPrototype;
const idRe = /^#[\w-]*$/, classRe = /^\.[\w-]*$/, htmlRe = /<.+>/, tagRe = /^\w+$/;
// @require ./variables.ts
function find(selector, context) {
    return !selector || (!isDocument(context) && !isElement(context))
        ? []
        : classRe.test(selector)
            ? context.getElementsByClassName(selector.slice(1))
            : tagRe.test(selector)
                ? context.getElementsByTagName(selector)
                : context.querySelectorAll(selector);
}
// @require ./find.ts
// @require ./variables.ts
class Cash {
    constructor(selector, context) {
        if (!selector)
            return;
        if (isCash(selector))
            return selector;
        let eles = selector;
        if (isString(selector)) {
            const ctx = (isCash(context) ? context[0] : context) || doc;
            eles = idRe.test(selector)
                ? ctx.getElementById(selector.slice(1))
                : htmlRe.test(selector)
                    ? parseHTML(selector)
                    : find(selector, ctx);
            if (!eles)
                return;
        }
        else if (isFunction(selector)) {
            return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
        }
        if (eles.nodeType || eles === win)
            eles = [eles];
        this.length = eles.length;
        for (let i = 0, l = this.length; i < l; i++) {
            this[i] = eles[i];
        }
    }
    init(selector, context) {
        return new Cash(selector, context);
    }
}
const fn = Cash.prototype, cash = fn.init;
cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`
fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools
if (typeof Symbol === 'function') { // Ensuring a cash collection is iterable
    fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
}
fn.map = function (callback) {
    return cash(concat.apply([], map.call(this, (ele, i) => callback.call(ele, i, ele))));
};
fn.slice = function (start, end) {
    return cash(slice.call(this, start, end));
};
// @require ./cash.ts
const dashAlphaRe = /-([a-z])/g;
function camelCase(str) {
    return str.replace(dashAlphaRe, (match, letter) => letter.toUpperCase());
}
function each(arr, callback, _reverse) {
    if (_reverse) {
        let i = arr.length;
        while (i--) {
            if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
        }
    }
    else {
        for (let i = 0, l = arr.length; i < l; i++) {
            if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
        }
    }
    return arr;
}
cash.each = each;
fn.each = function (callback) {
    return each(this, callback);
};
fn.removeProp = function (prop) {
    return this.each((i, ele) => { delete ele[propMap[prop] || prop]; });
};
function extend(target, ...objs) {
    const length = arguments.length;
    if (!length)
        return {};
    if (length === 1)
        return extend(cash, target);
    for (let i = 1; i < length; i++) {
        for (const key in arguments[i]) {
            target[key] = arguments[i][key];
        }
    }
    return target;
}
cash.extend = extend;
fn.extend = function (plugins) {
    return extend(fn, plugins);
};
cash.guid = 1;
// @require ./cash.ts
function matches(ele, selector) {
    const matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
    return !!matches && !!selector && matches.call(ele, selector);
}
function isCash(x) {
    return x instanceof Cash;
}
function isWindow(x) {
    return !!x && x === x.window;
}
function isDocument(x) {
    return !!x && x.nodeType === 9;
}
function isElement(x) {
    return !!x && x.nodeType === 1;
}
function isFunction(x) {
    return typeof x === 'function';
}
function isString(x) {
    return typeof x === 'string';
}
function isUndefined(x) {
    return x === undefined;
}
function isNull(x) {
    return x === null;
}
function isNumeric(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}
cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isNumeric = isNumeric;
cash.isArray = isArray;
fn.prop = function (prop, value) {
    if (!prop)
        return;
    if (isString(prop)) {
        prop = propMap[prop] || prop;
        if (arguments.length < 2)
            return this[0] && this[0][prop];
        return this.each((i, ele) => { ele[prop] = value; });
    }
    for (const key in prop) {
        this.prop(key, prop[key]);
    }
    return this;
};
fn.get = function (index) {
    if (isUndefined(index))
        return slice.call(this);
    index = Number(index);
    return this[index < 0 ? index + this.length : index];
};
fn.eq = function (index) {
    return cash(this.get(index));
};
fn.first = function () {
    return this.eq(0);
};
fn.last = function () {
    return this.eq(-1);
};
// @require ./matches.ts
// @require ./type_checking.ts
function getCompareFunction(comparator) {
    return isString(comparator)
        ? (i, ele) => matches(ele, comparator)
        : isFunction(comparator)
            ? comparator
            : isCash(comparator)
                ? (i, ele) => comparator.is(ele)
                : !comparator
                    ? () => false
                    : (i, ele) => ele === comparator;
}
fn.filter = function (comparator) {
    const compare = getCompareFunction(comparator);
    return cash(filter.call(this, (ele, i) => compare.call(ele, i, ele)));
};
// @require collection/filter.ts
function filtered(collection, comparator) {
    return !comparator ? collection : collection.filter(comparator);
}
// @require ./type_checking.ts
const splitValuesRe = /\S+/g;
function getSplitValues(str) {
    return isString(str) ? str.match(splitValuesRe) || [] : [];
}
fn.hasClass = function (cls) {
    return !!cls && some.call(this, (ele) => isElement(ele) && ele.classList.contains(cls));
};
fn.removeAttr = function (attr) {
    const attrs = getSplitValues(attr);
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        each(attrs, (i, a) => {
            ele.removeAttribute(a);
        });
    });
};
function attr(attr, value) {
    if (!attr)
        return;
    if (isString(attr)) {
        if (arguments.length < 2) {
            if (!this[0] || !isElement(this[0]))
                return;
            const value = this[0].getAttribute(attr);
            return isNull(value) ? undefined : value;
        }
        if (isUndefined(value))
            return this;
        if (isNull(value))
            return this.removeAttr(attr);
        return this.each((i, ele) => {
            if (!isElement(ele))
                return;
            ele.setAttribute(attr, value);
        });
    }
    for (const key in attr) {
        this.attr(key, attr[key]);
    }
    return this;
}
fn.attr = attr;
fn.toggleClass = function (cls, force) {
    const classes = getSplitValues(cls), isForce = !isUndefined(force);
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        each(classes, (i, c) => {
            if (isForce) {
                force ? ele.classList.add(c) : ele.classList.remove(c);
            }
            else {
                ele.classList.toggle(c);
            }
        });
    });
};
fn.addClass = function (cls) {
    return this.toggleClass(cls, true);
};
fn.removeClass = function (cls) {
    if (arguments.length)
        return this.toggleClass(cls, false);
    return this.attr('class', '');
};
function pluck(arr, prop, deep, until) {
    const plucked = [], isCallback = isFunction(prop), compare = until && getCompareFunction(until);
    for (let i = 0, l = arr.length; i < l; i++) {
        if (isCallback) {
            const val = prop(arr[i]);
            if (val.length)
                push.apply(plucked, val);
        }
        else {
            let val = arr[i][prop];
            while (val != null) {
                if (until && compare(-1, val))
                    break;
                plucked.push(val);
                val = deep ? val[prop] : null;
            }
        }
    }
    return plucked;
}
function unique(arr) {
    return arr.length > 1 ? filter.call(arr, (item, index, self) => indexOf.call(self, item) === index) : arr;
}
cash.unique = unique;
fn.add = function (selector, context) {
    return cash(unique(this.get().concat(cash(selector, context).get())));
};
// @require core/type_checking.ts
// @require core/variables.ts
function computeStyle(ele, prop, isVariable) {
    if (!isElement(ele))
        return;
    const style = win.getComputedStyle(ele, null);
    return isVariable ? style.getPropertyValue(prop) || undefined : style[prop];
}
// @require ./compute_style.ts
function computeStyleInt(ele, prop) {
    return parseInt(computeStyle(ele, prop), 10) || 0;
}
const cssVariableRe = /^--/;
// @require ./variables.ts
function isCSSVariable(prop) {
    return cssVariableRe.test(prop);
}
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts
const prefixedProps = {}, { style } = div, vendorsPrefixes = ['webkit', 'moz', 'ms'];
function getPrefixedProp(prop, isVariable = isCSSVariable(prop)) {
    if (isVariable)
        return prop;
    if (!prefixedProps[prop]) {
        const propCC = camelCase(prop), propUC = `${propCC[0].toUpperCase()}${propCC.slice(1)}`, props = (`${propCC} ${vendorsPrefixes.join(`${propUC} `)}${propUC}`).split(' ');
        each(props, (i, p) => {
            if (p in style) {
                prefixedProps[prop] = p;
                return false;
            }
        });
    }
    return prefixedProps[prop];
}
;
// @require core/type_checking.ts
// @require ./is_css_variable.ts
const numericProps = {
    animationIterationCount: true,
    columnCount: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true
};
function getSuffixedValue(prop, value, isVariable = isCSSVariable(prop)) {
    return !isVariable && !numericProps[prop] && isNumeric(value) ? `${value}px` : value;
}
function css(prop, value) {
    if (isString(prop)) {
        const isVariable = isCSSVariable(prop);
        prop = getPrefixedProp(prop, isVariable);
        if (arguments.length < 2)
            return this[0] && computeStyle(this[0], prop, isVariable);
        if (!prop)
            return this;
        value = getSuffixedValue(prop, value, isVariable);
        return this.each((i, ele) => {
            if (!isElement(ele))
                return;
            if (isVariable) {
                ele.style.setProperty(prop, value);
            }
            else {
                ele.style[prop] = value;
            }
        });
    }
    for (const key in prop) {
        this.css(key, prop[key]);
    }
    return this;
}
;
fn.css = css;
// @optional ./css.ts
// @require core/attempt.ts
// @require core/camel_case.ts
const JSONStringRe = /^\s+|\s+$/;
function getData(ele, key) {
    const value = ele.dataset[key] || ele.dataset[camelCase(key)];
    if (JSONStringRe.test(value))
        return value;
    return attempt(JSON.parse, value);
}
// @require core/attempt.ts
// @require core/camel_case.ts
function setData(ele, key, value) {
    value = attempt(JSON.stringify, value);
    ele.dataset[camelCase(key)] = value;
}
function data(name, value) {
    if (!name) {
        if (!this[0])
            return;
        const datas = {};
        for (const key in this[0].dataset) {
            datas[key] = getData(this[0], key);
        }
        return datas;
    }
    if (isString(name)) {
        if (arguments.length < 2)
            return this[0] && getData(this[0], name);
        if (isUndefined(value))
            return this;
        return this.each((i, ele) => { setData(ele, name, value); });
    }
    for (const key in name) {
        this.data(key, name[key]);
    }
    return this;
}
fn.data = data;
// @optional ./data.ts
function getDocumentDimension(doc, dimension) {
    const docEle = doc.documentElement;
    return Math.max(doc.body[`scroll${dimension}`], docEle[`scroll${dimension}`], doc.body[`offset${dimension}`], docEle[`offset${dimension}`], docEle[`client${dimension}`]);
}
// @require css/helpers/compute_style_int.ts
function getExtraSpace(ele, xAxis) {
    return computeStyleInt(ele, `border${xAxis ? 'Left' : 'Top'}Width`) + computeStyleInt(ele, `padding${xAxis ? 'Left' : 'Top'}`) + computeStyleInt(ele, `padding${xAxis ? 'Right' : 'Bottom'}`) + computeStyleInt(ele, `border${xAxis ? 'Right' : 'Bottom'}Width`);
}
each([true, false], (i, outer) => {
    each(['Width', 'Height'], (i, prop) => {
        const name = `${outer ? 'outer' : 'inner'}${prop}`;
        fn[name] = function (includeMargins) {
            if (!this[0])
                return;
            if (isWindow(this[0]))
                return outer ? this[0][`inner${prop}`] : this[0].document.documentElement[`client${prop}`];
            if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
            return this[0][`${outer ? 'offset' : 'client'}${prop}`] + (includeMargins && outer ? computeStyleInt(this[0], `margin${i ? 'Top' : 'Left'}`) + computeStyleInt(this[0], `margin${i ? 'Bottom' : 'Right'}`) : 0);
        };
    });
});
each(['Width', 'Height'], (index, prop) => {
    const propLC = prop.toLowerCase();
    fn[propLC] = function (value) {
        if (!this[0])
            return isUndefined(value) ? undefined : this;
        if (!arguments.length) {
            if (isWindow(this[0]))
                return this[0].document.documentElement[`client${prop}`];
            if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
            return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
        }
        const valueNumber = parseInt(value, 10);
        return this.each((i, ele) => {
            if (!isElement(ele))
                return;
            const boxSizing = computeStyle(ele, 'boxSizing');
            ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
        });
    };
});
// @optional ./inner_outer.ts
// @optional ./normal.ts
// @require css/helpers/compute_style.ts
const defaultDisplay = {};
function getDefaultDisplay(tagName) {
    if (defaultDisplay[tagName])
        return defaultDisplay[tagName];
    const ele = createElement(tagName);
    doc.body.insertBefore(ele, null);
    const display = computeStyle(ele, 'display');
    doc.body.removeChild(ele);
    return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
}
// @require css/helpers/compute_style.ts
function isHidden(ele) {
    return computeStyle(ele, 'display') === 'none';
}
const displayProperty = '___cd';
fn.toggle = function (force) {
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        const show = isUndefined(force) ? isHidden(ele) : force;
        if (show) {
            ele.style.display = ele[displayProperty] || '';
            if (isHidden(ele)) {
                ele.style.display = getDefaultDisplay(ele.tagName);
            }
        }
        else {
            ele[displayProperty] = computeStyle(ele, 'display');
            ele.style.display = 'none';
        }
    });
};
fn.hide = function () {
    return this.toggle(false);
};
fn.show = function () {
    return this.toggle(true);
};
// @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts
function hasNamespaces(ns1, ns2) {
    return !ns2 || !some.call(ns2, (ns) => ns1.indexOf(ns) < 0);
}
const eventsNamespace = '___ce', eventsNamespacesSeparator = '.', eventsFocus = { focus: 'focusin', blur: 'focusout' }, eventsHover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }, eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
// @require ./variables.ts
function getEventNameBubbling(name) {
    return eventsHover[name] || eventsFocus[name] || name;
}
// @require ./variables.ts
function getEventsCache(ele) {
    return ele[eventsNamespace] = (ele[eventsNamespace] || {});
}
// @require core/guid.ts
// @require events/helpers/get_events_cache.ts
function addEvent(ele, name, namespaces, selector, callback) {
    const eventCache = getEventsCache(ele);
    eventCache[name] = (eventCache[name] || []);
    eventCache[name].push([namespaces, selector, callback]);
    ele.addEventListener(name, callback);
}
// @require ./variables.ts
function parseEventName(eventName) {
    const parts = eventName.split(eventsNamespacesSeparator);
    return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
}
// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts
function removeEvent(ele, name, namespaces, selector, callback) {
    const cache = getEventsCache(ele);
    if (!name) {
        for (name in cache) {
            removeEvent(ele, name, namespaces, selector, callback);
        }
    }
    else if (cache[name]) {
        cache[name] = cache[name].filter(([ns, sel, cb]) => {
            if ((callback && cb.guid !== callback.guid) || !hasNamespaces(ns, namespaces) || (selector && selector !== sel))
                return true;
            ele.removeEventListener(name, cb);
        });
    }
}
fn.off = function (eventFullName, selector, callback) {
    if (isUndefined(eventFullName)) {
        this.each((i, ele) => {
            if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
            removeEvent(ele);
        });
    }
    else if (!isString(eventFullName)) {
        for (const key in eventFullName) {
            this.off(key, eventFullName[key]);
        }
    }
    else {
        if (isFunction(selector)) {
            callback = selector;
            selector = '';
        }
        each(getSplitValues(eventFullName), (i, eventFullName) => {
            const [name, namespaces] = parseEventName(getEventNameBubbling(eventFullName));
            this.each((i, ele) => {
                if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                    return;
                removeEvent(ele, name, namespaces, selector, callback);
            });
        });
    }
    return this;
};
function on(eventFullName, selector, data, callback, _one) {
    if (!isString(eventFullName)) {
        for (const key in eventFullName) {
            this.on(key, selector, data, eventFullName[key], _one);
        }
        return this;
    }
    if (!isString(selector)) {
        if (isUndefined(selector) || isNull(selector)) {
            selector = '';
        }
        else if (isUndefined(data)) {
            data = selector;
            selector = '';
        }
        else {
            callback = data;
            data = selector;
            selector = '';
        }
    }
    if (!isFunction(callback)) {
        callback = data;
        data = undefined;
    }
    if (!callback)
        return this;
    each(getSplitValues(eventFullName), (i, eventFullName) => {
        const [name, namespaces] = parseEventName(getEventNameBubbling(eventFullName));
        if (!name)
            return;
        this.each((i, ele) => {
            if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
            const finalCallback = function (event) {
                if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator)))
                    return;
                let thisArg = ele;
                if (selector) {
                    let target = event.target;
                    while (!matches(target, selector)) {
                        if (target === ele)
                            return;
                        target = target.parentNode;
                        if (!target)
                            return;
                    }
                    thisArg = target;
                    event.___cd = true; // Delegate
                }
                if (event.___cd) {
                    Object.defineProperty(event, 'currentTarget', {
                        configurable: true,
                        get() {
                            return thisArg;
                        }
                    });
                }
                Object.defineProperty(event, 'data', {
                    configurable: true,
                    get() {
                        return data;
                    }
                });
                const returnValue = callback.call(thisArg, event, event.___td);
                if (_one) {
                    removeEvent(ele, name, namespaces, selector, finalCallback);
                }
                if (returnValue === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
            finalCallback.guid = callback.guid = (callback.guid || cash.guid++);
            addEvent(ele, name, namespaces, selector, finalCallback);
        });
    });
    return this;
}
fn.on = on;
function one(eventFullName, selector, data, callback) {
    return this.on(eventFullName, selector, data, callback, true);
}
;
fn.one = one;
fn.ready = function (callback) {
    const cb = () => setTimeout(callback, 0, cash);
    if (doc.readyState !== 'loading') {
        cb();
    }
    else {
        doc.addEventListener('DOMContentLoaded', cb);
    }
    return this;
};
fn.trigger = function (event, data) {
    if (isString(event)) {
        const [name, namespaces] = parseEventName(event);
        if (!name)
            return this;
        const type = eventsMouseRe.test(name) ? 'MouseEvents' : 'HTMLEvents';
        event = doc.createEvent(type);
        event.initEvent(name, true, true);
        event.namespace = namespaces.join(eventsNamespacesSeparator);
    }
    event.___td = data;
    const isEventFocus = (event.type in eventsFocus);
    return this.each((i, ele) => {
        if (isEventFocus && isFunction(ele[event.type])) {
            ele[event.type]();
        }
        else {
            ele.dispatchEvent(event);
        }
    });
};
// @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts
// @require core/pluck.ts
// @require core/variables.ts
function getValue(ele) {
    if (ele.multiple && ele.options)
        return pluck(filter.call(ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled), 'value');
    return ele.value || '';
}
const queryEncodeSpaceRe = /%20/g, queryEncodeCRLFRe = /\r?\n/g;
function queryEncode(prop, value) {
    return `&${encodeURIComponent(prop)}=${encodeURIComponent(value.replace(queryEncodeCRLFRe, '\r\n')).replace(queryEncodeSpaceRe, '+')}`;
}
const skippableRe = /file|reset|submit|button|image/i, checkableRe = /radio|checkbox/i;
fn.serialize = function () {
    let query = '';
    this.each((i, ele) => {
        each(ele.elements || [ele], (i, ele) => {
            if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || (checkableRe.test(ele.type) && !ele.checked))
                return;
            const value = getValue(ele);
            if (!isUndefined(value)) {
                const values = isArray(value) ? value : [value];
                each(values, (i, value) => {
                    query += queryEncode(ele.name, value);
                });
            }
        });
    });
    return query.slice(1);
};
function val(value) {
    if (!arguments.length)
        return this[0] && getValue(this[0]);
    return this.each((i, ele) => {
        const isSelect = ele.multiple && ele.options;
        if (isSelect || checkableRe.test(ele.type)) {
            const eleValue = isArray(value) ? map.call(value, String) : (isNull(value) ? [] : [String(value)]);
            if (isSelect) {
                each(ele.options, (i, option) => {
                    option.selected = eleValue.indexOf(option.value) >= 0;
                }, true);
            }
            else {
                ele.checked = eleValue.indexOf(ele.value) >= 0;
            }
        }
        else {
            ele.value = isUndefined(value) || isNull(value) ? '' : value;
        }
    });
}
fn.val = val;
fn.clone = function () {
    return this.map((i, ele) => ele.cloneNode(true));
};
fn.detach = function (comparator) {
    filtered(this, comparator).each((i, ele) => {
        if (ele.parentNode) {
            ele.parentNode.removeChild(ele);
        }
    });
    return this;
};
const fragmentRe = /^\s*<(\w+)[^>]*>/, singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
const containers = {
    '*': div,
    tr: tbody,
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table
};
//TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably
function parseHTML(html) {
    if (!isString(html))
        return [];
    if (singleTagRe.test(html))
        return [createElement(RegExp.$1)];
    const fragment = fragmentRe.test(html) && RegExp.$1, container = containers[fragment] || containers['*'];
    container.innerHTML = html;
    return cash(container.childNodes).detach().get();
}
cash.parseHTML = parseHTML;
fn.empty = function () {
    return this.each((i, ele) => {
        while (ele.firstChild) {
            ele.removeChild(ele.firstChild);
        }
    });
};
function html(html) {
    if (!arguments.length)
        return this[0] && this[0].innerHTML;
    if (isUndefined(html))
        return this;
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        ele.innerHTML = html;
    });
}
fn.html = html;
fn.remove = function (comparator) {
    filtered(this, comparator).detach().off();
    return this;
};
function text(text) {
    if (isUndefined(text))
        return this[0] ? this[0].textContent : '';
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        ele.textContent = text;
    });
}
;
fn.text = text;
fn.unwrap = function () {
    this.parent().each((i, ele) => {
        if (ele.tagName === 'BODY')
            return;
        const $ele = cash(ele);
        $ele.replaceWith($ele.children());
    });
    return this;
};
fn.offset = function () {
    const ele = this[0];
    if (!ele)
        return;
    const rect = ele.getBoundingClientRect();
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
};
fn.offsetParent = function () {
    return this.map((i, ele) => {
        let offsetParent = ele.offsetParent;
        while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docEle;
    });
};
fn.position = function () {
    const ele = this[0];
    if (!ele)
        return;
    const isFixed = (computeStyle(ele, 'position') === 'fixed'), offset = isFixed ? ele.getBoundingClientRect() : this.offset();
    if (!isFixed) {
        const doc = ele.ownerDocument;
        let offsetParent = ele.offsetParent || doc.documentElement;
        while ((offsetParent === doc.body || offsetParent === doc.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent !== ele && isElement(offsetParent)) {
            const parentOffset = cash(offsetParent).offset();
            offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
            offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
        }
    }
    return {
        top: offset.top - computeStyleInt(ele, 'marginTop'),
        left: offset.left - computeStyleInt(ele, 'marginLeft')
    };
};
fn.children = function (comparator) {
    return filtered(cash(unique(pluck(this, ele => ele.children))), comparator);
};
fn.contents = function () {
    return cash(unique(pluck(this, ele => ele.tagName === 'IFRAME' ? [ele.contentDocument] : (ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes))));
};
fn.find = function (selector) {
    return cash(unique(pluck(this, ele => find(selector, ele))));
};
// @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts
const HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, scriptTypeRe = /^$|^module$|\/(java|ecma)script/i, scriptAttributes = ['type', 'src', 'nonce', 'noModule'];
function evalScripts(node, doc) {
    const collection = cash(node);
    collection.filter('script').add(collection.find('script')).each((i, ele) => {
        if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) { // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support
            const script = createElement('script');
            script.text = ele.textContent.replace(HTMLCDATARe, '');
            each(scriptAttributes, (i, attr) => {
                if (ele[attr])
                    script[attr] = ele[attr];
            });
            doc.head.insertBefore(script, null);
            doc.head.removeChild(script);
        }
    });
}
// @require ./eval_scripts.ts
function insertElement(anchor, target, left, inside, evaluate) {
    if (inside) { // prepend/append
        anchor.insertBefore(target, left ? anchor.firstChild : null);
    }
    else { // before/after
        anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
    }
    if (evaluate) {
        evalScripts(target, anchor.ownerDocument);
    }
}
// @require ./insert_element.ts
function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
    each(selectors, (si, selector) => {
        each(cash(selector), (ti, target) => {
            each(cash(anchors), (ai, anchor) => {
                const anchorFinal = inverse ? target : anchor, targetFinal = inverse ? anchor : target, indexFinal = inverse ? ti : ai;
                insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
            }, reverseLoop3);
        }, reverseLoop2);
    }, reverseLoop1);
    return anchors;
}
fn.after = function () {
    return insertSelectors(arguments, this, false, false, false, true, true);
};
fn.append = function () {
    return insertSelectors(arguments, this, false, false, true);
};
fn.appendTo = function (selector) {
    return insertSelectors(arguments, this, true, false, true);
};
fn.before = function () {
    return insertSelectors(arguments, this, false, true);
};
fn.insertAfter = function (selector) {
    return insertSelectors(arguments, this, true, false, false, false, false, true);
};
fn.insertBefore = function (selector) {
    return insertSelectors(arguments, this, true, true);
};
fn.prepend = function () {
    return insertSelectors(arguments, this, false, true, true, true, true);
};
fn.prependTo = function (selector) {
    return insertSelectors(arguments, this, true, true, true, false, false, true);
};
fn.replaceWith = function (selector) {
    return this.before(selector).remove();
};
fn.replaceAll = function (selector) {
    cash(selector).replaceWith(this);
    return this;
};
fn.wrapAll = function (selector) {
    let structure = cash(selector), wrapper = structure[0];
    while (wrapper.children.length)
        wrapper = wrapper.firstElementChild;
    this.first().before(structure);
    return this.appendTo(wrapper);
};
fn.wrap = function (selector) {
    return this.each((i, ele) => {
        const wrapper = cash(selector)[0];
        cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
    });
};
fn.wrapInner = function (selector) {
    return this.each((i, ele) => {
        const $ele = cash(ele), contents = $ele.contents();
        contents.length ? contents.wrapAll(selector) : $ele.append(selector);
    });
};
fn.has = function (selector) {
    const comparator = isString(selector)
        ? (i, ele) => find(selector, ele).length
        : (i, ele) => ele.contains(selector);
    return this.filter(comparator);
};
fn.is = function (comparator) {
    const compare = getCompareFunction(comparator);
    return some.call(this, (ele, i) => compare.call(ele, i, ele));
};
fn.next = function (comparator, _all, _until) {
    return filtered(cash(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
};
fn.nextAll = function (comparator) {
    return this.next(comparator, true);
};
fn.nextUntil = function (until, comparator) {
    return this.next(comparator, true, until);
};
fn.not = function (comparator) {
    const compare = getCompareFunction(comparator);
    return this.filter((i, ele) => (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele));
};
fn.parent = function (comparator) {
    return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};
fn.index = function (selector) {
    const child = selector ? cash(selector)[0] : this[0], collection = selector ? this : cash(child).parent().children();
    return indexOf.call(collection, child);
};
fn.closest = function (comparator) {
    const filtered = this.filter(comparator);
    if (filtered.length)
        return filtered;
    const $parent = this.parent();
    if (!$parent.length)
        return filtered;
    return $parent.closest(comparator);
};
fn.parents = function (comparator, _until) {
    return filtered(cash(unique(pluck(this, 'parentElement', true, _until))), comparator);
};
fn.parentsUntil = function (until, comparator) {
    return this.parents(comparator, until);
};
fn.prev = function (comparator, _all, _until) {
    return filtered(cash(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
};
fn.prevAll = function (comparator) {
    return this.prev(comparator, true);
};
fn.prevUntil = function (until, comparator) {
    return this.prev(comparator, true, until);
};
fn.siblings = function (comparator) {
    return filtered(cash(unique(pluck(this, ele => cash(ele).parent().children().not(ele)))), comparator);
};
// @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./next_all.ts
// @optional ./next_until.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./parents_until.ts
// @optional ./prev.ts
// @optional ./prev_all.ts
// @optional ./prev_until.ts
// @optional ./siblings.ts
// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts
// @priority -100
// @require ./cash.ts
/* harmony default export */ __webpack_exports__["default"] = (cash);




/***/ }),

/***/ "./node_modules/diff-dom/src/TraceLogger.js":
/*!**************************************************!*\
  !*** ./node_modules/diff-dom/src/TraceLogger.js ***!
  \**************************************************/
/*! exports provided: TraceLogger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TraceLogger", function() { return TraceLogger; });
/**
 * Use TraceLogger to figure out function calls inside
 * JS objects by wrapping an object with a TraceLogger
 * instance.
 *
 * Pretty-prints the call trace (using unicode box code)
 * when tracelogger.toString() is called.
 */

/**
 * Wrap an object by calling new TraceLogger(obj)
 *
 * If you're familiar with Python decorators, this
 * does roughly the same thing, adding pre/post
 * call hook logging calls so that you can see
 * what's going on.
 */
class TraceLogger {
    constructor(obj = {}) {
        this.pad = "│   "
        this.padding = ""
        this.tick = 1
        this.messages = []
        const wrapkey = (obj, key) => {
            // trace this function
            const oldfn = obj[key]
            obj[key] = (...args) => {
                this.fin(key, Array.prototype.slice.call(args))
                const result = oldfn.apply(obj, args)
                this.fout(key, result)
                return result
            }
        }
        // can't use Object.keys for prototype walking
        for (let key in obj) {
            if (typeof obj[key] === "function") {
                wrapkey(obj, key)
            }
        }
        this.log("┌ TRACELOG START")
    }
    // called when entering a function
    fin(fn, args) {
        this.padding += this.pad
        this.log(`├─> entering ${fn}`, args)
    }
    // called when exiting a function
    fout(fn, result) {
        this.log("│<──┘ generated return value", result)
        this.padding = this.padding.substring(0, this.padding.length - this.pad.length)
    }
    // log message formatting
    format(s, tick) {
        let nf = function(t) {
            t = `${t}`
            while (t.length < 4) {
                t = `0${t}`
            }
            return t
        }
        return `${nf(tick)}> ${this.padding}${s}`
    }
    // log a trace message
    log() {
        let s = Array.prototype.slice.call(arguments)
        const stringCollapse = function(v) {
            if (!v) {
                return "<falsey>"
            }
            if (typeof v === "string") {
                return v
            }
            if (v instanceof HTMLElement) {
                return v.outerHTML || "<empty>"
            }
            if (v instanceof Array) {
                return `[${v.map(stringCollapse).join(",")}]`
            }
            return v.toString() || v.valueOf() || "<unknown>"
        }
        s = s.map(stringCollapse).join(", ")
        this.messages.push(this.format(s, this.tick++))
    }
    // turn the log into a structured string with
    // unicode box codes to make it a sensible trace.
    toString() {
        let cap = "×   "
        let terminator = "└───"
        while (terminator.length <= this.padding.length + this.pad.length) {
            terminator += cap
        }
        let _ = this.padding
        this.padding = ""
        terminator = this.format(terminator, this.tick)
        this.padding = _
        return `${this.messages.join("\n")}\n${terminator}`
    }
}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/dom/apply.js":
/*!********************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/dom/apply.js ***!
  \********************************************************/
/*! exports provided: applyDiff, applyDOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyDiff", function() { return applyDiff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyDOM", function() { return applyDOM; });
/* harmony import */ var _fromVirtual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromVirtual */ "./node_modules/diff-dom/src/diffDOM/dom/fromVirtual.js");


// ===== Apply a diff =====

function getFromRoute(node, route) {
    route = route.slice()
    while (route.length > 0) {
        if (!node.childNodes) {
            return false
        }
        const c = route.splice(0, 1)[0]
        node = node.childNodes[c]
    }
    return node
}

function applyDiff(
        tree,
        diff,
        options // {preDiffApply, postDiffApply, textDiff, valueDiffing, _const}
    ) {
    let node = getFromRoute(tree, diff[options._const.route])
    let newNode
    let reference
    let route
    let nodeArray
    let c

    // pre-diff hook
    const info = {
        diff,
        node
    }

    if (options.preDiffApply(info)) {
        return true
    }

    switch (diff[options._const.action]) {
        case options._const.addAttribute:
            if (!node || !node.setAttribute) {
                return false
            }
            node.setAttribute(diff[options._const.name], diff[options._const.value])
            break
        case options._const.modifyAttribute:
            if (!node || !node.setAttribute) {
                return false
            }
            node.setAttribute(diff[options._const.name], diff[options._const.newValue])
            if (node.nodeName === 'INPUT' && diff[options._const.name] === 'value') {
                node.value = diff[options._const.newValue]
            }
            break
        case options._const.removeAttribute:
            if (!node || !node.removeAttribute) {
                return false
            }
            node.removeAttribute(diff[options._const.name])
            break
        case options._const.modifyTextElement:
            if (!node || node.nodeType !== 3) {
                return false
            }
            options.textDiff(node, node.data, diff[options._const.oldValue], diff[options._const.newValue])
            break
        case options._const.modifyValue:
            if (!node || typeof node.value === 'undefined') {
                return false
            }
            node.value = diff[options._const.newValue]
            break
        case options._const.modifyComment:
            if (!node || typeof node.data === 'undefined') {
                return false
            }
            options.textDiff(node, node.data, diff[options._const.oldValue], diff[options._const.newValue])
            break
        case options._const.modifyChecked:
            if (!node || typeof node.checked === 'undefined') {
                return false
            }
            node.checked = diff[options._const.newValue]
            break
        case options._const.modifySelected:
            if (!node || typeof node.selected === 'undefined') {
                return false
            }
            node.selected = diff[options._const.newValue]
            break
        case options._const.replaceElement:
            node.parentNode.replaceChild(
                Object(_fromVirtual__WEBPACK_IMPORTED_MODULE_0__["objToNode"])(
                    diff[options._const.newValue],
                    node.namespaceURI === 'http://www.w3.org/2000/svg',
                    options
                ),
                node
            )
            break
        case options._const.relocateGroup:
            nodeArray = Array(...new Array(diff.groupLength)).map(() => node.removeChild(node.childNodes[diff[options._const.from]]))
            nodeArray.forEach((childNode, index) => {
                if (index === 0) {
                    reference = node.childNodes[diff[options._const.to]]
                }
                node.insertBefore(childNode, reference || null)
            })
            break
        case options._const.removeElement:
            node.parentNode.removeChild(node)
            break
        case options._const.addElement:
            route = diff[options._const.route].slice()
            c = route.splice(route.length - 1, 1)[0]
            node = getFromRoute(tree, route)
            node.insertBefore(
                Object(_fromVirtual__WEBPACK_IMPORTED_MODULE_0__["objToNode"])(
                    diff[options._const.element],
                    node.namespaceURI === 'http://www.w3.org/2000/svg',
                    options
                ),
                node.childNodes[c] || null
            )
            break
        case options._const.removeTextElement:
            if (!node || node.nodeType !== 3) {
                return false
            }
            node.parentNode.removeChild(node)
            break
        case options._const.addTextElement:
            route = diff[options._const.route].slice()
            c = route.splice(route.length - 1, 1)[0]
            newNode = options.document.createTextNode(diff[options._const.value])
            node = getFromRoute(tree, route)
            if (!node || !node.childNodes) {
                return false
            }
            node.insertBefore(newNode, node.childNodes[c] || null)
            break
        default:
            console.log('unknown action')
    }

    // if a new node was created, we might be interested in its
    // post diff hook
    info.newNode = newNode
    options.postDiffApply(info)

    return true
}

function applyDOM(tree, diffs, options) {
    return diffs.every(diff => applyDiff(tree, diff, options))
}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/dom/fromVirtual.js":
/*!**************************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/dom/fromVirtual.js ***!
  \**************************************************************/
/*! exports provided: objToNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objToNode", function() { return objToNode; });
function objToNode(objNode, insideSvg, options) {
    let node
    if (objNode.nodeName === '#text') {
        node = options.document.createTextNode(objNode.data)

    } else if (objNode.nodeName === '#comment') {
        node = options.document.createComment(objNode.data)
    } else {
        if (objNode.nodeName === 'svg' || insideSvg) {
            node = options.document.createElementNS('http://www.w3.org/2000/svg', objNode.nodeName)
            insideSvg = true
        } else {
            node = options.document.createElement(objNode.nodeName)
        }
        if (objNode.attributes) {
            Object.entries(objNode.attributes).forEach(([key, value]) => node.setAttribute(key, value))
        }
        if (objNode.childNodes) {
            objNode.childNodes.forEach(childNode => node.appendChild(objToNode(childNode, insideSvg, options)))
        }
        if (options.valueDiffing) {
            if (objNode.value) {
                node.value = objNode.value
            }
            if (objNode.checked) {
                node.checked = objNode.checked
            }
            if (objNode.selected) {
                node.selected = objNode.selected
            }
        }
    }
    return node
}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/dom/index.js":
/*!********************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/dom/index.js ***!
  \********************************************************/
/*! exports provided: applyDOM, undoDOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apply__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apply */ "./node_modules/diff-dom/src/diffDOM/dom/apply.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyDOM", function() { return _apply__WEBPACK_IMPORTED_MODULE_0__["applyDOM"]; });

/* harmony import */ var _undo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./undo */ "./node_modules/diff-dom/src/diffDOM/dom/undo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "undoDOM", function() { return _undo__WEBPACK_IMPORTED_MODULE_1__["undoDOM"]; });





/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/dom/undo.js":
/*!*******************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/dom/undo.js ***!
  \*******************************************************/
/*! exports provided: undoDOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "undoDOM", function() { return undoDOM; });
/* harmony import */ var _apply__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apply */ "./node_modules/diff-dom/src/diffDOM/dom/apply.js");


// ===== Undo a diff =====

function swap(obj, p1, p2) {
    const tmp = obj[p1]
    obj[p1] = obj[p2]
    obj[p2] = tmp
}

function undoDiff(
    tree,
    diff,
    options // {preDiffApply, postDiffApply, textDiff, valueDiffing, _const}
) {

    switch (diff[options._const.action]) {
        case options._const.addAttribute:
            diff[options._const.action] = options._const.removeAttribute
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.modifyAttribute:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.removeAttribute:
            diff[options._const.action] = options._const.addAttribute
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.modifyTextElement:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.modifyValue:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.modifyComment:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.modifyChecked:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.modifySelected:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.replaceElement:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.relocateGroup:
            swap(diff, options._const.from, options._const.to)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.removeElement:
            diff[options._const.action] = options._const.addElement
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.addElement:
            diff[options._const.action] = options._const.removeElement
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.removeTextElement:
            diff[options._const.action] = options._const.addTextElement
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        case options._const.addTextElement:
            diff[options._const.action] = options._const.removeTextElement
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__["applyDiff"])(tree, diff, options)
            break
        default:
            console.log('unknown action')
    }

}

function undoDOM(tree, diffs, options) {
    if (!diffs.length) {
        diffs = [diffs]
    }
    diffs = diffs.slice()
    diffs.reverse()
    diffs.forEach(diff => {
        undoDiff(tree, diff, options)
    })
}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/index.js":
/*!****************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/index.js ***!
  \****************************************************/
/*! exports provided: nodeToObj, stringToObj, DiffDOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiffDOM", function() { return DiffDOM; });
/* harmony import */ var _dom_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/index */ "./node_modules/diff-dom/src/diffDOM/dom/index.js");
/* harmony import */ var _virtual_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./virtual/index */ "./node_modules/diff-dom/src/diffDOM/virtual/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeToObj", function() { return _virtual_index__WEBPACK_IMPORTED_MODULE_1__["nodeToObj"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToObj", function() { return _virtual_index__WEBPACK_IMPORTED_MODULE_1__["stringToObj"]; });





const DEFAULT_OPTIONS = {
    debug: false,
    diffcap: 10, // Limit for how many diffs are accepting when debugging. Inactive when debug is false.
    maxDepth: false, // False or a numeral. If set to a numeral, limits the level of depth that the the diff mechanism looks for differences. If false, goes through the entire tree.
    maxChildCount: 50, // False or a numeral. If set to a numeral, only does a simplified form of diffing of contents so that the number of diffs cannot be higher than the number of child nodes.
    valueDiffing: true, // Whether to take into consideration the values of forms that differ from auto assigned values (when a user fills out a form).
    // syntax: textDiff: function (node, currentValue, expectedValue, newValue)
    textDiff(node, currentValue, expectedValue, newValue) {
        node.data = newValue
        return
    },
    // empty functions were benchmarked as running faster than both
    // `f && f()` and `if (f) { f(); }`
    preVirtualDiffApply() {},
    postVirtualDiffApply() {},
    preDiffApply() {},
    postDiffApply() {},
    filterOuterDiff: null,
    compress: false, // Whether to work with compressed diffs
    _const: false, // object with strings for every change types to be used in diffs.
    document: window && window.document ? window.document : false
}


class DiffDOM {
    constructor(options = {}) {

        this.options = options
        // IE11 doesn't have Object.assign and buble doesn't translate object spreaders
        // by default, so this is the safest way of doing it currently.
        Object.entries(DEFAULT_OPTIONS).forEach(([key, value]) => {
            if (!Object.prototype.hasOwnProperty.call(this.options, key)) {
                this.options[key] = value
            }
        })

        if (!this.options._const) {
            const varNames = ["addAttribute", "modifyAttribute", "removeAttribute",
                "modifyTextElement", "relocateGroup", "removeElement", "addElement",
                "removeTextElement", "addTextElement", "replaceElement", "modifyValue",
                "modifyChecked", "modifySelected", "modifyComment", "action", "route",
                "oldValue", "newValue", "element", "group", "from", "to", "name",
                "value", "data", "attributes", "nodeName", "childNodes", "checked",
                "selected"
            ]
            this.options._const = {}
            if (this.options.compress) {
                varNames.forEach((varName, index) => this.options._const[varName] = index)
            } else {
                varNames.forEach(varName => this.options._const[varName] = varName)
            }
        }

        this.DiffFinder = _virtual_index__WEBPACK_IMPORTED_MODULE_1__["DiffFinder"]

    }

    apply(tree, diffs) {
        return Object(_dom_index__WEBPACK_IMPORTED_MODULE_0__["applyDOM"])(tree, diffs, this.options)
    }

    undo(tree, diffs) {
        return Object(_dom_index__WEBPACK_IMPORTED_MODULE_0__["undoDOM"])(tree, diffs, this.options)
    }

    diff(t1Node, t2Node) {
        const finder = new this.DiffFinder(t1Node, t2Node, this.options)
        return finder.init()
    }

}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/virtual/apply.js":
/*!************************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/virtual/apply.js ***!
  \************************************************************/
/*! exports provided: applyVirtual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyVirtual", function() { return applyVirtual; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/diff-dom/src/diffDOM/virtual/helpers.js");


// ===== Apply a virtual diff =====

function getFromVirtualRoute(tree, route) {
    let node = tree
    let parentNode
    let nodeIndex

    route = route.slice()
    while (route.length > 0) {
        if (!node.childNodes) {
            return false
        }
        nodeIndex = route.splice(0, 1)[0]
        parentNode = node
        node = node.childNodes[nodeIndex]
    }
    return {
        node,
        parentNode,
        nodeIndex
    }
}

function applyVirtualDiff(
        tree,
        diff,
        options // {preDiffApply, postDiffApply, _const}
    ) {
    const routeInfo = getFromVirtualRoute(tree, diff[options._const.route])
    let node = routeInfo.node
    const parentNode = routeInfo.parentNode
    const nodeIndex = routeInfo.nodeIndex
    const newSubsets = []

    // pre-diff hook
    const info = {
        diff,
        node
    }

    if (options.preDiffApply(info)) {
        return true
    }

    let newNode
    let nodeArray
    let route
    let c
    switch (diff[options._const.action]) {
        case options._const.addAttribute:
            if (!node.attributes) {
                node.attributes = {}
            }

            node.attributes[diff[options._const.name]] = diff[options._const.value]

            if (diff[options._const.name] === 'checked') {
                node.checked = true
            } else if (diff[options._const.name] === 'selected') {
                node.selected = true
            } else if (node.nodeName === 'INPUT' && diff[options._const.name] === 'value') {
                node.value = diff[options._const.value]
            }

            break
        case options._const.modifyAttribute:
            node.attributes[diff[options._const.name]] = diff[options._const.newValue]
            break
        case options._const.removeAttribute:

            delete node.attributes[diff[options._const.name]]

            if (Object.keys(node.attributes).length === 0) {
                delete node.attributes
            }

            if (diff[options._const.name] === 'checked') {
                node.checked = false
            } else if (diff[options._const.name] === 'selected') {
                delete node.selected
            } else if (node.nodeName === 'INPUT' && diff[options._const.name] === 'value') {
                delete node.value
            }

            break
        case options._const.modifyTextElement:
            node.data = diff[options._const.newValue]
            break
        case options._const.modifyValue:
            node.value = diff[options._const.newValue]
            break
        case options._const.modifyComment:
            node.data = diff[options._const.newValue]
            break
        case options._const.modifyChecked:
            node.checked = diff[options._const.newValue]
            break
        case options._const.modifySelected:
            node.selected = diff[options._const.newValue]
            break
        case options._const.replaceElement:
            newNode = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(diff[options._const.newValue])
            newNode.outerDone = true
            newNode.innerDone = true
            newNode.valueDone = true
            parentNode.childNodes[nodeIndex] = newNode
            break
        case options._const.relocateGroup:
            nodeArray = node.childNodes.splice(diff[options._const.from], diff.groupLength).reverse()
            nodeArray.forEach(movedNode => node.childNodes.splice(diff[options._const.to], 0, movedNode))
            if (node.subsets) {
                node.subsets.forEach(map => {
                    if (diff[options._const.from] < diff[options._const.to] && map.oldValue <= diff[options._const.to] && map.oldValue > diff[options._const.from]) {
                        map.oldValue -= diff.groupLength
                        const splitLength = map.oldValue + map.length - diff[options._const.to]
                        if (splitLength > 0) {
                            // new insertion splits map.
                            newSubsets.push({
                                oldValue: diff[options._const.to] + diff.groupLength,
                                newValue: map.newValue + map.length - splitLength,
                                length: splitLength
                            })
                            map.length -= splitLength
                        }
                    } else if (diff[options._const.from] > diff[options._const.to] && map.oldValue > diff[options._const.to] && map.oldValue < diff[options._const.from]) {
                        map.oldValue += diff.groupLength
                        const splitLength = map.oldValue + map.length - diff[options._const.to]
                        if (splitLength > 0) {
                            // new insertion splits map.
                            newSubsets.push({
                                oldValue: diff[options._const.to] + diff.groupLength,
                                newValue: map.newValue + map.length - splitLength,
                                length: splitLength
                            })
                            map.length -= splitLength
                        }
                    } else if (map.oldValue === diff[options._const.from]) {
                        map.oldValue = diff[options._const.to]
                    }
                })
            }

            break
        case options._const.removeElement:
            parentNode.childNodes.splice(nodeIndex, 1)
            if (parentNode.subsets) {
                parentNode.subsets.forEach(map => {
                    if (map.oldValue > nodeIndex) {
                        map.oldValue -= 1
                    } else if (map.oldValue === nodeIndex) {
                        map.delete = true
                    } else if (map.oldValue < nodeIndex && (map.oldValue + map.length) > nodeIndex) {
                        if (map.oldValue + map.length - 1 === nodeIndex) {
                            map.length--
                        } else {
                            newSubsets.push({
                                newValue: map.newValue + nodeIndex - map.oldValue,
                                oldValue: nodeIndex,
                                length: map.length - nodeIndex + map.oldValue - 1
                            })
                            map.length = nodeIndex - map.oldValue
                        }
                    }
                })
            }
            node = parentNode
            break
        case options._const.addElement:
            route = diff[options._const.route].slice()
            c = route.splice(route.length - 1, 1)[0]
            node = getFromVirtualRoute(tree, route).node
            newNode = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(diff[options._const.element])
            newNode.outerDone = true
            newNode.innerDone = true
            newNode.valueDone = true

            if (!node.childNodes) {
                node.childNodes = []
            }

            if (c >= node.childNodes.length) {
                node.childNodes.push(newNode)
            } else {
                node.childNodes.splice(c, 0, newNode)
            }
            if (node.subsets) {
                node.subsets.forEach(map => {
                    if (map.oldValue >= c) {
                        map.oldValue += 1
                    } else if (map.oldValue < c && (map.oldValue + map.length) > c) {
                        const splitLength = map.oldValue + map.length - c
                        newSubsets.push({
                            newValue: map.newValue + map.length - splitLength,
                            oldValue: c + 1,
                            length: splitLength
                        })
                        map.length -= splitLength
                    }
                })
            }
            break
        case options._const.removeTextElement:
            parentNode.childNodes.splice(nodeIndex, 1)
            if (parentNode.nodeName === 'TEXTAREA') {
                delete parentNode.value
            }
            if (parentNode.subsets) {
                parentNode.subsets.forEach(map => {
                    if (map.oldValue > nodeIndex) {
                        map.oldValue -= 1
                    } else if (map.oldValue === nodeIndex) {
                        map.delete = true
                    } else if (map.oldValue < nodeIndex && (map.oldValue + map.length) > nodeIndex) {
                        if (map.oldValue + map.length - 1 === nodeIndex) {
                            map.length--
                        } else {
                            newSubsets.push({
                                newValue: map.newValue + nodeIndex - map.oldValue,
                                oldValue: nodeIndex,
                                length: map.length - nodeIndex + map.oldValue - 1
                            })
                            map.length = nodeIndex - map.oldValue
                        }
                    }
                })
            }
            node = parentNode
            break
        case options._const.addTextElement:
            route = diff[options._const.route].slice()
            c = route.splice(route.length - 1, 1)[0]
            newNode = {}
            newNode.nodeName = '#text'
            newNode.data = diff[options._const.value]
            node = getFromVirtualRoute(tree, route).node
            if (!node.childNodes) {
                node.childNodes = []
            }

            if (c >= node.childNodes.length) {
                node.childNodes.push(newNode)
            } else {
                node.childNodes.splice(c, 0, newNode)
            }
            if (node.nodeName === 'TEXTAREA') {
                node.value = diff[options._const.newValue]
            }
            if (node.subsets) {
                node.subsets.forEach(map => {
                    if (map.oldValue >= c) {
                        map.oldValue += 1
                    }
                    if (map.oldValue < c && (map.oldValue + map.length) > c) {
                        const splitLength = map.oldValue + map.length - c
                        newSubsets.push({
                            newValue: map.newValue + map.length - splitLength,
                            oldValue: c + 1,
                            length: splitLength
                        })
                        map.length -= splitLength
                    }
                })
            }
            break
        default:
            console.log('unknown action')
    }

    if (node.subsets) {
        node.subsets = node.subsets.filter(map => !map.delete && map.oldValue !== map.newValue)
        if (newSubsets.length) {
            node.subsets = node.subsets.concat(newSubsets)
        }
    }

    // capture newNode for the callback
    info.newNode = newNode
    options.postDiffApply(info)

    return
}

function applyVirtual(tree, diffs, options) {
    diffs.forEach(diff => {
        applyVirtualDiff(tree, diff, options)
    })
    return true
}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/virtual/diff.js":
/*!***********************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/virtual/diff.js ***!
  \***********************************************************/
/*! exports provided: DiffFinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiffFinder", function() { return DiffFinder; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/diff-dom/src/diffDOM/virtual/helpers.js");
/* harmony import */ var _apply__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apply */ "./node_modules/diff-dom/src/diffDOM/virtual/apply.js");
/* harmony import */ var _fromDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fromDOM */ "./node_modules/diff-dom/src/diffDOM/virtual/fromDOM.js");
/* harmony import */ var _fromString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fromString */ "./node_modules/diff-dom/src/diffDOM/virtual/fromString.js");





// ===== Create a diff =====

class DiffFinder {
    constructor(t1Node, t2Node, options) {
        this.options = options
        this.t1 = (t1Node instanceof HTMLElement) ? Object(_fromDOM__WEBPACK_IMPORTED_MODULE_2__["nodeToObj"])(t1Node, this.options) : (typeof t1Node === 'string') ? Object(_fromString__WEBPACK_IMPORTED_MODULE_3__["stringToObj"])(t1Node, this.options) : JSON.parse(JSON.stringify(t1Node))
        this.t2 = (t2Node instanceof HTMLElement) ? Object(_fromDOM__WEBPACK_IMPORTED_MODULE_2__["nodeToObj"])(t2Node, this.options) : (typeof t2Node === 'string') ? Object(_fromString__WEBPACK_IMPORTED_MODULE_3__["stringToObj"])(t2Node, this.options) : JSON.parse(JSON.stringify(t2Node))
        this.diffcount = 0
        this.foundAll = false
        if (this.debug) {
            this.t1Orig = Object(_fromDOM__WEBPACK_IMPORTED_MODULE_2__["nodeToObj"])(t1Node, this.options)
            this.t2Orig = Object(_fromDOM__WEBPACK_IMPORTED_MODULE_2__["nodeToObj"])(t2Node, this.options)
        }

        this.tracker = new _helpers__WEBPACK_IMPORTED_MODULE_0__["DiffTracker"]()
    }

    init() {
        return this.findDiffs(this.t1, this.t2)
    }

    findDiffs(t1, t2) {
        let diffs
        do {
            if (this.options.debug) {
                this.diffcount += 1
                if (this.diffcount > this.options.diffcap) {
                    window.diffError = [this.t1Orig, this.t2Orig]
                    throw new Error(`surpassed diffcap:${JSON.stringify(this.t1Orig)} -> ${JSON.stringify(this.t2Orig)}`)
                }
            }
            diffs = this.findNextDiff(t1, t2, [])

            if (diffs.length === 0) {
                // Last check if the elements really are the same now.
                // If not, remove all info about being done and start over.
                // Sometimes a node can be marked as done, but the creation of subsequent diffs means that it has to be changed again.
                if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["isEqual"])(t1, t2)) {
                    if (this.foundAll) {
                        console.error('Could not find remaining diffs!')
                    } else {
                        this.foundAll = true
                        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeDone"])(t1)
                        diffs = this.findNextDiff(t1, t2, [])
                    }
                }
            }
            if (diffs.length > 0) {
                this.foundAll = false
                this.tracker.add(diffs)
                Object(_apply__WEBPACK_IMPORTED_MODULE_1__["applyVirtual"])(t1, diffs, this.options)
            }
        } while (diffs.length > 0)

        return this.tracker.list
    }

    findNextDiff(t1, t2, route) {
        let diffs
        let fdiffs

        if (this.options.maxDepth && route.length > this.options.maxDepth) {
            return []
        }
        // outer differences?
        if (!t1.outerDone) {
            diffs = this.findOuterDiff(t1, t2, route)
            if (this.options.filterOuterDiff) {
                fdiffs = this.options.filterOuterDiff(t1, t2, diffs)
                if (fdiffs) diffs = fdiffs
            }
            if (diffs.length > 0) {
                t1.outerDone = true
                return diffs
            } else {
                t1.outerDone = true
            }
        }
        // inner differences?
        if (!t1.innerDone) {
            diffs = this.findInnerDiff(t1, t2, route)
            if (diffs.length > 0) {
                return diffs
            } else {
                t1.innerDone = true
            }
        }

        if (this.options.valueDiffing && !t1.valueDone) {
            // value differences?
            diffs = this.findValueDiff(t1, t2, route)

            if (diffs.length > 0) {
                t1.valueDone = true
                return diffs
            } else {
                t1.valueDone = true
            }
        }

        // no differences
        return []
    }

    findOuterDiff(t1, t2, route) {
        const diffs = []
        let attr
        let attr1
        let attr2
        let attrLength
        let pos
        let i
        if (t1.nodeName !== t2.nodeName) {
            if (!route.length) {
                throw new Error('Top level nodes have to be of the same kind.')
            }
            return [new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                .setValue(this.options._const.action, this.options._const.replaceElement)
                .setValue(this.options._const.oldValue, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(t1))
                .setValue(this.options._const.newValue, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(t2))
                .setValue(this.options._const.route, route)
            ]
        }
        if (route.length && this.options.maxNodeDiffCount < Math.abs((t1.childNodes || []).length - (t2.childNodes || []).length)) {
            return [new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                .setValue(this.options._const.action, this.options._const.replaceElement)
                .setValue(this.options._const.oldValue, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(t1))
                .setValue(this.options._const.newValue, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(t2))
                .setValue(this.options._const.route, route)
            ]
        }

        if (t1.data !== t2.data) {
            // Comment or text node.
            if (t1.nodeName === '#text') {
                return [new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                    .setValue(this.options._const.action, this.options._const.modifyTextElement)
                    .setValue(this.options._const.route, route)
                    .setValue(this.options._const.oldValue, t1.data)
                    .setValue(this.options._const.newValue, t2.data)
                ]
            } else {
                return [new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                    .setValue(this.options._const.action, this.options._const.modifyComment)
                    .setValue(this.options._const.route, route)
                    .setValue(this.options._const.oldValue, t1.data)
                    .setValue(this.options._const.newValue, t2.data)
                ]
            }

        }

        attr1 = t1.attributes ? Object.keys(t1.attributes).sort() : []
        attr2 = t2.attributes ? Object.keys(t2.attributes).sort() : []

        attrLength = attr1.length
        for (i = 0; i < attrLength; i++) {
            attr = attr1[i]
            pos = attr2.indexOf(attr)
            if (pos === -1) {
                diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                    .setValue(this.options._const.action, this.options._const.removeAttribute)
                    .setValue(this.options._const.route, route)
                    .setValue(this.options._const.name, attr)
                    .setValue(this.options._const.value, t1.attributes[attr])
                )
            } else {
                attr2.splice(pos, 1)
                if (t1.attributes[attr] !== t2.attributes[attr]) {
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                        .setValue(this.options._const.action, this.options._const.modifyAttribute)
                        .setValue(this.options._const.route, route)
                        .setValue(this.options._const.name, attr)
                        .setValue(this.options._const.oldValue, t1.attributes[attr])
                        .setValue(this.options._const.newValue, t2.attributes[attr])
                    )
                }
            }
        }

        attrLength = attr2.length
        for (i = 0; i < attrLength; i++) {
            attr = attr2[i]
            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                .setValue(this.options._const.action, this.options._const.addAttribute)
                .setValue(this.options._const.route, route)
                .setValue(this.options._const.name, attr)
                .setValue(this.options._const.value, t2.attributes[attr])
            )
        }

        return diffs
    }

    findInnerDiff(t1, t2, route) {
        const t1ChildNodes = t1.childNodes ? t1.childNodes.slice() : []
        const t2ChildNodes = t2.childNodes ? t2.childNodes.slice() : []
        const last = Math.max(t1ChildNodes.length, t2ChildNodes.length)
        let childNodesLengthDifference = Math.abs(t1ChildNodes.length - t2ChildNodes.length)
        let diffs = []
        let index = 0
        if (!this.options.maxChildCount || last < this.options.maxChildCount) {
            const subtrees = t1.subsets && t1.subsetsAge-- ? t1.subsets : (t1.childNodes && t2.childNodes) ? Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["markSubTrees"])(t1, t2) : []

            if (subtrees.length > 0) {
                /* One or more groups have been identified among the childnodes of t1
                 * and t2.
                 */
                diffs = this.attemptGroupRelocation(t1, t2, subtrees, route)
                if (diffs.length > 0) {
                    return diffs
                }
            }
        }


        /* 0 or 1 groups of similar child nodes have been found
         * for t1 and t2. 1 If there is 1, it could be a sign that the
         * contents are the same. When the number of groups is below 2,
         * t1 and t2 are made to have the same length and each of the
         * pairs of child nodes are diffed.
         */

        for (let i = 0; i < last; i += 1) {
            const e1 = t1ChildNodes[i]
            const e2 = t2ChildNodes[i]

            if (childNodesLengthDifference) {
                /* t1 and t2 have different amounts of childNodes. Add
                 * and remove as necessary to obtain the same length */
                if (e1 && !e2) {
                    if (e1.nodeName === '#text') {
                        diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                            .setValue(this.options._const.action, this.options._const.removeTextElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.value, e1.data)
                        )
                        index -= 1
                    } else {
                        diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                            .setValue(this.options._const.action, this.options._const.removeElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.element, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(e1))
                        )
                        index -= 1
                    }

                } else if (e2 && !e1) {
                    if (e2.nodeName === '#text') {
                        diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                            .setValue(this.options._const.action, this.options._const.addTextElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.value, e2.data)
                        )
                    } else {
                        diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                            .setValue(this.options._const.action, this.options._const.addElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.element, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(e2))
                        )
                    }
                }
            }
            /* We are now guaranteed that childNodes e1 and e2 exist,
             * and that they can be diffed.
             */
            /* Diffs in child nodes should not affect the parent node,
             * so we let these diffs be submitted together with other
             * diffs.
             */

            if (e1 && e2) {
                if (!this.options.maxChildCount || last < this.options.maxChildCount) {
                    diffs = diffs.concat(this.findNextDiff(e1, e2, route.concat(index)))
                } else if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["isEqual"])(e1, e2)) {
                    if (t1ChildNodes.length > t2ChildNodes.length) {
                        diffs = diffs.concat([
                            new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                                .setValue(this.options._const.action, this.options._const.removeElement)
                                .setValue(this.options._const.element, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(e1))
                                .setValue(this.options._const.route, route.concat(index))
                        ])
                        t1ChildNodes.splice(i, 1)
                        index -= 1
                        childNodesLengthDifference -= 1
                    } else if (t1ChildNodes.length < t2ChildNodes.length) {
                        diffs = diffs.concat([
                            new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                                .setValue(this.options._const.action, this.options._const.addElement)
                                .setValue(this.options._const.element, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(e2))
                                .setValue(this.options._const.route, route.concat(index))
                        ])
                        t1ChildNodes.splice(i, 0, {})
                        childNodesLengthDifference -= 1
                    } else {
                        diffs = diffs.concat([
                            new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                                .setValue(this.options._const.action, this.options._const.replaceElement)
                                .setValue(this.options._const.oldValue, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(e1))
                                .setValue(this.options._const.newValue, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(e2))
                                .setValue(this.options._const.route, route.concat(index))
                        ])
                    }

                }

            }
            index += 1

        }
        t1.innerDone = true
        return diffs
    }

    attemptGroupRelocation(t1, t2, subtrees, route) {
        /* Either t1.childNodes and t2.childNodes have the same length, or
         * there are at least two groups of similar elements can be found.
         * attempts are made at equalizing t1 with t2. First all initial
         * elements with no group affiliation (gaps=true) are removed (if
         * only in t1) or added (if only in t2). Then the creation of a group
         * relocation diff is attempted.
         */
        const gapInformation = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getGapInformation"])(t1, t2, subtrees)
        const gaps1 = gapInformation.gaps1
        const gaps2 = gapInformation.gaps2
        let shortest = Math.min(gaps1.length, gaps2.length)
        let destinationDifferent
        let toGroup
        let group
        let node
        let similarNode
        let testI
        const diffs = []


        for (let index2 = 0, index1 = 0; index2 < shortest; index1 += 1, index2 += 1) {
            if (gaps1[index2] === true) {
                node = t1.childNodes[index1]
                if (node.nodeName === '#text') {
                    if (t2.childNodes[index2].nodeName === '#text' && node.data !== t2.childNodes[index2].data) {
                        testI = index1
                        while (t1.childNodes.length > testI + 1 && t1.childNodes[testI + 1].nodeName === '#text') {
                            testI += 1
                            if (t2.childNodes[index2].data === t1.childNodes[testI].data) {
                                similarNode = true
                                break
                            }
                        }
                        if (!similarNode) {
                            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                                .setValue(this.options._const.action, this.options._const.modifyTextElement)
                                .setValue(this.options._const.route, route.concat(index2))
                                .setValue(this.options._const.oldValue, node.data)
                                .setValue(this.options._const.newValue, t2.childNodes[index2].data)
                            )
                            return diffs
                        }
                    }
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                        .setValue(this.options._const.action, this.options._const.removeTextElement)
                        .setValue(this.options._const.route, route.concat(index2))
                        .setValue(this.options._const.value, node.data)
                    )
                    gaps1.splice(index2, 1)
                    shortest = Math.min(gaps1.length, gaps2.length)
                    index2 -= 1
                } else {
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                        .setValue(this.options._const.action, this.options._const.removeElement)
                        .setValue(this.options._const.route, route.concat(index2))
                        .setValue(this.options._const.element, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(node))
                    )
                    gaps1.splice(index2, 1)
                    shortest = Math.min(gaps1.length, gaps2.length)
                    index2 -= 1
                }

            } else if (gaps2[index2] === true) {
                node = t2.childNodes[index2]
                if (node.nodeName === '#text') {
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                        .setValue(this.options._const.action, this.options._const.addTextElement)
                        .setValue(this.options._const.route, route.concat(index2))
                        .setValue(this.options._const.value, node.data)
                    )
                    gaps1.splice(index2, 0, true)
                    shortest = Math.min(gaps1.length, gaps2.length)
                    index1 -= 1
                } else {
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                        .setValue(this.options._const.action, this.options._const.addElement)
                        .setValue(this.options._const.route, route.concat(index2))
                        .setValue(this.options._const.element, Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["cloneObj"])(node))
                    )
                    gaps1.splice(index2, 0, true)
                    shortest = Math.min(gaps1.length, gaps2.length)
                    index1 -= 1
                }

            } else if (gaps1[index2] !== gaps2[index2]) {
                if (diffs.length > 0) {
                    return diffs
                }
                // group relocation
                group = subtrees[gaps1[index2]]
                toGroup = Math.min(group.newValue, (t1.childNodes.length - group.length))
                if (toGroup !== group.oldValue) {
                    // Check whether destination nodes are different than originating ones.
                    destinationDifferent = false
                    for (let j = 0; j < group.length; j += 1) {
                        if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["roughlyEqual"])(t1.childNodes[toGroup + j], t1.childNodes[group.oldValue + j], [], false, true)) {
                            destinationDifferent = true
                        }
                    }
                    if (destinationDifferent) {
                        return [new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                            .setValue(this.options._const.action, this.options._const.relocateGroup)
                            .setValue('groupLength', group.length)
                            .setValue(this.options._const.from, group.oldValue)
                            .setValue(this.options._const.to, toGroup)
                            .setValue(this.options._const.route, route)
                        ]
                    }
                }
            }
        }
        return diffs
    }

    findValueDiff(t1, t2, route) {
        // Differences of value. Only useful if the value/selection/checked value
        // differs from what is represented in the DOM. For example in the case
        // of filled out forms, etc.
        const diffs = []

        if (t1.selected !== t2.selected) {
            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                .setValue(this.options._const.action, this.options._const.modifySelected)
                .setValue(this.options._const.oldValue, t1.selected)
                .setValue(this.options._const.newValue, t2.selected)
                .setValue(this.options._const.route, route)
            )
        }

        if ((t1.value || t2.value) && t1.value !== t2.value && t1.nodeName !== 'OPTION') {
            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                .setValue(this.options._const.action, this.options._const.modifyValue)
                .setValue(this.options._const.oldValue, t1.value || "")
                .setValue(this.options._const.newValue, t2.value || "")
                .setValue(this.options._const.route, route)
            )
        }
        if (t1.checked !== t2.checked) {
            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__["Diff"]()
                .setValue(this.options._const.action, this.options._const.modifyChecked)
                .setValue(this.options._const.oldValue, t1.checked)
                .setValue(this.options._const.newValue, t2.checked)
                .setValue(this.options._const.route, route)
            )
        }

        return diffs
    }

}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/virtual/fromDOM.js":
/*!**************************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/virtual/fromDOM.js ***!
  \**************************************************************/
/*! exports provided: nodeToObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeToObj", function() { return nodeToObj; });
function nodeToObj(aNode, options = {}) {
    const objNode = {}
    objNode.nodeName = aNode.nodeName
    if (objNode.nodeName === '#text' || objNode.nodeName === '#comment') {
        objNode.data = aNode.data
    } else {
        if (aNode.attributes && aNode.attributes.length > 0) {
            objNode.attributes = {}
            const nodeArray = Array.prototype.slice.call(aNode.attributes)
            nodeArray.forEach(attribute => objNode.attributes[attribute.name] = attribute.value)
        }
        if (objNode.nodeName === 'TEXTAREA') {
            objNode.value = aNode.value
        } else if (aNode.childNodes && aNode.childNodes.length > 0) {
            objNode.childNodes = []
            const nodeArray = Array.prototype.slice.call(aNode.childNodes)
            nodeArray.forEach(childNode => objNode.childNodes.push(nodeToObj(childNode, options)))
        }
        if (options.valueDiffing) {
            if (aNode.checked !== undefined && aNode.type && ['radio', 'checkbox'].includes(aNode.type.toLowerCase())) {
                objNode.checked = aNode.checked
            } else if (aNode.value !== undefined) {
                objNode.value = aNode.value
            }
            if (aNode.selected !== undefined) {
                objNode.selected = aNode.selected
            }
        }
    }
    return objNode
}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/virtual/fromString.js":
/*!*****************************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/virtual/fromString.js ***!
  \*****************************************************************/
/*! exports provided: stringToObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToObj", function() { return stringToObj; });
// from html-parse-stringify (MIT)

const tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
// re-used obj for quick lookups of components
const empty = Object.create ? Object.create(null) : {}
const attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g


function unescape(string) {
    return string.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
.replace(/&amp;/g, '&')
}

// create optimized lookup object for
// void elements as listed here:
// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
const lookup = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuItem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
}


function parseTag(tag) {
    const res = {
        nodeName: '',
        attributes: {}
    }

    let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/)
    if (tagMatch) {
        res.nodeName = tagMatch[1].toUpperCase()
        if (lookup[tagMatch[1].toLowerCase()] || tag.charAt(tag.length - 2) === '/') res.voidElement = true

    }

    let reg = new RegExp(attrRE)
    let result = null
    let done = false
    while (!done) {
        result = reg.exec(tag)

        if (result === null) {
            done = true
        } else if (result[0].trim()) {
            if (result[1]) {
                let attr = result[1].trim()
                let arr = [attr, ""]

                if (attr.indexOf("=") > -1) arr = attr.split("=")

                res.attributes[arr[0]] = arr[1]
                reg.lastIndex--
            } else if (result[2]) res.attributes[result[2]] = result[3].trim().substring(1, result[3].length - 1)
        }
    }

    return res
}

function parse(
    html,
    options = {components: empty}
) {
    const result = []
    let current
    let level = -1
    const arr = []
    const byTag = {}
    let inComponent = false

    html.replace(tagRE, (tag, index) => {
        if (inComponent) {
            if (tag !== (`</${current.nodeName}>`)) {
                return
            } else {
                inComponent = false
            }
        }
        const isOpen = tag.charAt(1) !== '/'
        const start = index + tag.length
        const nextChar = html.charAt(start)
        let parent

        if (isOpen) {
            level++

            current = parseTag(tag)
            if (current.type === 'tag' && options.components[current.nodeName]) {
                current.type = 'component'
                inComponent = true
            }

            if (!current.voidElement && !inComponent && nextChar && nextChar !== '<') {
                if (!current.childNodes) {
                    current.childNodes = []
                }
                current.childNodes.push({
                    nodeName: '#text',
                    data: unescape(html.slice(start, html.indexOf('<', start)))
                })
            }

            byTag[current.tagName] = current

            // if we're at root, push new base node
            if (level === 0) {
                result.push(current)
            }

            parent = arr[level - 1]

            if (parent) {
                if (!parent.childNodes) {
                    parent.childNodes = []
                }
                parent.childNodes.push(current)
            }

            arr[level] = current
        }

        if (!isOpen || current.voidElement) {
            level--
            if (!inComponent && nextChar !== '<' && nextChar) {
                // trailing text node
                // if we're at the root, push a base text node. otherwise add as
                // a child to the current node.
                parent = level === -1 ? result : arr[level].childNodes || []

                // calculate correct end of the data slice in case there's
                // no tag after the text node.
                const end = html.indexOf('<', start)
                const data = unescape(html.slice(start, end === -1 ? undefined : end))
                parent.push({
                    nodeName: '#text',
                    data
                })
            }
        }
    })

    return result[0]
}

function cleanObj(obj) {
    delete obj.voidElement
    if (obj.childNodes) {
        obj.childNodes.forEach(child => cleanObj(child))
    }
    return obj
}

function stringToObj(string) {
    return cleanObj(parse(string))
}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/virtual/helpers.js":
/*!**************************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/virtual/helpers.js ***!
  \**************************************************************/
/*! exports provided: Diff, removeDone, isEqual, roughlyEqual, cloneObj, getGapInformation, markSubTrees, DiffTracker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Diff", function() { return Diff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDone", function() { return removeDone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEqual", function() { return isEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roughlyEqual", function() { return roughlyEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneObj", function() { return cloneObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGapInformation", function() { return getGapInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markSubTrees", function() { return markSubTrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiffTracker", function() { return DiffTracker; });
class Diff {
    constructor(options = {}) {
        Object.entries(options).forEach(([key, value]) => this[key] = value)
    }

    toString() {
        return JSON.stringify(this)
    }

    setValue(aKey, aValue) {
        this[aKey] = aValue
        return this
    }
}

function elementDescriptors(el) {
    const output = []
    if (el.nodeName !== '#text' && el.nodeName !== '#comment') {
        output.push(el.nodeName)
        if (el.attributes) {
            if (el.attributes['class']) {
                output.push(`${el.nodeName}.${el.attributes['class'].replace(/ /g, '.')}`)
            }
            if (el.attributes.id) {
                output.push(`${el.nodeName}#${el.attributes.id}`)
            }
        }

    }
    return output
}

function findUniqueDescriptors(li) {
    const uniqueDescriptors = {}
    const duplicateDescriptors = {}

    li.forEach(node => {
        elementDescriptors(node).forEach(descriptor => {
            const inUnique = descriptor in uniqueDescriptors
            const inDupes = descriptor in duplicateDescriptors
            if (!inUnique && !inDupes) {
                uniqueDescriptors[descriptor] = true
            } else if (inUnique) {
                delete uniqueDescriptors[descriptor]
                duplicateDescriptors[descriptor] = true
            }
        })
    })

    return uniqueDescriptors
}

function uniqueInBoth(l1, l2) {
    const l1Unique = findUniqueDescriptors(l1)
    const l2Unique = findUniqueDescriptors(l2)
    const inBoth = {}

    Object.keys(l1Unique).forEach(key => {
        if (l2Unique[key]) {
            inBoth[key] = true
        }
    })

    return inBoth
}

function removeDone(tree) {
    delete tree.outerDone
    delete tree.innerDone
    delete tree.valueDone
    if (tree.childNodes) {
        return tree.childNodes.every(removeDone)
    } else {
        return true
    }
}

function isEqual(e1, e2) {
    if (!['nodeName', 'value', 'checked', 'selected', 'data'].every(element => {
            if (e1[element] !== e2[element]) {
                return false
            }
            return true
        })) {
        return false
    }

    if (Boolean(e1.attributes) !== Boolean(e2.attributes)) {
        return false
    }

    if (Boolean(e1.childNodes) !== Boolean(e2.childNodes)) {
        return false
    }
    if (e1.attributes) {
        const e1Attributes = Object.keys(e1.attributes)
        const e2Attributes = Object.keys(e2.attributes)

        if (e1Attributes.length !== e2Attributes.length) {
            return false
        }
        if (!e1Attributes.every(attribute => {
                if (e1.attributes[attribute] !== e2.attributes[attribute]) {
                    return false
                }
                return true
            })) {
            return false
        }
    }
    if (e1.childNodes) {
        if (e1.childNodes.length !== e2.childNodes.length) {
            return false
        }
        if (!e1.childNodes.every((childNode, index) => isEqual(childNode, e2.childNodes[index]))) {

            return false
        }

    }

    return true
}


function roughlyEqual(e1, e2, uniqueDescriptors, sameSiblings, preventRecursion) {

    if (!e1 || !e2) {
        return false
    }

    if (e1.nodeName !== e2.nodeName) {
        return false
    }

    if (e1.nodeName === '#text') {
        // Note that we initially don't care what the text content of a node is,
        // the mere fact that it's the same tag and "has text" means it's roughly
        // equal, and then we can find out the true text difference later.
        return preventRecursion ? true : e1.data === e2.data
    }


    if (e1.nodeName in uniqueDescriptors) {
        return true
    }

    if (e1.attributes && e2.attributes) {

        if (e1.attributes.id) {
            if (e1.attributes.id !== e2.attributes.id) {
                return false
            } else {
                const idDescriptor = `${e1.nodeName}#${e1.attributes.id}`
                if (idDescriptor in uniqueDescriptors) {
                    return true
                }
            }
        }
        if (e1.attributes['class'] && e1.attributes['class'] === e2.attributes['class']) {
            const classDescriptor = `${e1.nodeName}.${e1.attributes['class'].replace(/ /g, '.')}`
            if (classDescriptor in uniqueDescriptors) {
                return true
            }
        }
    }

    if (sameSiblings) {
        return true
    }

    const nodeList1 = e1.childNodes ? e1.childNodes.slice().reverse() : []
    const nodeList2 = e2.childNodes ? e2.childNodes.slice().reverse() : []

    if (nodeList1.length !== nodeList2.length) {
        return false
    }

    if (preventRecursion) {
        return nodeList1.every((element, index) => element.nodeName === nodeList2[index].nodeName)
    } else {
        // note: we only allow one level of recursion at any depth. If 'preventRecursion'
        // was not set, we must explicitly force it to true for child iterations.
        const childUniqueDescriptors = uniqueInBoth(nodeList1, nodeList2)
        return nodeList1.every((element, index) => roughlyEqual(element, nodeList2[index], childUniqueDescriptors, true, true))
    }
}


function cloneObj(obj) { //  TODO: Do we really need to clone here? Is it not enough to just return the original object?
    return JSON.parse(JSON.stringify(obj))
}
/**
 * based on https://en.wikibooks.org/wiki/Algorithm_implementation/Strings/Longest_common_substring#JavaScript
 */
function findCommonSubsets(c1, c2, marked1, marked2) {
    let lcsSize = 0
    let index = []
    const c1Length = c1.length
    const c2Length = c2.length

    const // set up the matching table
        matches = Array(...new Array(c1Length + 1)).map(() => [])

    const uniqueDescriptors = uniqueInBoth(c1, c2)

    let // If all of the elements are the same tag, id and class, then we can
        // consider them roughly the same even if they have a different number of
        // children. This will reduce removing and re-adding similar elements.
        subsetsSame = c1Length === c2Length

    if (subsetsSame) {

        c1.some((element, i) => {
            const c1Desc = elementDescriptors(element)
            const c2Desc = elementDescriptors(c2[i])
            if (c1Desc.length !== c2Desc.length) {
                subsetsSame = false
                return true
            }
            c1Desc.some((description, i) => {
                if (description !== c2Desc[i]) {
                    subsetsSame = false
                    return true
                }
            })
            if (!subsetsSame) {
                return true
            }
        })
    }

    // fill the matches with distance values
    for (let c1Index = 0; c1Index < c1Length; c1Index++) {
        const c1Element = c1[c1Index]
        for (let c2Index = 0; c2Index < c2Length; c2Index++) {
            const c2Element = c2[c2Index]
            if (!marked1[c1Index] && !marked2[c2Index] && roughlyEqual(c1Element, c2Element, uniqueDescriptors, subsetsSame)) {
                matches[c1Index + 1][c2Index + 1] = (matches[c1Index][c2Index] ? matches[c1Index][c2Index] + 1 : 1)
                if (matches[c1Index + 1][c2Index + 1] >= lcsSize) {
                    lcsSize = matches[c1Index + 1][c2Index + 1]
                    index = [c1Index + 1, c2Index + 1]
                }
            } else {
                matches[c1Index + 1][c2Index + 1] = 0
            }
        }
    }

    if (lcsSize === 0) {
        return false
    }

    return {
        oldValue: index[0] - lcsSize,
        newValue: index[1] - lcsSize,
        length: lcsSize
    }
}

/**
 * This should really be a predefined function in Array...
 */
function makeArray(n, v) {
    return Array(...new Array(n)).map(() => v)
}

/**
 * Generate arrays that indicate which node belongs to which subset,
 * or whether it's actually an orphan node, existing in only one
 * of the two trees, rather than somewhere in both.
 *
 * So if t1 = <img><canvas><br>, t2 = <canvas><br><img>.
 * The longest subset is "<canvas><br>" (length 2), so it will group 0.
 * The second longest is "<img>" (length 1), so it will be group 1.
 * gaps1 will therefore be [1,0,0] and gaps2 [0,0,1].
 *
 * If an element is not part of any group, it will stay being 'true', which
 * is the initial value. For example:
 * t1 = <img><p></p><br><canvas>, t2 = <b></b><br><canvas><img>
 *
 * The "<p></p>" and "<b></b>" do only show up in one of the two and will
 * therefore be marked by "true". The remaining parts are parts of the
 * groups 0 and 1:
 * gaps1 = [1, true, 0, 0], gaps2 = [true, 0, 0, 1]
 *
 */
function getGapInformation(t1, t2, stable) {
    const gaps1 = t1.childNodes ? makeArray(t1.childNodes.length, true) : []
    const gaps2 = t2.childNodes ? makeArray(t2.childNodes.length, true) : []
    let group = 0

    // give elements from the same subset the same group number
    stable.forEach(subset => {
        const endOld = subset.oldValue + subset.length
        const endNew = subset.newValue + subset.length

        for (let j = subset.oldValue; j < endOld; j += 1) {
            gaps1[j] = group
        }
        for (let j = subset.newValue; j < endNew; j += 1) {
            gaps2[j] = group
        }
        group += 1
    })

    return {
        gaps1,
        gaps2
    }
}

/**
 * Find all matching subsets, based on immediate child differences only.
 */
function markSubTrees(oldTree, newTree) {
    // note: the child lists are views, and so update as we update old/newTree
    const oldChildren = oldTree.childNodes ? oldTree.childNodes : []

    const newChildren = newTree.childNodes ? newTree.childNodes : []
    const marked1 = makeArray(oldChildren.length, false)
    const marked2 = makeArray(newChildren.length, false)
    const subsets = []
    let subset = true

    const returnIndex = function() {
        return arguments[1]
    }

    const markBoth = i => {
        marked1[subset.oldValue + i] = true
        marked2[subset.newValue + i] = true
    }

    while (subset) {
        subset = findCommonSubsets(oldChildren, newChildren, marked1, marked2)
        if (subset) {
            subsets.push(subset)
            const subsetArray = Array(...new Array(subset.length)).map(returnIndex)
            subsetArray.forEach(item => markBoth(item))
        }
    }

    oldTree.subsets = subsets
    oldTree.subsetsAge = 100
    return subsets
}

class DiffTracker {
    constructor() {
        this.list = []
    }

    add(diffs) {
        this.list.push(...diffs)
    }
    forEach(fn) {
        this.list.forEach(li => fn(li))
    }

}


/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/virtual/index.js":
/*!************************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/virtual/index.js ***!
  \************************************************************/
/*! exports provided: DiffFinder, nodeToObj, stringToObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diff */ "./node_modules/diff-dom/src/diffDOM/virtual/diff.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DiffFinder", function() { return _diff__WEBPACK_IMPORTED_MODULE_0__["DiffFinder"]; });

/* harmony import */ var _fromDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fromDOM */ "./node_modules/diff-dom/src/diffDOM/virtual/fromDOM.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeToObj", function() { return _fromDOM__WEBPACK_IMPORTED_MODULE_1__["nodeToObj"]; });

/* harmony import */ var _fromString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fromString */ "./node_modules/diff-dom/src/diffDOM/virtual/fromString.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToObj", function() { return _fromString__WEBPACK_IMPORTED_MODULE_2__["stringToObj"]; });






/***/ }),

/***/ "./node_modules/diff-dom/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/diff-dom/src/index.js ***!
  \********************************************/
/*! exports provided: DiffDOM, nodeToObj, stringToObj, TraceLogger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _diffDOM_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diffDOM/index */ "./node_modules/diff-dom/src/diffDOM/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DiffDOM", function() { return _diffDOM_index__WEBPACK_IMPORTED_MODULE_0__["DiffDOM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeToObj", function() { return _diffDOM_index__WEBPACK_IMPORTED_MODULE_0__["nodeToObj"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToObj", function() { return _diffDOM_index__WEBPACK_IMPORTED_MODULE_0__["stringToObj"]; });

/* harmony import */ var _TraceLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TraceLogger */ "./node_modules/diff-dom/src/TraceLogger.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TraceLogger", function() { return _TraceLogger__WEBPACK_IMPORTED_MODULE_1__["TraceLogger"]; });





/***/ }),

/***/ "./src/youtubeHighlights/constants.ts":
/*!********************************************!*\
  !*** ./src/youtubeHighlights/constants.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECTORS = {
    thumbnail: 'ytd-thumbnail',
};
exports.CLASSES = {
    highlightButton: 'highlightButton',
    isHighlighted: 'isHighlighted',
    dimButton: 'dimButton',
    isDimmed: 'isDimmed',
};


/***/ }),

/***/ "./src/youtubeHighlights/index.ts":
/*!****************************************!*\
  !*** ./src/youtubeHighlights/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cash_dom_1 = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.esm.js");
const diff_dom_1 = __webpack_require__(/*! diff-dom */ "./node_modules/diff-dom/src/index.js");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/youtubeHighlights/constants.ts");
console.log('YTHL INIT', { $: cash_dom_1.default, nodeToObj: diff_dom_1.nodeToObj });
void (() => __awaiter(this, void 0, void 0, function* () {
    cash_dom_1.default(() => {
        console.log('YTHL dom ready');
        const tnel = cash_dom_1.default(constants_1.SELECTORS.thumbnail).get()[0];
        console.log('node', diff_dom_1.nodeToObj(tnel));
    });
}))();


/***/ })

/******/ });