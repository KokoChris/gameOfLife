import React, {Component} from 'react';




class Tile extends Component {
    constructor (props) {
        super(props);


    }
    render() {
        return (
            <div onClick={ () => this.props.toggle()} className={this.props.cName} style={this.props.style} >

            </div>
        )
    }
}

export default Tile;