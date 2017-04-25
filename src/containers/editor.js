const React=require("react");
const E=React.createElement;
const CodeMirror=require("ksana-codemirror").Component;
const {observer}=require("mobx-react");
const {action}=require("mobx");

const source=require("../model/source");
const scan=require("../model/scan");
const project=require("../model/project");
const preview=require("../model/preview");

class Editor extends React.Component{
	getCM(cm){
		this.cm=cm;
	}
	getCurrentPage(cm){
		const cursor=cm.getCursor();

		var start=cursor.line,end=cursor.line+1;
		const out=[];
		const line=cm.getLine(start);
		if (line.charAt(0)!=="~") {
			while (start>0) {
				const line=cm.getLine(start);
				if (line.charAt(0)=="~") break;
				if (line[0]!="^") out.unshift(line);
				start--;				
			}
		}

		while (end<cm.lineCount()){
			const line=cm.getLine(end);
			if (line.charAt(0)=="~") break;
			if (line[0]!="^") out.push(line);
			end++;
		}
		return out.join("\n");
	}

	onChange(cm){
		clearTimeout(this.timer);
		this.timer=setTimeout(function(){
			source.makeChange();
			const previewpage=this.getCurrentPage(cm);
			preview.setContent(previewpage);
		}.bind(this),500);
	}
	onCursorActivity(cm){
		const cursor=cm.getCursor();
		const line=cm.getLine(cursor.line);
		const previewpage=this.getCurrentPage(cm);
		preview.setContent(previewpage);
		if (line[0]!="~") return;
		const pg=line.substr(1);
		const obj=project.store.template.getPDFPage(pg,source.store.filename);

		action(()=>{
			scan.setFile(obj.pdffn);
			scan.setPage(obj.page,obj.left,obj.top);
			preview.setContent(previewpage);
		})();
	}
	render(){
		const extraKeys={
			"Ctrl-S": function(cm){
				source.save(cm.getValue());
  			}
		}
		return E(CodeMirror,{ref:this.getCM.bind(this),
			theme:'ambiance',
			extraKeys,
			onChange:this.onChange.bind(this),
			onCursorActivity:this.onCursorActivity.bind(this),
			value:source.store.content});
	}
}
module.exports=observer(Editor);
