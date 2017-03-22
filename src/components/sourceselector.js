const React=require("react");
const E=React.createElement;
class SourceSelector extends React.Component{
	renderItem(item,key){
		return E("option",{key},item);
	}
	selectSource(e,idx){
		this.props.selectSource(e.target.value);
	}
	render(){
		if (!this.props.sources.length) return E("div"); 
		return E("select",{onChange:this.selectSource.bind(this)},
			this.props.sources.map(this.renderItem.bind(this)));
	}
}
module.exports=SourceSelector;