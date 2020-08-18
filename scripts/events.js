'use strict';
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