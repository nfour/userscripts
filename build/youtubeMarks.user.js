// ==UserScript==
// @name        youtubeMarks
// @version     0.0.1-35af6ef3ac78b17e087c
// @namespace   nfour
// @description Ability to mark videos to watch, queue etc.
// @include     *.youtube.com/*
// @author      nfour
// @license     MIT
// @homepageURL https://github.com/nfour/userscripts
// @updateURL   http://localhost:9002/youtubeMarks.dev.user.js
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/cash-dom/dist/cash.esm.js":
/*!************************************************!*\
  !*** ./node_modules/cash-dom/dist/cash.esm.js ***!
  \************************************************/
/*! namespace exports */
/*! export Cash [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export default [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "Cash": () => /* binding */ Cash
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cash);




/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_exports__ */
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/diff-dom/src/TraceLogger.js":
/*!**************************************************!*\
  !*** ./node_modules/diff-dom/src/TraceLogger.js ***!
  \**************************************************/
/*! namespace exports */
/*! export TraceLogger [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TraceLogger": () => /* binding */ TraceLogger
/* harmony export */ });
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
/*! namespace exports */
/*! export applyDOM [provided] [used] [could be renamed] */
/*! export applyDiff [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyDiff": () => /* binding */ applyDiff,
/* harmony export */   "applyDOM": () => /* binding */ applyDOM
/* harmony export */ });
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
                (0,_fromVirtual__WEBPACK_IMPORTED_MODULE_0__.objToNode)(
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
                (0,_fromVirtual__WEBPACK_IMPORTED_MODULE_0__.objToNode)(
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
/*! namespace exports */
/*! export objToNode [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "objToNode": () => /* binding */ objToNode
/* harmony export */ });
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
/*! namespace exports */
/*! export applyDOM [provided] [used] [could be renamed] */
/*! export undoDOM [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyDOM": () => /* reexport safe */ _apply__WEBPACK_IMPORTED_MODULE_0__.applyDOM,
/* harmony export */   "undoDOM": () => /* reexport safe */ _undo__WEBPACK_IMPORTED_MODULE_1__.undoDOM
/* harmony export */ });
/* harmony import */ var _apply__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apply */ "./node_modules/diff-dom/src/diffDOM/dom/apply.js");
/* harmony import */ var _undo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./undo */ "./node_modules/diff-dom/src/diffDOM/dom/undo.js");




/***/ }),

/***/ "./node_modules/diff-dom/src/diffDOM/dom/undo.js":
/*!*******************************************************!*\
  !*** ./node_modules/diff-dom/src/diffDOM/dom/undo.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export undoDOM [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "undoDOM": () => /* binding */ undoDOM
/* harmony export */ });
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
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.modifyAttribute:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.removeAttribute:
            diff[options._const.action] = options._const.addAttribute
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.modifyTextElement:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.modifyValue:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.modifyComment:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.modifyChecked:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.modifySelected:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.replaceElement:
            swap(diff, options._const.oldValue, options._const.newValue)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.relocateGroup:
            swap(diff, options._const.from, options._const.to)
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.removeElement:
            diff[options._const.action] = options._const.addElement
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.addElement:
            diff[options._const.action] = options._const.removeElement
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.removeTextElement:
            diff[options._const.action] = options._const.addTextElement
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
            break
        case options._const.addTextElement:
            diff[options._const.action] = options._const.removeTextElement
            Object(_apply__WEBPACK_IMPORTED_MODULE_0__.applyDiff)(tree, diff, options)
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
/*! namespace exports */
/*! export DiffDOM [provided] [used] [could be renamed] */
/*! export nodeToObj [provided] [used] [could be renamed] */
/*! export stringToObj [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nodeToObj": () => /* reexport safe */ _virtual_index__WEBPACK_IMPORTED_MODULE_1__.nodeToObj,
/* harmony export */   "stringToObj": () => /* reexport safe */ _virtual_index__WEBPACK_IMPORTED_MODULE_1__.stringToObj,
/* harmony export */   "DiffDOM": () => /* binding */ DiffDOM
/* harmony export */ });
/* harmony import */ var _dom_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/index */ "./node_modules/diff-dom/src/diffDOM/dom/index.js");
/* harmony import */ var _virtual_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./virtual/index */ "./node_modules/diff-dom/src/diffDOM/virtual/index.js");




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

        this.DiffFinder = _virtual_index__WEBPACK_IMPORTED_MODULE_1__.DiffFinder

    }

    apply(tree, diffs) {
        return (0,_dom_index__WEBPACK_IMPORTED_MODULE_0__.applyDOM)(tree, diffs, this.options)
    }

    undo(tree, diffs) {
        return (0,_dom_index__WEBPACK_IMPORTED_MODULE_0__.undoDOM)(tree, diffs, this.options)
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
/*! namespace exports */
/*! export applyVirtual [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyVirtual": () => /* binding */ applyVirtual
/* harmony export */ });
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
            newNode = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(diff[options._const.newValue])
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
            newNode = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(diff[options._const.element])
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
/*! namespace exports */
/*! export DiffFinder [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiffFinder": () => /* binding */ DiffFinder
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/diff-dom/src/diffDOM/virtual/helpers.js");
/* harmony import */ var _apply__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apply */ "./node_modules/diff-dom/src/diffDOM/virtual/apply.js");
/* harmony import */ var _fromDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fromDOM */ "./node_modules/diff-dom/src/diffDOM/virtual/fromDOM.js");
/* harmony import */ var _fromString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fromString */ "./node_modules/diff-dom/src/diffDOM/virtual/fromString.js");





// ===== Create a diff =====

class DiffFinder {
    constructor(t1Node, t2Node, options) {
        this.options = options
        this.t1 = (t1Node instanceof HTMLElement) ? (0,_fromDOM__WEBPACK_IMPORTED_MODULE_2__.nodeToObj)(t1Node, this.options) : (typeof t1Node === 'string') ? (0,_fromString__WEBPACK_IMPORTED_MODULE_3__.stringToObj)(t1Node, this.options) : JSON.parse(JSON.stringify(t1Node))
        this.t2 = (t2Node instanceof HTMLElement) ? (0,_fromDOM__WEBPACK_IMPORTED_MODULE_2__.nodeToObj)(t2Node, this.options) : (typeof t2Node === 'string') ? (0,_fromString__WEBPACK_IMPORTED_MODULE_3__.stringToObj)(t2Node, this.options) : JSON.parse(JSON.stringify(t2Node))
        this.diffcount = 0
        this.foundAll = false
        if (this.debug) {
            this.t1Orig = (0,_fromDOM__WEBPACK_IMPORTED_MODULE_2__.nodeToObj)(t1Node, this.options)
            this.t2Orig = (0,_fromDOM__WEBPACK_IMPORTED_MODULE_2__.nodeToObj)(t2Node, this.options)
        }

        this.tracker = new _helpers__WEBPACK_IMPORTED_MODULE_0__.DiffTracker()
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
                if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isEqual)(t1, t2)) {
                    if (this.foundAll) {
                        console.error('Could not find remaining diffs!')
                    } else {
                        this.foundAll = true
                        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__.removeDone)(t1)
                        diffs = this.findNextDiff(t1, t2, [])
                    }
                }
            }
            if (diffs.length > 0) {
                this.foundAll = false
                this.tracker.add(diffs)
                Object(_apply__WEBPACK_IMPORTED_MODULE_1__.applyVirtual)(t1, diffs, this.options)
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
            return [new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                .setValue(this.options._const.action, this.options._const.replaceElement)
                .setValue(this.options._const.oldValue, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(t1))
                .setValue(this.options._const.newValue, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(t2))
                .setValue(this.options._const.route, route)
            ]
        }
        if (route.length && this.options.maxNodeDiffCount < Math.abs((t1.childNodes || []).length - (t2.childNodes || []).length)) {
            return [new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                .setValue(this.options._const.action, this.options._const.replaceElement)
                .setValue(this.options._const.oldValue, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(t1))
                .setValue(this.options._const.newValue, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(t2))
                .setValue(this.options._const.route, route)
            ]
        }

        if (t1.data !== t2.data) {
            // Comment or text node.
            if (t1.nodeName === '#text') {
                return [new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                    .setValue(this.options._const.action, this.options._const.modifyTextElement)
                    .setValue(this.options._const.route, route)
                    .setValue(this.options._const.oldValue, t1.data)
                    .setValue(this.options._const.newValue, t2.data)
                ]
            } else {
                return [new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
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
                diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                    .setValue(this.options._const.action, this.options._const.removeAttribute)
                    .setValue(this.options._const.route, route)
                    .setValue(this.options._const.name, attr)
                    .setValue(this.options._const.value, t1.attributes[attr])
                )
            } else {
                attr2.splice(pos, 1)
                if (t1.attributes[attr] !== t2.attributes[attr]) {
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
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
            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
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
            const subtrees = t1.subsets && t1.subsetsAge-- ? t1.subsets : (t1.childNodes && t2.childNodes) ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.markSubTrees)(t1, t2) : []

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
                        diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                            .setValue(this.options._const.action, this.options._const.removeTextElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.value, e1.data)
                        )
                        index -= 1
                    } else {
                        diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                            .setValue(this.options._const.action, this.options._const.removeElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.element, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(e1))
                        )
                        index -= 1
                    }

                } else if (e2 && !e1) {
                    if (e2.nodeName === '#text') {
                        diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                            .setValue(this.options._const.action, this.options._const.addTextElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.value, e2.data)
                        )
                    } else {
                        diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                            .setValue(this.options._const.action, this.options._const.addElement)
                            .setValue(this.options._const.route, route.concat(index))
                            .setValue(this.options._const.element, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(e2))
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
                } else if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isEqual)(e1, e2)) {
                    if (t1ChildNodes.length > t2ChildNodes.length) {
                        diffs = diffs.concat([
                            new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                                .setValue(this.options._const.action, this.options._const.removeElement)
                                .setValue(this.options._const.element, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(e1))
                                .setValue(this.options._const.route, route.concat(index))
                        ])
                        t1ChildNodes.splice(i, 1)
                        index -= 1
                        childNodesLengthDifference -= 1
                    } else if (t1ChildNodes.length < t2ChildNodes.length) {
                        diffs = diffs.concat([
                            new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                                .setValue(this.options._const.action, this.options._const.addElement)
                                .setValue(this.options._const.element, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(e2))
                                .setValue(this.options._const.route, route.concat(index))
                        ])
                        t1ChildNodes.splice(i, 0, {})
                        childNodesLengthDifference -= 1
                    } else {
                        diffs = diffs.concat([
                            new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                                .setValue(this.options._const.action, this.options._const.replaceElement)
                                .setValue(this.options._const.oldValue, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(e1))
                                .setValue(this.options._const.newValue, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(e2))
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
        const gapInformation = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getGapInformation)(t1, t2, subtrees)
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
                            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                                .setValue(this.options._const.action, this.options._const.modifyTextElement)
                                .setValue(this.options._const.route, route.concat(index2))
                                .setValue(this.options._const.oldValue, node.data)
                                .setValue(this.options._const.newValue, t2.childNodes[index2].data)
                            )
                            return diffs
                        }
                    }
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                        .setValue(this.options._const.action, this.options._const.removeTextElement)
                        .setValue(this.options._const.route, route.concat(index2))
                        .setValue(this.options._const.value, node.data)
                    )
                    gaps1.splice(index2, 1)
                    shortest = Math.min(gaps1.length, gaps2.length)
                    index2 -= 1
                } else {
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                        .setValue(this.options._const.action, this.options._const.removeElement)
                        .setValue(this.options._const.route, route.concat(index2))
                        .setValue(this.options._const.element, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(node))
                    )
                    gaps1.splice(index2, 1)
                    shortest = Math.min(gaps1.length, gaps2.length)
                    index2 -= 1
                }

            } else if (gaps2[index2] === true) {
                node = t2.childNodes[index2]
                if (node.nodeName === '#text') {
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                        .setValue(this.options._const.action, this.options._const.addTextElement)
                        .setValue(this.options._const.route, route.concat(index2))
                        .setValue(this.options._const.value, node.data)
                    )
                    gaps1.splice(index2, 0, true)
                    shortest = Math.min(gaps1.length, gaps2.length)
                    index1 -= 1
                } else {
                    diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                        .setValue(this.options._const.action, this.options._const.addElement)
                        .setValue(this.options._const.route, route.concat(index2))
                        .setValue(this.options._const.element, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cloneObj)(node))
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
                        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.roughlyEqual)(t1.childNodes[toGroup + j], t1.childNodes[group.oldValue + j], [], false, true)) {
                            destinationDifferent = true
                        }
                    }
                    if (destinationDifferent) {
                        return [new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
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
            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                .setValue(this.options._const.action, this.options._const.modifySelected)
                .setValue(this.options._const.oldValue, t1.selected)
                .setValue(this.options._const.newValue, t2.selected)
                .setValue(this.options._const.route, route)
            )
        }

        if ((t1.value || t2.value) && t1.value !== t2.value && t1.nodeName !== 'OPTION') {
            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
                .setValue(this.options._const.action, this.options._const.modifyValue)
                .setValue(this.options._const.oldValue, t1.value || "")
                .setValue(this.options._const.newValue, t2.value || "")
                .setValue(this.options._const.route, route)
            )
        }
        if (t1.checked !== t2.checked) {
            diffs.push(new _helpers__WEBPACK_IMPORTED_MODULE_0__.Diff()
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
/*! namespace exports */
/*! export nodeToObj [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nodeToObj": () => /* binding */ nodeToObj
/* harmony export */ });
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
/*! namespace exports */
/*! export stringToObj [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stringToObj": () => /* binding */ stringToObj
/* harmony export */ });
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
/*! namespace exports */
/*! export Diff [provided] [used] [could be renamed] */
/*! export DiffTracker [provided] [used] [could be renamed] */
/*! export cloneObj [provided] [used] [could be renamed] */
/*! export getGapInformation [provided] [used] [could be renamed] */
/*! export isEqual [provided] [used] [could be renamed] */
/*! export markSubTrees [provided] [used] [could be renamed] */
/*! export removeDone [provided] [used] [could be renamed] */
/*! export roughlyEqual [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Diff": () => /* binding */ Diff,
/* harmony export */   "removeDone": () => /* binding */ removeDone,
/* harmony export */   "isEqual": () => /* binding */ isEqual,
/* harmony export */   "roughlyEqual": () => /* binding */ roughlyEqual,
/* harmony export */   "cloneObj": () => /* binding */ cloneObj,
/* harmony export */   "getGapInformation": () => /* binding */ getGapInformation,
/* harmony export */   "markSubTrees": () => /* binding */ markSubTrees,
/* harmony export */   "DiffTracker": () => /* binding */ DiffTracker
/* harmony export */ });
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
/*! namespace exports */
/*! export DiffFinder [provided] [used] [could be renamed] */
/*! export nodeToObj [provided] [used] [could be renamed] */
/*! export stringToObj [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiffFinder": () => /* reexport safe */ _diff__WEBPACK_IMPORTED_MODULE_0__.DiffFinder,
/* harmony export */   "nodeToObj": () => /* reexport safe */ _fromDOM__WEBPACK_IMPORTED_MODULE_1__.nodeToObj,
/* harmony export */   "stringToObj": () => /* reexport safe */ _fromString__WEBPACK_IMPORTED_MODULE_2__.stringToObj
/* harmony export */ });
/* harmony import */ var _diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diff */ "./node_modules/diff-dom/src/diffDOM/virtual/diff.js");
/* harmony import */ var _fromDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fromDOM */ "./node_modules/diff-dom/src/diffDOM/virtual/fromDOM.js");
/* harmony import */ var _fromString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fromString */ "./node_modules/diff-dom/src/diffDOM/virtual/fromString.js");





/***/ }),

/***/ "./node_modules/diff-dom/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/diff-dom/src/index.js ***!
  \********************************************/
/*! namespace exports */
/*! export DiffDOM [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export TraceLogger [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export nodeToObj [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export stringToObj [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiffDOM": () => /* reexport safe */ _diffDOM_index__WEBPACK_IMPORTED_MODULE_0__.DiffDOM,
/* harmony export */   "nodeToObj": () => /* reexport safe */ _diffDOM_index__WEBPACK_IMPORTED_MODULE_0__.nodeToObj,
/* harmony export */   "stringToObj": () => /* reexport safe */ _diffDOM_index__WEBPACK_IMPORTED_MODULE_0__.stringToObj,
/* harmony export */   "TraceLogger": () => /* reexport safe */ _TraceLogger__WEBPACK_IMPORTED_MODULE_1__.TraceLogger
/* harmony export */ });
/* harmony import */ var _diffDOM_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diffDOM/index */ "./node_modules/diff-dom/src/diffDOM/index.js");
/* harmony import */ var _TraceLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TraceLogger */ "./node_modules/diff-dom/src/TraceLogger.js");




