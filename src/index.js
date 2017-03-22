const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const MainScreen=require('./containers/mainscreen');
const {useStrict}=require("mobx");
useStrict(true);

ReactDOM.render(E(MainScreen), document.getElementById('root'))	
