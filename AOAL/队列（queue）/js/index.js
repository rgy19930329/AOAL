
(function(){

// ----------------- //

build.onmousedown = function(){

	var list = entry.value.split(',');
	var arr = [];
	for(var i = 0, len = list.length; i < len; i++){
		arr[i] = list[i];
	}

	// frontArr = arr.concat();

	// ---------- //
	var index = 0;
	var itemdiv = document.createElement('div');
	var clock = setInterval(function(){
		if(index >= arr.length){
			clearInterval(clock);
			return;
		}

		var temp = itemdiv.cloneNode(true);
		temp.innerHTML = arr[index];
		front.appendChild(temp);

		index++;
	}, 100);
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

// ----------------- //

var bar = Ktoast(myToast);
bar.init({
	'width': '220px',// toast宽度
	'time': 1000 // toast持续时间
});

// ----------------- //

unshiftBtn.onmousedown = function(){
	var item = front.removeChild(front.lastChild);
	queue.appendChild(item);
	bar.emit(item.innerHTML + ' 节点入队列');
}

shiftBtn.onmousedown = function(){
	var node = queue.removeChild(queue.firstChild);
	rear.appendChild(node);
	bar.emit(node.innerHTML + ' 节点出队列');
}


})();