/***/ }),

/***/ "./node_modules/mobx/lib/mobx.module.js":
/*!**********************************************!*\
  !*** ./node_modules/mobx/lib/mobx.module.js ***!
  \**********************************************/
/*! namespace exports */
/*! export $mobx [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export FlowCancellationError [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export IDerivationState [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export ObservableMap [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export ObservableSet [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Reaction [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _allowStateChanges [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _allowStateChangesInsideComputed [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _allowStateReadsEnd [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _allowStateReadsStart [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _endAction [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _getAdministration [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _getGlobalState [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _interceptReads [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _isComputingDerivation [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _resetGlobalState [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export _startAction [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export action [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export autorun [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export comparer [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export computed [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export configure [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export createAtom [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export decorate [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export entries [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export extendObservable [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export flow [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export get [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export getAtom [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export getDebugName [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export getDependencyTree [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export getObserverTree [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export has [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export intercept [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isAction [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isArrayLike [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isBoxedObservable [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isComputed [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isComputedProp [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isFlowCancellationError [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isObservable [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isObservableArray [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isObservableMap [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isObservableObject [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isObservableProp [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isObservableSet [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export keys [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export observable [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export observe [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export onBecomeObserved [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export onBecomeUnobserved [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export onReactionError [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export reaction [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export remove [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export runInAction [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export set [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export spy [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export toJS [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export trace [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export transaction [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export untracked [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export values [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export when [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.g, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$mobx": () => /* binding */ $mobx,
/* harmony export */   "FlowCancellationError": () => /* binding */ FlowCancellationError,
/* harmony export */   "IDerivationState": () => /* binding */ IDerivationState,
/* harmony export */   "ObservableMap": () => /* binding */ ObservableMap,
/* harmony export */   "ObservableSet": () => /* binding */ ObservableSet,
/* harmony export */   "Reaction": () => /* binding */ Reaction,
/* harmony export */   "_allowStateChanges": () => /* binding */ allowStateChanges,
/* harmony export */   "_allowStateChangesInsideComputed": () => /* binding */ allowStateChangesInsideComputed,
/* harmony export */   "_allowStateReadsEnd": () => /* binding */ allowStateReadsEnd,
/* harmony export */   "_allowStateReadsStart": () => /* binding */ allowStateReadsStart,
/* harmony export */   "_endAction": () => /* binding */ _endAction,
/* harmony export */   "_getAdministration": () => /* binding */ getAdministration,
/* harmony export */   "_getGlobalState": () => /* binding */ getGlobalState,
/* harmony export */   "_interceptReads": () => /* binding */ interceptReads,
/* harmony export */   "_isComputingDerivation": () => /* binding */ isComputingDerivation,
/* harmony export */   "_resetGlobalState": () => /* binding */ resetGlobalState,
/* harmony export */   "_startAction": () => /* binding */ _startAction,
/* harmony export */   "action": () => /* binding */ action,
/* harmony export */   "autorun": () => /* binding */ autorun,
/* harmony export */   "comparer": () => /* binding */ comparer,
/* harmony export */   "computed": () => /* binding */ computed,
/* harmony export */   "configure": () => /* binding */ configure,
/* harmony export */   "createAtom": () => /* binding */ createAtom,
/* harmony export */   "decorate": () => /* binding */ decorate,
/* harmony export */   "entries": () => /* binding */ entries,
/* harmony export */   "extendObservable": () => /* binding */ extendObservable,
/* harmony export */   "flow": () => /* binding */ flow,
/* harmony export */   "get": () => /* binding */ get,
/* harmony export */   "getAtom": () => /* binding */ getAtom,
/* harmony export */   "getDebugName": () => /* binding */ getDebugName,
/* harmony export */   "getDependencyTree": () => /* binding */ getDependencyTree,
/* harmony export */   "getObserverTree": () => /* binding */ getObserverTree,
/* harmony export */   "has": () => /* binding */ has,
/* harmony export */   "intercept": () => /* binding */ intercept,
/* harmony export */   "isAction": () => /* binding */ isAction,
/* harmony export */   "isArrayLike": () => /* binding */ isArrayLike,
/* harmony export */   "isBoxedObservable": () => /* binding */ isObservableValue,
/* harmony export */   "isComputed": () => /* binding */ isComputed,
/* harmony export */   "isComputedProp": () => /* binding */ isComputedProp,
/* harmony export */   "isFlowCancellationError": () => /* binding */ isFlowCancellationError,
/* harmony export */   "isObservable": () => /* binding */ isObservable,
/* harmony export */   "isObservableArray": () => /* binding */ isObservableArray,
/* harmony export */   "isObservableMap": () => /* binding */ isObservableMap,
/* harmony export */   "isObservableObject": () => /* binding */ isObservableObject,
/* harmony export */   "isObservableProp": () => /* binding */ isObservableProp,
/* harmony export */   "isObservableSet": () => /* binding */ isObservableSet,
/* harmony export */   "keys": () => /* binding */ keys,
/* harmony export */   "observable": () => /* binding */ observable,
/* harmony export */   "observe": () => /* binding */ observe,
/* harmony export */   "onBecomeObserved": () => /* binding */ onBecomeObserved,
/* harmony export */   "onBecomeUnobserved": () => /* binding */ onBecomeUnobserved,
/* harmony export */   "onReactionError": () => /* binding */ onReactionError,
/* harmony export */   "reaction": () => /* binding */ reaction,
/* harmony export */   "remove": () => /* binding */ remove,
/* harmony export */   "runInAction": () => /* binding */ runInAction,
/* harmony export */   "set": () => /* binding */ set,
/* harmony export */   "spy": () => /* binding */ spy,
/* harmony export */   "toJS": () => /* binding */ toJS,
/* harmony export */   "trace": () => /* binding */ trace,
/* harmony export */   "transaction": () => /* binding */ transaction,
/* harmony export */   "untracked": () => /* binding */ untracked,
/* harmony export */   "values": () => /* binding */ values,
/* harmony export */   "when": () => /* binding */ when
/* harmony export */ });
/** MobX - (c) Michel Weststrate 2015 - 2020 - MIT Licensed */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var OBFUSCATED_ERROR = "An invariant failed, however the error is obfuscated because this is a production build.";
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
var EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);
function getNextId() {
    return ++globalState.mobxGuid;
}
function fail(message) {
    invariant(false, message);
    throw "X"; // unreachable
}
function invariant(check, message) {
    if (!check)
        throw new Error("[mobx] " + (message || OBFUSCATED_ERROR));
}
/**
 * Prints a deprecation message, but only one time.
 * Returns false if the deprecated message was already printed before
 */
var deprecatedMessages = [];
function deprecated(msg, thing) {
    if (false)
        {}
    if (thing) {
        return deprecated("'" + msg + "', use '" + thing + "' instead.");
    }
    if (deprecatedMessages.indexOf(msg) !== -1)
        return false;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
    return true;
}
/**
 * Makes sure that the provided function is invoked at most once.
 */
function once(func) {
    var invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop = function () { };
function unique(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject(value) {
    if (value === null || typeof value !== "object")
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable(object, prop) {
    if ( true && !isPropertyConfigurable(object, prop))
        fail("Cannot make property '" + prop.toString() + "' observable, it is not configurable and writable in the target object");
}
function createInstanceofPredicate(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
/**
 * Returns whether the argument is an array, disregarding observability.
 */
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
function isES6Map(thing) {
    return thing instanceof Map;
}
function isES6Set(thing) {
    return thing instanceof Set;
}
/**
 * Returns the following: own keys, prototype keys & own symbol keys, if they are enumerable.
 */
function getPlainObjectKeys(object) {
    var enumerables = new Set();
    for (var key in object)
        enumerables.add(key); // *all* enumerables
    Object.getOwnPropertySymbols(object).forEach(function (k) {
        if (Object.getOwnPropertyDescriptor(object, k).enumerable)
            enumerables.add(k);
    }); // *own* symbols
    // Note: this implementation is missing enumerable, inherited, symbolic property names! That would however pretty expensive to add,
    // as there is no efficient iterator that returns *all* properties
    return Array.from(enumerables);
}
function stringifyKey(key) {
    if (key && key.toString)
        return key.toString();
    else
        return new String(key).toString();
}
function getMapLikeKeys(map) {
    if (isPlainObject(map))
        return Object.keys(map);
    if (Array.isArray(map))
        return map.map(function (_a) {
            var _b = __read(_a, 1), key = _b[0];
            return key;
        });
    if (isES6Map(map) || isObservableMap(map))
        return Array.from(map.keys());
    return fail("Cannot get keys from '" + map + "'");
}
function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
}

var $mobx = Symbol("mobx administration");
var Atom = /** @class */ (function () {
    /**
     * Create a new atom. For debugging purposes it is recommended to give it a name.
     * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
     */
    function Atom(name) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        this.name = name;
        this.isPendingUnobservation = false; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed
        this.isBeingObserved = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.NOT_TRACKING;
    }
    Atom.prototype.onBecomeObserved = function () {
        if (this.onBecomeObservedListeners) {
            this.onBecomeObservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    Atom.prototype.onBecomeUnobserved = function () {
        if (this.onBecomeUnobservedListeners) {
            this.onBecomeUnobservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    /**
     * Invoke this method to notify mobx that your atom has been used somehow.
     * Returns true if there is currently a reactive context.
     */
    Atom.prototype.reportObserved = function () {
        return reportObserved(this);
    };
    /**
     * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
     */
    Atom.prototype.reportChanged = function () {
        startBatch();
        propagateChanged(this);
        endBatch();
    };
    Atom.prototype.toString = function () {
        return this.name;
    };
    return Atom;
}());
var isAtom = createInstanceofPredicate("Atom", Atom);
function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
    if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop; }
    if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop; }
    var atom = new Atom(name);
    // default `noop` listener will not initialize the hook Set
    if (onBecomeObservedHandler !== noop) {
        onBecomeObserved(atom, onBecomeObservedHandler);
    }
    if (onBecomeUnobservedHandler !== noop) {
        onBecomeUnobserved(atom, onBecomeUnobservedHandler);
    }
    return atom;
}

function identityComparer(a, b) {
    return a === b;
}
function structuralComparer(a, b) {
    return deepEqual(a, b);
}
function shallowComparer(a, b) {
    return deepEqual(a, b, 1);
}
function defaultComparer(a, b) {
    return Object.is(a, b);
}
var comparer = {
    identity: identityComparer,
    structural: structuralComparer,
    default: defaultComparer,
    shallow: shallowComparer
};

var mobxDidRunLazyInitializersSymbol = Symbol("mobx did run lazy initializers");
var mobxPendingDecorators = Symbol("mobx pending decorators");
var enumerableDescriptorCache = {};
var nonEnumerableDescriptorCache = {};
function createPropertyInitializerDescriptor(prop, enumerable) {
    var cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
    return (cache[prop] ||
        (cache[prop] = {
            configurable: true,
            enumerable: enumerable,
            get: function () {
                initializeInstance(this);
                return this[prop];
            },
            set: function (value) {
                initializeInstance(this);
                this[prop] = value;
            }
        }));
}
function initializeInstance(target) {
    var e_1, _a;
    if (target[mobxDidRunLazyInitializersSymbol] === true)
        return;
    var decorators = target[mobxPendingDecorators];
    if (decorators) {
        addHiddenProp(target, mobxDidRunLazyInitializersSymbol, true);
        // Build property key array from both strings and symbols
        var keys = __spread(Object.getOwnPropertySymbols(decorators), Object.keys(decorators));
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var d = decorators[key];
                d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
}
function createPropDecorator(propertyInitiallyEnumerable, propertyCreator) {
    return function decoratorFactory() {
        var decoratorArguments;
        var decorator = function decorate(target, prop, descriptor, applyImmediately
        // This is a special parameter to signal the direct application of a decorator, allow extendObservable to skip the entire type decoration part,
        // as the instance to apply the decorator to equals the target
        ) {
            if (applyImmediately === true) {
                propertyCreator(target, prop, descriptor, target, decoratorArguments);
                return null;
            }
            if ( true && !quacksLikeADecorator(arguments))
                fail("This function is a decorator, but it wasn't invoked like a decorator");
            if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators)) {
                var inheritedDecorators = target[mobxPendingDecorators];
                addHiddenProp(target, mobxPendingDecorators, __assign({}, inheritedDecorators));
            }
            target[mobxPendingDecorators][prop] = {
                prop: prop,
                propertyCreator: propertyCreator,
                descriptor: descriptor,
                decoratorTarget: target,
                decoratorArguments: decoratorArguments
            };
            return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
        };
        if (quacksLikeADecorator(arguments)) {
            // @decorator
            decoratorArguments = EMPTY_ARRAY;
            return decorator.apply(null, arguments);
        }
        else {
            // @decorator(args)
            decoratorArguments = Array.prototype.slice.call(arguments);
            return decorator;
        }
    };
}
function quacksLikeADecorator(args) {
    return (((args.length === 2 || args.length === 3) &&
        (typeof args[1] === "string" || typeof args[1] === "symbol")) ||
        (args.length === 4 && args[3] === true));
}

function deepEnhancer(v, _, name) {
    // it is an observable already, done
    if (isObservable(v))
        return v;
    // something that can be converted and mutated?
    if (Array.isArray(v))
        return observable.array(v, { name: name });
    if (isPlainObject(v))
        return observable.object(v, undefined, { name: name });
    if (isES6Map(v))
        return observable.map(v, { name: name });
    if (isES6Set(v))
        return observable.set(v, { name: name });
    return v;
}
function shallowEnhancer(v, _, name) {
    if (v === undefined || v === null)
        return v;
    if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v))
        return v;
    if (Array.isArray(v))
        return observable.array(v, { name: name, deep: false });
    if (isPlainObject(v))
        return observable.object(v, undefined, { name: name, deep: false });
    if (isES6Map(v))
        return observable.map(v, { name: name, deep: false });
    if (isES6Set(v))
        return observable.set(v, { name: name, deep: false });
    return fail( true &&
        "The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}
function referenceEnhancer(newValue) {
    // never turn into an observable
    return newValue;
}
function refStructEnhancer(v, oldValue, name) {
    if ( true && isObservable(v))
        throw "observable.struct should not be used with observable values";
    if (deepEqual(v, oldValue))
        return oldValue;
    return v;
}

function createDecoratorForEnhancer(enhancer) {
    invariant(enhancer);
    var decorator = createPropDecorator(true, function (target, propertyName, descriptor, _decoratorTarget, decoratorArgs) {
        if (true) {
            invariant(!descriptor || !descriptor.get, "@observable cannot be used on getter (property \"" + stringifyKey(propertyName) + "\"), use @computed instead.");
        }
        var initialValue = descriptor
            ? descriptor.initializer
                ? descriptor.initializer.call(target)
                : descriptor.value
            : undefined;
        asObservableObject(target).addObservableProp(propertyName, initialValue, enhancer);
    });
    var res = 
    // Extra process checks, as this happens during module initialization
    typeof process !== "undefined" && process.env && "development" !== "production"
        ? function observableDecorator() {
            // This wrapper function is just to detect illegal decorator invocations, deprecate in a next version
            // and simply return the created prop decorator
            if (arguments.length < 2)
                return fail("Incorrect decorator invocation. @observable decorator doesn't expect any arguments");
            return decorator.apply(null, arguments);
        }
        : decorator;
    res.enhancer = enhancer;
    return res;
}

// Predefined bags of create observable options, to avoid allocating temporarily option objects
// in the majority of cases
var defaultCreateObservableOptions = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
};
Object.freeze(defaultCreateObservableOptions);
function assertValidOption(key) {
    if (!/^(deep|name|equals|defaultDecorator|proxy)$/.test(key))
        fail("invalid option for (extend)observable: " + key);
}
function asCreateObservableOptions(thing) {
    if (thing === null || thing === undefined)
        return defaultCreateObservableOptions;
    if (typeof thing === "string")
        return { name: thing, deep: true, proxy: true };
    if (true) {
        if (typeof thing !== "object")
            return fail("expected options object");
        Object.keys(thing).forEach(assertValidOption);
    }
    return thing;
}
var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
function getEnhancerFromOptions(options) {
    return options.defaultDecorator
        ? options.defaultDecorator.enhancer
        : options.deep === false
            ? referenceEnhancer
            : deepEnhancer;
}
/**
 * Turns an object, array or function into a reactive structure.
 * @param v the value which should become observable.
 */
function createObservable(v, arg2, arg3) {
    // @observable someProp;
    if (typeof arguments[1] === "string" || typeof arguments[1] === "symbol") {
        return deepDecorator.apply(null, arguments);
    }
    // it is an observable already, done
    if (isObservable(v))
        return v;
    // something that can be converted and mutated?
    var res = isPlainObject(v)
        ? observable.object(v, arg2, arg3)
        : Array.isArray(v)
            ? observable.array(v, arg2)
            : isES6Map(v)
                ? observable.map(v, arg2)
                : isES6Set(v)
                    ? observable.set(v, arg2)
                    : v;
    // this value could be converted to a new observable data structure, return it
    if (res !== v)
        return res;
    // otherwise, just box it
    fail( true &&
        "The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'");
}
var observableFactories = {
    box: function (value, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("box");
        var o = asCreateObservableOptions(options);
        return new ObservableValue(value, getEnhancerFromOptions(o), o.name, true, o.equals);
    },
    array: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("array");
        var o = asCreateObservableOptions(options);
        return createObservableArray(initialValues, getEnhancerFromOptions(o), o.name);
    },
    map: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("map");
        var o = asCreateObservableOptions(options);
        return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
    },
    set: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("set");
        var o = asCreateObservableOptions(options);
        return new ObservableSet(initialValues, getEnhancerFromOptions(o), o.name);
    },
    object: function (props, decorators, options) {
        if (typeof arguments[1] === "string")
            incorrectlyUsedAsDecorator("object");
        var o = asCreateObservableOptions(options);
        if (o.proxy === false) {
            return extendObservable({}, props, decorators, o);
        }
        else {
            var defaultDecorator = getDefaultDecoratorFromObjectOptions(o);
            var base = extendObservable({}, undefined, undefined, o);
            var proxy = createDynamicObservableObject(base);
            extendObservableObjectWithProperties(proxy, props, decorators, defaultDecorator);
            return proxy;
        }
    },
    ref: refDecorator,
    shallow: shallowDecorator,
    deep: deepDecorator,
    struct: refStructDecorator
};
var observable = createObservable;
// weird trick to keep our typings nicely with our funcs, and still extend the observable function
Object.keys(observableFactories).forEach(function (name) { return (observable[name] = observableFactories[name]); });
function incorrectlyUsedAsDecorator(methodName) {
    fail(
    // process.env.NODE_ENV !== "production" &&
    "Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}

var computedDecorator = createPropDecorator(false, function (instance, propertyName, descriptor, decoratorTarget, decoratorArgs) {
    var get = descriptor.get, set = descriptor.set; // initialValue is the descriptor for get / set props
    // Optimization: faster on decorator target or instance? Assuming target
    // Optimization: find out if declaring on instance isn't just faster. (also makes the property descriptor simpler). But, more memory usage..
    // Forcing instance now, fixes hot reloadig issues on React Native:
    var options = decoratorArgs[0] || {};
    asObservableObject(instance).addComputedProp(instance, propertyName, __assign({ get: get,
        set: set, context: instance }, options));
});
var computedStructDecorator = computedDecorator({ equals: comparer.structural });
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */
var computed = function computed(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        // @computed
        return computedDecorator.apply(null, arguments);
    }
    if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
        // @computed({ options })
        return computedDecorator.apply(null, arguments);
    }
    // computed(expr, options?)
    if (true) {
        invariant(typeof arg1 === "function", "First argument to `computed` should be an expression.");
        invariant(arguments.length < 3, "Computed takes one or two arguments if used as function");
    }
    var opts = typeof arg2 === "object" ? arg2 : {};
    opts.get = arg1;
    opts.set = typeof arg2 === "function" ? arg2 : opts.set;
    opts.name = opts.name || arg1.name || ""; /* for generated name */
    return new ComputedValue(opts);
};
computed.struct = computedStructDecorator;

