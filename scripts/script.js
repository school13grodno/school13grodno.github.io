'use strict';
/* Width and height body equals width, height client's */
function setWidthHeightFontSizeBody() {
	let _clientWidth = document.documentElement.clientWidth;
	let _clientHeight = document.documentElement.clientHeight;
	let _body = document.body;
	/* Width body equals 50% height's, multiply on 7 stands plus margin */
	let _minWidthBody = _clientHeight / 2 * 7 + (_clientHeight * 0.02 * 12);
	/* If the body width is less than width client's */
	if (_minWidthBody > _clientWidth) _body.style.width = _minWidthBody + 'px';
	else _body.style.width = '';
	/* Height */
	_body.style.height = _clientHeight + 'px';
	/* Font size */
	_body.style.fontSize = _clientHeight * 0.02 + 'px';
};
window.onload = function() {
	setWidthHeightFontSizeBody();
	/* Preloader */
	setTimeout(function() {
		document.getElementById("preloader").classList.remove('preloader');
	}, 25);
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
	if (_ACTIVE_INFO != "") 
		document.getElementById(_ACTIVE_INFO).style.fontSize = onResize_FontSize();
	[].forEach.call(document.getElementsByClassName("ba-slider"), function(el) {
		el.querySelector(".resize").querySelector("img").style.width = el.offsetWidth  + 'px';
	});
};
/* Saved id active  */
var _ACTIVE_INFO = "";
/* Close block */
function closeBlock() {
	if (_ACTIVE_INFO != "") {
		document.body.classList.remove('active-fixed');
		document.getElementById(_ACTIVE_INFO).classList.remove('visible');
		document.getElementById(_ACTIVE_INFO).classList.add('hidden');
		document.getElementById(_ACTIVE_INFO).style.fontSize = '';
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
		document.getElementById(_ACTIVE_INFO).style.fontSize = onResize_FontSize();
		document.body.classList.add('active-fixed');
		document.getElementById(_ACTIVE_INFO).classList.remove('hidden');
		document.getElementById(_ACTIVE_INFO).classList.add('visible');
	}			
};
/* Click for img-text */
[].forEach.call(document.getElementsByClassName("img-text"), function(el) {
	el.addEventListener("click", function() {
		/* If image is loaded */
		if (!el.classList.contains('lazy')) {
			let _expander = document.getElementById('expander');
			let _result = '<button aria-label="Закрыть" class="btn-close" onclick="closeBlock();"></button><div class="wrap column gray">';
			if (el.children.length != 0) {
				for (let i = 0; i < el.children.length; i++) {
					if (el.children.item(i).tagName == 'DIV') {
						_result += '<div class="text center-white">' + el.children.item(i).textContent + '</div>'
					}
					if (el.children.item(i).tagName == 'IMG') {
						_result += '<div class="img" style="background: url(' + el.children.item(i).src + ') no-repeat center /contain"></div>';			
					}
				}
			}
			_expander.innerHTML = _result + '</div>';
			showBlock('expander');
		}
	});
});
/* Click for img-hero and block have text */
[].forEach.call(document.querySelectorAll(".img-hero, .have-text"), function(el) {
	el.addEventListener("click", function() {
		/* If image is loaded */
		if (!el.classList.contains('lazy')) {
			let _expander = document.getElementById('expander');
			let _result = '<button aria-label="Закрыть" class="btn-close" onclick="closeBlock();"></button><div class="gray overflow red-scroll">';
			if (el.children.length != 0) {
				for (let i = 0; i < el.children.length; i++) {
					if (el.children.item(i).tagName == 'DIV') {
						_result += el.children.item(i).innerHTML;
					}
					if (el.children.item(i).tagName == 'IMG') {
						_result += '<img style="float: left; width: auto; max-width: 100%; height: 100%; margin: 0 0.5em 0 0;" width="25" height="25" src="' + el.children.item(i).src + '"><h2 class="first">' + el.children.item(i).alt + "</h2>";		
					}
				}
			}
			_expander.innerHTML = _result + '</div>';
			showBlock('expander');
		}
	});
});
/* Init before after slider */
[].forEach.call(document.getElementsByClassName("ba-slider"), function(el) {
	el.querySelector(".resize").querySelector("img").style.width = el.offsetWidth  + 'px';
	drags(el.querySelector(".handle"), el.querySelector(".resize"), el);
});
/* Init events for before after slider */
function drags(dragElement, resizeElement, container) {
	let _startX = '';
	let _dragWidth;
	let _posX;
	let _containerOffset;
	let _containerWidth;
	let _minLeft;
	let _maxLeft;
	/* Initialize the dragging event on mousedown and touchstart */
	['mousedown', 'touchstart'].forEach(function(elEvent) {
		dragElement.addEventListener(elEvent, function(event) {
			dragElement.classList.add('draggable');
			resizeElement.classList.add('resizable');
			/* Check if it's a mouse or touch event and pass along the correct value */
			_startX = (event.pageX) ? event.pageX : event.touches[0].pageX;
			/* Get the initial position */
			_dragWidth = dragElement.offsetWidth;
			_posX = dragElement.getBoundingClientRect().left + _dragWidth - _startX;
			_containerOffset = container.getBoundingClientRect().left;
			_containerWidth = container.offsetWidth;
			/* Set limits */
			_minLeft = _containerOffset - _dragWidth/2;
			_maxLeft = _containerOffset + _containerWidth - _dragWidth/2;
		}, {passive: true});
	});
	/* Calculate the dragging distance on mousemove and touchmove */
	['mousemove', 'touchmove'].forEach(function(elEvent) {
		dragElement.parentNode.addEventListener(elEvent, function(event) {
			if (_startX != '') {
				/* Check if it's a mouse or touch event and pass along the correct value */
				let _moveX = (event.pageX) ? event.pageX : event.touches[0].pageX;
				let _leftValue = _moveX + _posX - _dragWidth;
				/* Prevent going off limits */
				if (_leftValue < _minLeft) {
					_leftValue = _minLeft;
				} else if (_leftValue > _maxLeft) {
					_leftValue = _maxLeft;
				}
				/* Translate the handle's left value to masked divs width */
				let _widthValue = (_leftValue + _dragWidth/2 - _containerOffset)*100/_containerWidth + '%';
				/* Set the new values for the slider and the handle. Bind mouseup events to stop dragging */
				container.querySelector(".draggable").style.left = _widthValue;
				container.querySelector(".resizable").style.width = _widthValue;
			}
		}, {passive: true});
	});
	/* For event mouseup, touchend and touchcancel */
	['mouseup', 'touchend', 'touchcancel'].forEach(function(elEvent) {
		[].forEach.call(container.children, function(el) {
			el.addEventListener(elEvent, function(event) {
				dragElement.classList.remove('draggable');
				resizeElement.classList.remove('resizable');
				_startX = '';
			});
		});
	});
};