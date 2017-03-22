const React=require("react");
const E=React.createElement;
const CodeMirror=require("ksana-codemirror").Component;
const {observer}=require("mobx-react");

const source=require("../model/source");
const scan=require("../model/scan");
const project=require("../model/project");
class Editor extends React.Component{
	getCM(cm){
		this.cm=cm;
	}
	onCursorActivity(cm){
		const cursor=cm.getCursor();
		const line=cm.getLine(cursor.line);
		if (line[0]!="~") return;

		const pg=line.substr(1);
		const obj=project.store.template.getPDFPage(pg,source.store.filename);
		console.log(obj)
		scan.setFile(obj.pdffn);
		scan.setPage(obj.page,obj.left,obj.top);
	}
	render(){
		return E(CodeMirror,{ref:this.getCM.bind(this),
			onCursorActivity:this.onCursorActivity.bind(this),
			value:source.store.content});
	}
}
module.exports=observer(Editor);
