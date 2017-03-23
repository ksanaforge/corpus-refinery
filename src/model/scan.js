const {observable,action,autorun}=require("mobx");
const store=observable({
	file:'1a.pdf',
	page:1,
	scale:1.5,
	left:0,
	top:0
});

const setFile=action((f,pg)=>{
	if (store.file!==f) store.file=f;
	if (store.page!==pg) store.page=pg;
})
const setPage=action((pg,left,top)=>{
	if (store.page!==pg) store.page=pg;
	if (store.top!==top) store.top=top||0;
	if (store.left!==left) store.left=left||0;
})
const syncSourcePage=action(sourcepage=>{

});
module.exports={store,setFile,setPage,syncSourcePage};