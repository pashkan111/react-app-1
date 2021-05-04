import React, { Component } from 'react';
import './post-status-filter.css';
import { Button } from 'reactstrap';

export default class AppFilter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div className='btn-group'>
            <Button color="primary"
            onClick = {() => this.props.onFilter('')}
            >Все</Button>
            <Button 
            color="success"
            onClick = {() => this.props.onFilter('like')}
            >Понравилось</Button>
        </div>
    )
    }
    
}

