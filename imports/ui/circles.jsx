import React, { Component } from 'react';
var Masonry = require('masonry-layout');
import Button, {ListingsButton} from './Button'

// var circdat = [
//     {id: "0", }
// ]

/** to implement later, using clip-paths in svg **/
// class ImageCircle extends Component {
//     render() {
//         return (
//             <defs
//             <g transform={"translate(" + this.props.pos.x + "," + this.props.pos.y + ")"}>
//                     <image src="http://www.healthline.com/hlcmsresource/images/00_Diabetes-Mine/PatientVoices/BrianCohen.jpg" ></image>
//             </g>
//         )
//     }
// }

const SIZES = {
    big: 120,
    med: 80,
    small: 50
}

var CIRCDATA = [
    {size: SIZES.med, pos: {x: 290, y: 440}, url: "https://www.facebook.com", title: "Facebook"},
    {size: SIZES.big, pos: {x: 290, y: 440}, url: "home", title: "Mark Galloway"},
    {size: SIZES.med, pos: {x: 720, y: 360}, url: "home", title: "Home"},
    {size: SIZES.med, pos: {x: 160, y: 250}, url: "listings", title: "Listings"},
    {size: SIZES.big, pos: {x: 290, y: 440}, url: "home", title: "Ernie Galloway"}
]


// <filter id="dropshadow" height="130%">
//   <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
//   <feOffset dx="-0.3" dy="-1" result="offsetblur"/>
//   <feMerge>
//     <feMergeNode/>
//     <feMergeNode in="SourceGraphic"/>
//   </feMerge>
// </filter>
//style={{filter:"url(#dropshadow)"}}

class Circle extends Component {
    handleClick() {
        window.location = this.props.url;
    }
    render () {
        var padding = 10;
        var svgboxsize = this.props.size*2 + padding;
        var cxcy = this.props.size + (padding/2);
        return (
            <div className="grid-item" width={this.props.size} height={this.props.size}>
                <svg width={svgboxsize + "px"} height={svgboxsize + "px"}>
                    <g>
                        <circle  r={this.props.size + "px"} cx={cxcy + "px"} cy={cxcy + "px"} onClick={this.handleClick.bind(this)} className="circle">
                        </circle>
                        <text textAnchor="middle" x={cxcy + "px"} y={cxcy + "px"} >{this.props.title}</text>
                    </g>
                </svg>
            </div>
        )
    }
}

export default class CircleGroup extends Component {
    constructor(props) {
        super(props);

        //initialize masonry package
        // masonry.stamp(document.getElementsByClassName('.stamp'))
    }

    componentDidMount() {
        var msnry = new Masonry(document.getElementById('grid'), {
            stamp: '.stamp',
            itemSelector: '.grid-item',
            fitWidth: true,
            gutter: 20,
            columnWidth: SIZES.big
        })
        msnry.layout();
    }
    render() {
        var circles = CIRCDATA.map(circ => <Circle size={circ.size} pos={circ.pos} url={circ.url} title={circ.title} />)
        return (
            <div id="grid" className="grid">
                {circles[0]}
                <div className="spacer grid-item"></div>
                {circles[1]}
                <div className="spacer grid-item"></div>
                {circles[2]}
                <div className="grid-item big-button">
                    <span className="fa fa-home fa-3x"></span><span className="fa fa-industry fa-2x"></span>
                </div>
                <div className="spacer grid-item"></div>
                {circles[3]}
                {circles[4]}
            </div>
        )
    }
}

// export default { Circle, CircleGroup };
