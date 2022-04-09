import React from "react";
import  "./styles.scss";
import {PopupButton} from "@typeform/embed-react";


function Custom() {


  
  return (
    <div className="mt-4 h-full">
      <PopupButton id="QQw2Wm4I" style={{fontSize: 20}} className="my-auto">
        click to open form in popup
      </PopupButton>
    </div>
  )
}

export default Custom;

// var NewComponent = React.createClass({
//   render: function() {
//     return (
//       <div>
//         <meta charSet="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1" /> <title>Contact</title> <style dangerouslySetInnerHTML={{__html: "*{margin:0;padding:0;} html,body,#wrapper{width:100%;height:100%;} iframe{border-radius:0 !important;}" }} />   <div id="wrapper" data-tf-widget="wLftItmg" data-tf-inline-on-mobile data-tf-medium="snippet" />   
//       </div>
//     );
//   }
// });