var IDerivationState;
(function (IDerivationState) {
    // before being run or (outside batch and not being observed)
    // at this point derivation is not holding any data about dependency tree
    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    // no shallow dependency changed since last computation
    // won't recalculate derivation
    // this is what makes mobx fast
    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    // some deep dependency changed, but don't know if shallow dependency changed
    // will require to check first if UP_TO_DATE or POSSIBLY_STALE
    // currently only ComputedValue will propagate POSSIBLY_STALE
    //
    // having this state is second big optimization:
    // don't have to recompute on every dependency change, but only when it's needed
    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    // A shallow dependency has changed since last computation and the derivation
    // will need to recompute when it's needed next.
    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));
var TraceMode;
(function (TraceMode) {
    TraceMode[TraceMode["NONE"] = 0] = "NONE";
    TraceMode[TraceMode["LOG"] = 1] = "LOG";
    TraceMode[TraceMode["BREAK"] = 2] = "BREAK";
})(TraceMode || (TraceMode = {}));
var CaughtException = /** @class */ (function () {
    function CaughtException(cause) {
        this.cause = cause;
        // Empty
    }
    return CaughtException;
}());
function isCaughtException(e) {
    return e instanceof CaughtException;
}
/**
 * Finds out whether any dependency of the derivation has actually changed.
 * If dependenciesState is 1 then it will recalculate dependencies,
 * if any dependency changed it will propagate it by changing dependenciesState to 2.
 *
 * By iterating over the dependencies in the same order that they were reported and
 * stopping on the first change, all the recalculations are only called for ComputedValues
 * that will be tracked by derivation. That is because we assume that if the first x
 * dependencies of the derivation doesn't change then the derivation should run the same way
 * up until accessing x-th dependency.
 */
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
        case IDerivationState.UP_TO_DATE:
            return false;
        case IDerivationState.NOT_TRACKING:
        case IDerivationState.STALE:
            return true;
        case IDerivationState.POSSIBLY_STALE: {
            // state propagation can occur outside of action/reactive context #2195
            var prevAllowStateReads = allowStateReadsStart(true);
            var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
            var obs = derivation.observing, l = obs.length;
            for (var i = 0; i < l; i++) {
                var obj = obs[i];
                if (isComputedValue(obj)) {
                    if (globalState.disableErrorBoundaries) {
                        obj.get();
                    }
                    else {
                        try {
                            obj.get();
                        }
                        catch (e) {
                            // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                            untrackedEnd(prevUntracked);
                            allowStateReadsEnd(prevAllowStateReads);
                            return true;
                        }
                    }
                    // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                    // and `derivation` is an observer of `obj`
                    // invariantShouldCompute(derivation)
                    if (derivation.dependenciesState === IDerivationState.STALE) {
                        untrackedEnd(prevUntracked);
                        allowStateReadsEnd(prevAllowStateReads);
                        return true;
                    }
                }
            }
            changeDependenciesStateTo0(derivation);
            untrackedEnd(prevUntracked);
            allowStateReadsEnd(prevAllowStateReads);
            return false;
        }
    }
}
// function invariantShouldCompute(derivation: IDerivation) {
//     const newDepState = (derivation as any).dependenciesState
//     if (
//         process.env.NODE_ENV === "production" &&
//         (newDepState === IDerivationState.POSSIBLY_STALE ||
//             newDepState === IDerivationState.NOT_TRACKING)
//     )
//         fail("Illegal dependency state")
// }
function isComputingDerivation() {
    return globalState.trackingDerivation !== null; // filter out actions inside computations
}
function checkIfStateModificationsAreAllowed(atom) {
    var hasObservers = atom.observers.size > 0;
    // Should never be possible to change an observed observable from inside computed, see #798
    if (globalState.computationDepth > 0 && hasObservers)
        fail( true &&
            "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: " + atom.name);
    // Should not be possible to change observed state outside strict mode, except during initialization, see #563
    if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "strict"))
        fail( true &&
            (globalState.enforceActions
                ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: "
                : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") +
                atom.name);
}
function checkIfStateReadsAreAllowed(observable) {
    if ( true &&
        !globalState.allowStateReads &&
        globalState.observableRequiresReaction) {
        console.warn("[mobx] Observable " + observable.name + " being read outside a reactive context");
    }
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */
function trackDerivedFunction(derivation, f, context) {
    var prevAllowStateReads = allowStateReadsStart(true);
    // pre allocate array allocation + room for variation in deps
    // array will be trimmed by bindDependencies
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    var result;
    if (globalState.disableErrorBoundaries === true) {
        result = f.call(context);
    }
    else {
        try {
            result = f.call(context);
        }
        catch (e) {
            result = new CaughtException(e);
        }
    }
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    warnAboutDerivationWithoutDependencies(derivation);
    allowStateReadsEnd(prevAllowStateReads);
    return result;
}
function warnAboutDerivationWithoutDependencies(derivation) {
    if (false)
        {}
    if (derivation.observing.length !== 0)
        return;
    if (globalState.reactionRequiresObservable || derivation.requiresObservable) {
        console.warn("[mobx] Derivation " + derivation.name + " is created/updated without reading any observable value");
    }
}
/**
 * diffs newObserving with observing.
 * update observing to be newObserving with unique observables
 * notify observers that become observed/unobserved
 */
function bindDependencies(derivation) {
    // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
    var prevObserving = derivation.observing;
    var observing = (derivation.observing = derivation.newObserving);
    var lowestNewObservingDerivationState = IDerivationState.UP_TO_DATE;
    // Go through all new observables and check diffValue: (this list can contain duplicates):
    //   0: first occurrence, change to 1 and keep it
    //   1: extra occurrence, drop it
    var i0 = 0, l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
        // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
        // not hitting the condition
        if (dep.dependenciesState > lowestNewObservingDerivationState) {
            lowestNewObservingDerivationState = dep.dependenciesState;
        }
    }
    observing.length = i0;
    derivation.newObserving = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
    // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
    //   0: it's not in new observables, unobserve it
    //   1: it keeps being observed, don't want to notify it. change to 0
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver(dep, derivation);
        }
        dep.diffValue = 0;
    }
    // Go through all new observables and check diffValue: (now it should be unique)
    //   0: it was set to 0 in last loop. don't need to do anything.
    //   1: it wasn't observed, let's observe it. set back to 0
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver(dep, derivation);
        }
    }
    // Some new observed derivations may become stale during this derivation computation
    // so they have had no chance to propagate staleness (#916)
    if (lowestNewObservingDerivationState !== IDerivationState.UP_TO_DATE) {
        derivation.dependenciesState = lowestNewObservingDerivationState;
        derivation.onBecomeStale();
    }
}
function clearObserving(derivation) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
    var obs = derivation.observing;
    derivation.observing = [];
    var i = obs.length;
    while (i--)
        removeObserver(obs[i], derivation);
    derivation.dependenciesState = IDerivationState.NOT_TRACKING;
}
function untracked(action) {
    var prev = untrackedStart();
    try {
        return action();
    }
    finally {
        untrackedEnd(prev);
    }
}
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
function allowStateReadsStart(allowStateReads) {
    var prev = globalState.allowStateReads;
    globalState.allowStateReads = allowStateReads;
    return prev;
}
function allowStateReadsEnd(prev) {
    globalState.allowStateReads = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
}

// we don't use globalState for these in order to avoid possible issues with multiple
// mobx versions
var currentActionId = 0;
var nextActionId = 1;
var functionNameDescriptor = Object.getOwnPropertyDescriptor(function () { }, "name");
var isFunctionNameConfigurable = functionNameDescriptor && functionNameDescriptor.configurable;
function createAction(actionName, fn, ref) {
    if (true) {
        invariant(typeof fn === "function", "`action` can only be invoked on functions");
        if (typeof actionName !== "string" || !actionName)
            fail("actions should have valid names, got: '" + actionName + "'");
    }
    var res = function () {
        return executeAction(actionName, fn, ref || this, arguments);
    };
    res.isMobxAction = true;
    if (true) {
        if (isFunctionNameConfigurable) {
            Object.defineProperty(res, "name", { value: actionName });
        }
    }
    return res;
}
function executeAction(actionName, fn, scope, args) {
    var runInfo = _startAction(actionName, scope, args);
    try {
        return fn.apply(scope, args);
    }
    catch (err) {
        runInfo.error = err;
        throw err;
    }
    finally {
        _endAction(runInfo);
    }
}
function _startAction(actionName, scope, args) {
    var notifySpy = isSpyEnabled() && !!actionName;
    var startTime = 0;
    if (notifySpy && "development" !== "production") {
        startTime = Date.now();
        var l = (args && args.length) || 0;
        var flattendArgs = new Array(l);
        if (l > 0)
            for (var i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart({
            type: "action",
            name: actionName,
            object: scope,
            arguments: flattendArgs
        });
    }
    var prevDerivation = untrackedStart();
    startBatch();
    var prevAllowStateChanges = allowStateChangesStart(true);
    var prevAllowStateReads = allowStateReadsStart(true);
    var runInfo = {
        prevDerivation: prevDerivation,
        prevAllowStateChanges: prevAllowStateChanges,
        prevAllowStateReads: prevAllowStateReads,
        notifySpy: notifySpy,
        startTime: startTime,
        actionId: nextActionId++,
        parentActionId: currentActionId
    };
    currentActionId = runInfo.actionId;
    return runInfo;
}
function _endAction(runInfo) {
    if (currentActionId !== runInfo.actionId) {
        fail("invalid action stack. did you forget to finish an action?");
    }
    currentActionId = runInfo.parentActionId;
    if (runInfo.error !== undefined) {
        globalState.suppressReactionErrors = true;
    }
    allowStateChangesEnd(runInfo.prevAllowStateChanges);
    allowStateReadsEnd(runInfo.prevAllowStateReads);
    endBatch();
    untrackedEnd(runInfo.prevDerivation);
    if (runInfo.notifySpy && "development" !== "production") {
        spyReportEnd({ time: Date.now() - runInfo.startTime });
    }
    globalState.suppressReactionErrors = false;
}
function allowStateChanges(allowStateChanges, func) {
    var prev = allowStateChangesStart(allowStateChanges);
    var res;
    try {
        res = func();
    }
    finally {
        allowStateChangesEnd(prev);
    }
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}
function allowStateChangesInsideComputed(func) {
    var prev = globalState.computationDepth;
    globalState.computationDepth = 0;
    var res;
    try {
        res = func();
    }
    finally {
        globalState.computationDepth = prev;
    }
    return res;
}

var ObservableValue = /** @class */ (function (_super) {
    __extends(ObservableValue, _super);
    function ObservableValue(value, enhancer, name, notifySpy, equals) {
        if (name === void 0) { name = "ObservableValue@" + getNextId(); }
        if (notifySpy === void 0) { notifySpy = true; }
        if (equals === void 0) { equals = comparer.default; }
        var _this = _super.call(this, name) || this;
        _this.enhancer = enhancer;
        _this.name = name;
        _this.equals = equals;
        _this.hasUnreportedChange = false;
        _this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled() && "development" !== "production") {
            // only notify spy if this is a stand-alone observable
            spyReport({ type: "create", name: _this.name, newValue: "" + _this.value });
        }
        return _this;
    }
    ObservableValue.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableValue.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== globalState.UNCHANGED) {
            var notifySpy = isSpyEnabled();
            if (notifySpy && "development" !== "production") {
                spyReportStart({
                    type: "update",
                    name: this.name,
                    newValue: newValue,
                    oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy && "development" !== "production")
                spyReportEnd();
        }
    };
    ObservableValue.prototype.prepareNewValue = function (newValue) {
        checkIfStateModificationsAreAllowed(this);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this,
                type: "update",
                newValue: newValue
            });
            if (!change)
                return globalState.UNCHANGED;
            newValue = change.newValue;
        }
        // apply modifier
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.equals(this.value, newValue) ? globalState.UNCHANGED : newValue;
    };
    ObservableValue.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this)) {
            notifyListeners(this, {
                type: "update",
                object: this,
                newValue: newValue,
                oldValue: oldValue
            });
        }
    };
    ObservableValue.prototype.get = function () {
        this.reportObserved();
        return this.dehanceValue(this.value);
    };
    ObservableValue.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableValue.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately)
            listener({
                object: this,
                type: "update",
                newValue: this.value,
                oldValue: undefined
            });
        return registerListener(this, listener);
    };
    ObservableValue.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    ObservableValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    ObservableValue.prototype[Symbol.toPrimitive] = function () {
        return this.valueOf();
    };
    return ObservableValue;
}(Atom));
var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);

