import React, { Component } from 'react';

export default class Button extends Component {
    render() {
        return (
            <a href={this.props.url} className="big-button">{this.props.text}</a>
        )
    }
}

export class ListingsButton extends Component {
    render() {
        return (
            <div className="big-button">
                <span className="fa fa-home fa-3x"></span>
                <span className="fa fa-industry fa-2x"></span>
            </div>
        )
    }
}
