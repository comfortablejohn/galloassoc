import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

// import our different page components.
import {Tasks} from '../api/tasks.js';
import Task from './task.jsx';
import ListingsPage from '../pages/listings.jsx';
import Header from '../pages/header.jsx';
import HomePage from '../pages/home.jsx';


var PAGES = [
    {name: "home", page: <HomePage />},
    {name: "listings", page: <ListingsPage />}
]

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                stuff
            </div>
        )
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageName: this.props.pageName
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text,
            createdAt: new Date()
        })

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    getTasks() {
        return [
            {_id: 1, text: "task 1"},
            {_id: 2, text: "task 2"},
            {_id: 3, text: "task 3"}
        ];
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
        // return this.getTasks().map((task) => (
        //     <Task key={task._id} task={task} />
        // ));
    }

    render() {
        var content = PAGES.find((p) => (p.name === this.state.pageName)).page;
        return (
            <div className="wrap">
                <div className="container">
                    <Header activePage={this.state.pageName}/>
                    {content}
                </div>
                <Footer />
            </div>
        )
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({},
            {
                sort: { createdAt: -1 }
            }
        ).fetch()
    };
}, App);
