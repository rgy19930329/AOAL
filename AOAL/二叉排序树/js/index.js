(function(){

// 二叉树节点
function BiNode(data){
	this.left = null;
	this.right = null;
	this.data = data;

	this.addNode = function(node){
		if(this.data == undefined){
			this.data = node.data;
			return;
		}
		if(node.data < this.data){
			if(this.left == null){
				this.left = node;
			}else{
				this.left.addNode(node);
			}
		}else{
			if(this.right == null){
				this.right = node;
			}else{
				this.right.addNode(node);
			}
		}
	}
}

function createBiTree(arr){
	var root = new BiNode();
	for(var i = 0; i < arr.length; i++){
		var node = new BiNode(arr[i]);
		root.addNode(node);
	}
	return root;
}

function getInOrder(root){
	var inArr = [];
	function inOrder(root){
		if(root !== null && root !== undefined){
			inOrder(root.left);
			if(root.data !== undefined){
				inArr.push(root.data);
			}
			inOrder(root.right);
		}
	}
	inOrder(root);
	return inArr;
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

// -------------------------- //

build.onmousedown = function(){

	var list = entry.value.split(',');
	var arr = [];
	for(var i = 0, len = list.length; i < len; i++){
		if(list[i] == '#'){
			arr[i] = undefined;
		}else{
			arr[i] = list[i];
		}
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
				goStart(root);
			};
			// ------- //
			root = createBiTree(arr);
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

function goStart(root){

	var arr = getLevelOrder(root);
	console.log(arr);
	var inOrderArr = getInOrder(root);
	console.log(inOrderArr);

	var myTree = document.createElement('section');
	datashow.appendChild(myTree);
	var tree = Kbinarytree(myTree);
	tree.init(arr, {
		'nodeBgColor': 'transparent',
		'nodeTextColor': 'transparent'
	});
	var divs = tree.getNodes();
	console.log(divs);
	var validDivs = [];// 有效节点
	for(var i = 0; i < divs.length; i++){
		if(divs[i].innerHTML !== ''){
			validDivs.push(divs[i]);
		}
	}
	console.log(validDivs);
	var index = 0;
	var clock = setInterval(function(){
		if(index >= validDivs.length){
			clearInterval(clock);
			nextStep();
			return;
		}

		CssUtil.setCss(validDivs[index], {
			'background': '#59f',
			'color': '#fff'
		});

		index++;
	}, 1000);

	// ---------------- //

	function nextStep(){
		var section = document.createElement('section');
		datashow.appendChild(section);
		CssUtil.setCss(section, {
			'border': '1px solid #6EB215',
			'padding': '10px'
		});

		var inOrder_btn = document.createElement('button');
		inOrder_btn.innerHTML = '中序遍历';
		section.appendChild(inOrder_btn);

		inOrder_btn.onmousedown = function(){
			var index = 0;
			var itemdiv = document.createElement('div');
			var clock = setInterval(function(){
				if(index >= inOrderArr.length){
					clearInterval(clock);
					return;
				}

				var temp = itemdiv.cloneNode(true);
				temp.innerHTML = inOrderArr[index];
				section.appendChild(temp);

				index++;
			}, 100);
		}
	}
}


})();

