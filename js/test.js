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

function setBannerAnimate(bannerCls){
	var banner=document.querySelector(bannerCls);  //获取banner中所有的元素
	console.log(banner);
	var animateElements=bannerAnimateElements[bannerCls];  //获取需要设置动画的元素
	console.log(animateElements);
	var isSetAnimateClass=false;  //初始化位置
	var isAnimateDone=false;  //现在是否是done
	banner.onclick=function(){
		if(isSetAnimateClass===false){
			for (var i=0;i<animateElements.length;i++) {
				//for 在这里的作用只是为了给每个class加上 init 或者done
				 var elements=document.querySelector(animateElements[i]);
				 var baseCls=elements.getAttribute('class');
				 console.log(baseCls);
				 elements.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'-init');
			}
			isSetAnimateClass=true;
			return;
		}
		if(isAnimateDone===false){//判断现在是什么位置
			for (var i=0;i<animateElements.length;i++) {
				 var elements=document.querySelector(animateElements[i]);
				 var baseCls=elements.getAttribute('class');
				 elements.setAttribute('class',baseCls.replace('init','done'));
			}
			isAnimateDone=true;
			return;
		}
		if(isAnimateDone===true){
			for (var i=0;i<animateElements.length;i++) {
				 var elements=document.querySelector(animateElements[i]);
				 var baseCls=elements.getAttribute('class');
				 elements.setAttribute('class',baseCls.replace('done','init'));
			}
			isAnimateDone=false;
			return;
		}
	}
}

for(k in bannerAnimateElements){
  setBannerAnimate(k);
}
