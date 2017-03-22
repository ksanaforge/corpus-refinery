var settings={};
const setLayout=function(_settings){
	settings=_settings;
}

const pdfs={
	"1":[1,103], //周易
	"2":[1,77,183], //尚書
	"3":[1,109,215,307,405,499,557,703], //毛詩
	"4":[1,89,195,259,321,413,523,611], //周禮
	"5":[1,99,211,261,377,493], //儀禮
	"6":[1,125,235,375,467,575,677,761,879,951], //禮記
	"7":[1,171,311,419,537,629,777,867], //左傳
	"8":[1,85,201,299], //公羊傳
	"9":[1,69], //穀梁傳
	"10":[1], //孝經
	"11":[1,95], //論語
	"12":[1,93], //爾雅
	"13":[1,107,209]  //孟子
};
const starts={"1a":15,"2a":5,"3a":7,"4a":7,"5a":5,"6a":3,"7a":7
             ,"8a":7,"9a":7,"10a":5,"11a":5,"12a":5,"13a":5};
const leftTopFromSide=function(side){
	var left=-400,top=-50;
	if (side==1){
		left=-10;
	}else if (side==2) {
		top=-760;
	} else if (side==3) {
		left=-10;
		top=-760;
	}
	return {left,top}
}
var getPDFPage=function(pageid,fn) {
	if (!pageid || !pageid.match)return;
	var m=pageid.match(/(\d+)([abcd])/);
	if (!m)return ;
	const pg=parseInt(m[1],10);
	const side=m[2].charCodeAt(0)-0x61;
	const prefix=parseInt(fn,10);
	const ranges=pdfs[prefix];
	for (var i=ranges.length-1;i>=0;i--){
		if (pg>=ranges[i]) {
			const pdfbase=prefix+String.fromCharCode(0x61+i);
			const pdffn=pdfbase+".pdf";
			const {left,top}=leftTopFromSide(side);
			const page=pg-ranges[i]+(starts[pdfbase]||1);
			return {pdffn,page,left,top};
		}
	}	
}
module.exports={getPDFPage,setLayout};