/**
 * A node in the state dependency root that observes other nodes, and can be observed itself.
 *
 * ComputedValue will remember the result of the computation for the duration of the batch, or
 * while being observed.
 *
 * During this time it will recompute only when one of its direct dependencies changed,
 * but only when it is being accessed with `ComputedValue.get()`.
 *
 * Implementation description:
 * 1. First time it's being accessed it will compute and remember result
 *    give back remembered result until 2. happens
 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
 * 3. When it's being accessed, recompute if any shallow dependency changed.
 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
 *    go to step 2. either way
 *
 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
 */
var ComputedValue = /** @class */ (function () {
    /**
     * Create a new computed value based on a function expression.
     *
     * The `name` property is for debug purposes only.
     *
     * The `equals` property specifies the comparer function to use to determine if a newly produced
     * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
     * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
     * Structural comparison can be convenient if you always produce a new aggregated object and
     * don't want to notify observers if it is structurally the same.
     * This is useful for working with vectors, mouse coordinates etc.
     */
    function ComputedValue(options) {
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = null; // during tracking it's an array with new observed observers
        this.isBeingObserved = false;
        this.isPendingUnobservation = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.value = new CaughtException(null);
        this.isComputing = false; // to check for cycles
        this.isRunningSetter = false;
        this.isTracing = TraceMode.NONE;
        invariant(options.get, "missing option for computed: get");
        this.derivation = options.get;
        this.name = options.name || "ComputedValue@" + getNextId();
        if (options.set)
            this.setter = createAction(this.name + "-setter", options.set);
        this.equals =
            options.equals ||
                (options.compareStructural || options.struct
                    ? comparer.structural
                    : comparer.default);
        this.scope = options.context;
        this.requiresReaction = !!options.requiresReaction;
        this.keepAlive = !!options.keepAlive;
    }
    ComputedValue.prototype.onBecomeStale = function () {
        propagateMaybeChanged(this);
    };
    ComputedValue.prototype.onBecomeObserved = function () {
        if (this.onBecomeObservedListeners) {
            this.onBecomeObservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    ComputedValue.prototype.onBecomeUnobserved = function () {
        if (this.onBecomeUnobservedListeners) {
            this.onBecomeUnobservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    /**
     * Returns the current value of this computed value.
     * Will evaluate its computation first if needed.
     */
    ComputedValue.prototype.get = function () {
        if (this.isComputing)
            fail("Cycle detected in computation " + this.name + ": " + this.derivation);
        if (globalState.inBatch === 0 && this.observers.size === 0 && !this.keepAlive) {
            if (shouldCompute(this)) {
                this.warnAboutUntrackedRead();
                startBatch(); // See perf test 'computed memoization'
                this.value = this.computeValue(false);
                endBatch();
            }
        }
        else {
            reportObserved(this);
            if (shouldCompute(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed(this);
        }
        var result = this.value;
        if (isCaughtException(result))
            throw result.cause;
        return result;
    };
    ComputedValue.prototype.peek = function () {
        var res = this.computeValue(false);
        if (isCaughtException(res))
            throw res.cause;
        return res;
    };
    ComputedValue.prototype.set = function (value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant(false,  true &&
                "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue.prototype.trackAndCompute = function () {
        if (isSpyEnabled() && "development" !== "production") {
            spyReport({
                object: this.scope,
                type: "compute",
                name: this.name
            });
        }
        var oldValue = this.value;
        var wasSuspended = 
        /* see #1208 */ this.dependenciesState === IDerivationState.NOT_TRACKING;
        var newValue = this.computeValue(true);
        var changed = wasSuspended ||
            isCaughtException(oldValue) ||
            isCaughtException(newValue) ||
            !this.equals(oldValue, newValue);
        if (changed) {
            this.value = newValue;
        }
        return changed;
    };
    ComputedValue.prototype.computeValue = function (track) {
        this.isComputing = true;
        globalState.computationDepth++;
        var res;
        if (track) {
            res = trackDerivedFunction(this, this.derivation, this.scope);
        }
        else {
            if (globalState.disableErrorBoundaries === true) {
                res = this.derivation.call(this.scope);
            }
            else {
                try {
                    res = this.derivation.call(this.scope);
                }
                catch (e) {
                    res = new CaughtException(e);
                }
            }
        }
        globalState.computationDepth--;
        this.isComputing = false;
        return res;
    };
    ComputedValue.prototype.suspend = function () {
        if (!this.keepAlive) {
            clearObserving(this);
            this.value = undefined; // don't hold on to computed value!
        }
    };
    ComputedValue.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener({
                    type: "update",
                    object: _this,
                    newValue: newValue,
                    oldValue: prevValue
                });
                untrackedEnd(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue.prototype.warnAboutUntrackedRead = function () {
        if (false)
            {}
        if (this.requiresReaction === true) {
            fail("[mobx] Computed value " + this.name + " is read outside a reactive context");
        }
        if (this.isTracing !== TraceMode.NONE) {
            console.log("[mobx.trace] '" + this.name + "' is being read outside a reactive context. Doing a full recompute");
        }
        if (globalState.computedRequiresReaction) {
            console.warn("[mobx] Computed value " + this.name + " is being read outside a reactive context. Doing a full recompute");
        }
    };
    ComputedValue.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    ComputedValue.prototype[Symbol.toPrimitive] = function () {
        return this.valueOf();
    };
    return ComputedValue;
}());
var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);

/**
 * These values will persist if global state is reset
 */
var persistentKeys = [
    "mobxGuid",
    "spyListeners",
    "enforceActions",
    "computedRequiresReaction",
    "reactionRequiresObservable",
    "observableRequiresReaction",
    "allowStateReads",
    "disableErrorBoundaries",
    "runId",
    "UNCHANGED"
];
var MobXGlobals = /** @class */ (function () {
    function MobXGlobals() {
        /**
         * MobXGlobals version.
         * MobX compatiblity with other versions loaded in memory as long as this version matches.
         * It indicates that the global state still stores similar information
         *
         * N.B: this version is unrelated to the package version of MobX, and is only the version of the
         * internal state storage of MobX, and can be the same across many different package versions
         */
        this.version = 5;
        /**
         * globally unique token to signal unchanged
         */
        this.UNCHANGED = {};
        /**
         * Currently running derivation
         */
        this.trackingDerivation = null;
        /**
         * Are we running a computation currently? (not a reaction)
         */
        this.computationDepth = 0;
        /**
         * Each time a derivation is tracked, it is assigned a unique run-id
         */
        this.runId = 0;
        /**
         * 'guid' for general purpose. Will be persisted amongst resets.
         */
        this.mobxGuid = 0;
        /**
         * Are we in a batch block? (and how many of them)
         */
        this.inBatch = 0;
        /**
         * Observables that don't have observers anymore, and are about to be
         * suspended, unless somebody else accesses it in the same batch
         *
         * @type {IObservable[]}
         */
        this.pendingUnobservations = [];
        /**
         * List of scheduled, not yet executed, reactions.
         */
        this.pendingReactions = [];
        /**
         * Are we currently processing reactions?
         */
        this.isRunningReactions = false;
        /**
         * Is it allowed to change observables at this point?
         * In general, MobX doesn't allow that when running computations and React.render.
         * To ensure that those functions stay pure.
         */
        this.allowStateChanges = true;
        /**
         * Is it allowed to read observables at this point?
         * Used to hold the state needed for `observableRequiresReaction`
         */
        this.allowStateReads = true;
        /**
         * If strict mode is enabled, state changes are by default not allowed
         */
        this.enforceActions = false;
        /**
         * Spy callbacks
         */
        this.spyListeners = [];
        /**
         * Globally attached error handlers that react specifically to errors in reactions
         */
        this.globalReactionErrorHandlers = [];
        /**
         * Warn if computed values are accessed outside a reactive context
         */
        this.computedRequiresReaction = false;
        /**
         * (Experimental)
         * Warn if you try to create to derivation / reactive context without accessing any observable.
         */
        this.reactionRequiresObservable = false;
        /**
         * (Experimental)
         * Warn if observables are accessed outside a reactive context
         */
        this.observableRequiresReaction = false;
        /**
         * Allows overwriting of computed properties, useful in tests but not prod as it can cause
         * memory leaks. See https://github.com/mobxjs/mobx/issues/1867
         */
        this.computedConfigurable = false;
        /*
         * Don't catch and rethrow exceptions. This is useful for inspecting the state of
         * the stack when an exception occurs while debugging.
         */
        this.disableErrorBoundaries = false;
        /*
         * If true, we are already handling an exception in an action. Any errors in reactions should be suppressed, as
         * they are not the cause, see: https://github.com/mobxjs/mobx/issues/1836
         */
        this.suppressReactionErrors = false;
    }
    return MobXGlobals;
}());
var mockGlobal = {};
function getGlobal() {
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof __webpack_require__.g !== "undefined") {
        return __webpack_require__.g;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    return mockGlobal;
}
var canMergeGlobalState = true;
var isolateCalled = false;
var globalState = (function () {
    var global = getGlobal();
    if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals)
        canMergeGlobalState = false;
    if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals().version)
        canMergeGlobalState = false;
    if (!canMergeGlobalState) {
        setTimeout(function () {
            if (!isolateCalled) {
                fail("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`");
            }
        }, 1);
        return new MobXGlobals();
    }
    else if (global.__mobxGlobals) {
        global.__mobxInstanceCount += 1;
        if (!global.__mobxGlobals.UNCHANGED)
            global.__mobxGlobals.UNCHANGED = {}; // make merge backward compatible
        return global.__mobxGlobals;
    }
    else {
        global.__mobxInstanceCount = 1;
        return (global.__mobxGlobals = new MobXGlobals());
    }
})();
function isolateGlobalState() {
    if (globalState.pendingReactions.length ||
        globalState.inBatch ||
        globalState.isRunningReactions)
        fail("isolateGlobalState should be called before MobX is running any reactions");
    isolateCalled = true;
    if (canMergeGlobalState) {
        if (--getGlobal().__mobxInstanceCount === 0)
            getGlobal().__mobxGlobals = undefined;
        globalState = new MobXGlobals();
    }
}
function getGlobalState() {
    return globalState;
}
/**
 * For testing purposes only; this will break the internal state of existing observables,
 * but can be used to get back at a stable state after throwing errors
 */
function resetGlobalState() {
    var defaultGlobals = new MobXGlobals();
    for (var key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState[key] = defaultGlobals[key];
    globalState.allowStateChanges = !globalState.enforceActions;
}

function hasObservers(observable) {
    return observable.observers && observable.observers.size > 0;
}
function getObservers(observable) {
    return observable.observers;
}
// function invariantObservers(observable: IObservable) {
//     const list = observable.observers
//     const map = observable.observersIndexes
//     const l = list.length
//     for (let i = 0; i < l; i++) {
//         const id = list[i].__mapid
//         if (i) {
//             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
//         } else {
//             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
//         }
//     }
//     invariant(
//         list.length === 0 || Object.keys(map).length === list.length - 1,
//         "INTERNAL ERROR there is no junk in map"
//     )
// }
function addObserver(observable, node) {
    // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
    // invariantObservers(observable);
    observable.observers.add(node);
    if (observable.lowestObserverState > node.dependenciesState)
        observable.lowestObserverState = node.dependenciesState;
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
}
function removeObserver(observable, node) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
    // invariantObservers(observable);
    observable.observers.delete(node);
    if (observable.observers.size === 0) {
        // deleting last observer
        queueForUnobservation(observable);
    }
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
}
function queueForUnobservation(observable) {
    if (observable.isPendingUnobservation === false) {
        // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (--globalState.inBatch === 0) {
        runReactions();
        // the batch is actually about to finish, all unobserving should happen here.
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable = list[i];
            observable.isPendingUnobservation = false;
            if (observable.observers.size === 0) {
                if (observable.isBeingObserved) {
                    // if this observable had reactive observers, trigger the hooks
                    observable.isBeingObserved = false;
                    observable.onBecomeUnobserved();
                }
                if (observable instanceof ComputedValue) {
                    // computed values are automatically teared down when the last observer leaves
                    // this process happens recursively, this computed might be the last observabe of another, etc..
                    observable.suspend();
                }
            }
        }
        globalState.pendingUnobservations = [];
    }
}
function reportObserved(observable) {
    checkIfStateReadsAreAllowed(observable);
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        /**
         * Simple optimization, give each derivation run an unique id (runId)
         * Check if last time this observable was accessed the same runId is used
         * if this is the case, the relation is already known
         */
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
            if (!observable.isBeingObserved) {
                observable.isBeingObserved = true;
                observable.onBecomeObserved();
            }
        }
        return true;
    }
    else if (observable.observers.size === 0 && globalState.inBatch > 0) {
        queueForUnobservation(observable);
    }
    return false;
}
// function invariantLOS(observable: IObservable, msg: string) {
//     // it's expensive so better not run it in produciton. but temporarily helpful for testing
//     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
//     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
//     throw new Error(
//         "lowestObserverState is wrong for " +
//             msg +
//             " because " +
//             min +
//             " < " +
//             observable.lowestObserverState
//     )
// }
/**
 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
 * It will propagate changes to observers from previous run
 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
 * Hopefully self reruning autoruns aren't a feature people should depend on
 * Also most basic use cases should be ok
 */
// Called by Atom when its value changes
function propagateChanged(observable) {
    // invariantLOS(observable, "changed start");
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    // Ideally we use for..of here, but the downcompiled version is really slow...
    observable.observers.forEach(function (d) {
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            if (d.isTracing !== TraceMode.NONE) {
                logTraceInfo(d, observable);
            }
            d.onBecomeStale();
        }
        d.dependenciesState = IDerivationState.STALE;
    });
    // invariantLOS(observable, "changed end");
}
// Called by ComputedValue when it recalculate and its value changed
function propagateChangeConfirmed(observable) {
    // invariantLOS(observable, "confirmed start");
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    observable.observers.forEach(function (d) {
        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = IDerivationState.STALE;
        else if (d.dependenciesState === IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
        )
            observable.lowestObserverState = IDerivationState.UP_TO_DATE;
    });
    // invariantLOS(observable, "confirmed end");
}
// Used by computed when its dependency changed, but we don't wan't to immediately recompute.
function propagateMaybeChanged(observable) {
    // invariantLOS(observable, "maybe start");
    if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE)
        return;
    observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
    observable.observers.forEach(function (d) {
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
            if (d.isTracing !== TraceMode.NONE) {
                logTraceInfo(d, observable);
            }
            d.onBecomeStale();
        }
    });
    // invariantLOS(observable, "maybe end");
}
function logTraceInfo(derivation, observable) {
    console.log("[mobx.trace] '" + derivation.name + "' is invalidated due to a change in: '" + observable.name + "'");
    if (derivation.isTracing === TraceMode.BREAK) {
        var lines = [];
        printDepTree(getDependencyTree(derivation), lines, 1);
        // prettier-ignore
        new Function("debugger;\n/*\nTracing '" + derivation.name + "'\n\nYou are entering this break point because derivation '" + derivation.name + "' is being traced and '" + observable.name + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
    }
}
function printDepTree(tree, lines, depth) {
    if (lines.length >= 1000) {
        lines.push("(and many more)");
        return;
    }
    lines.push("" + new Array(depth).join("\t") + tree.name); // MWE: not the fastest, but the easiest way :)
    if (tree.dependencies)
        tree.dependencies.forEach(function (child) { return printDepTree(child, lines, depth + 1); });
}

var Reaction = /** @class */ (function () {
    function Reaction(name, onInvalidate, errorHandler, requiresObservable) {
        if (name === void 0) { name = "Reaction@" + getNextId(); }
        if (requiresObservable === void 0) { requiresObservable = false; }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.errorHandler = errorHandler;
        this.requiresObservable = requiresObservable;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
        this.isTracing = TraceMode.NONE;
    }
    Reaction.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            runReactions();
        }
    };
    Reaction.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    /**
     * internal, use schedule() if you intend to kick off a reaction
     */
    Reaction.prototype.runReaction = function () {
        if (!this.isDisposed) {
            startBatch();
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                try {
                    this.onInvalidate();
                    if (this._isTrackPending &&
                        isSpyEnabled() &&
                        "development" !== "production") {
                        // onInvalidate didn't trigger track right away..
                        spyReport({
                            name: this.name,
                            type: "scheduled-reaction"
                        });
                    }
                }
                catch (e) {
                    this.reportExceptionInDerivation(e);
                }
            }
            endBatch();
        }
    };
    Reaction.prototype.track = function (fn) {
        if (this.isDisposed) {
            return;
            // console.warn("Reaction already disposed") // Note: Not a warning / error in mobx 4 either
        }
        startBatch();
        var notify = isSpyEnabled();
        var startTime;
        if (notify && "development" !== "production") {
            startTime = Date.now();
            spyReportStart({
                name: this.name,
                type: "reaction"
            });
        }
        this._isRunning = true;
        var result = trackDerivedFunction(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            // disposed during last run. Clean up everything that was bound after the dispose call.
            clearObserving(this);
        }
        if (isCaughtException(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify && "development" !== "production") {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    };
    Reaction.prototype.reportExceptionInDerivation = function (error) {
        var _this = this;
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        if (globalState.disableErrorBoundaries)
            throw error;
        var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'";
        if (globalState.suppressReactionErrors) {
            console.warn("[mobx] (error in reaction '" + this.name + "' suppressed, fix error of causing action below)"); // prettier-ignore
        }
        else {
            console.error(message, error);
            /** If debugging brought you here, please, read the above message :-). Tnx! */
        }
        if (isSpyEnabled()) {
            spyReport({
                type: "error",
                name: this.name,
                message: message,
                error: "" + error
            });
        }
        globalState.globalReactionErrorHandlers.forEach(function (f) { return f(error, _this); });
    };
    Reaction.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                // if disposed while running, clean up later. Maybe not optimal, but rare case
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    };
    Reaction.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r[$mobx] = this;
        return r;
    };
    Reaction.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction.prototype.trace = function (enterBreakPoint) {
        if (enterBreakPoint === void 0) { enterBreakPoint = false; }
        trace(this, enterBreakPoint);
    };
    return Reaction;
}());
function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return function () {
        var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState.globalReactionErrorHandlers.splice(idx, 1);
    };
}
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function (f) { return f(); };
function runReactions() {
    // Trampolining, if runReactions are already running, new reactions will be picked up
    if (globalState.inBatch > 0 || globalState.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    // While running reactions, new reactions might be triggered.
    // Hence we work with two variables and check whether
    // we converge to no remaining reactions after a while.
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." +
                (" Probably there is a cycle in the reactive function: " + allReactions[0]));
            allReactions.splice(0); // clear reactions
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState.isRunningReactions = false;
}
var isReaction = createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
}

