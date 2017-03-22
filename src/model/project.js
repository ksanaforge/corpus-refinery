const {extendObservable,action,autorun}=require("mobx");
const {prepareProject,loadContent}=require("../units/project");
const scan=require("./scan");
const source=require("./source");
const template=require("../template");
const Store=function() {
	this.template={};
	this.files=[];
	extendObservable(this,{
		mapping:{},
		get sources(){
			return Object.keys(this.mapping);
		}
	})
};

const store=new Store();
const getFile=function(fn){
	for (var i=0;i<store.files.length;i++) {
		if (store.files[i].name==fn) return store.files[i];
	}
}
const selectSource=function(src){
	const mapping=store.mapping[src];
	const parts=mapping.split("#");
	const pdf=parts[0],page=parseInt(parts[1]||1,10);
	const pdffile=getFile(pdf);
	const sourcefile=getFile(src);
	const scale=store.json.layout&&store.json.layout.scale || 1
	scan.setFile(pdffile);
	scan.setPage(page , scale);
	loadContent(sourcefile,function(err,content){
		if (err) {
			alert(err);
			return;
		}
		source.setFile(src,content);
	})
}
const openProject=function(inputfiles){
	prepareProject(inputfiles,function(err,files,json){
		if (err) {
			alert(err);
			return;
		}
		action(()=>{
			store.mapping=json.mapping;
			const first=Object.keys(json.mapping)[0];
			store.files=files;
			store.json=json;
			store.template=template[json.template];
			if (!template[json.template]) {
				alert("unsupport template");
				return;
			}
			store.template.setLayout(json.layout);
			selectSource(first);
		})();
	});
}
module.exports={openProject,store,selectSource}