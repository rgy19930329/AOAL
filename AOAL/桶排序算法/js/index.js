
(function(){

Array.prototype.sort2 = function(){
	var arr = [];
	for(var i = 0, len = this.length; i < len; i++){
		var index = this[i];
		if(arr[index] == undefined){
			arr[index] = 1;
		}else{
			arr[index]++;
		}
	}

	var res = [];
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == undefined){
			arr[i] = 0;
		}
	}
	return arr;
}

Array.prototype.indexOf = function(ele){
	for(var i = 0, len = this.length; i < len; i++){
		if(this[i] == ele){
			return i;
		}
	}
	return -1;
}

// ----------------------- //

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
			start.onmousedown = function(){
				nextStep(arr);
			};
			return;
		}

		var temp = itemdiv.cloneNode(true);
		temp.innerHTML = arr[index];
		datashow.appendChild(temp);

		CssUtil.setCss(temp, {
			'background': 'orange'
		});

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

function nextStep(arr){

	var section = document.createElement('section');
	datashow.appendChild(section);
	var dataSpan = document.createElement('span');
	var max = Math.max.apply(null, arr);
	dataSpan.innerHTML = '数据范围：0 ~ ' + max;
	section.appendChild(dataSpan);

	// ----------- //
	(function(){

		var section = document.createElement('section');
		datashow.appendChild(section);
		var rangeArr = [];
		for(var i = 0; i <= max; i++){
			rangeArr[i] = i;
		}

		var index = 0;
		var itemdiv = document.createElement('div');
		var clock = setInterval(function(){
			if(index >= rangeArr.length){
				return;
			}

			var temp = itemdiv.cloneNode(true);
			temp.innerHTML = rangeArr[index];
			section.appendChild(temp);

			if(arr.indexOf(index) !== -1){
				CssUtil.setCss(temp, {
					'background': 'orange'
				});
			}

			index++;
		}, 100);

	})();

	// ----------- //
	(function(){

		var tempArr = arr.sort2();
		var section = document.createElement('section');
		section.className = 'makeIndex';
		datashow.appendChild(section);

		var index = 0;
		var itemdiv = document.createElement('div');
		var clock = setInterval(function(){
			if(index >= tempArr.length){
				return;
			}

			var temp = itemdiv.cloneNode(true);
			temp.innerHTML = tempArr[index];
			section.appendChild(temp);

			if(tempArr[index] == 0){
				CssUtil.setCss(temp, {
					'color': '#59f'
				});
			}

			CssUtil.setCss(temp, {
				'height': 70 * tempArr[index] + 'px'
			});

			index++;
		}, 100);

	})();

	// ----------- //
	(function(){
		setTimeout(function(){

			var section = document.createElement('section');
			CssUtil.setCss(section, {
				'border': '1px solid #6EB215'
			});
			datashow.appendChild(section);
			arr = arr.sort(function(a, b){
				return a - b;
			});

			var index = 0;
			var itemdiv = document.createElement('div');
			var clock = setInterval(function(){
				if(index >= arr.length){
					return;
				}

				var temp = itemdiv.cloneNode(true);
				temp.innerHTML = arr[index];
				section.appendChild(temp);

				index++;
			}, 100);

		}, 1500);

	})();

}

})();

