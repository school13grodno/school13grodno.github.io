'use strict';
/* Init before after slider */
[].forEach.call(document.getElementsByClassName("ba-slider"), function(el) {
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