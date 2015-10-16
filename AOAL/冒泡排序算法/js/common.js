
// -------------------基本工具模块---------------------- //

var CssUtil = {

	toCamel: function(name){
        return name.replace(/-[a-z]{1}/g, function(item){
            return item.slice(1).toUpperCase();
        });
    },

    setCss: function(source, obj){
        if(Object.prototype.toString.call(source) == '[object String]'){
            var list = document.querySelectorAll(source);
            arguments.callee(list, obj);
        }else if(Object.prototype.toString.call(source) == '[object NodeList]' || 
            Object.prototype.toString.call(source) == '[object HTMLCollection]'){
            for(var i = 0, len = source.length; i < len; i++){
                for(var k in obj){
                    source[i].style[this.toCamel(k)] = obj[k];
                }
            }
        }else{
            for(var k in obj){
                source.style[this.toCamel(k)] = obj[k];
            }
        }
    },

    getCss: function(source, attr) {
        if (source.currentStyle) {
            return source.currentStyle[attr];
        } else {
            return getComputedStyle(source, false)[attr];
        }
    },

    hasClass: function(source, value){
        return source.className.match(new RegExp('(\\s|^)' + value + '(\\s|$)'));
    },

    addClass: function(source, value){
        if(!this.hasClass(source, value)){
            source.className += ' ' + value;
        }
    },

    removeClass: function(source, value){
        if(this.hasClass(source, value)){
            source.className = source.className.replace(new RegExp('(\\s|^)' + value + '(\\s|$)'), '')
        }
    },

    addClassAll: function(source, value){
        for(var i = 0, len = source.length; i < len; i++){
            this.addClass(source[i], value);
        }
    },

    removeClassAll: function(source, value){
        for(var i = 0, len = source.length; i < len; i++){
            this.removeClass(source[i], value);
        }
    }
}

var EventUtil = {
    //添加事件
    addEvent: function(element, eventType, handler){
        if(element.addEventListener){//标准浏览器
            element.addEventListener(eventType, handler, false);
        }else{
            element.attachEvent('on' + eventType, handler);
        }
    },
    //移除事件
    removeEvent: function(element, eventType, handler){
        if(element.removeEventListener){//标准浏览器
            element.removeEventListener(eventType, handler, false);
        }else{
            element.detachEvent('on' + eventType, handler);
        }
    },
    //获取事件
    getEvent: function(event){
        return event || window.event;
    },
    //获取目标元素
    getTarget: function(event){
        return this.getEvent(event).target || this.getEvent(event).srcElement;
    },
    //阻止默认行为
    preventDefault: function(event){
        var evt = this.getEvent(event);
        if(evt.preventDefault){//标准浏览器
            evt.preventDefault();
        }else{
            evt.returnValue = false;
        }
    },
    //阻止事件冒泡
    stopPropagation: function(event){
        var evt = this.getEvent(event);
        if(evt.stopPropagation){//标准浏览器
            evt.stopPropagation();
        }else{
            evt.cancelBubble = true;
        }
    }
}

var AnimUtil = {
    //动画
    animate: function(source, obj, opr, callback){
        var opr = opr || {};

        var easing = opr.easing || 'ease';
        var dur = opr.dur || 1000;
        var str = easing + " " + dur + "ms";

        CssUtil.setCss(source, {
            'transition': str,
            '-moz-transition': str,
            '-webkit-transition': str,
            '-o-transition': str,
            '-ms-transition': str
        });

        CssUtil.setCss(source, obj);

        /*----------------*/

        function getTransitionEndEvent(){
            var ele = document.createElement('fakeelement');
            var obj = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd',
                'MsTransition': 'msTransitionEnd'
            }
            for(var i in obj){
                if(ele.style[i] !== undefined){
                    return obj[i];
                }
            }
        }

        var transitionend = getTransitionEndEvent();

        EventUtil.addEvent(source, transitionend, callback);
    }
}

// -------------------公用交互模块---------------------- //

// --------------控制thinkingbox开关模块-------------- //
thinkingbox.setAttribute('door', 'close');
EventUtil.addEvent(way, 'click', function(){
    var door = thinkingbox.getAttribute('door');
    if(door == 'open'){
        AnimUtil.animate(thinkingbox, {
            'transform': 'scale(1.2)'
        },{
            'dur': 150,
            'easing': 'linear'
        }, function(){
            AnimUtil.animate(thinkingbox, {
                'transform': 'scale(0)'
            }, {
                'dur': 400,
                'easing': 'linear'
            });
            thinkingbox.setAttribute('door', 'close');
        });
    }else{
        AnimUtil.animate(thinkingbox, {
            'transform': 'scale(1.2)'
        },{
            'dur': 400,
            'easing': 'linear'
        }, function(){
            AnimUtil.animate(thinkingbox, {
                'transform': 'scale(1)'
            }, {
                'dur': 150,
                'easing': 'linear'
            });
            thinkingbox.setAttribute('door', 'open');
        });
    }
});

// --------------控制codebox开关模块-------------- //
codebox.setAttribute('door', 'close');
EventUtil.addEvent(code, 'click', function(){
    var door = codebox.getAttribute('door');
    if(door == 'open'){
        AnimUtil.animate(codebox, {
            'transform': 'scale(1.2)'
        },{
            'dur': 150,
            'easing': 'linear'
        }, function(){
            AnimUtil.animate(codebox, {
                'transform': 'scale(0)'
            }, {
                'dur': 400,
                'easing': 'linear'
            });
            codebox.setAttribute('door', 'close');
        });
    }else{
        AnimUtil.animate(codebox, {
            'transform': 'scale(1.2)'
        },{
            'dur': 400,
            'easing': 'linear'
        }, function(){
            AnimUtil.animate(codebox, {
                'transform': 'scale(1)'
            }, {
                'dur': 150,
                'easing': 'linear'
            });
            codebox.setAttribute('door', 'open');
        });
    }
});

// ------------复制代码模块（依赖jquery）------------ //
$(document).ready(function(){
    if ( window.clipboardData ) {
        $('.copy').click(function() {
            window.clipboardData.setData("Text", $('.content-show pre').text());
            alert('复制成功！');
        });
    } else {
        $(".copy").zclip({
            path:'http://kylinresume-mydir.stor.sinaapp.com/library%2FZeroClipboard.swf',
            copy:function(){return $('.content-show pre').text();},
            afterCopy:function(){alert('代码已成功复制到剪贴板！');}
        });
    }
}); 


