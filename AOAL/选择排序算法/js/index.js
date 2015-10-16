
(function(){

Array.prototype.sort = function(){
	var len = this.length;
	var arr = [];
	var res = [];
	for(var i = 0; i < len; i++){
		var min = this[0];
		var index = 0;
		for(var j = 0; j < this.length; j++){
			if(this[j] < min){
				min = this[j];
				index = j;
			}
		}
		var temp = this.splice(index, 1);
		arr.push(temp[0]);

		var obj = {};
		obj.move = index + i;
		obj.currentArray = arr.concat(this);
		res.push(obj);
	}
	return res;
}

// ----------------------- //

var res = [];
var rIndex = 0;

build.onmousedown = function(){

	var list = entry.value.split(',');
	var arr = [];
	for(var i = 0, len = list.length; i < len; i++){
		arr[i] = parseInt(list[i]);
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
			console.log(res)
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
	var t = Math.floor(res[rIndex].move);
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

			if(index < rIndex){
				CssUtil.setCss(temp, {
					'background': 'red'
				});
			}

			index++;
		}, 100);



	}, 1000);

}





})();