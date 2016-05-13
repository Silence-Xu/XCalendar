
/*农历月份大小压缩表 意义解释
 *以1900年为例，十六进制是 0x04bd8
 *0x 表示是16进制，
 *04bd8 中，8——有闰年，闰8月，（表示当年有无闰年，有的话，为闰月的月份，没有的话，为0。）
 *			4bd—— 转成二进制：0100 1011 1101（转成二进制，从左到右分别为1-12月，为除了闰月外的正常月份是大月还是小月，1为30天，0为29天。）
 *			0——闰小月，（表示闰月是大月还是小月，仅当存在闰月的情况下有意义。）
 */
//农历数据信息
var lunarInfo = new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)

//阳历每月天数
var solarMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
//天干
var Gan = new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
//地支
var Zhi = new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
//属相
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
//节气
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
//节气数据信息
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);

var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');

var nStr2 = new Array('初','十','廿','卅','　');

//阳历节日 *表示节假日
var sFtv = new Array(
		"0101*元旦",
		"0214 情人节",
		"0308 妇女节",
		"0312 植树节",
		"0401 愚人节",
		"0501*劳动节",
		"0504 青年节",
		"0512 护士节",
		"0601 儿童节",
		"0701 建党节",
		"0707 中国人民抗日战争纪念日",	
		"0801 建军节",
		"0910 教师节",
		"1001*国庆节",
		"1017 世界消除贫困日",
		"1108 记者节",
		"1225 圣诞节"
		);

//农历节日 *表示节假日
var lFtv = new Array(
		"0101*春节",
		"0115 元宵节",
		"0505 端午节",
		"0707 七夕",
		"0715 中元节",
		"0815 中秋节",
		"0909 重阳节",
		"1208 腊八节",
		"1223 小年",
		"0100*除夕"
		);

//按周计算 月周日
var wFtv = new Array(
		"0520 母亲节",
		"0630 父亲节",
		"0932 国际和平日"
		);

//====================传回农历  y年的总天数================
function lYearDays(y) {
   var i, sum = 348;
   for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
   return(sum+leapDays(y));
}

//=======================传回农历  y年闰月的天数==============
function leapDays(y) {
   if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
   else return(0);
}

//======================传回农历  y年闰哪个月  1-12  ,  没闰传回  0==============
function leapMonth(y) {
   return(lunarInfo[y-1900] & 0xf);
}

//======================传回农历  y年m月的总天数==========================
function monthDays(y,m) {
   return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}

//算出农历,  传入日期物件,  传回农历日期物件
//该物件属性有  .year  .month  .day  .isLeap  .yearCyl  .dayCyl  .monCyl
function Lunar(objDate) {
   var m = ""; // msg for log
   var i, leap=0, temp=0;
   var baseDate = new Date(1900,0,31);
   var offset   = (objDate - baseDate)/86400000;
   var offset   = Math.floor((objDate.getTime() + 2206425600000)/86400000);
   m += "objDate="+objDate.getTime()+", new Date(1900,0,31)="+baseDate.getTime();
   m += "offset="+offset;
   
   this.dayCyl = offset + 40;
   this.monCyl = 14;

   for(i=1900; i<2050 && offset>0; i++) {
      temp = lYearDays(i);
      offset -= temp;
      this.monCyl += 12;
   }
   
   if(offset<0) {
      offset += temp;
      i--;
      this.monCyl -= 12;
   }

   this.year = i;
   this.yearCyl = i-1864;

   leap = leapMonth(i);			//闰哪个月
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
   		//闰月 
      	if(leap>0 && i==(leap+1) && this.isLeap==false){
      		--i; this.isLeap = true; temp = leapDays(this.year); 
      	}
      	else{ 
     		temp = monthDays(this.year, i); 
    	}
    	//解除闰月
      	if(this.isLeap==true && i==(leap+1)) {
      		this.isLeap = false;
      	}

	    offset -= temp;
	    if(this.isLeap == false) {
	    	this.monCyl ++;
      	}
   	}

   if(offset==0 && leap>0 && i==leap+1)
      	if(this.isLeap){ 
      		this.isLeap = false; 
      	}
      	else{ 
      		this.isLeap = true; --i; --this.monCyl;
      	}

   	if(offset<0){ 
   		offset += temp; --i; --this.monCyl; 
   	}

   	this.month = i;
   	this.day = offset + 1;
   
   	m += "\noffset="+offset+", year="+this.year+", yearCyl="+this.yearCyl+", month="+this.month+",\n monthCyl="+this.monthCyl+", day="+this.day+", dayCyl="+this.dayCyl;
}

