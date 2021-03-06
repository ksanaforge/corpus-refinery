const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;

const Preview=React.createClass({
	getInitialState:function(){
		const parts=this.parseText(this.props.data);
		return {parts};
	}
	,contextTypes:{
		action:PT.func
	}
	,componentWillReceiveProps:function(nextProps){
		if (nextProps.data!==this.props.data) {
			const parts=this.parseText(nextProps.data);
			this.setState({parts});
		}
	}
	,isNonChar:function(code){
		if (code>=0x3001&&code<=0x303f) return true;//cjk puncuation
		if (code<0x7f) return true;
		if (code>=0xff00&&code<=0xff9f) return true;//full width
		return false;
	}
	,getTextFirstCh:function(str,count){
		var i=0;
		while (i<str.length && count){
			const code=str.charCodeAt(i);
			if (code>=0xd800&&code<=0xd900) i++;
			else if (str[i]=="&") {
				while (i<str.length) {
					if (str[i]==";") break;
					i++;
				}
			} else if (this.isNonChar(code)){
				count++;
			}
			i++;count--;
		}
		return str.substr(0,i);
	}
	,chcount:function(str){
		var i=0,c=0;
		while (i<str.length){
			const code=str.charCodeAt(i);
			if (code>=0xd800&&code<=0xd900) i++;
			else if (str[i]=="&") {
				while (i<str.length) {
					if (str[i]==";") break;
					i++;
				}
			} else if (this.isNonChar(code)){
				c--;
			}
			i++;c++;
		}
		return c;
	}
	,parseText:function(str){
		var lines=str.split("\n");
		var parts=[],part,offset=0,i,linestart=[],linecount=0;

		const removeTag=function(t){
			t=t.replace(/[─「」，、．；《》：。〈〉\n㊣]/g,"");
			t=t.replace(/\%\d+\.\d+/g,"");
			t=t.replace(/^\d+\.\d+/g,"");
			t=t.replace(/#\d+.+/g,"");
			return t;
		}
		for (i=0;i<lines.length-1;i++) {
			linestart.push(linecount)
			linecount+=lines[i].length+1;
		}
		linestart.push(linecount);
		for (i=lines.length-1;i>=0;i--) {
			part=[];
			var  line=lines[i];

			var previdx=0,z;
			line.replace(/\{(.*?)\}/g,function(m,m1,idx){
				z=line.substring(previdx,idx);
				if (idx) part.push(["z",removeTag(z),linestart[i]+previdx]);
				if (m1=="■") {
					part.push(["shu","疏",linestart[i]+idx])
				} else {
					part.push(["big",removeTag(m1),linestart[i]+idx]);
				}
				previdx=idx+m.length;
			});
			z=line.substr(previdx);
			if (previdx<line.length) {
				part.push(["z",removeTag(z),linestart[i]+previdx]);
			}
			part.push(["br"]);
			parts=parts.concat(part);
		}
		return parts;
	}
	,renderPart:function(part){
		var out=[];
		const type=part[0],text=part[1],start=part[2];
		var cls={"data-start":start};
		if (type==="big") {
			cls.className="warichu_big";
			out.push(E("span",cls,text));
		} else if (type==="br") {
			out.push(E("br"));
		} else if (type==="shu") {
			cls.className="warichu_shu";
			out.push(E("span",cls,"疏"));
		} else if (type==="z") {
			var w=Math.floor(this.chcount(text)/2);
			if (this.chcount(text)%2==1) w++;
			const right=this.getTextFirstCh(text,w);
			const left=text.substr(right.length);
			cls.className="warichu warichu"+w;
			out.push(E("span",cls,
				E("span",{className:"warichu-right"},right)
				,E("span",{className:"warichu-left"},left)
			));
		}
		return out;
	}
	,render:function(){
		return E("div",{className:"j13zs"},
			E("div",{className:"v"}
				,this.state.parts.map(this.renderPart)) 
		);
	}
});
module.exports=Preview;