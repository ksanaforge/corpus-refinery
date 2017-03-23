const {observable,action,autorun}=require("mobx");
const store=observable({
	filename:'',
	content:'Click Open Project',
	changecount:0,
});

const setFile=action((fn,content)=>{
	store.filename=fn;
	store.content=content;
})
const save=action((content)=>{
	const savefile=document.createElement("a");
	savefile.setAttribute("href","data:text/html;charset=UTF-8,"+encodeURI(content));
	savefile.setAttribute("download",store.filename);
	document.body.appendChild(savefile);
	savefile.click();
	setTimeout(function(){
		document.body.removeChild(savefile);
		delete savefile;
	}.bind(this),10);

})
const makeChange=action(()=>store.changecount++);
module.exports={store,setFile,makeChange,save};