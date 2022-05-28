// ==UserScript==
// @name         ExplainXKCD-Quick-Link
// @namespace    https://github.com/untir-l/userscripts
// @version      1.0.2
// @description  For each comic on xkcd.com, add a link to the comic's ExplainXKCD page.
// @author       Arjun Satarkar
// @match        https://xkcd.com/*
// @icon         https://www.explainxkcd.com/wiki/images/c/c9/Logo.png
// @grant        none
// ==/UserScript==
/*
MIT License

Copyright (c) 2021 Arjun Satarkar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

(function () {
	'use strict';
	const explainXkcdLogoHeight = '10ex'; // Height in CSS size units

	const middleContainer = document.querySelector('div#middleContainer');

	let comicNum;
	try {
		comicNum = /\d+/.exec(/Permanent link to this comic: https:\/\/xkcd\.com\/\d+\//.exec(middleContainer.innerText)[0])[0];
	} catch (_) {
		return; // We must not be on a comic page, so skip the rest of the script.
	}

	const explanationLinkElement = document.createElement('a');
	explanationLinkElement.setAttribute('href', `https://explainxkcd.com/${comicNum}`);

	const explainXkcdLogoElement = document.createElement('img');
	explainXkcdLogoElement.setAttribute('src', 'https://www.explainxkcd.com/wiki/images/c/c9/Logo.png');
	explainXkcdLogoElement.setAttribute('style', `height: ${explainXkcdLogoHeight};`);
	explainXkcdLogoElement.setAttribute('alt', 'Explain xkcd');
	explanationLinkElement.appendChild(explainXkcdLogoElement);

	const addedContent = new DocumentFragment();
	addedContent.append(document.createElement('br'), explanationLinkElement);
	middleContainer.appendChild(addedContent);
})();
