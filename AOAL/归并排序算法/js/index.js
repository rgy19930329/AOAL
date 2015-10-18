
(function(){

// 分散
function separate(arr){
    var middle = Math.floor(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle);
    var obj = {};
    obj.left = left.concat();
    obj.right = right.concat();
    return obj;
}
var arr = [5,3,9,7,2,1,8,2,4];
console.log( separate(arr) );

// 合并
function merge(left, right) {
    var result = [],
        leftIndex = 0,
        rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex++]);
        } else {
            result.push(right[rightIndex++]);
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}


// ----------------------- //

var res = [];
var rIndex = 0;

build.onmousedown = function(){

    var list = entry.value.split(',');
    var arr = [];
    for(var i = 0, len = list.length; i < len; i++){
        arr[i] = Number(list[i]);
    }

    // ---------- //

    var itemdiv = document.createElement('div');

    var index = 0;
    var clock = setInterval(function(){
        if(index >= arr.length){
            var start = document.createElement('button');
            start.setAttribute('tag', 'one');
            start.innerHTML = 'start';
            datashow.appendChild(start);
            clearInterval(clock);

            // ------- //
            start.onmousedown = nextStep;
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

function nextStep(){
    var pnode = this.parentNode;
    var divList = pnode.getElementsByTagName('div');
    if(divList.length <= 2){
        var merge = document.createElement('button');
        merge.setAttribute('tag', 'one');
        merge.innerHTML = 'merge';
        pnode.appendChild(merge);

        merge.onmousedown = mergeStep;
    }
    var arr = [];
    for(var i = 0; i < divList.length; i++){
        arr[i] = Number(divList[i].innerHTML);
    }
    var left = separate(arr).left;
    var right = separate(arr).right;
    console.log(left, right);

    // ---------- //
    setTimeout(function(){

        var section = document.createElement('section');
        pnode.appendChild(section);

        var itemdiv = document.createElement('div');

        var index = 0;
        var clock = setInterval(function(){
            if(index >= left.length){
                if(left.length <= 1){
                    section.setAttribute('flag', '1');
                    clearInterval(clock);
                    return;
                }

                var next = document.createElement('button');
                next.setAttribute('tag', 'one');
                next.innerHTML = 'next';
                section.appendChild(next);
                clearInterval(clock);

                next.onmousedown = nextStep;
                return;
            }

            var temp = itemdiv.cloneNode(true);
            temp.innerHTML = left[index];
            section.appendChild(temp);

            index++;
        }, 100);

    }, 500);

    setTimeout(function(){

        var section = document.createElement('section');
        pnode.appendChild(section);

        var itemdiv = document.createElement('div');

        var index = 0;
        var clock = setInterval(function(){
            if(index >= right.length){
                if(right.length <= 1){
                    clearInterval(clock);
                    return;
                }

                var next = document.createElement('button');
                next.setAttribute('tag', 'one');
                next.innerHTML = 'next';
                section.appendChild(next);
                clearInterval(clock);

                next.onmousedown = nextStep;
                return;
            }

            var temp = itemdiv.cloneNode(true);
            temp.innerHTML = right[index];
            section.appendChild(temp);

            index++;
        }, 100);

    }, 500);

}

function mergeStep(){
    var pnode = this.parentNode;
    var sections = pnode.getElementsByTagName('section');
    var left = sections[0].getElementsByTagName('div');
    var right = sections[1].getElementsByTagName('div');

    var leftArray = [], rightArray = [];
    for(var i = 0; i < left.length; i++){
        leftArray[i] = Number(left[i].innerHTML);
    }
    for(var i = 0; i < right.length; i++){
        rightArray[i] = Number(right[i].innerHTML);
    }

    var res = merge(leftArray, rightArray);
    console.log(res)

    pnode.innerHTML = '';
    var itemdiv = document.createElement('div');
    for(var i = 0; i < res.length; i++){
        var temp = itemdiv.cloneNode(true);
        temp.innerHTML = res[i];
        pnode.appendChild(temp);
    }

    pnode.setAttribute('flag', '1');

    var ppnode = pnode.parentNode;
    psections = ppnode.getElementsByTagName('section');
    if(psections[0].getAttribute('flag') == 1 && psections[1].getAttribute('flag') == 1){
        var mergeBtn = document.createElement('button');
        mergeBtn.innerHTML = 'merge';
        var next = ppnode.getElementsByTagName('button')[0];
        DomUtil.insertAfter(ppnode, mergeBtn, next);

        mergeBtn.onmousedown = mergeStep;
    }
}

})();