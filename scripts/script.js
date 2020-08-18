'use strict';
/* Width and height body equals width, height client's */
function setWidthHeightFontSizeBody() {
	let _clientWidth = document.documentElement.clientWidth;
	let _clientHeight = document.documentElement.clientHeight;
	let _body = document.body;
	/* Width body equals 50% height's, multiply on 7 stands plus margin */
	let _minWidthBody = _clientHeight * 0.0212 * 25 * 7 + (_clientHeight * 0.0212 * 12);
	/* If the body width is less than width client's */
	if (_minWidthBody > _clientWidth) _body.style.width = _minWidthBody + 'px';
	else _body.style.width = '';
	/* Height */
	_body.style.height = _clientHeight + 'px';
	/* Font size */
	_body.style.fontSize = _clientHeight * 0.0212 + 'px';
};
window.onload = function() {
	setWidthHeightFontSizeBody();
	/* Preloader */
	document.getElementById("preloader").classList.remove('preloader');
	/* Loading image */
	[].forEach.call(document.querySelectorAll("[data-src]"), function(el) {
		if (el.tagName == 'IMG') {
			el.setAttribute('src', el.getAttribute('data-src'));
			el.onload = function() {
				el.removeAttribute('data-src');
				el.parentNode.classList.remove('lazy');
				/* IE... */
				el.parentNode.classList.remove('bg-fixed-lazy');
			};
		} else {
			const _IMG = new Image();
			_IMG.setAttribute('src', el.getAttribute('data-src'));
			_IMG.onload = function() {
				el.setAttribute('style', 'background: url(' + el.getAttribute('data-src') + ') no-repeat center /contain');
				el.removeAttribute('data-src');
				el.parentNode.classList.remove('lazy');
			};
		}
	});
	/* Registration service worker */
	navigator.serviceWorker.register('/pwabuilder-sw.js').then(
		function(registration) {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		},
		function(error) {
			console.log('ServiceWorker registration failed: ', error);
		}
	);
};
/* On resize font size */
function onResize_FontSize() {
	let _minWidth = document.documentElement.clientWidth * 0.02;
	let _minHeight = document.documentElement.clientHeight * 0.02;
	if (document.documentElement.clientWidth > document.documentElement.clientHeight) {
		let _proc = (_minWidth - _minHeight) / _minHeight / 2;
		return _minHeight + _minHeight * _proc + 'px';
	} else {
		return '';
	}
};
/* Body on resize */
window.onresize = function() {
	setWidthHeightFontSizeBody();
	if (_ACTIVE_INFO != "") {
		let _element = document.getElementById(_ACTIVE_INFO);
		_element.style.fontSize = onResize_FontSize();
		if (_ACTIVE_INFO.indexOf('btn-photo') !== -1) {
			_elemet.querySelector(".resize").querySelector("img").style.width = _elemet.querySelector(".ba-slider").offsetWidth  + 'px';
		}
	}
};
/* Saved id active  */
var _ACTIVE_INFO = "";
/* Close block */
function closeBlock() {
	if (_ACTIVE_INFO != "") {
		document.body.classList.remove('active-fixed');
		let _element = document.getElementById(_ACTIVE_INFO);
		_element.classList.add('hidden');
		_element.classList.remove('visible');
		_element.style.fontSize = '';
		_ACTIVE_INFO = "";
	}
};
/* Show block */
function showBlock(id) {
	if (_ACTIVE_INFO != "") { 
		closeBlock(); 
	}
	if (id != "") {
		_ACTIVE_INFO = id;
		let _elemet = document.getElementById(_ACTIVE_INFO);
		_elemet.style.fontSize = onResize_FontSize();
		document.body.classList.add('active-fixed');
		_elemet.classList.remove('hidden');
		if (id.indexOf('btn-photo') !== -1) {
			_elemet.querySelector(".resize").querySelector("img").style.width = _elemet.querySelector(".ba-slider").offsetWidth  + 'px';
		}
		_elemet.classList.add('visible');
	}
};