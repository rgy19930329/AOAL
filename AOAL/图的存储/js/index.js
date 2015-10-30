
(function(){

	var targetTab = Ktable(table);
	var targetTab2 = Ktable(table2);

	var arr = targetTab.getDataList();
	arr = handleDataSource(arr);
	var arr2 = targetTab2.getDataList();
	arr2 = handleDataSource(arr2);

	var alist_config = {
		'width': '550px',
		'height': '250px',
		'cellSize': '40px',
		'color': '#6EB215'
	};

	var alist_nodir = Kadjacencylist(alist);
	alist_nodir.init(arr, alist_config);
	var alist_hasdir = Kadjacencylist(alist2);
	alist_hasdir.init(arr2, alist_config);

	var graph_nodir = Kgraph(graph);
	graph_nodir.init(arr, {
		'width': '450px',// 图的宽度
		'height': '250px',// 图的高度
		'nodeSize': '40px',// 节点尺寸
		'nodeBgColor': '#59f',// 节点背景颜色
		'nodeTextColor': '#fff',// 节点文字颜色
		'arcColor': '#6EB215',// 弧的颜色
		'hasDirected': false, // 是否是有向图
		'hasArcWeight': false // 是否显示权值
	});

	var graph_hasdir = Kgraph(graph2);
	graph_hasdir.init(arr2, {
		'width': '450px',// 图的宽度
		'height': '250px',// 图的高度
		'nodeSize': '40px',// 节点尺寸
		'nodeBgColor': '#59f',// 节点背景颜色
		'nodeTextColor': '#fff',// 节点文字颜色
		'arcColor': '#6EB215',// 弧的颜色
		'hasDirected': true, // 是否是有向图
		'hasArcWeight': false // 是否显示权值
	});

	function handleDataSource(arr){
		var len = arr.length;
		for(var i = 0; i < len; i++){
			for(var j = 0; j < len; j++){
				arr[i][j] = Number(arr[i][j]);
			}
		}
		return arr;
	}

	// ------------------------ //

	EventUtil.addEvent(ensure_nodir, 'click', function(){
		var arr = targetTab.getDataList();
		arr = handleDataSource(arr);
		
		alist_nodir.fresh(arr);
		graph_nodir.fresh(arr);
	});

	EventUtil.addEvent(ensure_hasdir, 'click', function(){
		var arr2 = targetTab2.getDataList();
		arr2 = handleDataSource(arr2);

		alist_hasdir.fresh(arr2);
		graph_hasdir.fresh(arr2);
	});

})();

