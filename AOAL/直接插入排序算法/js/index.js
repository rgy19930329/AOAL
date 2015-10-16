
(function(){

Array.prototype.sort2 = function(){
	var len = this.length;
	var order = this.slice(0, 1);
	var unorder = this.slice(1);
	var res = [];
	// var obj = {};
	// obj.order = order.concat();
	// obj.unorder = unorder.concat();
	// res.push(obj);
	// console.log(order, unorder);

	for(var i = 1; i < len; i++){
		var target = unorder.shift();
		for(var j = 0; j < order.length; j++){
			if(target <= order[j]){
				break;
			}
		}
		order.splice(j, 0, target);
		console.log(order, unorder);
		var obj = {};
		obj.order = order.concat();
		obj.unorder = unorder.concat();
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

			var divList = datashow.getElementsByTagName('div');
			CssUtil.setCss(divList[0], {
				'background': 'red'
			});
			// ------- //
			start.onmousedown = nextStep;
			// ------- //
			res = arr.sort2();
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
	var order = res[rIndex].order;
	var unorder = res[rIndex].unorder;
	var arr = order.concat(unorder);
	var t = order.length - 1;
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

			if(index <= rIndex){
				CssUtil.setCss(temp, {
					'background': 'red'
				});
			}

			index++;
		}, 100);

	}, 1000);

}


})();