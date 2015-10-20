
(function(){

Array.prototype.sort2 = function(){
	var output = [];
	var arrAllLen = this.length;
	var count = 0;
	var flag = false;

	var obj = {};
	obj.swap = [-1, -1];
	obj.res = this.concat();
	obj.already = -1;
	output.push(obj);

	var len = this.length;
	heapBuild(this, len);
	console.log("----------------大顶堆建立完成---------------");

	for(var i = len; i > 1; i--){
		swap(this, i - 1, 0);
		// ---------- //
		// console.log("无序区首尾交换：" + this[i - 1] + "<--->" + this[0]);
		// console.log(this)
		var obj = {};
		obj.swap = [0, i-1];
		obj.res = this.concat();
		obj.already = arrAllLen - count - 1;
		console.log(obj.already)
		output.push(obj);
		// ---------- //
		heapAdjust(this, 0, i - 1);
		count++;
		console.log("----------------第" + count + "轮完成--------------" );
	}

	return output;

	// 交换
	function swap(arr, index1, index2){
		var temp = arr[index1];
		arr[index1] = arr[index2];
		arr[index2] = temp;
	}

	// 调整
	function heapAdjust(arr, i, len){
		var left = 2 * i + 1, 
			right = 2 * i + 2;
		var max = i;
		if(i <= Math.floor(len / 2)){
			if(left < len && arr[max] < arr[left]){
				max = left;
			}
			if(right < len && arr[max] < arr[right]){
				max = right;
			}
			if(i != max){
				swap(arr, max, i);
				// -------- //
				var obj = {};
				obj.swap = [i, max];
				obj.res = arr.concat();
				if(flag){
					obj.already = arrAllLen - count - 1;
				}else{
					obj.already = -1;
				}
				output.push(obj);
				// -------- //
				heapAdjust(arr, max, len);
			}
		}
	}

	//创建大顶堆
	function heapBuild(arr, len){
		var begin = Math.floor(len / 2) - 1;
		for(var i = begin; i >= 0; i--){
			heapAdjust(arr, i, len);
		}
		flag = true;
	}
}

// --------------------------------------- //

function getAbsPoint(e) {
	var x = e.offsetLeft;
	var y = e.offsetTop;
	while (e = e.offsetParent) {
		x += e.offsetLeft;
		y += e.offsetTop;
	}
	return {
		'x': x,
		'y': y
	};
};

function getAngleFromTan(tan){
	var v = Math.atan(tan);
	var angle = Math.round(v * 180 / Math.PI);
	return angle;
}

function drawLine(section, divs, i){
	var line1 = document.createElement('span');
	line1.className = 'line';
	section.appendChild(line1);

	var line2 = document.createElement('span');
	line2.className = 'line';
	section.appendChild(line2);

	var pnode = divs[i];
	var pleft = divs[2*i+1];
	var pright = divs[2*i+2];

	var point1 = getAbsPoint(pnode);
	var point2 = getAbsPoint(pleft);
	var point3 = getAbsPoint(pright);

	var sectionX = getAbsPoint(section).x;
	var sectionY = getAbsPoint(section).y;
	var itemDivSize = CssUtil.getCss(divs[0], 'width');
	itemDivSize = parseInt(itemDivSize);
	var itemRadius = itemDivSize / 2;
	
	var tx = Math.abs(point1.x - point2.x);
	var ty = Math.abs(point1.y - point2.y);
	var lineWidth = Math.round(Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2)));
	var tan = ty / tx;
	var angle = getAngleFromTan(tan);
	
	CssUtil.setCss(line1, {
		'width': lineWidth + 'px',
		'left': (point1.x - sectionX + itemRadius) + 'px',
		'top': (point1.y - sectionY + itemRadius) + 'px',
		'transform': 'rotate(' + angle + 'deg)'
	});

	AnimUtil.animate(line1, {},{'dur': 1000});

	CssUtil.setCss(line2, {
		'width': lineWidth + 'px',
		'left': (point1.x - sectionX + itemRadius) + 'px',
		'top': (point1.y - sectionY + itemRadius) + 'px',
		'transform': 'rotate(' + (180 - angle) + 'deg)'
	});

	AnimUtil.animate(line2, {},{'dur': 1000});

	if(pleft.innerHTML === ''){
		CssUtil.setCss(line2, {
			'background': 'transparent'
		});
	}

	if(pright.innerHTML === ''){
		CssUtil.setCss(line1, {
			'background': 'transparent'
		});
	}
}

// 绘制枝干
function drawBranch(section){
	var divs = section.getElementsByTagName('div');
	for(var i = 0; i < Math.floor(divs.length / 2); i++){
		drawLine(section, divs, i);
	}
}

function getRows(arr){
	var len = arr.length;
	var rows = 0;
	while(len > 0){
		len = Math.floor(len / 2);
		rows++;
	}
	return rows;
}

function createTree(arr){
	var section = document.createElement('section');
	datashow.appendChild(section);

	var table = document.createElement('table');
	section.appendChild(table);

	var allRows = getRows(arr);
	for(var row = 0; row < allRows; row++){
		var tr = document.createElement('tr');
		for(var col = 0; col < Math.pow(2, row); col++){
			var td = document.createElement('td');
			td.setAttribute('colspan', Math.pow(2, allRows - row - 1));
			tr.appendChild(td);

			var itemdiv = document.createElement('div');
			var num = arr.shift();
			if(num !== undefined){
				itemdiv.innerHTML = num;
			}else{
				itemdiv.innerHTML = '';
				CssUtil.setCss(itemdiv, {
					'background': 'transparent'
				});
			}
			
			td.appendChild(itemdiv);
		}
		table.appendChild(tr);
	}
	return section;
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
		(function(){

			var arr = output.pop().res;
			var index = 0;
			var itemdiv = document.createElement('div');

			var clock = setInterval(function(){
				if(index >= arr.length){
					return;
				}

				var temp = itemdiv.cloneNode(true);
				temp.innerHTML = arr[index];
				datashow.appendChild(temp);

				CssUtil.setCss(temp, {
					'background': 'red'
				});

				index++;
			}, 100);
		})();
		return;
	}
	var swap = output[rIndex].swap;
	var res = output[rIndex].res;
	var already = output[rIndex].already;
	rIndex++;

	var divs = this.parentNode.getElementsByTagName('div');
	if (swap[0] !== -1) {
		CssUtil.setCss(divs[swap[0]], {
			'background': 'orange'
		});
		CssUtil.setCss(divs[swap[1]], {
			'background': 'orange'
		});
	}

	// ---------- //
	setTimeout(function(){

		var arr = res.concat();
		var section = createTree(arr);
		drawBranch(section);

		var next = document.createElement('button');
		next.setAttribute('tag', 'one');
		next.innerHTML = 'next';
		section.appendChild(next);

		var divs = section.getElementsByTagName('div');
		if(already !== -1){
			for(var i = res.length - 1; i >= already; i--){
				CssUtil.setCss(divs[i], {
					'background': 'red'
				});
			}
		}

		next.onmousedown = nextStep;

		document.body.scrollTop = document.body.scrollHeight;
	}, 1000);

}


})();