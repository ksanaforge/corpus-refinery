const React=require("react");
const E=React.createElement;
const {observer}=require("mobx-react");
const project=require("../model/project");
const SourceSelector=require("../components/sourceselector");

const styles={
	button:{background:"silver",color:"black",border:"1px solid"},
	container:{position:"absolute",zIndex:200}
}
const SaveChanges=require("../components/savechanges");
class TXTControls extends React.Component{
	openproject(e){
		project.openProject(e.target.files);
	}
	componentDidMount(){
		this.refs.project.directory=true;
		this.refs.project.webkitdirectory =true;
	}
	selectSource(source){
		project.selectSource(source);
	}
	render(){
		const sources=project.store.sources;
		return E("div",{style:styles.container},
			E(SourceSelector,{sources,selectSource:this.selectSource.bind(this)})
			,E("label",{},
				E("span",{style:styles.button},"Open Project"),
				E("input",{type:"file",ref:"project",style:{display:"none"},
					multiple:true,onChange:this.openproject.bind(this)}),
				E(SaveChanges)
			));
	}
}
module.exports=observer(TXTControls);