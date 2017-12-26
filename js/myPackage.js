//---显示
function show(obj) {
	obj.style.display = "block";
}
//---隐藏
function hide(obj) {
 obj.style.display = "none";
}
//缓动动画封装
//function animate(ele,target) {
//  clearInterval(ele.timer);
//  ele.timer = setInterval(function () {
//      var step = (target-ele.offsetTop)/10;
//      step = step>0?Math.ceil(step):Math.floor(step);
//      ele.style.top = ele.offsetTop + step + "px";
//      console.log(1);
//      if(Math.abs(target-ele.offsetTop)<Math.abs(step)){
//          ele.style.top = target + "px";
//          clearInterval(ele.timer);
//      }
//  },25);
//}
 function animate(ele,json,fn){
    //先清定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var flag = true;
        for(var k in json){
            if(k === "opacity"){
                var leader = getStyle(ele,k)*100 || 1;
            }else{
                leader = parseInt(getStyle(ele,k)) || 0;
            }

            var step = (json[k] - leader)/10;
            	step = step>0?Math.ceil(step):Math.floor(step);
            	leader = leader + step;

            if(k === "opacity"){
                ele.style[k] = leader/100;
                //兼容IE678
                ele.style.filter = "alpha(opacity="+leader+")";
                //如果是层级，一次行赋值成功，不需要缓动赋值
                //为什么？需求！
            }else if(k === "zIndex"){
                ele.style.zIndex = json[k];
            }else{
                ele.style[k] = leader + "px";
            }
            if(json[k] !== leader){
                flag = false;
            }
        }
        if(flag){
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    },25);
}

//---scroll封装
function scroll() {  // 开始封装自己的scrollTop
    if(window.pageYOffset != null) {  // ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {   // 未声明 DTD
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}

//---获取style样式
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
}

//---client封装
function client(){
    if(window.innerHeight !== undefined){//---火狐/谷歌/ie9+以上支持的
        return {
            "width": window.innerWidth,
            "height": window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){
        return {//---已经声明DTD,（IE678只认识他）,compatMode渲染模式
            "width": document.documentElement.clientWidth,
            "height": document.documentElement.clientHeight
        }
    }else{
        return {//---未声明 DTD（谷歌只认识他）
            "width": document.body.clientWidth,
            "height": document.body.clientHeight
        }
    }
}

function $(str){
    var str1 = str.charAt(0);
    if(str1==="#"){
        return document.getElementById(str.slice(1));
    }else if(str1 === "."){
        return document.getElementsByClassName(str.slice(1));
    }else{
        return document.getElementsByTagName(str);
    }
}


function getFirstNode(ele){
    var node = ele.firstElementChild || ele.firstChild;
    return node;
}

function getLastNode(ele){
    return ele.lastElementChild || ele.lastChild;
}

function getNextNode(ele){
    return ele.nextElementSibling || ele.nextSibling;
}

function getPrevNode(ele){
    return ele.previousElementSibling || ele.previousSibling;
}


//--给定元素和索引值查找指定索引值的兄弟元素节点，包含自己

function getEleOfIndex(ele,index){
    return ele.parentNode.children[index];
}

//--给定元素查找他的所有兄弟元素，不包含自己

function getAllSiblings(ele,index){
    //定义一个新数组，装所有的兄弟元素，将来返回
    var newArr = [];
    var arr = ele.parentNode.children;
    for(var i=0;i<arr.length;i++){
        //判断，如果不是传递过来的元素本身，那么添加到新数组中。
        if(arr[i]!==ele){
            newArr.push(arr[i]);
        }
    }
    return newArr[index];
}
