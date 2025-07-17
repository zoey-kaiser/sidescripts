// ==UserScript==
// @name         Prisma Studio overflow fix
// @namespace    http://zoeykaiser.com/
// @version      2025-07-17
// @description  Fixes the CSS on the Prisma Studio website to ensure proper scrolling
// @author       Zoey Kaiser
// @match        http://localhost/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // fix: overflow in Prisma Studio on Chrome
    document.head.append(Object.assign(document.createElement("style"), {
        type: "text/css",
        textContent: `[data-testid="modal"] { min-height: auto!important }`
    }))
})();
