const loadContent=function(file,cb){
	var reader=new FileReader();
	reader.onload=function(e){
		try {
			cb(0,e.target.result);
		} catch(e){
			cb(f.name+" "+e.message);
		}
	}
	reader.readAsText(file,"UTF-8");
	return;
}
const getConfigJSON=function(filelist,cb){
	for (var i=0,f;f=filelist[i];i++) {
		if (f.name.indexOf("-refinery.json")>0) {
			var reader=new FileReader();
			var name=f.name;
			reader.onload=function(e){
				try {
					const json=JSON.parse(e.target.result);
					cb(0,json);
				} catch(e){
					cb(f.name+" "+e.message);
				}
			}
			reader.readAsText(f,"UTF-8");	
			return;
		}
	}
	cb&&cb("Missing refinery configuration json.",null);
}
const isRefineryJSON=function(name){
	return name.match(/\.json$/) && !name.match(/-refinery.json$/);
}

const prepareProject=function(files,cb){
	getConfigJSON.call(this,files,function(err,json){
		if (err) {
			cb(err);
			return;
		}
		const filenameat=[],out=[];
		for (var i=0,f;f=files[i];i++) {
			filenameat.push([f.name,i]);
		}
		//json should comes first
		filenameat.sort(function(a,b){return a[0]>b[0]?1:(a[0]<b[0]?-1:0)});
		const filenames=filenameat.map(function(a){return a[0]});
		const fileat=filenameat.map(function(a){return a[1]});
		if (!json.files) { //use all file in the folder
			for (var i=0;i<fileat.length;i++) {
				out.push( files[fileat[i]]);
			}
		} else { //json specified file list
			for (var i=0, f;f=json.files[i];i++) {
				const at=filenames.indexOf(f);
				if (at>-1) {
					out.push(files[fileat[at]]);
				} else {
					cb("file "+f+" not found in folder");
					return;
				}
			}
			const sourcefiles=out.map(function(f){return f.name});
			//add data json
			
			for (var i=0;i<filenames.length;i++) {
				const fn=filenames[i];
				if (isRefineryJSON(fn)) {
					if (xmlfiles.indexOf(fn)==-1) {
						const at=filenames.indexOf(fn);
						out.unshift(files[fileat[at]]);
					}
				}
			}
		}
		cb(0,out,json);
	})
}
module.exports={prepareProject,loadContent};