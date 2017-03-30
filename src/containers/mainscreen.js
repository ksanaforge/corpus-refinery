const React=require("react");
const E=React.createElement;
const {observer}=require("mobx-react");
const PDFViewer=require("../components/pdfviewer");
const TXTControls=require("./txtcontrols");
const SCANControls=require("./scancontrols");
const scan=require("../model/scan");
const Editor=require("./editor");
const source=require("../model/source");
const project=require("../model/project");
const preview=require("../model/preview");
const styles={


}
class MainScreen extends React.Component{
	render(){
		const Preview=project.store.template.Preview;

		return E("div",{style:{display:"flex"}}

			,E("div",{style:{flex:1,paddingTop:25}},
				Preview?E(Preview,{data:preview.store.content}):null
			)	

			,E("div",{style:{flex:1,maxWidth:400}},
				E(PDFViewer,{file:scan.store.file,
					page:scan.store.page,scale:scan.store.scale,
					left:scan.store.left,top:scan.store.top,
				})
			)
		
			,E("div",{style:{flex:1}},
				E(Editor))
			,E(SCANControls,{
				page:scan.store.page})
			,E(TXTControls)
		);
	}
}
module.exports=observer(MainScreen);