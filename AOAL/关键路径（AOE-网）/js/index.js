
(function(){

	var MyAnimation = {
		createKeyframes: function(source, obj){
            var styleDom = document.createElement('style');
            var process = '';
            for(var i in obj){
                process += (i + obj[i]);
            }
            var prefix = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
            var str = '';
            for(var i = 0; i < prefix.length; i++){
                str += ('@' + prefix[i] + 'keyframes ' + source + '{' + process + '}');
            }
            styleDom.innerHTML = str;
            document.getElementsByTagName("head")[0].appendChild(styleDom);
        },

        createAnimation: function(source, animConfig, keyframesConfig){
            var animConfig = animConfig || {};
            var dur = animConfig.dur || 1000;// 每次循环持续时间
            var easing = animConfig.easing || 'linear';// 缓动函数
            var times = animConfig.times || 'infinite';// 循环次数

            var motion_name = 'motion_' + Math.random().toString().slice(2);
            var param = motion_name + ' ' + dur + ' ' + easing + ' ' + times;
            CssUtil.setCss(source, {
                'animation': param,
                '-webkit-animation': param,
                '-moz-animation': param,
                '-o-animation': param,
                '-ms-animation': param
            });

            this.createKeyframes(motion_name, keyframesConfig);
        }
	}

	// ---------------------- //

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

	var animConfig = {
		'dur': '1500ms'
	}
	var keyframesConfig = {
        '0%': '{background: orange;}',
        '50%': '{background: red;}',
        '100%': '{background: orange;}'
    };

    // ------- //

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
	MyAnimation.createAnimation(list2[0], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list2[1], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list2[4], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list2[6], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list2[8], animConfig, keyframesConfig);


	var tgraph3 = Kgraph(graph3);
	tgraph3.init(arr, config);
	var list3 = tgraph3.getAllNodes();
	CssUtil.setCss(list3[0], config_1);
	CssUtil.setCss(list3[1], config_1);
	CssUtil.setCss(list3[4], config_1);
	CssUtil.setCss(list3[7], config_1);
	CssUtil.setCss(list3[8], config_1);
	MyAnimation.createAnimation(list3[0], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list3[1], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list3[4], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list3[7], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list3[8], animConfig, keyframesConfig);


	var tgraph4 = Kgraph(graph4);
	tgraph4.init(arr, config);
	var list4 = tgraph4.getAllNodes();
	CssUtil.setCss(list4[0], config_1);
	CssUtil.setCss(list4[2], config_1);
	CssUtil.setCss(list4[4], config_1);
	CssUtil.setCss(list4[6], config_1);
	CssUtil.setCss(list4[8], config_1);
	MyAnimation.createAnimation(list4[0], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list4[2], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list4[4], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list4[6], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list4[8], animConfig, keyframesConfig);

	var tgraph5 = Kgraph(graph5);
	tgraph5.init(arr, config);
	var list5 = tgraph5.getAllNodes();
	CssUtil.setCss(list5[0], config_1);
	CssUtil.setCss(list5[2], config_1);
	CssUtil.setCss(list5[4], config_1);
	CssUtil.setCss(list5[7], config_1);
	CssUtil.setCss(list5[8], config_1);
	MyAnimation.createAnimation(list5[0], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list5[2], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list5[4], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list5[7], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list5[8], animConfig, keyframesConfig);

	var tgraph6 = Kgraph(graph6);
	tgraph6.init(arr, config);
	var list6 = tgraph6.getAllNodes();
	CssUtil.setCss(list6[0], config_1);
	CssUtil.setCss(list6[3], config_1);
	CssUtil.setCss(list6[5], config_1);
	CssUtil.setCss(list6[7], config_1);
	CssUtil.setCss(list6[8], config_1);
	MyAnimation.createAnimation(list6[0], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list6[3], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list6[5], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list6[7], animConfig, keyframesConfig);
	MyAnimation.createAnimation(list6[8], animConfig, keyframesConfig);

	// -------------- //

	var nextBtns = document.getElementsByClassName('next');
	for(var i = 0, len = nextBtns.length; i < len; i++){
		EventUtil.addEvent(nextBtns[i], 'click', function(k){
			return function(){
				var curli = nextBtns[k].parentNode.parentNode.parentNode.parentNode;
				var nextli = findNextByTag(curli, 'li');

				CssUtil.setCss(nextli, {
					'display': 'block'
				});
				document.body.scrollTop = document.body.scrollHeight;
				tgraph2.fresh(arr);
				tgraph3.fresh(arr);
				tgraph4.fresh(arr);
				tgraph5.fresh(arr);
				tgraph6.fresh(arr);
			}
		}(i));
	}

	EventUtil.addEvent(next, 'click', function(){
		CssUtil.setCss(myfooter, {
			'display': 'block'
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

	// -------------- //
	var animConfig_x = {
		'dur': '1500ms'
	}
	var keyframesConfig_x = {
        '0%': '{background: orange; transform: rotate(-30deg)}',
        '50%': '{background: red; transform: rotate(30deg)}',
        '100%': '{background: orange; transform: rotate(-30deg)}'
    };

	var snodes = myfooter.getElementsByClassName('snode');
	for(var i = 0, len = snodes.length; i < len; i++){
		MyAnimation.createAnimation(snodes[i], animConfig_x, keyframesConfig_x);
	}

})();

