
(function(){

Array.prototype.sort2 = function(){
	var output = [];

	var maxd = getBits(Math.max.apply(null, this));
	var arr = this.concat();
	for(var d = 1; d <= maxd; d++){
		var tarr = [];
		for(var i = 0; i < arr.length; i++){// 分配
			var index = getNumInPos(arr[i], d);
			
			if(tarr[index] === undefined){
				tarr[index] = [];
				tarr[index].push(arr[i]);
			}else{
				tarr[index].push(arr[i]);
			}
		}
		// -------------- //
		console.log(tarr)
		var obj = {};
		obj.tarr = tarr.concat();
		// -------------- //
		var res = [];
		for(var i = 0; i < tarr.length; i++){// 收集
			if(tarr[i] !== undefined){
				res = res.concat(tarr[i]);
			}
		}
		console.log(res);
		arr = res.concat();
		// -------------- //
		obj.res = res.concat();
		output.push(obj);
	}
	return output;

	function getNumInPos(num, pos){// 获取数据指定位置上的值
		var temp = 1;
		for(var i = 0; i < pos - 1; i++){
			temp *= 10;
		}
		return Math.floor(num / temp) % 10;
	}

	function getBits(num){// 求正整数位数
		var count = 0;
		while(num > 0){
			num = Math.floor(num / 10);
			count++;
		}
		return count;
	}
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
			start.onmousedown = nextStep;
			// ------- //
			output = arr.sort2();
			console.log(output)
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

// ----------- //

var output = [];
var rIndex = 0;

function nextStep(){
	if(rIndex >= output.length){
		return;
	}
	var tarr = output[rIndex].tarr;
	var res = output[rIndex].res;
	rIndex++;

	// ---------- //
	setTimeout(function(){

		var i = 0;
		var itemdiv = document.createElement('div');
		var clock = setInterval(function(){
			if(i >= 10){
				clearInterval(clock);
				showResult();
				return;
			}

			var section = document.createElement('section');
			datashow.appendChild(section);

			var indexDiv = document.createElement('div');
			indexDiv.innerHTML = i;
			section.appendChild(indexDiv);
			CssUtil.setCss(indexDiv, {
				'border-radius': '0',
				'background': '#6EB215'
			});

			if(tarr[i] !== undefined){
				console.log(i, tarr[i])
				for(var k = 0; k < tarr[i].length; k++){
					var itemdiv = document.createElement('div');
					itemdiv.innerHTML = tarr[i][k];
					section.appendChild(itemdiv);
				}
			}

			i++;
		}, 100);

		function showResult(){
			var section = document.createElement('section');
			datashow.appendChild(section);
			CssUtil.setCss(section, {
				'border': '1px solid #6EB215'
			});

			var index = 0;
			var itemdiv = document.createElement('div');
			var clock = setInterval(function(){
				if(index >= 10){
					var next = document.createElement('button');
					next.setAttribute('tag', 'one');
					next.innerHTML = 'next';
					section.appendChild(next);
					
					clearInterval(clock);

					next.onmousedown = nextStep;
					return;
				}

				var itemdiv = document.createElement('div');
				itemdiv.innerHTML = res[index];
				section.appendChild(itemdiv);

				index++;
			}, 100);
		}

	}, 500);

}


})();