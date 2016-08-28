import React, { Component, PropTypes } from 'react';

import {ListingData} from '../api/tasks.js';

class ImgBox extends Component {
    render() {
        return (
            <a href={this.props.imgurl}>
                <img src={this.props.imgurl} className="imgboximg" />
            </a>
        )
    }
}

class InfoBox extends Component {
    render() {
        var price = this.props.price ? this.props.price : <a href="contact">Contact</a>;
        return (
            <div className="infoBox">
                <div className="info">
                    <p className="price">{price}</p>
                    <span className="suburb">{this.props.suburb}</span>
                </div>
                <div className="desc">
                    <em>{this.props.desc}</em>
                </div>
            </div>
        )
    }
}

class Box extends Component {
    render() {
        return (
            <div className="box">
                <ImgBox imgurl={this.props.data.imgurl} url={"/listings/" + this.props.data.id}/>
                <InfoBox price={this.props.data.info.price} suburb={this.props.data.info.address} desc={this.props.data.info.type} />
            </div>
        )
    }
}

class Grid extends Component {
    render() {
        var list = this.props.listings.map((l) => {
            return (
                <Box data={l} />
            )
        });
        return (
            <div className="listingsgrid">
                {list}
            </div>
        )
    }
}

export default class ListingsPage extends Component {
    // toggleChecked() {
    //     Tasks.update(this.props.task._id, {
    //         $set: { checked: !this.props.task.checked }
    //     });
    // }
    //
    // deleteTask() {
    //     Tasks.remove(this.props.task._id);
    // }
    constructor(props) {
        super(props);
        this.getData();
    }

    dataReceived(err, result) {
        console.log(result);
        var data = JSON.parse(result.content.replace(/\n/g, ''));
        console.log(data);
        this.setState({
            data: data
        });
        // this.render();
    }

    getData() {
        HTTP.get('/listings.json', this.dataReceived.bind(this));
    }

    render() {
        if (!this.state) return (<div>loading</div>);
        console.log(this.state.data);
        // var listings = this.state.data.map({d} => {
        //     <Grid d
        // });
        return (
            <Grid listings={this.state.data} />
        );
    }
}
//
// ListingsPage.propTypes = {
//     task: PropTypes.object.isRequired,
// };
