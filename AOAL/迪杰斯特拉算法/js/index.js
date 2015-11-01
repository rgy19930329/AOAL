
(function(){

	var arr = [ 
		[0, 0, 10, 0, 30, 100],
		[0, 0, 5, 0, 0, 0],
		[0, 0, 0, 50, 0, 0],
		[0, 0, 0, 0, 0, 10],
		[0, 0, 0, 20, 0, 60],
		[0, 0, 0, 0, 0, 0]
	];

	Kgraph(graph).init(arr, {
		'width': '300px',// 图的宽度
		'height': '300px',// 图的高度
		'nodeSize': '40px',// 节点尺寸
		'nodeBgColor': '#59f',// 节点背景颜色
		'nodeTextColor': '#fff',// 节点文字颜色
		'arcColor': '#6EB215',// 弧的颜色
		'hasDirected': true, // 是否是有向图
		'hasArcWeight': true // 是否显示权值
	});

	Kadjacencylist(alist).init(arr, {
		'width': '300px',// 图的宽度
		'height': '160px',// 图的高度
		'cellSize': '25px',// 节点尺寸
		'color': '#6EB215'// 颜色
	});

	// ------------------- //

	var sections = main.getElementsByTagName('section');
	var list = process.getElementsByTagName('li');
	var index = 0;
	EventUtil.addEvent(next, 'click', function(){
		if(index >= sections.length){
			return;
		}
		AnimUtil.animate(sections[index], {
			'transform': 'scale(1)'
		});
		AnimUtil.animate(list[index + 1], {
			'opacity': '1'
		});
		index++;
	});


})();

