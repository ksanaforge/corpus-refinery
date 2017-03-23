var React=require("react");
var ReactDOM=require("react-dom");
var PDF = require("./react-pdf");
var E=React.createElement;
var styles={
	container:{
		float:"left",overflow:"hidden", 
	}
}
var PDFViewer = React.createClass({
  shouldComponentUpdate(nextProps){
    return (nextProps.file!==this.props.file ||
     nextProps.page!==this.props.page)
  },
  render: function() {
  	if (this.props.rwidth) {
      styles.container.width=(window.innerWidth*(this.props.rwidth||0.5))+"px";
      styles.container.height=window.innerHeight;
    }
    
    if (this.props.rheight) {
      styles.container.height=(window.innerHeight*(this.props.rheight||0.5))+"px";
      styles.container.width=window.innerWidth;
    }

  	if (!this.props.file) return E("div",{style:{width:"100%"}},"");
  	return E("div",{style:styles.container},
    	E(PDF,{file:this.props.file, scale:this.props.scale||1.8,
        left:this.props.left,top:this.props.top,
    	page:parseInt(this.props.page)})
    	);
  },
  _onPdfCompleted: function(page, pages){
    //this.setState({page: page, pages: pages});
  }
});
module.exports=PDFViewer;