function isSpyEnabled() {
    return  true && !!globalState.spyListeners.length;
}
function spyReport(event) {
    if (false)
        {} // dead code elimination can do the rest
    if (!globalState.spyListeners.length)
        return;
    var listeners = globalState.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart(event) {
    if (false)
        {}
    var change = __assign(__assign({}, event), { spyReportStart: true });
    spyReport(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    if (false)
        {}
    if (change)
        spyReport(__assign(__assign({}, change), { spyReportEnd: true }));
    else
        spyReport(END_EVENT);
}
function spy(listener) {
    if (false) {}
    else {
        globalState.spyListeners.push(listener);
        return once(function () {
            globalState.spyListeners = globalState.spyListeners.filter(function (l) { return l !== listener; });
        });
    }
}

function dontReassignFields() {
    fail( true && "@action fields are not reassignable");
}
function namedActionDecorator(name) {
    return function (target, prop, descriptor) {
        if (descriptor) {
            if ( true && descriptor.get !== undefined) {
                return fail("@action cannot be used with getters");
            }
            // babel / typescript
            // @action method() { }
            if (descriptor.value) {
                // typescript
                return {
                    value: createAction(name, descriptor.value),
                    enumerable: false,
                    configurable: true,
                    writable: true // for typescript, this must be writable, otherwise it cannot inherit :/ (see inheritable actions test)
                };
            }
            // babel only: @action method = () => {}
            var initializer_1 = descriptor.initializer;
            return {
                enumerable: false,
                configurable: true,
                writable: true,
                initializer: function () {
                    // N.B: we can't immediately invoke initializer; this would be wrong
                    return createAction(name, initializer_1.call(this));
                }
            };
        }
        // bound instance methods
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function actionFieldDecorator(name) {
    // Simple property that writes on first invocation to the current instance
    return function (target, prop, descriptor) {
        Object.defineProperty(target, prop, {
            configurable: true,
            enumerable: false,
            get: function () {
                return undefined;
            },
            set: function (value) {
                addHiddenProp(this, prop, action(name, value));
            }
        });
    };
}
function boundActionDecorator(target, propertyName, descriptor, applyToInstance) {
    if (applyToInstance === true) {
        defineBoundAction(target, propertyName, descriptor.value);
        return null;
    }
    if (descriptor) {
        // if (descriptor.value)
        // Typescript / Babel: @action.bound method() { }
        // also: babel @action.bound method = () => {}
        return {
            configurable: true,
            enumerable: false,
            get: function () {
                defineBoundAction(this, propertyName, descriptor.value || descriptor.initializer.call(this));
                return this[propertyName];
            },
            set: dontReassignFields
        };
    }
    // field decorator Typescript @action.bound method = () => {}
    return {
        enumerable: false,
        configurable: true,
        set: function (v) {
            defineBoundAction(this, propertyName, v);
        },
        get: function () {
            return undefined;
        }
    };
}

var action = function action(arg1, arg2, arg3, arg4) {
    // action(fn() {})
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction(arg1.name || "<unnamed action>", arg1);
    // action("name", fn() {})
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction(arg1, arg2);
    // @action("name") fn() {}
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator(arg1);
    // @action fn() {}
    if (arg4 === true) {
        // apply to instance immediately
        addHiddenProp(arg1, arg2, createAction(arg1.name || arg2, arg3.value, this));
    }
    else {
        return namedActionDecorator(arg2).apply(null, arguments);
    }
};
action.bound = boundActionDecorator;
function runInAction(arg1, arg2) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    if (true) {
        invariant(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
        if (typeof actionName !== "string" || !actionName)
            fail("actions should have valid names, got: '" + actionName + "'");
    }
    return executeAction(actionName, fn, this, undefined);
}
function isAction(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
function defineBoundAction(target, propertyName, fn) {
    addHiddenProp(target, propertyName, createAction(propertyName, fn.bind(target)));
}

/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */
function autorun(view, opts) {
    if (opts === void 0) { opts = EMPTY_OBJECT; }
    if (true) {
        invariant(typeof view === "function", "Autorun expects a function as first argument");
        invariant(isAction(view) === false, "Autorun does not accept actions since actions are untrackable");
    }
    var name = (opts && opts.name) || view.name || "Autorun@" + getNextId();
    var runSync = !opts.scheduler && !opts.delay;
    var reaction;
    if (runSync) {
        // normal autorun
        reaction = new Reaction(name, function () {
            this.track(reactionRunner);
        }, opts.onError, opts.requiresObservable);
    }
    else {
        var scheduler_1 = createSchedulerFromOptions(opts);
        // debounced autorun
        var isScheduled_1 = false;
        reaction = new Reaction(name, function () {
            if (!isScheduled_1) {
                isScheduled_1 = true;
                scheduler_1(function () {
                    isScheduled_1 = false;
                    if (!reaction.isDisposed)
                        reaction.track(reactionRunner);
                });
            }
        }, opts.onError, opts.requiresObservable);
    }
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
var run = function (f) { return f(); };
function createSchedulerFromOptions(opts) {
    return opts.scheduler
        ? opts.scheduler
        : opts.delay
            ? function (f) { return setTimeout(f, opts.delay); }
            : run;
}
function reaction(expression, effect, opts) {
    if (opts === void 0) { opts = EMPTY_OBJECT; }
    if (true) {
        invariant(typeof expression === "function", "First argument to reaction should be a function");
        invariant(typeof opts === "object", "Third argument of reactions should be an object");
    }
    var name = opts.name || "Reaction@" + getNextId();
    var effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
    var runSync = !opts.scheduler && !opts.delay;
    var scheduler = createSchedulerFromOptions(opts);
    var firstTime = true;
    var isScheduled = false;
    var value;
    var equals = opts.compareStructural
        ? comparer.structural
        : opts.equals || comparer.default;
    var r = new Reaction(name, function () {
        if (firstTime || runSync) {
            reactionRunner();
        }
        else if (!isScheduled) {
            isScheduled = true;
            scheduler(reactionRunner);
        }
    }, opts.onError, opts.requiresObservable);
    function reactionRunner() {
        isScheduled = false; // Q: move into reaction runner?
        if (r.isDisposed)
            return;
        var changed = false;
        r.track(function () {
            var nextValue = expression(r);
            changed = firstTime || !equals(value, nextValue);
            value = nextValue;
        });
        if (firstTime && opts.fireImmediately)
            effectAction(value, r);
        if (!firstTime && changed === true)
            effectAction(value, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
function wrapErrorHandler(errorHandler, baseFn) {
    return function () {
        try {
            return baseFn.apply(this, arguments);
        }
        catch (e) {
            errorHandler.call(this, e);
        }
    };
}

function onBecomeObserved(thing, arg2, arg3) {
    return interceptHook("onBecomeObserved", thing, arg2, arg3);
}
function onBecomeUnobserved(thing, arg2, arg3) {
    return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
}
function interceptHook(hook, thing, arg2, arg3) {
    var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
    var cb = typeof arg3 === "function" ? arg3 : arg2;
    var listenersKey = hook + "Listeners";
    if (atom[listenersKey]) {
        atom[listenersKey].add(cb);
    }
    else {
        atom[listenersKey] = new Set([cb]);
    }
    var orig = atom[hook];
    if (typeof orig !== "function")
        return fail( true && "Not an atom that can be (un)observed");
    return function () {
        var hookListeners = atom[listenersKey];
        if (hookListeners) {
            hookListeners.delete(cb);
            if (hookListeners.size === 0) {
                delete atom[listenersKey];
            }
        }
    };
}

function configure(options) {
    var enforceActions = options.enforceActions, computedRequiresReaction = options.computedRequiresReaction, computedConfigurable = options.computedConfigurable, disableErrorBoundaries = options.disableErrorBoundaries, reactionScheduler = options.reactionScheduler, reactionRequiresObservable = options.reactionRequiresObservable, observableRequiresReaction = options.observableRequiresReaction;
    if (options.isolateGlobalState === true) {
        isolateGlobalState();
    }
    if (enforceActions !== undefined) {
        if (typeof enforceActions === "boolean" || enforceActions === "strict")
            deprecated("Deprecated value for 'enforceActions', use 'false' => '\"never\"', 'true' => '\"observed\"', '\"strict\"' => \"'always'\" instead");
        var ea = void 0;
        switch (enforceActions) {
            case true:
            case "observed":
                ea = true;
                break;
            case false:
            case "never":
                ea = false;
                break;
            case "strict":
            case "always":
                ea = "strict";
                break;
            default:
                fail("Invalid value for 'enforceActions': '" + enforceActions + "', expected 'never', 'always' or 'observed'");
        }
        globalState.enforceActions = ea;
        globalState.allowStateChanges = ea === true || ea === "strict" ? false : true;
    }
    if (computedRequiresReaction !== undefined) {
        globalState.computedRequiresReaction = !!computedRequiresReaction;
    }
    if (reactionRequiresObservable !== undefined) {
        globalState.reactionRequiresObservable = !!reactionRequiresObservable;
    }
    if (observableRequiresReaction !== undefined) {
        globalState.observableRequiresReaction = !!observableRequiresReaction;
        globalState.allowStateReads = !globalState.observableRequiresReaction;
    }
    if (computedConfigurable !== undefined) {
        globalState.computedConfigurable = !!computedConfigurable;
    }
    if (disableErrorBoundaries !== undefined) {
        if (disableErrorBoundaries === true)
            console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
        globalState.disableErrorBoundaries = !!disableErrorBoundaries;
    }
    if (reactionScheduler) {
        setReactionScheduler(reactionScheduler);
    }
}

function decorate(thing, decorators) {
     true &&
        invariant(isPlainObject(decorators), "Decorators should be a key value map");
    var target = typeof thing === "function" ? thing.prototype : thing;
    var _loop_1 = function (prop) {
        var propertyDecorators = decorators[prop];
        if (!Array.isArray(propertyDecorators)) {
            propertyDecorators = [propertyDecorators];
        }
         true &&
            invariant(propertyDecorators.every(function (decorator) { return typeof decorator === "function"; }), "Decorate: expected a decorator function or array of decorator functions for '" + prop + "'");
        var descriptor = Object.getOwnPropertyDescriptor(target, prop);
        var newDescriptor = propertyDecorators.reduce(function (accDescriptor, decorator) { return decorator(target, prop, accDescriptor); }, descriptor);
        if (newDescriptor)
            Object.defineProperty(target, prop, newDescriptor);
    };
    for (var prop in decorators) {
        _loop_1(prop);
    }
    return thing;
}

function extendObservable(target, properties, decorators, options) {
    if (true) {
        invariant(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
        invariant(typeof target === "object", "'extendObservable' expects an object as first argument");
        invariant(!isObservableMap(target), "'extendObservable' should not be used on maps, use map.merge instead");
    }
    options = asCreateObservableOptions(options);
    var defaultDecorator = getDefaultDecoratorFromObjectOptions(options);
    initializeInstance(target); // Fixes #1740
    asObservableObject(target, options.name, defaultDecorator.enhancer); // make sure object is observable, even without initial props
    if (properties)
        extendObservableObjectWithProperties(target, properties, decorators, defaultDecorator);
    return target;
}
function getDefaultDecoratorFromObjectOptions(options) {
    return options.defaultDecorator || (options.deep === false ? refDecorator : deepDecorator);
}
function extendObservableObjectWithProperties(target, properties, decorators, defaultDecorator) {
    var e_1, _a, e_2, _b;
    if (true) {
        invariant(!isObservable(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
        if (decorators) {
            var keys = getPlainObjectKeys(decorators);
            try {
                for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    if (!(key in properties))
                        fail("Trying to declare a decorator for unspecified property '" + stringifyKey(key) + "'");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    startBatch();
    try {
        var keys = getPlainObjectKeys(properties);
        try {
            for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                var key = keys_2_1.value;
                var descriptor = Object.getOwnPropertyDescriptor(properties, key);
                if (true) {
                    if (!isPlainObject(properties))
                        fail("'extendObservabe' only accepts plain objects as second argument");
                    if (isComputed(descriptor.value))
                        fail("Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead");
                }
                var decorator = decorators && key in decorators
                    ? decorators[key]
                    : descriptor.get
                        ? computedDecorator
                        : defaultDecorator;
                if ( true && typeof decorator !== "function")
                    fail("Not a valid decorator for '" + stringifyKey(key) + "', got: " + decorator);
                var resultDescriptor = decorator(target, key, descriptor, true);
                if (resultDescriptor // otherwise, assume already applied, due to `applyToInstance`
                )
                    Object.defineProperty(target, key, resultDescriptor);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keys_2_1 && !keys_2_1.done && (_b = keys_2.return)) _b.call(keys_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    finally {
        endBatch();
    }
}

function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers(node))
        result.observers = Array.from(getObservers(node)).map(nodeToObserverTree);
    return result;
}

var generatorId = 0;
function FlowCancellationError() {
    this.message = "FLOW_CANCELLED";
}
FlowCancellationError.prototype = Object.create(Error.prototype);
function isFlowCancellationError(error) {
    return error instanceof FlowCancellationError;
}
function flow(generator) {
    if (arguments.length !== 1)
        fail( true && "Flow expects 1 argument and cannot be used as decorator");
    var name = generator.name || "<unnamed flow>";
    // Implementation based on https://github.com/tj/co/blob/master/index.js
    return function () {
        var ctx = this;
        var args = arguments;
        var runId = ++generatorId;
        var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
        var rejector;
        var pendingPromise = undefined;
        var promise = new Promise(function (resolve, reject) {
            var stepId = 0;
            rejector = reject;
            function onFulfilled(res) {
                pendingPromise = undefined;
                var ret;
                try {
                    ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
                }
                catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function onRejected(err) {
                pendingPromise = undefined;
                var ret;
                try {
                    ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.throw).call(gen, err);
                }
                catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function next(ret) {
                if (ret && typeof ret.then === "function") {
                    // an async iterator
                    ret.then(next, reject);
                    return;
                }
                if (ret.done)
                    return resolve(ret.value);
                pendingPromise = Promise.resolve(ret.value);
                return pendingPromise.then(onFulfilled, onRejected);
            }
            onFulfilled(undefined); // kick off the process
        });
        promise.cancel = action(name + " - runid: " + runId + " - cancel", function () {
            try {
                if (pendingPromise)
                    cancelPromise(pendingPromise);
                // Finally block can return (or yield) stuff..
                var res = gen.return(undefined);
                // eat anything that promise would do, it's cancelled!
                var yieldedPromise = Promise.resolve(res.value);
                yieldedPromise.then(noop, noop);
                cancelPromise(yieldedPromise); // maybe it can be cancelled :)
                // reject our original promise
                rejector(new FlowCancellationError());
            }
            catch (e) {
                rejector(e); // there could be a throwing finally block
            }
        });
        return promise;
    };
}
function cancelPromise(promise) {
    if (typeof promise.cancel === "function")
        promise.cancel();
}

function interceptReads(thing, propOrHandler, handler) {
    var target;
    if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
        target = getAdministration(thing);
    }
    else if (isObservableObject(thing)) {
        if (typeof propOrHandler !== "string")
            return fail( true &&
                "InterceptReads can only be used with a specific property, not with an object in general");
        target = getAdministration(thing, propOrHandler);
    }
    else {
        return fail( true &&
            "Expected observable map, object or array as first array");
    }
    if (target.dehancer !== undefined)
        return fail( true && "An intercept reader was already established");
    target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
    return function () {
        target.dehancer = undefined;
    };
}

function intercept(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept(handler);
}

function _isComputed(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false)
            return false;
        if (!value[$mobx].values.has(property))
            return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}
function isComputed(value) {
    if (arguments.length > 1)
        return fail( true &&
            "isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isComputed(value);
}
function isComputedProp(value, propName) {
    if (typeof propName !== "string")
        return fail( true &&
            "isComputed expected a property name as second argument");
    return _isComputed(value, propName);
}

function _isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if ( true &&
            (isObservableMap(value) || isObservableArray(value)))
            return fail("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
        if (isObservableObject(value)) {
            return value[$mobx].values.has(property);
        }
        return false;
    }
    // For first check, see #701
    return (isObservableObject(value) ||
        !!value[$mobx] ||
        isAtom(value) ||
        isReaction(value) ||
        isComputedValue(value));
}
function isObservable(value) {
    if (arguments.length !== 1)
        fail( true &&
            "isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isObservable(value);
}
function isObservableProp(value, propName) {
    if (typeof propName !== "string")
        return fail( true && "expected a property name as second argument");
    return _isObservable(value, propName);
}

function keys(obj) {
    if (isObservableObject(obj)) {
        return obj[$mobx].getKeys();
    }
    if (isObservableMap(obj)) {
        return Array.from(obj.keys());
    }
    if (isObservableSet(obj)) {
        return Array.from(obj.keys());
    }
    if (isObservableArray(obj)) {
        return obj.map(function (_, index) { return index; });
    }
    return fail( true &&
        "'keys()' can only be used on observable objects, arrays, sets and maps");
}
function values(obj) {
    if (isObservableObject(obj)) {
        return keys(obj).map(function (key) { return obj[key]; });
    }
    if (isObservableMap(obj)) {
        return keys(obj).map(function (key) { return obj.get(key); });
    }
    if (isObservableSet(obj)) {
        return Array.from(obj.values());
    }
    if (isObservableArray(obj)) {
        return obj.slice();
    }
    return fail( true &&
        "'values()' can only be used on observable objects, arrays, sets and maps");
}
function entries(obj) {
    if (isObservableObject(obj)) {
        return keys(obj).map(function (key) { return [key, obj[key]]; });
    }
    if (isObservableMap(obj)) {
        return keys(obj).map(function (key) { return [key, obj.get(key)]; });
    }
    if (isObservableSet(obj)) {
        return Array.from(obj.entries());
    }
    if (isObservableArray(obj)) {
        return obj.map(function (key, index) { return [index, key]; });
    }
    return fail( true &&
        "'entries()' can only be used on observable objects, arrays and maps");
}
function set(obj, key, value) {
    if (arguments.length === 2 && !isObservableSet(obj)) {
        startBatch();
        var values_1 = key;
        try {
            for (var key_1 in values_1)
                set(obj, key_1, values_1[key_1]);
        }
        finally {
            endBatch();
        }
        return;
    }
    if (isObservableObject(obj)) {
        var adm = obj[$mobx];
        var existingObservable = adm.values.get(key);
        if (existingObservable) {
            adm.write(key, value);
        }
        else {
            adm.addObservableProp(key, value, adm.defaultEnhancer);
        }
    }
    else if (isObservableMap(obj)) {
        obj.set(key, value);
    }
    else if (isObservableSet(obj)) {
        obj.add(key);
    }
    else if (isObservableArray(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant(key >= 0, "Not a valid index: '" + key + "'");
        startBatch();
        if (key >= obj.length)
            obj.length = key + 1;
        obj[key] = value;
        endBatch();
    }
    else {
        return fail( true &&
            "'set()' can only be used on observable objects, arrays and maps");
    }
}
function remove(obj, key) {
    if (isObservableObject(obj)) {
        obj[$mobx].remove(key);
    }
    else if (isObservableMap(obj)) {
        obj.delete(key);
    }
    else if (isObservableSet(obj)) {
        obj.delete(key);
    }
    else if (isObservableArray(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant(key >= 0, "Not a valid index: '" + key + "'");
        obj.splice(key, 1);
    }
    else {
        return fail( true &&
            "'remove()' can only be used on observable objects, arrays and maps");
    }
}
function has(obj, key) {
    if (isObservableObject(obj)) {
        // return keys(obj).indexOf(key) >= 0
        var adm = getAdministration(obj);
        return adm.has(key);
    }
    else if (isObservableMap(obj)) {
        return obj.has(key);
    }
    else if (isObservableSet(obj)) {
        return obj.has(key);
    }
    else if (isObservableArray(obj)) {
        return key >= 0 && key < obj.length;
    }
    else {
        return fail( true &&
            "'has()' can only be used on observable objects, arrays and maps");
    }
}
function get(obj, key) {
    if (!has(obj, key))
        return undefined;
    if (isObservableObject(obj)) {
        return obj[key];
    }
    else if (isObservableMap(obj)) {
        return obj.get(key);
    }
    else if (isObservableArray(obj)) {
        return obj[key];
    }
    else {
        return fail( true &&
            "'get()' can only be used on observable objects, arrays and maps");
    }
}

function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration(thing, property).observe(listener, fireImmediately);
}

var defaultOptions = {
    detectCycles: true,
    exportMapsAsObjects: true,
    recurseEverything: false
};
function cache(map, key, value, options) {
    if (options.detectCycles)
        map.set(key, value);
    return value;
}
function toJSHelper(source, options, __alreadySeen) {
    if (!options.recurseEverything && !isObservable(source))
        return source;
    if (typeof source !== "object")
        return source;
    // Directly return null if source is null
    if (source === null)
        return null;
    // Directly return the Date object itself if contained in the observable
    if (source instanceof Date)
        return source;
    if (isObservableValue(source))
        return toJSHelper(source.get(), options, __alreadySeen);
    // make sure we track the keys of the object
    if (isObservable(source))
        keys(source);
    var detectCycles = options.detectCycles === true;
    if (detectCycles && source !== null && __alreadySeen.has(source)) {
        return __alreadySeen.get(source);
    }
    if (isObservableArray(source) || Array.isArray(source)) {
        var res_1 = cache(__alreadySeen, source, [], options);
        var toAdd = source.map(function (value) { return toJSHelper(value, options, __alreadySeen); });
        res_1.length = toAdd.length;
        for (var i = 0, l = toAdd.length; i < l; i++)
            res_1[i] = toAdd[i];
        return res_1;
    }
    if (isObservableSet(source) || Object.getPrototypeOf(source) === Set.prototype) {
        if (options.exportMapsAsObjects === false) {
            var res_2 = cache(__alreadySeen, source, new Set(), options);
            source.forEach(function (value) {
                res_2.add(toJSHelper(value, options, __alreadySeen));
            });
            return res_2;
        }
        else {
            var res_3 = cache(__alreadySeen, source, [], options);
            source.forEach(function (value) {
                res_3.push(toJSHelper(value, options, __alreadySeen));
            });
            return res_3;
        }
    }
    if (isObservableMap(source) || Object.getPrototypeOf(source) === Map.prototype) {
        if (options.exportMapsAsObjects === false) {
            var res_4 = cache(__alreadySeen, source, new Map(), options);
            source.forEach(function (value, key) {
                res_4.set(key, toJSHelper(value, options, __alreadySeen));
            });
            return res_4;
        }
        else {
            var res_5 = cache(__alreadySeen, source, {}, options);
            source.forEach(function (value, key) {
                res_5[key] = toJSHelper(value, options, __alreadySeen);
            });
            return res_5;
        }
    }
    // Fallback to the situation that source is an ObservableObject or a plain object
    var res = cache(__alreadySeen, source, {}, options);
    getPlainObjectKeys(source).forEach(function (key) {
        res[key] = toJSHelper(source[key], options, __alreadySeen);
    });
    return res;
}
function toJS(source, options) {
    // backward compatibility
    if (typeof options === "boolean")
        options = { detectCycles: options };
    if (!options)
        options = defaultOptions;
    options.detectCycles =
        options.detectCycles === undefined
            ? options.recurseEverything === true
            : options.detectCycles === true;
    var __alreadySeen;
    if (options.detectCycles)
        __alreadySeen = new Map();
    return toJSHelper(source, options, __alreadySeen);
}

function trace() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var enterBreakPoint = false;
    if (typeof args[args.length - 1] === "boolean")
        enterBreakPoint = args.pop();
    var derivation = getAtomFromArgs(args);
    if (!derivation) {
        return fail( true &&
            "'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    }
    if (derivation.isTracing === TraceMode.NONE) {
        console.log("[mobx.trace] '" + derivation.name + "' tracing enabled");
    }
    derivation.isTracing = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
}
function getAtomFromArgs(args) {
    switch (args.length) {
        case 0:
            return globalState.trackingDerivation;
        case 1:
            return getAtom(args[0]);
        case 2:
            return getAtom(args[0], args[1]);
    }
}

/**
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */
function transaction(action, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    startBatch();
    try {
        return action.apply(thisArg);
    }
    finally {
        endBatch();
    }
}

function when(predicate, arg1, arg2) {
    if (arguments.length === 1 || (arg1 && typeof arg1 === "object"))
        return whenPromise(predicate, arg1);
    return _when(predicate, arg1, arg2 || {});
}
function _when(predicate, effect, opts) {
    var timeoutHandle;
    if (typeof opts.timeout === "number") {
        timeoutHandle = setTimeout(function () {
            if (!disposer[$mobx].isDisposed) {
                disposer();
                var error = new Error("WHEN_TIMEOUT");
                if (opts.onError)
                    opts.onError(error);
                else
                    throw error;
            }
        }, opts.timeout);
    }
    opts.name = opts.name || "When@" + getNextId();
    var effectAction = createAction(opts.name + "-effect", effect);
    var disposer = autorun(function (r) {
        if (predicate()) {
            r.dispose();
            if (timeoutHandle)
                clearTimeout(timeoutHandle);
            effectAction();
        }
    }, opts);
    return disposer;
}
function whenPromise(predicate, opts) {
    if ( true && opts && opts.onError)
        return fail("the options 'onError' and 'promise' cannot be combined");
    var cancel;
    var res = new Promise(function (resolve, reject) {
        var disposer = _when(predicate, resolve, __assign(__assign({}, opts), { onError: reject }));
        cancel = function () {
            disposer();
            reject("WHEN_CANCELLED");
        };
    });
    res.cancel = cancel;
    return res;
}

function getAdm(target) {
    return target[$mobx];
}
function isPropertyKey(val) {
    return typeof val === "string" || typeof val === "number" || typeof val === "symbol";
}
// Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
// and skip either the internal values map, or the base object with its property descriptors!
var objectProxyTraps = {
    has: function (target, name) {
        if (name === $mobx || name === "constructor" || name === mobxDidRunLazyInitializersSymbol)
            return true;
        var adm = getAdm(target);
        // MWE: should `in` operator be reactive? If not, below code path will be faster / more memory efficient
        // TODO: check performance stats!
        // if (adm.values.get(name as string)) return true
        if (isPropertyKey(name))
            return adm.has(name);
        return name in target;
    },
    get: function (target, name) {
        if (name === $mobx || name === "constructor" || name === mobxDidRunLazyInitializersSymbol)
            return target[name];
        var adm = getAdm(target);
        var observable = adm.values.get(name);
        if (observable instanceof Atom) {
            var result = observable.get();
            if (result === undefined) {
                // This fixes #1796, because deleting a prop that has an
                // undefined value won't retrigger a observer (no visible effect),
                // the autorun wouldn't subscribe to future key changes (see also next comment)
                adm.has(name);
            }
            return result;
        }
        // make sure we start listening to future keys
        // note that we only do this here for optimization
        if (isPropertyKey(name))
            adm.has(name);
        return target[name];
    },
    set: function (target, name, value) {
        if (!isPropertyKey(name))
            return false;
        set(target, name, value);
        return true;
    },
    deleteProperty: function (target, name) {
        if (!isPropertyKey(name))
            return false;
        var adm = getAdm(target);
        adm.remove(name);
        return true;
    },
    ownKeys: function (target) {
        var adm = getAdm(target);
        adm.keysAtom.reportObserved();
        return Reflect.ownKeys(target);
    },
    preventExtensions: function (target) {
        fail("Dynamic observable objects cannot be frozen");
        return false;
    }
};
function createDynamicObservableObject(base) {
    var proxy = new Proxy(base, objectProxyTraps);
    base[$mobx].proxy = proxy;
    return proxy;
}

function hasInterceptors(interceptable) {
    return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
}
function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
        // Interceptor can modify the array, copy it to avoid concurrent modification, see #1950
        var interceptors = __spread((interceptable.interceptors || []));
        for (var i = 0, l = interceptors.length; i < l; i++) {
            change = interceptors[i](change);
            invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
            if (!change)
                break;
        }
        return change;
    }
    finally {
        untrackedEnd(prevU);
    }
}

function hasListeners(listenable) {
    return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd(prevU);
}

var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
var arrayTraps = {
    get: function (target, name) {
        if (name === $mobx)
            return target[$mobx];
        if (name === "length")
            return target[$mobx].getArrayLength();
        if (typeof name === "number") {
            return arrayExtensions.get.call(target, name);
        }
        if (typeof name === "string" && !isNaN(name)) {
            return arrayExtensions.get.call(target, parseInt(name));
        }
        if (arrayExtensions.hasOwnProperty(name)) {
            return arrayExtensions[name];
        }
        return target[name];
    },
    set: function (target, name, value) {
        if (name === "length") {
            target[$mobx].setArrayLength(value);
        }
        if (typeof name === "number") {
            arrayExtensions.set.call(target, name, value);
        }
        if (typeof name === "symbol" || isNaN(name)) {
            target[name] = value;
        }
        else {
            // numeric string
            arrayExtensions.set.call(target, parseInt(name), value);
        }
        return true;
    },
    preventExtensions: function (target) {
        fail("Observable arrays cannot be frozen");
        return false;
    }
};
function createObservableArray(initialValues, enhancer, name, owned) {
    if (name === void 0) { name = "ObservableArray@" + getNextId(); }
    if (owned === void 0) { owned = false; }
    var adm = new ObservableArrayAdministration(name, enhancer, owned);
    addHiddenFinalProp(adm.values, $mobx, adm);
    var proxy = new Proxy(adm.values, arrayTraps);
    adm.proxy = proxy;
    if (initialValues && initialValues.length) {
        var prev = allowStateChangesStart(true);
        adm.spliceWithArray(0, 0, initialValues);
        allowStateChangesEnd(prev);
    }
    return proxy;
}
var ObservableArrayAdministration = /** @class */ (function () {
    function ObservableArrayAdministration(name, enhancer, owned) {
        this.owned = owned;
        this.values = [];
        this.proxy = undefined;
        this.lastKnownLength = 0;
        this.atom = new Atom(name || "ObservableArray@" + getNextId());
        this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name + "[..]"); };
    }
    ObservableArrayAdministration.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableArrayAdministration.prototype.dehanceValues = function (values) {
        if (this.dehancer !== undefined && values.length > 0)
            return values.map(this.dehancer);
        return values;
    };
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        if (fireImmediately) {
            listener({
                object: this.proxy,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0)
            throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength) {
            var newItems = new Array(newLength - currentLength);
            for (var i = 0; i < newLength - currentLength; i++)
                newItems[i] = undefined; // No Array.fill everywhere...
            this.spliceWithArray(currentLength, 0, newItems);
        }
        else
            this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed.");
        this.lastKnownLength += delta;
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this.atom);
        var length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = EMPTY_ARRAY;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.proxy,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.length === 0 ? newItems : newItems.map(function (v) { return _this.enhancer(v, undefined); });
        if (true) {
            var lengthDelta = newItems.length - deleteCount;
            this.updateArrayLength(length, lengthDelta); // checks if internal array wasn't modified
        }
        var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return this.dehanceValues(res);
    };
    ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
        var _a;
        if (newItems.length < MAX_SPLICE_SIZE) {
            return (_a = this.values).splice.apply(_a, __spread([index, deleteCount], newItems));
        }
        else {
            var res = this.values.slice(index, index + deleteCount);
            this.values = this.values
                .slice(0, index)
                .concat(newItems, this.values.slice(index + deleteCount));
            return res;
        }
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy
            ? {
                object: this.proxy,
                type: "update",
                index: index,
                newValue: newValue,
                oldValue: oldValue
            }
            : null;
        // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
        // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled
        if (notifySpy && "development" !== "production")
            spyReportStart(__assign(__assign({}, change), { name: this.atom.name }));
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy
            ? {
                object: this.proxy,
                type: "splice",
                index: index,
                removed: removed,
                added: added,
                removedCount: removed.length,
                addedCount: added.length
            }
            : null;
        if (notifySpy && "development" !== "production")
            spyReportStart(__assign(__assign({}, change), { name: this.atom.name }));
        this.atom.reportChanged();
        // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd();
    };
    return ObservableArrayAdministration;
}());
var arrayExtensions = {
    intercept: function (handler) {
        return this[$mobx].intercept(handler);
    },
    observe: function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        var adm = this[$mobx];
        return adm.observe(listener, fireImmediately);
    },
    clear: function () {
        return this.splice(0);
    },
    replace: function (newItems) {
        var adm = this[$mobx];
        return adm.spliceWithArray(0, adm.values.length, newItems);
    },
    /**
     * Converts this array back to a (shallow) javascript structure.
     * For a deep clone use mobx.toJS
     */
    toJS: function () {
        return this.slice();
    },
    toJSON: function () {
        // Used by JSON.stringify
        return this.toJS();
    },
    /*
     * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
     * since these functions alter the inner structure of the array, the have side effects.
     * Because the have side effects, they should not be used in computed function,
     * and for that reason the do not call dependencyState.notifyObserved
     */
    splice: function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        var adm = this[$mobx];
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return adm.spliceWithArray(index);
            case 2:
                return adm.spliceWithArray(index, deleteCount);
        }
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    spliceWithArray: function (index, deleteCount, newItems) {
        var adm = this[$mobx];
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    push: function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this[$mobx];
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    },
    pop: function () {
        return this.splice(Math.max(this[$mobx].values.length - 1, 0), 1)[0];
    },
    shift: function () {
        return this.splice(0, 1)[0];
    },
    unshift: function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this[$mobx];
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    },
    reverse: function () {
        // reverse by default mutates in place before returning the result
        // which makes it both a 'derivation' and a 'mutation'.
        // so we deviate from the default and just make it an dervitation
        if (true) {
            console.warn("[mobx] `observableArray.reverse()` will not update the array in place. Use `observableArray.slice().reverse()` to suppress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().reverse())` to reverse & update in place");
        }
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    },
    sort: function (compareFn) {
        // sort by default mutates in place before returning the result
        // which goes against all good practices. Let's not change the array in place!
        if (true) {
            console.warn("[mobx] `observableArray.sort()` will not update the array in place. Use `observableArray.slice().sort()` to suppress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().sort())` to sort & update in place");
        }
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    },
    remove: function (value) {
        var adm = this[$mobx];
        var idx = adm.dehanceValues(adm.values).indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    },
    get: function (index) {
        var adm = this[$mobx];
        if (adm) {
            if (index < adm.values.length) {
                adm.atom.reportObserved();
                return adm.dehanceValue(adm.values[index]);
            }
            console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + adm.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        }
        return undefined;
    },
    set: function (index, newValue) {
        var adm = this[$mobx];
        var values = adm.values;
        if (index < values.length) {
            // update at index in range
            checkIfStateModificationsAreAllowed(adm.atom);
            var oldValue = values[index];
            if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                    type: "update",
                    object: adm.proxy,
                    index: index,
                    newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            var changed = newValue !== oldValue;
            if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values.length) {
            // add a new item
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else {
            // out of bounds
            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
        }
    }
};
[
    "concat",
    "every",
    "filter",
    "forEach",
    "indexOf",
    "join",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some",
    "toString",
    "toLocaleString"
].forEach(function (funcName) {
    arrayExtensions[funcName] = function () {
        var adm = this[$mobx];
        adm.atom.reportObserved();
        var res = adm.dehanceValues(adm.values);
        return res[funcName].apply(res, arguments);
    };
});
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
}

var _a;
var ObservableMapMarker = {};
// just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
// But: https://github.com/mobxjs/mobx/issues/1556
var ObservableMap = /** @class */ (function () {
    function ObservableMap(initialData, enhancer, name) {
        if (enhancer === void 0) { enhancer = deepEnhancer; }
        if (name === void 0) { name = "ObservableMap@" + getNextId(); }
        this.enhancer = enhancer;
        this.name = name;
        this[_a] = ObservableMapMarker;
        this._keysAtom = createAtom(this.name + ".keys()");
        this[Symbol.toStringTag] = "Map";
        if (typeof Map !== "function") {
            throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
        }
        this._data = new Map();
        this._hasMap = new Map();
        this.merge(initialData);
    }
    ObservableMap.prototype._has = function (key) {
        return this._data.has(key);
    };
    ObservableMap.prototype.has = function (key) {
        var _this = this;
        if (!globalState.trackingDerivation)
            return this._has(key);
        var entry = this._hasMap.get(key);
        if (!entry) {
            // todo: replace with atom (breaking change)
            var newEntry = (entry = new ObservableValue(this._has(key), referenceEnhancer, this.name + "." + stringifyKey(key) + "?", false));
            this._hasMap.set(key, newEntry);
            onBecomeUnobserved(newEntry, function () { return _this._hasMap.delete(key); });
        }
        return entry.get();
    };
    ObservableMap.prototype.set = function (key, value) {
        var hasKey = this._has(key);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        }
        else {
            this._addValue(key, value);
        }
        return this;
    };
    ObservableMap.prototype.delete = function (key) {
        var _this = this;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy
                ? {
                    type: "delete",
                    object: this,
                    oldValue: this._data.get(key).value,
                    name: key
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
            transaction(function () {
                _this._keysAtom.reportChanged();
                _this._updateHasMapEntry(key, false);
                var observable = _this._data.get(key);
                observable.setNewValue(undefined);
                _this._data.delete(key);
            });
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
        var entry = this._hasMap.get(key);
        if (entry) {
            entry.setNewValue(value);
        }
    };
    ObservableMap.prototype._updateValue = function (key, newValue) {
        var observable = this._data.get(key);
        newValue = observable.prepareNewValue(newValue);
        if (newValue !== globalState.UNCHANGED) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy
                ? {
                    type: "update",
                    object: this,
                    oldValue: observable.value,
                    name: key,
                    newValue: newValue
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd();
        }
    };
    ObservableMap.prototype._addValue = function (key, newValue) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this._keysAtom);
        transaction(function () {
            var observable = new ObservableValue(newValue, _this.enhancer, _this.name + "." + stringifyKey(key), false);
            _this._data.set(key, observable);
            newValue = observable.value; // value might have been changed
            _this._updateHasMapEntry(key, true);
            _this._keysAtom.reportChanged();
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy
            ? {
                type: "add",
                object: this,
                name: key,
                newValue: newValue
            }
            : null;
        if (notifySpy && "development" !== "production")
            spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd();
    };
    ObservableMap.prototype.get = function (key) {
        if (this.has(key))
            return this.dehanceValue(this._data.get(key).get());
        return this.dehanceValue(undefined);
    };
    ObservableMap.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableMap.prototype.keys = function () {
        this._keysAtom.reportObserved();
        return this._data.keys();
    };
    ObservableMap.prototype.values = function () {
        var self = this;
        var nextIndex = 0;
        var keys = Array.from(this.keys());
        return makeIterable({
            next: function () {
                return nextIndex < keys.length
                    ? { value: self.get(keys[nextIndex++]), done: false }
                    : { done: true };
            }
        });
    };
    ObservableMap.prototype.entries = function () {
        var self = this;
        var nextIndex = 0;
        var keys = Array.from(this.keys());
        return makeIterable({
            next: function () {
                if (nextIndex < keys.length) {
                    var key = keys[nextIndex++];
                    return {
                        value: [key, self.get(key)],
                        done: false
                    };
                }
                return { done: true };
            }
        });
    };
    ObservableMap.prototype[(_a = $mobx, Symbol.iterator)] = function () {
        return this.entries();
    };
    ObservableMap.prototype.forEach = function (callback, thisArg) {
        var e_1, _b;
        try {
            for (var _c = __values(this), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                callback.call(thisArg, value, key, this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /** Merge another object into this object, returns this. */
    ObservableMap.prototype.merge = function (other) {
        var _this = this;
        if (isObservableMap(other)) {
            other = other.toJS();
        }
        transaction(function () {
            if (isPlainObject(other))
                getPlainObjectKeys(other).forEach(function (key) { return _this.set(key, other[key]); });
            else if (Array.isArray(other))
                other.forEach(function (_b) {
                    var _c = __read(_b, 2), key = _c[0], value = _c[1];
                    return _this.set(key, value);
                });
            else if (isES6Map(other)) {
                if (other.constructor !== Map)
                    fail("Cannot initialize from classes that inherit from Map: " + other.constructor.name); // prettier-ignore
                other.forEach(function (value, key) { return _this.set(key, value); });
            }
            else if (other !== null && other !== undefined)
                fail("Cannot initialize map from " + other);
        });
        return this;
    };
    ObservableMap.prototype.clear = function () {
        var _this = this;
        transaction(function () {
            untracked(function () {
                var e_2, _b;
                try {
                    for (var _c = __values(_this.keys()), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var key = _d.value;
                        _this.delete(key);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
        });
    };
    ObservableMap.prototype.replace = function (values) {
        var _this = this;
        transaction(function () {
            // grab all the keys that are present in the new map but not present in the current map
            // and delete them from the map, then merge the new map
            // this will cause reactions only on changed values
            var newKeys = getMapLikeKeys(values);
            var oldKeys = Array.from(_this.keys());
            var missingKeys = oldKeys.filter(function (k) { return newKeys.indexOf(k) === -1; });
            missingKeys.forEach(function (k) { return _this.delete(k); });
            _this.merge(values);
        });
        return this;
    };
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            this._keysAtom.reportObserved();
            return this._data.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a plain object that represents this map.
     * Note that all the keys being stringified.
     * If there are duplicating keys after converting them to strings, behaviour is undetermined.
     */
    ObservableMap.prototype.toPOJO = function () {
        var e_3, _b;
        var res = {};
        try {
            for (var _c = __values(this), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                // We lie about symbol key types due to https://github.com/Microsoft/TypeScript/issues/1863
                res[typeof key === "symbol" ? key : stringifyKey(key)] = value;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return res;
    };
    /**
     * Returns a shallow non observable object clone of this map.
     * Note that the values migth still be observable. For a deep clone use mobx.toJS.
     */
    ObservableMap.prototype.toJS = function () {
        return new Map(this);
    };
    ObservableMap.prototype.toJSON = function () {
        // Used by JSON.stringify
        return this.toPOJO();
    };
    ObservableMap.prototype.toString = function () {
        var _this = this;
        return (this.name +
            "[{ " +
            Array.from(this.keys())
                .map(function (key) { return stringifyKey(key) + ": " + ("" + _this.get(key)); })
                .join(", ") +
            " }]");
    };
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    ObservableMap.prototype.observe = function (listener, fireImmediately) {
         true &&
            invariant(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
        return registerListener(this, listener);
    };
    ObservableMap.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableMap;
}());
/* 'var' fixes small-build issue */
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);

var _a$1;
var ObservableSetMarker = {};
var ObservableSet = /** @class */ (function () {
    function ObservableSet(initialData, enhancer, name) {
        if (enhancer === void 0) { enhancer = deepEnhancer; }
        if (name === void 0) { name = "ObservableSet@" + getNextId(); }
        this.name = name;
        this[_a$1] = ObservableSetMarker;
        this._data = new Set();
        this._atom = createAtom(this.name);
        this[Symbol.toStringTag] = "Set";
        if (typeof Set !== "function") {
            throw new Error("mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js");
        }
        this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name); };
        if (initialData) {
            this.replace(initialData);
        }
    }
    ObservableSet.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableSet.prototype.clear = function () {
        var _this = this;
        transaction(function () {
            untracked(function () {
                var e_1, _b;
                try {
                    for (var _c = __values(_this._data.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var value = _d.value;
                        _this.delete(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        });
    };
    ObservableSet.prototype.forEach = function (callbackFn, thisArg) {
        var e_2, _b;
        try {
            for (var _c = __values(this), _d = _c.next(); !_d.done; _d = _c.next()) {
                var value = _d.value;
                callbackFn.call(thisArg, value, value, this);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Object.defineProperty(ObservableSet.prototype, "size", {
        get: function () {
            this._atom.reportObserved();
            return this._data.size;
        },
        enumerable: true,
        configurable: true
    });
    ObservableSet.prototype.add = function (value) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this._atom);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "add",
                object: this,
                newValue: value
            });
            if (!change)
                return this;
            // TODO: ideally, value = change.value would be done here, so that values can be
            // changed by interceptor. Same applies for other Set and Map api's.
        }
        if (!this.has(value)) {
            transaction(function () {
                _this._data.add(_this.enhancer(value, undefined));
                _this._atom.reportChanged();
            });
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy
                ? {
                    type: "add",
                    object: this,
                    newValue: value
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart(change);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd();
        }
        return this;
    };
    ObservableSet.prototype.delete = function (value) {
        var _this = this;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "delete",
                object: this,
                oldValue: value
            });
            if (!change)
                return false;
        }
        if (this.has(value)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy
                ? {
                    type: "delete",
                    object: this,
                    oldValue: value
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart(__assign(__assign({}, change), { name: this.name }));
            transaction(function () {
                _this._atom.reportChanged();
                _this._data.delete(value);
            });
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableSet.prototype.has = function (value) {
        this._atom.reportObserved();
        return this._data.has(this.dehanceValue(value));
    };
    ObservableSet.prototype.entries = function () {
        var nextIndex = 0;
        var keys = Array.from(this.keys());
        var values = Array.from(this.values());
        return makeIterable({
            next: function () {
                var index = nextIndex;
                nextIndex += 1;
                return index < values.length
                    ? { value: [keys[index], values[index]], done: false }
                    : { done: true };
            }
        });
    };
    ObservableSet.prototype.keys = function () {
        return this.values();
    };
    ObservableSet.prototype.values = function () {
        this._atom.reportObserved();
        var self = this;
        var nextIndex = 0;
        var observableValues = Array.from(this._data.values());
        return makeIterable({
            next: function () {
                return nextIndex < observableValues.length
                    ? { value: self.dehanceValue(observableValues[nextIndex++]), done: false }
                    : { done: true };
            }
        });
    };
    ObservableSet.prototype.replace = function (other) {
        var _this = this;
        if (isObservableSet(other)) {
            other = other.toJS();
        }
        transaction(function () {
            if (Array.isArray(other)) {
                _this.clear();
                other.forEach(function (value) { return _this.add(value); });
            }
            else if (isES6Set(other)) {
                _this.clear();
                other.forEach(function (value) { return _this.add(value); });
            }
            else if (other !== null && other !== undefined) {
                fail("Cannot initialize set from " + other);
            }
        });
        return this;
    };
    ObservableSet.prototype.observe = function (listener, fireImmediately) {
        // TODO 'fireImmediately' can be true?
         true &&
            invariant(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with sets.");
        return registerListener(this, listener);
    };
    ObservableSet.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableSet.prototype.toJS = function () {
        return new Set(this);
    };
    ObservableSet.prototype.toString = function () {
        return this.name + "[ " + Array.from(this).join(", ") + " ]";
    };
    ObservableSet.prototype[(_a$1 = $mobx, Symbol.iterator)] = function () {
        return this.values();
    };
    return ObservableSet;
}());
var isObservableSet = createInstanceofPredicate("ObservableSet", ObservableSet);

var ObservableObjectAdministration = /** @class */ (function () {
    function ObservableObjectAdministration(target, values, name, defaultEnhancer) {
        if (values === void 0) { values = new Map(); }
        this.target = target;
        this.values = values;
        this.name = name;
        this.defaultEnhancer = defaultEnhancer;
        this.keysAtom = new Atom(name + ".keys");
    }
    ObservableObjectAdministration.prototype.read = function (key) {
        return this.values.get(key).get();
    };
    ObservableObjectAdministration.prototype.write = function (key, newValue) {
        var instance = this.target;
        var observable = this.values.get(key);
        if (observable instanceof ComputedValue) {
            observable.set(newValue);
            return;
        }
        // intercept
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "update",
                object: this.proxy || instance,
                name: key,
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        newValue = observable.prepareNewValue(newValue);
        // notify spy & observers
        if (newValue !== globalState.UNCHANGED) {
            var notify = hasListeners(this);
            var notifySpy = isSpyEnabled();
            var change = notify || notifySpy
                ? {
                    type: "update",
                    object: this.proxy || instance,
                    oldValue: observable.value,
                    name: key,
                    newValue: newValue
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd();
        }
    };
    ObservableObjectAdministration.prototype.has = function (key) {
        var map = this.pendingKeys || (this.pendingKeys = new Map());
        var entry = map.get(key);
        if (entry)
            return entry.get();
        else {
            var exists = !!this.values.get(key);
            // Possible optimization: Don't have a separate map for non existing keys,
            // but store them in the values map instead, using a special symbol to denote "not existing"
            entry = new ObservableValue(exists, referenceEnhancer, this.name + "." + stringifyKey(key) + "?", false);
            map.set(key, entry);
            return entry.get(); // read to subscribe
        }
    };
    ObservableObjectAdministration.prototype.addObservableProp = function (propName, newValue, enhancer) {
        if (enhancer === void 0) { enhancer = this.defaultEnhancer; }
        var target = this.target;
        assertPropertyConfigurable(target, propName);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.proxy || target,
                name: propName,
                type: "add",
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        var observable = new ObservableValue(newValue, enhancer, this.name + "." + stringifyKey(propName), false);
        this.values.set(propName, observable);
        newValue = observable.value; // observableValue might have changed it
        Object.defineProperty(target, propName, generateObservablePropConfig(propName));
        this.notifyPropertyAddition(propName, newValue);
    };
    ObservableObjectAdministration.prototype.addComputedProp = function (propertyOwner, // where is the property declared?
    propName, options) {
        var target = this.target;
        options.name = options.name || this.name + "." + stringifyKey(propName);
        this.values.set(propName, new ComputedValue(options));
        if (propertyOwner === target || isPropertyConfigurable(propertyOwner, propName))
            Object.defineProperty(propertyOwner, propName, generateComputedPropConfig(propName));
    };
    ObservableObjectAdministration.prototype.remove = function (key) {
        if (!this.values.has(key))
            return;
        var target = this.target;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.proxy || target,
                name: key,
                type: "remove"
            });
            if (!change)
                return;
        }
        try {
            startBatch();
            var notify = hasListeners(this);
            var notifySpy = isSpyEnabled();
            var oldObservable = this.values.get(key);
            var oldValue = oldObservable && oldObservable.get();
            oldObservable && oldObservable.set(undefined);
            // notify key and keyset listeners
            this.keysAtom.reportChanged();
            this.values.delete(key);
            if (this.pendingKeys) {
                var entry = this.pendingKeys.get(key);
                if (entry)
                    entry.set(false);
            }
            // delete the prop
            delete this.target[key];
            var change = notify || notifySpy
                ? {
                    type: "remove",
                    object: this.proxy || target,
                    oldValue: oldValue,
                    name: key
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd();
        }
        finally {
            endBatch();
        }
    };
    ObservableObjectAdministration.prototype.illegalAccess = function (owner, propName) {
        /**
         * This happens if a property is accessed through the prototype chain, but the property was
         * declared directly as own property on the prototype.
         *
         * E.g.:
         * class A {
         * }
         * extendObservable(A.prototype, { x: 1 })
         *
         * classB extens A {
         * }
         * console.log(new B().x)
         *
         * It is unclear whether the property should be considered 'static' or inherited.
         * Either use `console.log(A.x)`
         * or: decorate(A, { x: observable })
         *
         * When using decorate, the property will always be redeclared as own property on the actual instance
         */
        console.warn("Property '" + propName + "' of '" + owner + "' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner");
    };
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
         true &&
            invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
    };
    ObservableObjectAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableObjectAdministration.prototype.notifyPropertyAddition = function (key, newValue) {
        var notify = hasListeners(this);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy
            ? {
                type: "add",
                object: this.proxy || this.target,
                name: key,
                newValue: newValue
            }
            : null;
        if (notifySpy && "development" !== "production")
            spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd();
        if (this.pendingKeys) {
            var entry = this.pendingKeys.get(key);
            if (entry)
                entry.set(true);
        }
        this.keysAtom.reportChanged();
    };
    ObservableObjectAdministration.prototype.getKeys = function () {
        var e_1, _a;
        this.keysAtom.reportObserved();
        // return Reflect.ownKeys(this.values) as any
        var res = [];
        try {
            for (var _b = __values(this.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (value instanceof ObservableValue)
                    res.push(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return res;
    };
    return ObservableObjectAdministration;
}());
function asObservableObject(target, name, defaultEnhancer) {
    if (name === void 0) { name = ""; }
    if (defaultEnhancer === void 0) { defaultEnhancer = deepEnhancer; }
    if (Object.prototype.hasOwnProperty.call(target, $mobx))
        return target[$mobx];
     true &&
        invariant(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
    if (!isPlainObject(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
    if (!name)
        name = "ObservableObject@" + getNextId();
    var adm = new ObservableObjectAdministration(target, new Map(), stringifyKey(name), defaultEnhancer);
    addHiddenProp(target, $mobx, adm);
    return adm;
}
var observablePropertyConfigs = Object.create(null);
var computedPropertyConfigs = Object.create(null);
function generateObservablePropConfig(propName) {
    return (observablePropertyConfigs[propName] ||
        (observablePropertyConfigs[propName] = {
            configurable: true,
            enumerable: true,
            get: function () {
                return this[$mobx].read(propName);
            },
            set: function (v) {
                this[$mobx].write(propName, v);
            }
        }));
}
function getAdministrationForComputedPropOwner(owner) {
    var adm = owner[$mobx];
    if (!adm) {
        // because computed props are declared on proty,
        // the current instance might not have been initialized yet
        initializeInstance(owner);
        return owner[$mobx];
    }
    return adm;
}
function generateComputedPropConfig(propName) {
    return (computedPropertyConfigs[propName] ||
        (computedPropertyConfigs[propName] = {
            configurable: globalState.computedConfigurable,
            enumerable: false,
            get: function () {
                return getAdministrationForComputedPropOwner(this).read(propName);
            },
            set: function (v) {
                getAdministrationForComputedPropOwner(this).write(propName, v);
            }
        }));
}
var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance(thing);
        return isObservableObjectAdministration(thing[$mobx]);
    }
    return false;
}

function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            if (property !== undefined)
                fail( true &&
                    "It is not possible to get index atoms from arrays");
            return thing[$mobx].atom;
        }
        if (isObservableSet(thing)) {
            return thing[$mobx];
        }
        if (isObservableMap(thing)) {
            var anyThing = thing;
            if (property === undefined)
                return anyThing._keysAtom;
            var observable = anyThing._data.get(property) || anyThing._hasMap.get(property);
            if (!observable)
                fail( true &&
                    "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
            return observable;
        }
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance(thing);
        if (property && !thing[$mobx])
            thing[property]; // See #1072
        if (isObservableObject(thing)) {
            if (!property)
                return fail( true && "please specify a property");
            var observable = thing[$mobx].values.get(property);
            if (!observable)
                fail( true &&
                    "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
            return observable;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction(thing[$mobx])) {
            // disposer function
            return thing[$mobx];
        }
    }
    return fail( true && "Cannot obtain atom from " + thing);
}
function getAdministration(thing, property) {
    if (!thing)
        fail("Expecting some object");
    if (property !== undefined)
        return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
        return thing;
    if (isObservableMap(thing) || isObservableSet(thing))
        return thing;
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    initializeInstance(thing);
    if (thing[$mobx])
        return thing[$mobx];
    fail( true && "Cannot obtain administration from " + thing);
}
function getDebugName(thing, property) {
    var named;
    if (property !== undefined)
        named = getAtom(thing, property);
    else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing))
        named = getAdministration(thing);
    else
        named = getAtom(thing); // valid for arrays as well
    return named.name;
}

var toString = Object.prototype.toString;
function deepEqual(a, b, depth) {
    if (depth === void 0) { depth = -1; }
    return eq(a, b, depth);
}
// Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
// Internal recursive comparison function for `isEqual`.
function eq(a, b, depth, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b)
        return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null)
        return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a)
        return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== "function" && type !== "object" && typeof b != "object")
        return false;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b))
        return false;
    switch (className) {
        // Strings, numbers, regular expressions, dates, and booleans are compared by value.
        case "[object RegExp]":
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
        case "[object String]":
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return "" + a === "" + b;
        case "[object Number]":
            // `NaN`s are equivalent, but non-reflexive.
            // Object(NaN) is equivalent to NaN.
            if (+a !== +a)
                return +b !== +b;
            // An `egal` comparison is performed for other numeric values.
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case "[object Date]":
        case "[object Boolean]":
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a === +b;
        case "[object Symbol]":
            return (typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b));
        case "[object Map]":
        case "[object Set]":
            // Maps and Sets are unwrapped to arrays of entry-pairs, adding an incidental level.
            // Hide this extra level by increasing the depth.
            if (depth >= 0) {
                depth++;
            }
            break;
    }
    // Unwrap any wrapped objects.
    a = unwrap(a);
    b = unwrap(b);
    var areArrays = className === "[object Array]";
    if (!areArrays) {
        if (typeof a != "object" || typeof b != "object")
            return false;
        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor &&
            !(typeof aCtor === "function" &&
                aCtor instanceof aCtor &&
                typeof bCtor === "function" &&
                bCtor instanceof bCtor) &&
            ("constructor" in a && "constructor" in b)) {
            return false;
        }
    }
    if (depth === 0) {
        return false;
    }
    else if (depth < 0) {
        depth = -1;
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a)
            return bStack[length] === b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    // Recursively compare objects and arrays.
    if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length)
            return false;
        // Deep compare the contents, ignoring non-numeric properties.
        while (length--) {
            if (!eq(a[length], b[length], depth - 1, aStack, bStack))
                return false;
        }
    }
    else {
        // Deep compare objects.
        var keys = Object.keys(a);
        var key = void 0;
        length = keys.length;
        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if (Object.keys(b).length !== length)
            return false;
        while (length--) {
            // Deep compare each member
            key = keys[length];
            if (!(has$1(b, key) && eq(a[key], b[key], depth - 1, aStack, bStack)))
                return false;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
}
function unwrap(a) {
    if (isObservableArray(a))
        return a.slice();
    if (isES6Map(a) || isObservableMap(a))
        return Array.from(a.entries());
    if (isES6Set(a) || isObservableSet(a))
        return Array.from(a.entries());
    return a;
}
function has$1(a, key) {
    return Object.prototype.hasOwnProperty.call(a, key);
}

function makeIterable(iterator) {
    iterator[Symbol.iterator] = getSelf;
    return iterator;
}
function getSelf() {
    return this;
}

/*
The only reason for this file to exist is pure horror:
Without it rollup can make the bundling fail at any point in time; when it rolls up the files in the wrong order
it will cause undefined errors (for example because super classes or local variables not being hoisted).
With this file that will still happen,
but at least in this file we can magically reorder the imports with trial and error until the build succeeds again.
*/

/**
 * (c) Michel Weststrate 2015 - 2018
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */
if (typeof Proxy === "undefined" || typeof Symbol === "undefined") {
    throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Symbol or Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");
}
try {
    // define process.env if needed
    // if this is not a production build in the first place
    // (in which case the expression below would be substituted with 'production')
    "development";
}
catch (e) {
    var g = getGlobal();
    if (typeof process === "undefined")
        g.process = {};
    g.process.env = {};
}
(function () {
    function testCodeMinification() { }
    if (testCodeMinification.name !== "testCodeMinification" &&
        "development" !== "production" &&
        typeof process !== 'undefined' && process.env.IGNORE_MOBX_MINIFY_WARNING !== "true") {
        // trick so it doesn't get replaced
        var varName = ["process", "env", "NODE_ENV"].join(".");
        console.warn("[mobx] you are running a minified build, but '" + varName + "' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle");
    }
})();
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // See: https://github.com/andykog/mobx-devtools/
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
        spy: spy,
        extras: {
            getDebugName: getDebugName
        },
        $mobx: $mobx
    });
}




/***/ }),

/***/ "./src/youtubeHighlights/constants.ts":
/*!********************************************!*\
  !*** ./src/youtubeHighlights/constants.ts ***!
  \********************************************/
/*! flagged exports */
/*! export CLASSES [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export SELECTORS [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
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

/***/ "./src/youtubeHighlights/highlights.ts":
/*!*********************************************!*\
  !*** ./src/youtubeHighlights/highlights.ts ***!
  \*********************************************/
/*! flagged exports */
/*! export Renderer [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const cash_dom_1 = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.esm.js");
const classnames_1 = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const diff_dom_1 = __webpack_require__(/*! diff-dom */ "./node_modules/diff-dom/src/index.js");
const mobx_1 = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/youtubeHighlights/constants.ts");
class VideoThumbnail {
    constructor(el) {
        this.hasInit = false;
        this.state = mobx_1.observable({
            isHighlighted: false,
            styles: {
                highlightButton: `
        display: inline-block;
        position: relative;
        bottom: 0;
        right: 0;
        width: 30px;
        height: 30px;
        outline: 2px solid rgb(29, 185, 84, 0.5);
        padding: 1em;
        text-align: center;
        content: "✓";
      `,
            },
        });
        this.$self = el;
        this.id = this.$self.attr('href');
    }
    init() {
        if (this.hasInit) {
            return;
        }
        console.log('initting', this);
        this.hasInit = true;
        this.$highlightBtn = cash_dom_1.default(`<div />`)
            .attr('style', this.state.styles.highlightButton);
        const toggleHighlighted = mobx_1.action(() => { this.state.isHighlighted = !this.state.isHighlighted; });
        this.$highlightBtn.on('click', toggleHighlighted);
        mobx_1.observe(this.state, (change) => {
            console.log(`VideoThumbnail changed: ${change.type}`, change);
            this.render();
        });
    }
    render() {
        this.init();
        const $prev = this.$self;
        const $next = $prev.clone();
        const classes = classnames_1.default(classnames_1.default($prev.attr('class')), { [constants_1.CLASSES.isHighlighted]: this.state.isHighlighted });
        $next.attr('class', classes);
        $next.append(this.$highlightBtn);
        console.log({ classes, $next, $prev });
        console.log('22222');
        const diffDom = new diff_dom_1.DiffDOM({ maxDepth: 4 });
        const diff = diffDom.diff($prev.get()[0], $next.get()[0]);
        diffDom.apply($prev.get()[0], diff);
    }
}
function Renderer() {
    console.log('renderer');
    const store = {
        thumbnails: new mobx_1.ObservableMap(),
        addNewThumbnails(thumbnails) {
            return thumbnails
                .filter((item) => !store.thumbnails.has(item.id))
                .map((item) => {
                store.thumbnails.set(item.id, item);
                return item;
            });
        },
    };
    // Debugging
    window.store = store;
    const render = () => {
        console.log('RENDER!!!!');
        const thumbnails = findThumbnailsOnPage();
        store.addNewThumbnails(thumbnails);
        thumbnails.forEach((tn) => tn.render());
    };
    return render;
}
exports.Renderer = Renderer;
function findThumbnailsOnPage() {
    const $thumbnails = cash_dom_1.default(constants_1.SELECTORS.thumbnail);
    return $thumbnails.get().map((el) => new VideoThumbnail(cash_dom_1.default(el)));
}


/***/ }),

/***/ "./src/youtubeHighlights/index.ts":
/*!****************************************!*\
  !*** ./src/youtubeHighlights/index.ts ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const cash_dom_1 = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.esm.js");
const diff_dom_1 = __webpack_require__(/*! diff-dom */ "./node_modules/diff-dom/src/index.js");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/youtubeHighlights/constants.ts");
const highlights_1 = __webpack_require__(/*! ./highlights */ "./src/youtubeHighlights/highlights.ts");
console.log('YTHL INIT', { $: cash_dom_1.default, nodeToObj: diff_dom_1.nodeToObj });
void (() => __awaiter(void 0, void 0, void 0, function* () {
    cash_dom_1.default(() => {
        console.log('YTHL dom ready wew');
        const tnel = cash_dom_1.default(constants_1.SELECTORS.thumbnail).get()[0];
        console.log('node', diff_dom_1.nodeToObj(tnel));
        const render = highlights_1.Renderer();
        render();
    });
}))();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/youtubeHighlights/index.ts");
/******/ })()
;