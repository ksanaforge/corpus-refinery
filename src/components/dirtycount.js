const React=require("react");
const E=React.createElement;
const source=require("../model/source");
const {observer}=require("mobx-react");
class DirtyCount extends React.Component{
	render(){
		const c=source.store.changecount;
		const p=c*3;
		if (p>100)p=100;
		const background="hsl(0, "+ p +"%,50%)";
		return E("span",{},
			"Dirty:",
			E("span",{style:{background,color:"yellow"}},c)
		)
	}
}
module.exports=observer(DirtyCount);