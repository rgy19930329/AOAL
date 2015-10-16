
(function(){

// ---------------------------------------------- //

build.onmousedown = function(){

	var list = entry.value.split(',');
	var arr = [];
	for(var i = 0, len = list.length; i < len; i++){
		arr[i] = Number(list[i]);
	}

	// ---------- //

	var itemdiv = document.createElement('div');

	index = 0;
	clock = setInterval(function(){
		if(index >= arr.length){
			var start = document.createElement('button');
			start.setAttribute('tag', 'one');
			start.innerHTML = 'start';
			datashow.appendChild(start);
			clearInterval(clock);

			start.onmousedown = nextStep;
			
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
	var arr = [];
	var divList = this.parentNode.getElementsByTagName('div');
	for(var i = 0; i < divList.length; i++){
		arr[i] = Number(divList[i].innerHTML);
	}
	var t = Math.floor(arr.length / 2);
	CssUtil.setCss(divList[t], {
		'background': 'orange'
	});

	// ---------- //

	var son = document.createElement('section');
	var level_1 = document.createElement('p');
	var level_2 = document.createElement('p');
	var level_3 = document.createElement('p');
	son.appendChild(level_1);
	son.appendChild(level_2);
	son.appendChild(level_3);
	this.parentNode.appendChild(son);

	// ---------- //

	var middle = null;

	setTimeout(function(){
		var temp = divList[t].cloneNode(true);
		level_2.appendChild(temp);
		CssUtil.setCss(temp, {
			'background': 'red'
		});

		middle = Number(temp.innerHTML);
		var middleList = arr.filter(function(item){
			return item === middle;
		});
		for(var i = 1; i < middleList.length; i++){
			temp = temp.cloneNode(true);
			level_2.appendChild(temp);
			CssUtil.setCss(temp, {
				'background': 'red'
			});
		}
	}, 500);

	setTimeout(function(){
		var leftArray = arr.filter(function(item){
			return item < middle;
		});

		var index = 0;
		var clock = setInterval(function(){
			console.log(index)
			if(index >= leftArray.length){
				clearInterval(clock);
				if(leftArray.length > 1){
					var next = document.createElement('button');
					next.setAttribute('tag', 'one');
					next.innerHTML = 'next';
					level_1.appendChild(next);
					
					next.onmousedown = nextStep;
				}else if(leftArray.length == 1){
					var complete = level_1.getElementsByTagName('div');
					CssUtil.setCss(complete, {
						'background': 'red'
					});
				}
				return;
			}

			var temp = document.createElement('div');
			temp.innerHTML = leftArray[index];
			level_1.appendChild(temp);

			index++;
		}, 100);

	}, 1000);

	setTimeout(function(){
		var rightArray = arr.filter(function(item){
			return item > middle;
		});

		var index = 0;
		var clock = setInterval(function(){
			if(index >= rightArray.length){
				clearInterval(clock);
				if(rightArray.length > 1){
					var next = document.createElement('button');
					next.setAttribute('tag', 'one');
					next.innerHTML = 'next';
					level_3.appendChild(next);

					next.onmousedown = nextStep;
				}else if(rightArray.length == 1){
					var complete = level_3.getElementsByTagName('div');
					CssUtil.setCss(complete, {
						'background': 'red'
					});
				}
				return;
			}

			var temp = document.createElement('div');
			temp.innerHTML = rightArray[index];
			level_3.appendChild(temp);

			index++;
		}, 100);

	}, 1000);
}

})();