//=======================传回阳历  y年某m+1月的天数 ==============================
function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}

//======================传入  offset  传回干支,  0=甲子===============================
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}

//============================月历属性=======================================
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {

      this.isToday = false;
      this.sYear = sYear;
      this.sMonth = sMonth;
      this.sDay = sDay;
      this.week = week;
      this.lYear = lYear;
      this.lMonth = lMonth;
      this.lDay = lDay;
      this.isLeap = isLeap;
      this.cYear = cYear;
      this.cMonth = cMonth;
      this.cDay = cDay;

      this.color      = '';

      this.lunarFestival = '';			//农历节日
      this.solarFestival = '';			//阳历节日
      this.solarTerms = '';				//节气

}

//======================某年的第n个节气为几日(从0小寒起算)=======================
function sTerm(y,n) {
   var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) -2208549300000 );
   return(offDate.getUTCDate());
}

//传回月历(y年,m+1月)
function calendar(y,m) {
	var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2;
	var lDPOS = new Array(3);
	var n = 0;
	var firstLM = 0;
     
	sDObj = new Date(y,m,1);					//当月一日日期
	     
	this.length = solarDays(y,m);			//国历当月天数
     	this.firstWeek = sDObj.getDay();		//国历当月1日星期几

	for(var i=0;i<this.length;i++) {
	  
		if(lD>lX) {
			sDObj = new Date(y,m,i+1);			//当月一日日期
			lDObj = new Lunar(sDObj);			//农历
			lY = lDObj.year;					//农历年
			lM = lDObj.month;					//农历月
			lD = lDObj.day;						//农历日
			lL = lDObj.isLeap;					//农历是否闰月
			lX = lL? leapDays(lY): monthDays(lY,lM);		//农历当月最後一天
	       
			if(n==0) firstLM = lM;
			lDPOS[n++] = i-lD+1;
	  	}
	  
		this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cyclical(lDObj.yearCyl) ,cyclical(lDObj.monCyl), cyclical(lDObj.dayCyl++) );

	  
	//	if(((i+this.firstWeek)%7==0)||((i+this.firstWeek)%7==6))   this[i].color = '#767';//周日、周六颜色
     	}

    //
	tmp1=sTerm(y,m*2  )-1;
	tmp2=sTerm(y,m*2+1)-1;
	this[tmp1].solarTerms = solarTerm[m*2];
     	this[tmp2].solarTerms = solarTerm[m*2+1];
	if(m==3) this[tmp1].color = '#ff5f07';			//清明颜色
        

    //阳历节日
	for(i in sFtv)
		if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
			if(Number(RegExp.$1)==(m+1)) {
				this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
				if(RegExp.$3=='*') {
					this[Number(RegExp.$2)-1].color = '#ff5f07';
				}
	      }
     

    //月周节日 
	for(i in wFtv)
		if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
			if(Number(RegExp.$1)==(m+1)) {
				tmp1=Number(RegExp.$2);
				tmp2=Number(RegExp.$3);
				this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
	      }
     
	
    //农历节日
	for(i in lFtv)  
		if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
			tmp1=Number(RegExp.$1)-firstLM;
			if(tmp1==-11) {
				tmp1=1;
			}
			if(tmp1 >=0 && tmp1<n) {
				tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
				if( tmp2 >= 0 && tmp2<this.length) {
					this[tmp2].lunarFestival += RegExp.$4 + ' ';
					if(RegExp.$3=='*') {
						this[tmp2].color = '#f07';
					}
				}
			}
	  	}
     
    //黑色星期五
	if((this.firstWeek+12)%7==5){
		this[12].solarFestival += '黑色星期五 ';
	}
    
    //今日
	if(y==tY && m==tM) {
		this[tD-1].isToday = true;
	}
}

//====================中文日期=====================
function cDay(d){
	var s;
	switch (d) {
		case 10:
			s = '初十'; 
			break;
		case 20:
			s = '二十'; 
			break;
		case 30:
			s = '三十';
			break;
		default :
			s = nStr2[Math.floor(d/10)];
			s += nStr1[d%10];
	}
	return(s);
}

