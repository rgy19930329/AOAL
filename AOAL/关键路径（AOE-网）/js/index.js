
(function(){

	var config = {
		'width': '850px',// 图的宽度
		'height': '290px',// 图的高度
		'nodeSize': '50px',// 节点尺寸
		'nodeBgColor': '#59f',// 节点背景颜色
		'nodeTextColor': '#fff',// 节点文字颜色
		'arcColor': '#6EB215',// 弧的颜色
		'hasDirected': true, // 是否是有向图
		'hasArcWeight': true // 是否显示权值
	};

	var config_1 = {
		'background': 'orange'
	};

	var arr = [ 
		[0, 6, 4, 5, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 2, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 9, 7, 0],
		[0, 0, 0, 0, 0, 0, 0, 4, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 2],
		[0, 0, 0, 0, 0, 0, 0, 0, 4],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	Kgraph(graph).init(arr, config);


	var tgraph2 = Kgraph(graph2);
	tgraph2.init(arr, config);
	var list2 = tgraph2.getAllNodes();
	CssUtil.setCss(list2[0], config_1);
	CssUtil.setCss(list2[1], config_1);
	CssUtil.setCss(list2[4], config_1);
	CssUtil.setCss(list2[6], config_1);
	CssUtil.setCss(list2[8], config_1);

	var tgraph3 = Kgraph(graph3);
	Kgraph(graph3).init(arr, config);
	var list3 = tgraph3.getAllNodes();
	CssUtil.setCss(list3[0], config_1);
	CssUtil.setCss(list3[1], config_1);
	CssUtil.setCss(list3[4], config_1);
	CssUtil.setCss(list3[7], config_1);
	CssUtil.setCss(list3[8], config_1);


	var tgraph4 = Kgraph(graph4);
	Kgraph(graph4).init(arr, config);
	var list4 = tgraph4.getAllNodes();
	CssUtil.setCss(list4[0], config_1);
	CssUtil.setCss(list4[2], config_1);
	CssUtil.setCss(list4[4], config_1);
	CssUtil.setCss(list4[6], config_1);
	CssUtil.setCss(list4[8], config_1);

	var tgraph5 = Kgraph(graph5);
	Kgraph(graph5).init(arr, config);
	var list5 = tgraph5.getAllNodes();
	CssUtil.setCss(list5[0], config_1);
	CssUtil.setCss(list5[2], config_1);
	CssUtil.setCss(list5[4], config_1);
	CssUtil.setCss(list5[7], config_1);
	CssUtil.setCss(list5[8], config_1);

	var tgraph6 = Kgraph(graph6);
	Kgraph(graph6).init(arr, config);
	var list6 = tgraph6.getAllNodes();
	CssUtil.setCss(list6[0], config_1);
	CssUtil.setCss(list6[3], config_1);
	CssUtil.setCss(list6[5], config_1);
	CssUtil.setCss(list6[7], config_1);
	CssUtil.setCss(list6[8], config_1);

	// -------------- //

	var nextBtns = document.getElementsByClassName('next');
	for(var i = 0, len = nextBtns.length; i < len; i++){
		EventUtil.addEvent(nextBtns[i], 'click', function(k){
			return function(){
				document.body.scrollTop = document.body.scrollHeight;
				var curli = nextBtns[k].parentNode.parentNode.parentNode.parentNode;
				var nextli = findNextByTag(curli, 'li');
				AnimUtil.animate(nextli, {
					'height': '290px'
				}, {
					'easing': 'linear'
				});
			}
		}(i));
	}

	EventUtil.addEvent(next, 'click', function(){
		document.body.scrollTop = document.body.scrollHeight;
		AnimUtil.animate(myfooter, {
			'opacity': '1'
		});
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

