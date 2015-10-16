
(function(){

Array.prototype.sort = function(){
	var i, j, temp, len = this.length;
	var res = [];
	for(i = 0; i < len - 1; i++){
		for(j = 0; j < len - i - 1; j++){
			if(this[j] > this[j + 1]){
				var obj = {};
				obj.swap = j;
				// ------------- //
				temp = this[j];
				this[j] = this[j + 1];
				this[j + 1] = temp;
				// ------------- //
				obj.currentArray = this.concat();
				res.push(obj);
			}
		}
	}
	return res;
}

var res = [];
var rIndex = 0;

build.onmousedown = function(){

	var list = entry.value.split(',');
	var arr = [];
	for(var i = 0, len = list.length; i < len; i++){
		arr[i] = Number(list[i]);
	}

	// ---------- //

	var itemdiv = document.createElement('div');

	var index = 0;
	var clock = setInterval(function(){
		if(index >= arr.length){
			var start = document.createElement('button');
			start.setAttribute('tag', 'one');
			start.innerHTML = 'start';
			datashow.appendChild(start);
			clearInterval(clock);

			start.onmousedown = nextStep;
			
			res = arr.sort();
			return;
		}

		var temp = itemdiv.cloneNode(true);
		temp.innerHTML = arr[index];
		datashow.appendChild(temp);

		index++;
	}, 100);

	entry.disabled = "disabled";
}

EventUtil.addEvent(document, 'mouseup', function(){
	var target = EventUtil.getTarget();
	if(target.tagName.toLowerCase() == 'button' && target.getAttribute('tag') == 'one'){
		target.disabled = "disabled";
		CssUtil.setCss(target, {
			'background': '#eee'
		});
	}
});


function nextStep(){
	if(rIndex >= res.length){
		return;
	}
	var divList = this.parentNode.getElementsByTagName('div');
	var t = Math.floor(res[rIndex].swap);
	var arr = res[rIndex].currentArray;
	rIndex++;

	AnimUtil.animate(divList[t], {
		'background': 'orange',
		'transform': 'scale(1.2)'
	}, {
		'dur': 400
	}, function(){
		AnimUtil.animate(divList[t], {
			'transform': 'scale(1)'
		}, {
			'dur': 400
		});
	});

	AnimUtil.animate(divList[t+1], {
		'background': 'orange',
		'transform': 'scale(1.2)'
	}, {
		'dur': 400
	}, function(){
		AnimUtil.animate(divList[t+1], {
			'transform': 'scale(1)'
		}, {
			'dur': 400
		});
	});

	// ---------- //
	setTimeout(function(){

		var section = document.createElement('section');
		datashow.appendChild(section);

		var itemdiv = document.createElement('div');

		var index = 0;
		var clock = setInterval(function(){
			if(index >= arr.length){
				var next = document.createElement('button');
				next.setAttribute('tag', 'one');
				next.innerHTML = 'next';
				section.appendChild(next);
				clearInterval(clock);

				next.onmousedown = nextStep;
				return;
			}

			var temp = itemdiv.cloneNode(true);
			temp.innerHTML = arr[index];
			section.appendChild(temp);

			index++;
		}, 100);

	}, 1000);
}

})();