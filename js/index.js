//获取元素
//selector是选择器
var getElem=function(selector){
	return document.querySelector(selector);
}
var getAllElem=function(selector){
	return document.querySelectorAll(selector);
}

//获取元素样式
var getCls=function(element){
	return element.getAttribute('class');
}
//设置元素样式
var setCls=function(element,cls){
	return element.setAttribute('class',cls);
}

//为元素添加样式
var addCls=function(element,cls){
	var baseCls=getCls(element); //获取元素样式
	if(baseCls.indexOf(cls)===-1){
		setCls(element,baseCls+' '+cls)//在原有的样式上添加样式
	}
	return;
}
//为元素删除样式
var delCls=function(element,cls){
	var baseCls=getCls(element);
	if( baseCls.indexOf(cls) > -1){
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '))//split把cls给删掉，字符串变成了数组，join转化为字符串，但出现些许空格
		//正则表达式，把一个或一个以上空白符替换成一个空格符,不+g的话只会替换第一个元素
	}
	return;
}


//第一步：初始化样式 init
var bannerAnimateElements={
	'.banner1':[
		'.banner1-title',
		'.phone',
		'.shadow'
	],
	'.banner2':[
		'.banner2-title',
		'.banner2-title2',
		'.phone2',
		'.phone-tip1',
		'.phone-tip2',
		'.phone-tip3'
	],
	'.banner3':[
		'.banner3-title',
		'.banner3-title2',
		'.phone3',
		'.phone-function'
	],
	'.banner4':[
		'.banner4-title',
		'.banner4-title2',
		'.phone-item1',
		'.phone-item2',
		'.phone-item3',
		'.phone-item4',
	],
	'.banner5':[
		'.banner5-title',
		'.banner5-title2',
		'.phone5',
	]
};

//设置屏内为初始状态
var setBannerAnimateInit=function(bannerCls){
	var banner=document.querySelector(bannerCls);  //获取banner中所有的元素
//	console.log(banner);
	var animateElements=bannerAnimateElements[bannerCls];  //获取需要设置动画的元素
//	console.log(animateElements);
	for (var i=0;i<animateElements.length;i++) {
	//for 在这里的作用只是为了给每个class加上 init 或者done
	 var elements=document.querySelector(animateElements[i]);
	 var baseCls=elements.getAttribute('class');
//	 console.log(baseCls);
	 elements.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'-init');
	}
}

//设置播放屏内的元素动画
var playBannerAnimateDone=function(bannerCls){
	var animateElements=bannerAnimateElements[bannerCls];  //获取需要设置动画的元素
	for (var i=0;i<animateElements.length;i++) {
		 var elements=document.querySelector(animateElements[i]);
		 var baseCls=elements.getAttribute('class');
		 elements.setAttribute('class',baseCls.replace('init','done'));
	}
}

window.onload=function(){
	for(k in bannerAnimateElements){
		
		//跳过第一屏动画
		if(k==='.banner1'){
			continue;
		}
		
		setBannerAnimateInit(k);
	}
}

//第二步：滚动到哪就播放到哪

window.onscroll=function(){
//	var top=document.body.scrollTop; 
	var top=document.documentElement.scrollTop+document.body.scrollTop;//获取滚动条高度
	if (top>80) {
		addCls(getElem(".header"),'header-fixed') 
		addCls(getElem(".outline"),'outline-fixed') 
		switchNavItemsActive(0)
	} else{
		delCls(getElem(".header"),'header-fixed') 
		delCls(getElem(".outline"),'outline-fixed') 
		switchNavItemsActive(0)
	}
//	if(top>1){
//		playBannerAnimateDone('.banner1');
//		switchNavItemsActive(0)
//	}
	if(top>800-100){
		playBannerAnimateDone('.banner2');
		switchNavItemsActive(1)
	}
	if(top>800*2-100){
		playBannerAnimateDone('.banner3');
		switchNavItemsActive(2)
	}
	if(top>800*3-100){
		playBannerAnimateDone('.banner4');
		switchNavItemsActive(3)
	}
	if(top>800*4-100){
		playBannerAnimateDone('.banner5');
		switchNavItemsActive(4)
	}
}


//导航条双向定位
var navItems=document.getElementsByClassName("nav")[0].getElementsByTagName("a");
//console.log(navItems);
var outItems=document.getElementsByClassName("outline")[0].getElementsByTagName("a");
//console.log(outItems);

//导航变亮
var switchNavItemsActive=function(idx){
	
	
	for (var i=0;i<navItems.length-1;i++) { 
		delCls(navItems[i],'active');  //for这里把所有的navItems的active取消掉
		navTip.style.left = 0+'px';  //把导航条的位置清零
	}
	addCls(navItems[idx],'active')
	navTip.style.left = ( idx * 76 )+'px';
	for (var i=0;i<outItems.length;i++) {  //这里是侧边导航栏
		delCls(outItems[i],'active')
	}
	addCls(outItems[idx],'active')
}

//导航跳转           （函数与for的循环利用） 
//导航跳转要记得获取滚动条
var setNavJump=function(i,lib){
	var item=lib[i];
	item.onclick=function(){
		document.documentElement.scrollTop=i*800;
	}
}

for (var i=0;i<navItems.length-1;i++) {
	setNavJump(i,navItems)
}
for (var i=0;i<outItems.length;i++) {
	setNavJump(i,outItems)
}


//第四部：滑动门
var navTip=getElem('.nav-tip');
var setTip=function(idx,lib){
	//让navtip跟着鼠标走
	lib[idx].onmouseover=function(){
//		console.log(this,idx)
		navTip.style.left=(idx*76)+'px';
	}
	
	var acviveIdx=0;

//把navtip定位在当前屏
	lib[idx].onmouseout=function(){
//		console.log(this,idx)
		for (var i=0;i<lib.length-1;i++) {
			if(getCls(lib[i]).indexOf('active')>-1){
				acviveIdx=i;
				break;
			}
		}
		console.log(acviveIdx)	
		navTip.style.left=(acviveIdx*76)+'px';
	}
}


for (var i=0;i<navItems.length-1;i++) {
	setTip(i,navItems);
}


//小优化
setTimeout(function(){
	playBannerAnimateDone('.banner1')
},200)

