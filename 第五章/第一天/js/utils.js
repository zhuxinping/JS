var utils = function () {
    function toArray(a) {
        var c, b = [];
        if (isHighVersion) b = [].slice.call(a); else for (c = 0; c < a.length; c++) b[b.length] = a[c];
        return b
    }

    function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")")
    }

    function getCss(a, b) {
        var d, c = null;
        return isHighVersion ? c = window.getComputedStyle(a, null)[b] : "opacity" === b.toLowerCase() ? (c = a.currentStyle["filter"], reg = /^alpha\(opacity=(.+)\)$/i, c = reg.test(c) ? reg.exec(c)[1] / 100 : 1) : c = a.currentStyle[b], d = parseFloat(c), c = isNaN(d) ? c : d
    }

    function setCss(a, b, c) {
        if ("opacity" === b.toLowerCase()) return a.style.opacity = c, a.style.filter = "alpha(opacity=" + 100 * c + ")", void 0;
        var d = /^(zIndex|fontWeight)$/i;
        isNaN(c) || d.test(b) || (c += "px"), a["style"][b] = c
    }

    function setGroupCss(a, b) {
        if ("[object Object]" === Object.prototype.toString.call(b)) for (var c in b) b.hasOwnProperty(c) && setCss(a, c, b[c])
    }

    function css() {
        var a = arguments, b = a.length, c = getCss;
        return b >= 3 && (c = setCss), 2 === b && "object" == typeof a[1] && (c = setGroupCss), c.apply(null, a)
    }

    function offset(a) {
        for (var b = a.offsetLeft, c = a.offsetTop, d = a.offsetParent; d && d !== document.body;) /MSIE 8/i.test(navigator.userAgent) || (b += d.clientLeft, c += d.clientTop), b += d.offsetLeft, c += d.offsetTop, d = d.offsetParent;
        return {left: b, top: c}
    }

    function win(a, b) {
        return "undefined" != typeof b ? (document.documentElement[a] = b, document.body[a] = b, void 0) : document.documentElement[a] || document.body[a]
    }

    function prev(a) {
        if (isHighVersion) return a.previousElementSibling;
        for (var b = a.previousSibling; b && 1 !== b.nodeType;) b = b.previousSibling;
        return b
    }

    function next(a) {
        if (isHighVersion) return a.nextElementSibling;
        for (var b = a.nextSibling; b && 1 !== b.nodeType;) b = b.nextSibling;
        return b
    }

    function prevAll(a) {
        for (var b = [], c = a.previousSibling; c;) 1 === c.nodeType && b.unshift(c), c = c.previousSibling;
        return b
    }

    function nextAll(a) {
        for (var b = [], c = a.nextSibling; c;) 1 === c.nodeType && b.push(c), c = c.nextSibling;
        return b
    }

    function siblings(a) {
        return prevAll(a).concat(nextAll(a))
    }

    function index(a) {
        return prevAll(a).length
    }

    function firstChild(a) {
        if (isHighVersion) return a.firstElementChild;
        for (var b = a.firstChild; b && 1 !== b.nodeType;) b = b.nextSibling;
        return b
    }

    function lastChild(a) {
        if (isHighVersion) return a.lastElementChild;
        for (var b = a.lastChild; b && 1 !== b.nodeType;) b = b.previousSibling;
        return b
    }

    function children(a, b) {
        var e, f, c = [], d = a.childNodes;
        for (e = 0; e < d.length; e++) if (f = d[e], 1 === f.nodeType) {
            if ("undefined" != typeof b) {
                f.tagName.toUpperCase() === b.toUpperCase() ? c.push(f) : null;
                continue
            }
            c.push(f)
        }
        return c
    }

    function byClass(a, b) {
        var c, d, e, f, g, h, i, j;
        if (b = b || document, isHighVersion) return [].slice.call(b.getElementsByClassName(a));
        for (a = a.replace(/^\s+|\s+$/g, "").split(/\s+/g), c = b.getElementsByTagName("*"), d = [], e = 0; e < c.length; e++) {
            for (f = c[e], g = f.className, h = !0, i = 0; i < a.length; i++) if (j = new RegExp("(^| +)" + a[i] + "( +|$)"), !j.test(g)) {
                h = !1;
                break
            }
            h ? d.push(f) : null
        }
        return d
    }

    function hasClass(a, b) {
        var c, d, e, f, g;
        for (b = b.replace(/^\s+|\s+$/g, "").split(/\s+/g), c = !0, d = a.className, e = 0; e < b.length; e++) if (f = b[e], g = new RegExp("(^| +)" + f + "( +|$)"), !g.test(d)) {
            c = !1;
            break
        }
        return c
    }

    function addClass(a, b) {
        var c, d;
        for (b = b.replace(/^\s+|\s+$/g, "").split(/\s+/g), c = 0; c < b.length; c++) d = b[c], hasClass(a, d) || (a.className += " " + d);
        a.className = a.className.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ")
    }

    function removeClass(a, b) {
        var c, d, e, f;
        for (b = b.replace(/^\s+|\s+$/g, "").split(/\s+/g), c = a.className.replace(/\s+/g, "  "), d = 0; d < b.length; d++) e = b[d], f = new RegExp("(^| )" + e + "( |$)", "g"), f.test(c) ? c = c.replace(f, " ") : null;
        a.className = c.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ")
    }

    function append(a, b) {
        b.appendChild(a)
    }

    function prepend(a, b) {
        var c = firstChild(b);
        c ? b.insertBefore(a, c) : b.appendChild(a)
    }

    function insertBefore(a, b) {
        b.parentNode.insertBefore(a, b)
    }

    function insertAfter(a, b) {
        var c = next(b), d = b.parentNode;
        c ? d.insertBefore(a, c) : d.appendChild(a)
    }

    var isHighVersion = "getComputedStyle" in window;
    return {
        toArray: toArray,
        toJSON: toJSON,
        css: css,
        setCss:setCss,
        setGroupCss:setGroupCss,
        getCss:getCss,
        offset: offset,
        win: win,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        children: children,
        byClass: byClass,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter
    }
}();