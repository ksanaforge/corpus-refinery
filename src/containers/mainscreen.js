const React=require("react");
const E=React.createElement;
const {observer}=require("mobx-react");
const PDFViewer=require("../components/pdfviewer");
const TXTControls=require("./txtcontrols");
const PDFControls=require("./pdfcontrols");
const scan=require("../model/scan");
const Editor=require("./editor");
const source=require("../model/source");
class MainScreen extends React.Component{
	render(){
		return E("div",{style:{display:"flex"}},
			E("div",{style:{flex:1,maxWidth:"50%"}},
				E(PDFViewer,{file:scan.store.file,
					page:scan.store.page,scale:scan.store.scale,
					left:scan.store.left,top:scan.store.top,
				}))
			,E("div",{style:{flex:1}},
				E(Editor))
			,E(PDFControls,{
				page:scan.store.page})
			,E(TXTControls)
		);
	}
}
module.exports=observer(MainScreen);