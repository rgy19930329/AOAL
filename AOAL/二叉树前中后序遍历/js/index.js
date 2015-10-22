
(function(){

// 二叉树节点
function BiNode(){
	this.left = null;
	this.right = null;
	this.data = null;
	this.index = null;
}

// 按层建立二叉树
function createBiTree(arr){

	var root = new BiNode();
	var tarr = [];
	var front  = 1, rear = 0;
	while(rear < arr.length){

		var node = new BiNode();
		node.data = arr[rear];
		node.left = null;
		node.right = null;
		node.index = rear;
		rear++;
		tarr[rear] = node;

		if(rear == 1){
			root = node;
		}else{
			var front = Math.floor( rear / 2);
			if(rear % 2 == 0){
				tarr[front].left = node;
			}else{
				tarr[front].right = node;
				front++;
			}
		}
	}
	return root;
}

function getPreOrder(root){
	var preArr = [];
	function preOrder(root){
		if(root !== null && root !== undefined){
			if(root.data !== undefined){
				// console.log(root.data);
				preArr.push(root);
			}
			preOrder(root.left);
			preOrder(root.right);
		}
	}
	preOrder(root);
	return preArr;
}

function getInOrder(root){
	var inArr = [];
	function inOrder(root){
		if(root !== null && root !== undefined){
			inOrder(root.left);
			if(root.data !== undefined){
				// console.log(root.data);
				inArr.push(root);
			}
			inOrder(root.right);
		}
	}
	inOrder(root);
	return inArr;
}

function getPosOrder(root){
	var posArr = [];
	function posOrder(root){
		if(root !== null && root !== undefined){
			posOrder(root.left);
			posOrder(root.right);
			if(root.data !== undefined){
				// console.log(root.data);
				posArr.push(root);
			}
		}
	}
	posOrder(root);
	return posArr;
}

// 按层次遍历
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
		console.log(node.data);
		if(node.left){
			tarr.push(node.left);
		}
		if(node.right){
			tarr.push(node.right);
		}
	}
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
				goStart(arr, root);
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

function goStart(arr, root){

	var myTree = document.createElement('section');
	datashow.appendChild(myTree);
	var tree = Kbinarytree(myTree);
	tree.init(arr);
	var divs = tree.getNodes();
	console.log(divs);

	// -------- //
	setTimeout(function(){
		var section = document.createElement('section');
		datashow.appendChild(section);
		CssUtil.setCss(section, {
			'border': '1px solid #6EB215',
			'padding': '10px',
			'margin': '10px 0'
		});
		var preOrder_btn = document.createElement('button');
		preOrder_btn.setAttribute('tag', 'one');
		preOrder_btn.innerHTML = '前序遍历';
		section.appendChild(preOrder_btn);

		preOrder_btn.onmousedown = function(){
			var arr = getPreOrder(root);
			console.log(arr);

			for(var i = 0; i < divs.length; i++){
				if(divs[i].innerHTML !== ''){
					CssUtil.setCss(divs[i], {
						'background': '#59f'
					});
				}
			}

			createItems(section, arr);
		};
	}, 600);

	setTimeout(function(){
		var section = document.createElement('section');
		datashow.appendChild(section);
		CssUtil.setCss(section, {
			'border': '1px solid #6EB215',
			'padding': '10px',
			'margin': '10px 0'
		});
		var inOrder_btn = document.createElement('button');
		inOrder_btn.setAttribute('tag', 'one');
		inOrder_btn.innerHTML = '中序遍历';
		section.appendChild(inOrder_btn);

		inOrder_btn.onmousedown = function(){
			var arr = getInOrder(root);
			console.log(arr);

			for(var i = 0; i < divs.length; i++){
				if(divs[i].innerHTML !== ''){
					CssUtil.setCss(divs[i], {
						'background': '#59f'
					});
				}
			}

			createItems(section, arr);
		};
	}, 900);

	setTimeout(function(){
		var section = document.createElement('section');
		datashow.appendChild(section);
		CssUtil.setCss(section, {
			'border': '1px solid #6EB215',
			'padding': '10px',
			'margin': '10px 0'
		});
		var posOrder_btn = document.createElement('button');
		posOrder_btn.setAttribute('tag', 'one');
		posOrder_btn.innerHTML = '后序遍历';
		section.appendChild(posOrder_btn);

		posOrder_btn.onmousedown = function(){
			var arr = getPosOrder(root);
			console.log(arr);

			for(var i = 0; i < divs.length; i++){
				if(divs[i].innerHTML !== ''){
					CssUtil.setCss(divs[i], {
						'background': '#59f'
					});
				}
			}

			createItems(section, arr);
		};
	}, 1200);


	function createItems(section, arr){
		var index = 0;
		var itemdiv = document.createElement('div');
		var clock = setInterval(function(){
			if(index >= arr.length){
				clearInterval(clock);
				return;
			}

			var node = arr[index];
			var temp = itemdiv.cloneNode(true);
			temp.innerHTML = node.data;
			section.appendChild(temp);

			CssUtil.setCss(divs[node.index], {
				'background': 'red'
			});

			index++;
		}, 1000);
	}
}




})();

