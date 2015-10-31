
(function(){

	var config = {
		'width': '400px',// 图的宽度
		'height': '300px',// 图的高度
		'nodeSize': '50px',// 节点尺寸
		'nodeBgColor': '#59f',// 节点背景颜色
		'nodeTextColor': '#fff',// 节点文字颜色
		'arcColor': '#6EB215',// 弧的颜色
		'hasDirected': false, // 是否是有向图
		'hasArcWeight': true // 是否显示权值
	};

	var arr = [ 
		[0,	6, 1, 5, 0,	0],
		[6, 0, 5, 0, 3, 0],
		[1, 5, 0, 5, 6, 4],
		[5, 0, 5, 0, 0, 2],
		[0, 3, 6, 0, 0, 6],
		[0, 0, 4, 2, 6, 0]
	];
	Kgraph(graph).init(arr, config);
	Kadjacencylist(alist).init(arr, {
		'height': '300px',
		'cellSize': '32px',
		'color': '#6EB215'
	});

	// ----------------- //

	var arr2 = [
		[0,	0, 1, 0, 0,	0],
		[0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];
	Kgraph(graph2).init(arr2, config);

	var arr3 = [
		[0,	0, 1, 0, 0,	0],
		[0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 4],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 4, 0, 0, 0]
	];
	Kgraph(graph3).init(arr3, config);

	var arr4 = [
		[0,	0, 1, 0, 0,	0],
		[0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 4],
		[0, 0, 0, 0, 0, 2],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 4, 2, 0, 0]
	];
	Kgraph(graph4).init(arr4, config);

	var arr5 = [
		[0,	0, 1, 0, 0,	0],
		[0, 0, 5, 0, 0, 0],
		[1, 5, 0, 0, 0, 4],
		[0, 0, 0, 0, 0, 2],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 4, 2, 0, 0]
	];
	Kgraph(graph5).init(arr5, config);

	var arr6 = [
		[0,	0, 1, 0, 0,	0],
		[0, 0, 5, 0, 3, 0],
		[1, 5, 0, 0, 0, 4],
		[0, 0, 0, 0, 0, 2],
		[0, 3, 0, 0, 0, 0],
		[0, 0, 4, 2, 0, 0]
	];
	Kgraph(graph6).init(arr6, config);

	// ------------------------ //

	var nextBtns = document.getElementsByClassName('next');
	for(var i = 0, len = nextBtns.length; i < len; i++){
		EventUtil.addEvent(nextBtns[i], 'click', (function(k){
			return function(){
				document.body.scrollTop = document.body.scrollHeight;
				var curli = nextBtns[k].parentNode.parentNode;
				var nextli = findNextByTag(curli, 'li');
				AnimUtil.animate(nextli, {
					'height': '330px'
				});
			}
		})(i));
	}

	function findNextByTag(source, tag){
		var obj = source;
		var flag = true;
		while(flag){
			obj = obj.nextSibling;
			if(obj.nodeType == 3){
				continue;
			}
			if(obj.tagName.toLowerCase() == tag){
				break;
			}
		}
		return obj;
	}

})();