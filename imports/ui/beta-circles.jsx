import React, { Component } from 'react';
var Masonry = require('masonry-layout');

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

class CircleComponent extends Component {
    handleClick() {
        window.location = this.props.url;
    }
    render () {
        return (
            <svg className="circComponent grid-item"  width={this.props.size*2 + "px"} height={this.props.size*2 + "px"}>
                <g>
                    <circle r={this.props.size + "px"} cx={this.props.x + "px"} cy={this.props.y + "px"} onClick={this.handleClick.bind(this)} className="circle">
                    </circle>
                    <text textAnchor="middle" x={this.props.x + "px"} y={this.props.y + "px"} >{this.props.title}</text>
                </g>
            </svg>
        )
    }
}

class Circle {
    constructor(r, pos, bounds, props) {
        this.v = {x: 0, y: 0};
        this.a = {x: 0, y: 1.2}; // should be a function of distance from gravity source?
        this.pos = pos;
        this.r = r;
        this.d = 2*r;
        this.bounds = bounds;
        this.component = this.toComponent();
    }
    toComponent() {
        return <CircleComponent size={this.r} x={this.pos.x} y={this.pos.y} title={this.title} url={this.url} />
    }

    checkBounds() {
        if (this.x < this.bounds.min_x + this.d) this.x = this.d;
        if (this.x > this.bounds.max_x - this.d) this.x = this.max_x - this.d;
        if (this.y < this.bounds.min_y + this.d) this.y = this.d;
        if (this.y > this.bounds.max_y - this.d) this.y = this.max_y - this.d;
    }

    update(dt) {

        // update acceleration based on distance from gravity source

        this.v.x += this.a.x * dt;
        this.v.y += this.a.y * dt;

        this.pos.x += Math.round(this.v.x * dt);
        this.pos.y += Math.round(this.v.y * dt);

        this.checkBounds();

        this.component = this.toComponent();
        console.log(this.component);
    }
}

class CircSim {
    constructor(bounds, render) {
        this.currentTime = Date.now();
        this.lastTime = this.currentTime;
        this.tickTime = 100;
        this.circles = document.getElementsByClassName('circComponent');
        this.render = render;
        this.circles = [];
    }

    addCircle(circ) {
        this.circles.push(circ);
    }

    getComponents() {
        return this.circles.map((c) => c.component );
    }

    update() {
        this.currentTime = Date.now();
        var dt = this.currentTime - this.lastTime
        console.log('dt: ' + dt);
        if (dt < this.tickTime) return;
        this.lastTime = this.currentTime;
        this.circles.map((c, i) => this.circles[i].update(dt));
        // this.render();
        window.requestAnimationFrame(this.update);
    }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export default class CircleGroup extends Component {
    /*


        state should look like this:

        state = {
            width: x,
            height: x
        }



    */
    constructor(props) {
        super(props);
        var bounds = {
            x_min: 0,
            x_max: this.props.width,
            y_min: 0,
            y_max: this.props.height
        }
        this.circSim = new CircSim(bounds, this.render);
        // this.circles = CIRCDATA.map(circ => <CircleComponent size={circ.size} pos={circ.pos} url={circ.url} title={circ.title} />)
        CIRCDATA.map((circ) => {
            var rand1 = getRandomArbitrary(80, this.props.width - 80);
            var rand2 = getRandomArbitrary(80, this.props.width - 80);
            console.log(rand1)
            console.log(rand2)
            this.circSim.addCircle(new Circle(80, {x: rand1, y: rand2}, bounds, circ))
        });
        //initialize masonry package
        // masonry.stamp(document.getElementsByClassName('.stamp'))
        this.state = {
            width: this.props.width,
            height: this.props.height,
            center: {x: this.props.width/2, y: this.props.height/2}
        }
        this.circSim.update();
    }

    // check for collision of two circles
    didCollide(c1, c2) {
        // check if distance between two centres is less than sum of the two radii
        var dist = Math.sqrt(Math.pow(c1.props.pos.x - c2.props.pos.x, 2) + Math.pow(c1.props.pos.y - c2.props.pos.y, 2))
        var radsum = c1.props.size + c2.props.size
        var err = 1;
        return radsum < (dist - err)
    }

    resize(event) {
        console.log(event);
        // this.setState()
    }
    componentDidMount() {
        // var msnry = new Masonry(document.getElementById('grid'), {
        //     stamp: '.stamp',
        //     itemSelector: '.grid-item',
        //     gutter: 20,
        //     columnWidth: SIZES.big
        // })
        // msnry.layout();
        window.onresize = this.resize.bind(this);
    }
    render() {
        var circles = this.circSim.getComponents();
        console.log(circles);
        return (
            <svg width={this.props.width} height={this.props.height} className="border">
                {circles}
            </svg>
        )
    }
}

// export default { Circle, CircleGroup };
