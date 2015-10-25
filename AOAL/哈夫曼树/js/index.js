
(function(){

function BiNode(data){
	this.left = null;
	this.right = null;
	this.data = data;
}

var nodeList = [];
function createHuffman(arr){
	var arr = arr.concat();
	arr.sort(function(a, b){
		return a - b;
	});
	var tarr = [];

	for(var i = 0; i < arr.length; i++){
		var node = new BiNode(arr[i]);
		tarr[i] = node;
	}

	for(var i = 0; i < arr.length - 1; i++){
		var temp = tarr.splice(0, 2);
		var data = temp[0].data + temp[1].data;
		var node = new BiNode(data);
		node.left = temp[0];
		node.right = temp[1];
		nodeList.push(node);

		tarr.push(node);
		tarr.sort(function(node1, node2){
			return node1.data - node2.data;
		});
	}

	return tarr[0];
}

function getLevelOrder(root){
	var levelArr = [];
	function levelOrder(root){
		var tarr = [];
		if(root == null || root == undefined){
			return;
		}
		if(root){
			tarr.push(root);
		}
		while(tarr.length > 0){
			node = tarr.shift();
			
			if(node){
				levelArr.push(node.data);
				tarr.push(node.left);
				tarr.push(node.right);
			}else{
				levelArr.push(undefined);
			}
		}
	}
	levelOrder(root);
	return levelArr;
}

function findDeep(root){
	var deep = 0;
	if(root){
		var leftDeep = findDeep(root.left);
		var rightDeep = findDeep(root.right);
		deep = leftDeep >= rightDeep ? leftDeep + 1: rightDeep + 1;
	}
	return deep;
}


// -------------------------- //

build.onmousedown = function(){

	var list = entry.value.split(',');
	var arr = [];
	for(var i = 0, len = list.length; i < len; i++){
		arr[i] = Number(list[i]);
	}

	// ---------- //
	var root = null;
	// ---------- //
	var index = 0;
	var itemdiv = document.createElement('div');
	var clock = setInterval(function(){
		if(index >= arr.length){
			var start = document.createElement('button');
			start.setAttribute('tag', 'one');
			start.innerHTML = 'start';
			datashow.appendChild(start);
			clearInterval(clock);
			// ------- //
			start.onmousedown = function(){
				goStart(root, arr);
			};
			// ------- //
			root = createHuffman(arr);
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

function goStart(root, arr){

	var initDataShow = document.createElement('section');
	datashow.appendChild(initDataShow);
	CssUtil.setCss(initDataShow, {
		'border': '1px solid #6EB215'
	});

	arr.sort(function(a, b){
		return a - b;
	});
	addNodes(initDataShow, arr);

	var next = document.createElement('button');
	next.setAttribute('tag', 'one');
	next.innerHTML = 'next';
	datashow.appendChild(next);
	next.onmousedown = function(){
		nextStep();
	}

	// --------------- //

	var res = [];
	var sarr = arr.concat();
	sarr.sort(function(a, b){
		return a - b;
	});
	for(var i = 0; i < arr.length - 1; i++){
		var temp = sarr.splice(0, 2);
		var data = temp[0] + temp[1];

		sarr.push(data);
		sarr.sort(function(a, b){
			return a - b;
		});
		res.push(sarr.concat());
	}
	console.log(res);
	console.log(nodeList);

	// ---------------- //
	var rIndex = 0;
	function nextStep(){
		if(rIndex >= res.length){
			return;
		}

		var section = document.createElement('section');
		datashow.appendChild(section);
		CssUtil.setCss(section, {
			'border': '1px solid #6EB215'
		});
		var tree = Kbinarytree(section);
		var myArr = getValidLevelArr(nodeList[rIndex]);
		tree.init(myArr);

		var section2 = document.createElement('section');
		datashow.appendChild(section2);
		var next = document.createElement('button');
		next.setAttribute('tag', 'one');
		next.innerHTML = 'next';
		datashow.appendChild(next);

		console.log(rIndex)
		var tempArr = res[rIndex];
		console.log(tempArr)
		addNodes(section2, tempArr);

		rIndex++;

		next.onmousedown = function(){
			nextStep();
		}
	}

	function getValidLevelArr(root){
		var levelArr = getLevelOrder(root);
		var deep = findDeep(root);
		var len = Math.pow(2, deep - 1);
		for(var i = 0; i < len - 1; i++){
			if(levelArr[i] == undefined){
				levelArr.splice(2*i+1, 0, undefined);
				levelArr.splice(2*i+2, 0, undefined);
			}
		}
		levelArr = levelArr.slice(0, Math.pow(2, deep) - 1);
		return levelArr;
	}

	function addNodes(parentNode, arr){
		var index = 0;
		var itemdiv = document.createElement('div');
		var clock = setInterval(function(){
			if(index >= arr.length){
				clearInterval(clock);
				return;
			}

			var temp = itemdiv.cloneNode(true);
			temp.innerHTML = arr[index];
			parentNode.appendChild(temp);
			if(index == 0){
				document.body.scrollTop = document.body.scrollHeight;
			}

			index++;
		}, 100);
	}

}


})();
