import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/index';


class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderList() {
        return this.props.streams.map(streams => {
            return(
                <div className="item" key={streams.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {streams.title}
                        <div className="description">{streams.description}</div>
                    </div>
                </div>
            )
        })
    }
    render() {
        console.log(this.props.streams)
        return (
           <div>
               <h2>Streams</h2>
               <div className="ui celled list">
                {this.renderList()}
               </div>
           </div>
       )

    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams)
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);