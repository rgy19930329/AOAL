
(function(){

Array.prototype.sort2 = function(){
	var len = this.length;
	var order = this.slice(0, 1);
	var unorder = this.slice(1);
	var res = [];

	for(var i = 1; i < len; i++){
		var target = unorder.shift();
		var low = 0, high = order.length - 1;
		while(low <= high){
			var mid = Math.floor((low + high) / 2);
			if(target < order[mid]){
				high = mid - 1;
			}else{
				low = mid + 1;
			}
		}
		order.splice(low, 0, target);
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
	datashow.innerHTML = '';

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

// -----------折半插入过程演示------------ //

build2.onmousedown = function(){
	datashow.innerHTML = '';
	entry2.disabled = "disabled";
	entry3.disabled = "disabled";

	var list = entry2.value.split(',');
	var arr = [];
	for(var i = 0, len = list.length; i < len; i++){
		arr[i] = parseInt(list[i]);
	}
	var target = Number(entry3.value);

	// ---------- //

	var res = [];
	var low = 0, high = arr.length - 1;
	while(low <= high){
		var mid = Math.floor((low + high) / 2);

		var obj = {};
		obj.low = low;
		obj.mid = mid;
		obj.high = high;
		res.push(obj);

		if(target < arr[mid]){
			high = mid - 1;
		}else{
			low = mid + 1;
		}
	}
	console.log(res);

	// ----------- //

	var itemdiv = document.createElement('div');

	var index = 0;
	var clock = setInterval(function(){
		if(index >= arr.length){
			var start = document.createElement('button');
			start.setAttribute('tag', 'one');
			start.innerHTML = 'start';
			datashow.appendChild(start);
			clearInterval(clock);

			// ------- //
			start.onmousedown = nextStep;
			return;
		}

		var temp = itemdiv.cloneNode(true);
		temp.innerHTML = arr[index];
		datashow.appendChild(temp);

		index++;
	}, 100);

	// ------------ //

	var rIndex = 0;

	function nextStep(){

		if(rIndex >= res.length){
			arr.splice(res[rIndex-1].low, 0, target);
			var section = document.createElement('section');
			datashow.appendChild(section);

			var itemdiv = document.createElement('div');

			var index = 0;
			var clock = setInterval(function(){
				if(index >= arr.length){
					clearInterval(clock);
					return;
				}

				var temp = itemdiv.cloneNode(true);
				temp.innerHTML = arr[index];
				section.appendChild(temp);

				if(index == 2){
					CssUtil.setCss(temp, {
						'background': '#6EB215'
					});
				}

				index++;
			}, 100);

			console.log(arr);
			return;
		}

		var divList = this.parentNode.getElementsByTagName('div');
		var mid = res[rIndex].mid;
		var low = res[rIndex].low;
		var high = res[rIndex].high;
		rIndex++;
		
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

					var itemList = next.parentNode.getElementsByTagName('div');
					CssUtil.setCss(itemList[low], {
						'background': 'red'
					});
					CssUtil.setCss(itemList[high], {
						'background': 'red'
					});
					CssUtil.setCss(itemList[mid], {
						'background': 'orange'
					});

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

}




})();