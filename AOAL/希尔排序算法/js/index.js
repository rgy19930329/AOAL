
(function(){

Array.prototype.sort2 = function(){
	var i, j, k, temp, len = this.length;
	var d = len;
	var res = [];

	while(true){
		d = Math.floor(d / 2);

		console.log(this)
		var r = getGroup(this.concat(), d);
		res = res.concat(r);
		
		for(k = 0; k < d; k++){
			for(i = k + d; i < len; i = i + d){
				temp = this[i];
				for(j = i - d; j >= 0 && temp < this[j]; j = j - d){
					this[j+d] = this[j];
				}
				this[j+d] = temp;
			}
		}

		if(d == 1){
			break;
		}	
	}
	return res;
}

function getGroup(arr, d){
	var group = [];

	for(var k = 0; k < d; k++){
		var obj = {};
		obj.node = [];
		obj.currentArray = [];

		var i, len = arr.length;
		var tempArray = [];
		var arr = arr.concat();
		for(i = k; i < len; i = i + d){
			tempArray.push(arr[i]);
		}
		tempArray.sort(function(a, b){
			return a - b;
		});
		for(i = k; i < len; i = i + d){
			arr[i] = tempArray.shift();
			obj.node.push(i);
		}
		obj.currentArray = arr.concat();
		group.push(obj);
	}
	return group;
}

// var arr = [5,3,9,7,2,1,8,2,4];
// var r = getGroup(arr, 4);
// console.log(r);

// ----------------------- //

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
	var node = res[rIndex].node;
	var arr = res[rIndex].currentArray;
	rIndex++;

	for(var i = 0; i < node.length; i++){
		var index = node[i];
		(function(k){
			AnimUtil.animate(divList[k], {
				'background': 'orange',
				'transform': 'scale(1.2)'
			}, {
				'dur': 400
			}, function(){
				AnimUtil.animate(divList[k], {
					'transform': 'scale(1)'
				}, {
					'dur': 400
				});
			});
		})(index);
	}

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