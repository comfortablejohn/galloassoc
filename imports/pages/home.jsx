import React, { Component } from 'react';
import CircleGroup from '../ui/circles.jsx';

export default class Home extends Component {
    render() {
        // return (
        //     <div className="contentContainer">
        //         <CircleGroup />
        //     </div>
        // )
        return (
            <CircleGroup width={window.innerWidth} height={window.innerHeight - 180}/>
        )
    }
}
