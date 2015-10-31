
(function(){

	var config = {
		'width': '370px',// 图的宽度
		'height': '290px',// 图的高度
		'nodeSize': '50px',// 节点尺寸
		'nodeBgColor': '#59f',// 节点背景颜色
		'nodeTextColor': '#fff',// 节点文字颜色
		'arcColor': '#6EB215',// 弧的颜色
		'hasDirected': true, // 是否是有向图
		'hasArcWeight': false // 是否显示权值
	};

	var config_1 = {
		'opacity': '0'
	};

	var arr = [ 
		[0, 1, 1, 1, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 1, 0],
		[0, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 1, 0]
	];
	Kgraph(graph).init(arr, config);

	var arr2 = [ 
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 1, 0],
		[0, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 1, 0]
	];
	var tgraph2 = Kgraph(graph2);
	tgraph2.init(arr2, config);
	CssUtil.setCss(tgraph2.getAllNodes()[0], config_1);

	var arr3 = [ 
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 1, 0],
		[0, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];
	var tgraph3 = Kgraph(graph3);
	Kgraph(graph3).init(arr3, config);
	CssUtil.setCss(tgraph3.getAllNodes()[0], config_1);
	CssUtil.setCss(tgraph3.getAllNodes()[5], config_1);

	var arr4 = [ 
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];
	var tgraph4 = Kgraph(graph4);
	Kgraph(graph4).init(arr4, config);
	CssUtil.setCss(tgraph4.getAllNodes()[0], config_1);
	CssUtil.setCss(tgraph4.getAllNodes()[5], config_1);
	CssUtil.setCss(tgraph4.getAllNodes()[3], config_1);

	var arr5 = [ 
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];
	var tgraph5 = Kgraph(graph5);
	Kgraph(graph5).init(arr5, config);
	CssUtil.setCss(tgraph5.getAllNodes()[0], config_1);
	CssUtil.setCss(tgraph5.getAllNodes()[5], config_1);
	CssUtil.setCss(tgraph5.getAllNodes()[3], config_1);
	CssUtil.setCss(tgraph5.getAllNodes()[2], config_1);

	var arr6 = [ 
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];
	var tgraph6 = Kgraph(graph6);
	Kgraph(graph6).init(arr6, config);
	CssUtil.setCss(tgraph6.getAllNodes()[0], config_1);
	CssUtil.setCss(tgraph6.getAllNodes()[5], config_1);
	CssUtil.setCss(tgraph6.getAllNodes()[3], config_1);
	CssUtil.setCss(tgraph6.getAllNodes()[2], config_1);
	CssUtil.setCss(tgraph6.getAllNodes()[1], config_1);

	// -------------- //

	var nextBtns = document.getElementsByClassName('next');
	for(var i = 0, len = nextBtns.length; i < len; i++){
		EventUtil.addEvent(nextBtns[i], 'click', function(k){
			return function(){
				document.body.scrollTop = document.body.scrollHeight;
				var curli = nextBtns[k].parentNode.parentNode.parentNode;
				var nextli = findNextByTag(curli, 'li');
				AnimUtil.animate(nextli, {
					'height': '290px'
				});
			}
		}(i));
	}

	EventUtil.addEvent(next_sort, 'click', function(){
		var pnode = sort_result.parentNode;
		AnimUtil.animate(pnode, {
			'opacity': '1'
		}, {
			'dur': 2000
		});

		CssUtil.setCss(myTyper, {
			'display': 'block'
		});
		Ktyper(myTyper).init({
			'dur': 100 // 打印每个字的间隔时间
		});
		document.body.scrollTop = document.body.scrollHeight;
	});

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

