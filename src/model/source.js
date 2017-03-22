const {observable,action,autorun}=require("mobx");
const store=observable({
	filename:'',
	content:'Click Open Project'
});

const setFile=action((fn,content)=>{
	store.filename=fn;
	store.content=content;
})
module.exports={store,setFile};