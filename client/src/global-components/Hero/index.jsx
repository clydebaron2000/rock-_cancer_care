import React from 'react';
import '../../css/hero.css';

function Hero (props){
    return (
        <div className ="hero" style={{
            backgroundImage: "url("+props.image+")",
            height: props.height
            }}>
           <div className="backdrop" style={{
               opacity: props.opacity,
               backgroundColor: props.color
           }}>
               <div className="content">
                    {props.content}
               </div>
           </div>
        </div>
    )
}
export default Hero;