const {observable,action,autorun}=require("mobx");
const store=observable({
	content:'Click Open Project',
});

const setContent=action((content)=>{
	store.content=content;
})
module.exports={store,setContent};