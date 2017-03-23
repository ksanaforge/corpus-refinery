const React=require("react");
const E=React.createElement;
const source=require("../model/source");
const {observer}=require("mobx-react");
class SaveChanges extends React.Component{
	render(){
		return E("span",{},
			source.store.changecount)
	}
}
module.exports=observer(SaveChanges);