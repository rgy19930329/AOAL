
(function(){

	Ktabs(mytabs).init({'dur': 500});

	var arr = [ 
		[0, 1, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 1],
		[0, 0, 0, 0, 0, 0, 0, 1],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]
	];
	var tgraph = Kgraph(graph);
	tgraph.init(arr, {
		'width': '700px',// 图的宽度
		'height': '450px',// 图的高度
		'nodeSize': '50px',// 节点尺寸
		'nodeBgColor': '#59f',// 节点背景颜色
		'nodeTextColor': '#fff',// 节点文字颜色
		'arcColor': '#6EB215',// 弧的颜色
		'hasDirected': false, // 是否是有向图
		'hasArcWeight': false // 是否显示权值
	});

	var arr2 = [ 
		[0, 1, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 1],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0]
	];

	var arr3 = [ 
		[0, 1, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 1],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]
	];

	var config = {
		'width': '700px',// 图的宽度
		'height': '450px',// 图的高度
		'nodeSize': '50px',// 节点尺寸
		'nodeBgColor': '#59f',// 节点背景颜色
		'nodeTextColor': '#fff',// 节点文字颜色
		'arcColor': '#6EB215',// 弧的颜色
		'hasDirected': true, // 是否是有向图
		'hasArcWeight': false // 是否显示权值
	};

	var tgraph2 = Kgraph(graph2);
	tgraph2.init(arr2, config);
	var tgraph3 = Kgraph(graph3);
	tgraph3.init(arr3, config);

	var source = mytabs.querySelector('.tabs-nav');
	EventUtil.addEvent(source, 'click', function(){
		var target = EventUtil.getTarget();
		if(target.tagName.toLowerCase() == 'a'){
			tgraph.fresh(arr);
			tgraph2.fresh(arr2);
			tgraph3.fresh(arr3);
		}
	});

})();

