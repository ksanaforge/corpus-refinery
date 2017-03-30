var settings={};
const Preview=require("./j13_preview");
const setLayout=function(_settings){
	settings=_settings;
}
var getPDFPage=function(pageid) {
	if (!pageid)return;
	var m=pageid.match(/(\d+)\.(\d+)/);
	if (!m)return ;

	const page=parseInt(m[2],10)+2;
	const fn=parseInt(m[1],10);

	var pdffn="pdf/"+fn+".pdf";
	return {pdffn,page};
}
module.exports={getPDFPage,setLayout,Preview};