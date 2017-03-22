const React=require("react");
const E=React.createElement;
const scan=require("../model/scan");
const styles={
	container:{position:"absolute",background:"rgba(255,255,255,0.5)"},
	input:{background:"rgba(255,255,255,0.3)"},
	nextprev:{background:"rgba(255,255,255,0.3)"},
	button:{background:"silver",color:"black",border:"1px solid"}
}
class Controls extends React.Component{
	constructor (props) {
		super(props);
		this.state={page:1};
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.page!==this.state.page) {
			this.setState({page:nextProps.page});
		}
	}
	setPage(e){
		if (e.keyCode==13) {
			scan.setPage(this.state.page);
		}
	}
	nextPage(){
		this.setState({page:this.state.page+1})
		scan.setPage(this.state.page+1);
	}
	prevPage(){
		if (this.state.page<2)return;
		this.setState({page:this.state.page-1})
		scan.setPage(this.state.page-1);
	}
	onchangepage(e){
		this.setState({page:parseInt(e.target.value,10)});
	}
	render(){
		return E("div",{style:styles.container},
			E("input",{size:3,value:this.state.page,style:styles.input,
				onChange:this.onchangepage.bind(this),
				onKeyUp:this.setPage.bind(this)})
			,E("button",{style:styles.nextprev,
				onClick:this.prevPage.bind(this)},"Prev")
			,E("button",{style:styles.nextprev,
				onClick:this.nextPage.bind(this)},"Next")
			,"Controls");
	}
}
module.exports=Controls;