//将日期写入calendarContent
var oCalendar;
function drawCalendar(SY,SM) {
        
	var i,sD,s,size;
	oCalendar = new calendar(SY,SM);
     
	document.getElementById("ganzhiYear").innerHTML = '&nbsp;&nbsp;农历&nbsp;' 
		+ cyclical(SY-1900+36) + '年&nbsp;【'+Animals[(SY-4)%12]+'】';
        
	for(i=0;i<42;i++) {
	  
		sObj = document.getElementById('sd'+ i);
		lObj = document.getElementById('ld'+ i);
	  
		sObj.style.background = '';
	  	lObj.style.background = '';
	  
		sD = i - oCalendar.firstWeek;
	  
		if(sD>-1 && sD<oCalendar.length) {		//日期内       
			sObj.innerHTML = sD+1;
			if(oCalendar[sD].isToday){
				sObj.style.background = '#fa5';		//设置今天的背景色
			}
	       	
	       	//国定假日颜色
			sObj.style.color = oCalendar[sD].color;
	       
			if(oCalendar[sD].lDay==1){				//显示农历月
				lObj.innerHTML = '<b>'+(oCalendar[sD].isLeap?'闰':'') + oCalendar[sD].lMonth + '月' + (monthDays(oCalendar[sD].lYear,oCalendar[sD].lMonth)==29?'小':'大')+'</b>';
			}
			else							//显示农历日
		    		lObj.innerHTML = cDay(oCalendar[sD].lDay);
	       
			s=oCalendar[sD].lunarFestival;
			if(s.length>0) {				//农历节日
				//农历节日名称大于5个字时截去
				if(s.length>7) {
					s = s.substr(0, 5)+'…';
				}
				s = s.fontcolor('#e7a');
			}
			else {							//阳历节日
				s=oCalendar[sD].solarFestival;
				if(s.length>0) {
					//阳历节日名称截去
					//size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?8:4;			
					size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?9:5;
			 		if(s.length>size+1) s = s.substr(0, size-1)+'…';
					s = s.fontcolor('#95f');
				}
				else {				//廿四节气
					s=oCalendar[sD].solarTerms;
					if(s.length>0) s = s.fontcolor('#7d8');
				}
			}
			if(s.length>0) {
				lObj.innerHTML = s;
			}
	  
		}
		else {					//非日期
			sObj.innerHTML = '';
			lObj.innerHTML = '';
		}
    }
}


//改变年月日
function changeCalendar(nowd) {
	if(nowd==null)  {
		nowd=tD;
	}
	var y,m;
	y = document.getElementById("selectYear").selectedIndex + 1900;
	m = document.getElementById("selectMonth").selectedIndex;
    drawCalendar(y,m);
   
    textDate(y,m,nowd);
}

//获取选择的日期并改变
var d;
function changeCalendarDate(v) {
	var y,m;
	y = document.getElementById("selectYear").selectedIndex + 1900;
	m = document.getElementById("selectMonth").selectedIndex;
	d = document.getElementById('sd'+ v).innerHTML;
    textDate(y,m,d);
}

//改变年月
function pushBtm(K) {
	switch (K){
		case 'preYear' :
			if(document.getElementById("selectYear").selectedIndex > 0){
			       		document.getElementById("selectYear").selectedIndex--;
			}
			break;
		case 'nextYear' :
			if(document.getElementById("selectYear").selectedIndex < 149){
					document.getElementById("selectYear").selectedIndex++;
			}
	       	break;
		case 'preMonth' :
			if(document.getElementById("selectMonth").selectedIndex > 0) {      
				{
					document.getElementById("selectMonth").selectedIndex--;
				}
			}
			else {
				document.getElementById("selectMonth").selectedIndex = 11;
				if(document.getElementById("selectYear").selectedIndex > 0){
					document.getElementById("selectYear").selectedIndex--;
				}
			}
			break;
		case 'nextMonth' :
			if(document.getElementById("selectMonth").selectedIndex < 11) {
				document.getElementById("selectMonth").selectedIndex++;
			}
			else {
				document.getElementById("selectMonth").selectedIndex = 0;
				if(document.getElementById("selectYear").selectedIndex < 149){
					document.getElementById("selectYear").selectedIndex++;
				}
			}
			break;
		default :
			document.getElementById("selectYear").selectedIndex=tY-1900;
			document.getElementById("selectMonth").selectedIndex=tM;
			d=tD;
			break;
	}

	changeCalendar(d);
}

var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();


var width = "130"; //detail层宽度
var offsetx = 2;
var offsety = 16;

var x = 0;
var y = 0;
var show = 0;
var sw = 0;
var cnt = 0;

