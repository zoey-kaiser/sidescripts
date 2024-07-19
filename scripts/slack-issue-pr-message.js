// ==UserScript==
// @name         Sidestream: Github to Slack message shortcut
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Share your PRs or Issues via a nicely formatted message via a new 'Slack' button.
// @author       Zoey Kaiser
// @match        https://github.com/zoey-kaiser
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        .my-clickable-svg:hover path {
            fill: #2F81F7;
        }
        .my-clickable-svg {
            cursor: pointer;
        }

        @keyframes clickEffect {
            0%, 72% {
                fill: green;
            }
            72.1%, 100% {
                fill: #7D8590;
            }
        }

        .my-clickable-svg:active path {
            fill: green !important;
        }

        .my-clickable-svg.clicked path {
            animation: clickEffect 3.5s;
        }
    `;
    document.head.appendChild(style);

    const buttonSVGString = `
        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="octicon octicon-copy my-clickable-svg">
            <path d="M9.33315 2C8.22858 2 7.33328 2.89731 7.33328 4.00388C7.33302 4.26677 7.38454 4.52714 7.4849 4.77012C7.58526 5.0131 7.73249 5.23393 7.9182 5.42001C8.1039 5.60609 8.32444 5.75377 8.56722 5.85462C8.80999 5.95546 9.07026 6.0075 9.33315 6.00777H11.3333V4.00388C11.3338 3.47292 11.1233 2.96353 10.7482 2.58774C10.3731 2.21194 9.86411 2.00053 9.33315 2ZM9.33315 7.34369H3.99984C2.89527 7.34369 1.99997 8.241 1.99997 9.34791C1.99997 10.4545 2.89527 11.3518 3.99984 11.3518H9.33348C10.4377 11.3518 11.3333 10.4545 11.3333 9.34791C11.3333 8.241 10.4377 7.34369 9.33315 7.34369Z"/>
            <path d="M22 9.34791C22 8.241 21.1043 7.34369 19.9998 7.34369C18.8952 7.34369 17.9999 8.241 17.9999 9.34791V11.3518H19.9998C20.5307 11.3513 21.0397 11.1398 21.4148 10.7641C21.7899 10.3883 22.0004 9.87887 22 9.34791ZM16.6667 9.34791V4.00388C16.6671 3.47292 16.4566 2.96353 16.0815 2.58774C15.7064 2.21194 15.1974 2.00053 14.6665 2C13.5619 2 12.6666 2.89731 12.6666 4.00388V9.34757C12.6666 10.4548 13.5619 11.3521 14.6665 11.3521C15.1974 11.3516 15.7064 11.1402 16.0815 10.7644C16.4566 10.3886 16.6671 9.87887 16.6667 9.34791Z"/>
            <path d="M14.6665 22.0395C15.1974 22.039 15.7064 21.8276 16.0815 21.4518C16.4566 21.076 16.6671 20.5666 16.6667 20.0356C16.6671 19.5047 16.4566 18.9953 16.0815 18.6195C15.7064 18.2437 15.1974 18.0323 14.6665 18.0317H12.6666V20.0356C12.6666 21.1422 13.5619 22.0395 14.6665 22.0395ZM14.6665 16.6958H20.0001C21.1043 16.6958 22 15.7985 22 14.6916C22.0004 14.1606 21.7899 13.6512 21.4148 13.2755C21.0397 12.8997 20.5307 12.6882 19.9998 12.6877H14.6665C13.5619 12.6877 12.6666 13.585 12.6666 14.6916C12.6663 14.9545 12.7178 15.2149 12.8182 15.4578C12.9186 15.7008 13.0658 15.9216 13.2515 16.1077C13.4372 16.2938 13.6577 16.4415 13.9005 16.5423C14.1433 16.6432 14.4036 16.6956 14.6665 16.6958Z"/>
            <path d="M1.99997 14.6916C1.99971 14.9545 2.05123 15.2149 2.15159 15.4578C2.25194 15.7008 2.39918 15.9216 2.58489 16.1077C2.77059 16.2938 2.99113 16.4415 3.2339 16.5423C3.47668 16.6432 3.73695 16.6952 3.99984 16.6955C4.5308 16.6949 5.0398 16.4835 5.41491 16.1077C5.79001 15.732 6.00048 15.2226 6.00004 14.6916V12.6877H3.99984C2.89527 12.6877 1.99997 13.585 1.99997 14.6916ZM7.33328 14.6916V20.0353C7.33328 21.1422 8.22858 22.0395 9.33315 22.0395C9.86411 22.039 10.3731 21.8276 10.7482 21.4518C11.1233 21.076 11.3338 20.5666 11.3333 20.0356V14.6916C11.3336 14.4287 11.2821 14.1683 11.1817 13.9253C11.0813 13.6823 10.9341 13.4614 10.7483 13.2754C10.5626 13.0893 10.342 12.9416 10.0992 12.8408C9.85636 12.7399 9.59606 12.6879 9.33315 12.6877C8.22858 12.6877 7.33328 13.585 7.33328 14.6916Z"/>
        </svg>
    `;

    function createButton() {
        const buttonSVGElement = new DOMParser().parseFromString(buttonSVGString, 'image/svg+xml').documentElement;

        buttonSVGElement.addEventListener('click', function() {
            this.classList.add('clicked');

            const title = document.querySelector('.js-issue-title').innerHTML;
            const headerNumber = document.querySelector('.gh-header-number').innerHTML;
            const fullURL = new URL(window.location.href);
            const displayURL = `${fullURL.protocol}//${fullURL.host}${fullURL.pathname}`;

            const isPullRequest = document.querySelector('#pull-requests-tab.selected') !== null
            const type = isPullRequest ? 'PR' : 'Issue'

            const copyValue = `${type}: ${title} ${headerNumber} | ${displayURL}`;
            GM_setClipboard(copyValue);

            setTimeout(() => this.classList.remove('clicked'), 1000);
        });

        return buttonSVGElement;
    }

    function ensureButtonOnContainer(containerElement) {
        if (containerElement && !containerElement.classList.contains('slack-button-added')) {
            containerElement.appendChild(createButton());
            containerElement.classList.add('slack-button-added');
        }
    }

    const observer = new MutationObserver((mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // console.log('ensureee!')
                ensureButtonOnContainer(document.querySelector('.gh-header-meta > *:last-child'));
                ensureButtonOnContainer(document.querySelector('.sticky-content .meta'));
                break;
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    ensureButtonOnContainer(document.querySelector('.gh-header-meta > *:last-child'));
    ensureButtonOnContainer(document.querySelector('.sticky-content .meta'));

})();
