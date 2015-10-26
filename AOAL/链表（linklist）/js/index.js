
(function(){

EventUtil.addEvent(document, 'mouseup', function(){
	var target = EventUtil.getTarget();
	if(target.tagName.toLowerCase() == 'button' && target.getAttribute('tag') == 'one'){
		target.disabled = "disabled";
		CssUtil.setCss(target, {
			'background': '#eee'
		});
	}
});

insertNode.onmousedown = function(){
	AnimUtil.animate(aStep1, {
		'opacity': 1
	}, {}, function(){
		CssUtil.setCss(aStep2, {
			'visibility': 'hidden'
		});
		CssUtil.setCss(aStep3, {
			'visibility': 'hidden'
		});
		AnimUtil.animate(aStep4, {
			'opacity': '0'
		}, {}, function(){
			AnimUtil.animate(aStep5, {
				'height': '108px'
			},{},function(){
				AnimUtil.animate(aStep6, {
					'height': '120px'
				});
			});
		});
	});
}

deleteNode.onmousedown = function(){
	AnimUtil.animate(bStep1, {
		'opacity': '0'
	});
	AnimUtil.animate(bStep2, {
		'opacity': '0'
	},{}, function(){
		AnimUtil.animate(bStep3, {
			'height': '100px'
		},{}, function(){
			AnimUtil.animate(bStep4, {
				'opacity': '0'
			});
		});
	});
}


})();