var dStyle;
document.onmousemove = mEvn;

//鼠标悬停时用detail层显示详细日期资料信息
function mOvr(v) {

	var festival = document.getElementById("festival");
	var datedetail = document.getElementById("datedetail");

	var sObj = document.getElementById('sd'+ v);
	var d = sObj.innerHTML - 1;
     
	if( sObj.innerHTML != '' ) {
		sObj.style.cursor = 'default';
		if(oCalendar[d].solarTerms == '' && oCalendar[d].solarFestival == '' && oCalendar[d].lunarFestival == ''){
			festival.innerHTML = "";
			festival.style.display = "none";
		}
		else
		{
			
			festival.innerHTML = oCalendar[d].solarTerms + ' ' + oCalendar[d].solarFestival + ' ' + oCalendar[d].lunarFestival;
			festival.style.display = "block";
		}
			datedetail.innerHTML = oCalendar[d].sYear +' 年 '+ oCalendar[d].sMonth
			+ ' 月 '+oCalendar[d].sDay +' 日<br />星期' + oCalendar[d].week + '<br />'
			+ '<span>农历' + (oCalendar[d].isLeap?'闰 ':' ')
			+ oCalendar[d].lMonth + ' 月 ' + oCalendar[d].lDay + ' 日<br />'
			+ oCalendar[d].cYear + '年 ' + oCalendar[d].cMonth
			+ '月 ' + oCalendar[d].cDay + '日</span>';

		if (show == 0) {
			dStyle.left = (x + offsetx - (width/2)) + "px";
			dStyle.top = (y + offsety) + "px";
   			dStyle.visibility = "visible";
   			show = 1;
		}
	}
}

//鼠标移开时隐藏详细日期资料信息
function mOut() {
	if ( cnt >= 1 ) { sw = 0 }
	if ( sw == 0 ) { show = 0; dStyle.visibility = "hidden";}
	else cnt++;
}

//获取鼠标坐标
function mEvn(e) {
	if (!show) return;
	if(window.event){
		x = event.x ;
		y = event.y ;
		if (document.body.scrollLeft){
			x += document.body.scrollLeft; 
			y += document.body.scrollTop;
		} 
      		dStyle.left = (x + offsetx-(width/2)) + "px";
      		dStyle.top = (y + offsety) + "px";
	}
	else {
     		dStyle.left = (e.pageX + offsetx-(width/2)) + "px";
      		dStyle.top = (e.pageY + offsety) + "px";
	 }
}

//为日期文本框赋值
function textDate(nowy,nowm,nowd){
	var oDateText = document.getElementById("dateText");
	oDateText.value = nowy + "-" + (nowm+1) + "-" + nowd;
}
//===================================================================================================

//界面初始化
function initialCalendar() {
	dStyle = document.getElementById("detail").style;

	document.getElementById("selectYear").selectedIndex=tY-1900;
	document.getElementById("selectMonth").selectedIndex=tM;
	drawCalendar(tY,tM);
	textDate(tY,tM,tD);	//日期写入文本框
}

//关闭日历
function closeCalendar(){
	var calendarTable = document.getElementById("calendarTable");
	calendarTable.innerHTML = '';
}

