import React, {Component, PropTypes } from 'react';

class MenuLI extends Component {
    handleClick() {
        // not sure if this is valid approach or not, but it seems to work
        // for now
        window.location = this.props.url;
    }
    render() {
        return (
            <li><a href={this.props.url} onClick={this.handleClick.bind(this)}>{this.props.text}</a></li>
        )
    }
}

class Menu extends Component {
    render() {
        var links = [
            {name: "home", url: "/"},
            {name: "listings", url: "/listings"}
        ].map((l) => (<MenuLI url={l.url} text={l.name} active={l.name === this.props.activePage }/>));
        return (
            <ul className={this.props.className}>
                {links}
            </ul>
        )
    }
}

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <Menu className="navmenu" activePage={this.props.activePage}/>
                <div className="logo">
                    <a href="home"><span className="text">Galloway and Associates</span></a>
                    <img className="flag" src="/imgs/flagl.svg"/>
                </div>
            </div>
        )
    }
}