//==============================================日历界面=============================================
function MyCalendar(){

	var myCalendar = "";
	myCalendar = '<table width="502" cellpadding="0" cellspacing="0" style="border:1px solid #ff5f07;">';
	//显示今天的日期，干支纪年
	myCalendar += '<tr>';
	myCalendar += '<td colspan="2">';
	myCalendar += '<div id="date" style="text-align:center;">';
	myCalendar += '<p>公历&nbsp;';
	//alert(tY);
	myCalendar += '<select name="select" id="selectYear" onchange="changeCalendar(d)">';//添加option下拉框
	var year = new Array();
	for(var i=(1900-tY);i<0; i++){			//当年份<当前年tY时
		year[i] = tY + i;
		myCalendar +='<option>' + year[i] +'</option>';
	}
	myCalendar +='<option selected>' + tY+'</option>';
	for(var i=1;i<(2050-tY); i++){			//当年份>当前年tY时
		year[i] = tY+i;
		myCalendar +='<option>' + year[i] +'</option>';
	}
	myCalendar +='</select>年&nbsp;';
	myCalendar += '<select name="select2" id="selectMonth" onchange="changeCalendar(d)">';
	var month = new Array();
	for(var i=0-tM; i<0; i++){				//当月份<当前月tM时
		month[i] = tM + i + 1;
		myCalendar += '<option>'+ month[i] + '</option>';
	}
	myCalendar += '<option selected>'+ (tM+1) + '</option>';
	for(var i=1; i<=11-tM; i++){			//当月份>当前月tM时
		month[i] = tM + i + 1;
		myCalendar += '<option>'+ month[i] + '</option>';
	}
	myCalendar += '</select>月';
	myCalendar += '<span id="ganzhiYear">&nbsp;</span>';
	//关闭日历
	myCalendar += '<span id="close" onclick="javascript:closeCalendar();">×</span>';
	myCalendar += '</p>';
	myCalendar += '</div>';
	myCalendar += '<td>';
	myCalendar += '</tr>';

	//翻月，翻年
	myCalendar += '<tr>';
	myCalendar += '<td>';
	myCalendar += '<div id="panel" >';
	myCalendar += "<span onclick=\"pushBtm('preYear');\"><<&nbsp;上一年 </span>" + "<span onclick=\"pushBtm('preMonth');\"><&nbsp;上一月  </span>" + "<span onclick=\"pushBtm('');\">回到今天</span>" + "<span onclick=\"pushBtm('nextMonth');\">下一月&nbsp;>  </span>" + "<span onclick=\"pushBtm('nextYear');\">下一年&nbsp;>> </span>";
	myCalendar += '</div>';
	myCalendar += '</td>';
	myCalendar += '</tr>';

	//日历主要内容tr
	myCalendar += '<tr>';
	myCalendar += '<td align="center" >';
	myCalendar += '<div id="calendar">';
	myCalendar += '<div id="detail">';
	myCalendar += '<div id="datedetail"></div>';
	myCalendar += '<div id="festival"></div>';
	myCalendar
	 += '</div>';
	//主体table
	myCalendar += '<table id="calendarContent" style="border-collapse:collapse;" >';
	//星期tr
	myCalendar += '<tr style="border-bottom: 1px solid #f57;">';
	myCalendar += '<th style="border-left:0;">日</th>' + '<th>一</th>' + '<th>二</th>' + '<th>三</th>' +'<th>四</th>' + '<th>五</th>' +'<th style="border-right:0;">六</th>';
	myCalendar += '</tr>';

	//排列日期
	var sd = new Array();
	var i=0,j=0;
	for(var n=0; n<6; n++){
		var myCalendarTable1 = '';
		var myCalendarTable2 = '';

	//循环得到阳历日期排列
	for(var m=0; m<7; m++){
		if(m==0){
			myCalendarTable1 += "<tr class=\"tr1\"><td class=\"seven\" onmouseout=\"mOut();\" onmouseover=\"mOvr("+i+");\" onmouseup=\"changeCalendarDate("+i+");\" id=\"sd"+i+"\"></td>";
		}else if(m==6){
			myCalendarTable1 += "<td class=\"six\" onmouseout=\"mOut();\" onmouseover=\"mOvr("+i+");\" onmouseup=\"changeCalendarDate("+i+");\" id=\"sd"+i+"\"></td></tr>";
		}else{
			myCalendarTable1 += "<td class=\"workday\" onmouseout=\"mOut();\"		onmouseover=\"mOvr("+i+");\" onmouseup=\"changeCalendarDate("+i+");\" id=\"sd"+i+"\"></td>";
		}
		i++;
	}
		
	//循环得到农历日期排列
	for(var m=0; m<7; m++){
		if(m==0){
			myCalendarTable2 += "<tr class=\"tr2\">";
		}	
		myCalendarTable2 += "<td onmouseout=\"mOut();\" onmouseover=\"mOvr("+j+");\" id=\"ld"+j+"\"></td>";
		if(m==6){
			myCalendarTable2 += "</tr>";
		}
		j++;
	}
	//将产生的新的阳历和农历赋给myCalendar
	myCalendar += myCalendarTable1+myCalendarTable2;	
	}

	//关闭日历
	myCalendar += '<tr><td id="close2" colspan="7" style=" text-align:center; cursor:pointer;" onclick="javascript:closeCalendar();">关闭</td></tr>';


	myCalendar += '</table>';
	myCalendar += '</div>';
	myCalendar += '</td>';
	myCalendar += '</tr>';
	myCalendar += '</table>';

	var calendarTable = document.getElementById("calendarTable");
	calendarTable.innerHTML = myCalendar;

	initialCalendar();
	

}