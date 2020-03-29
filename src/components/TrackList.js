import React, {Component} from 'react';
import '../styles/track-list.css';
import TrackItem from './TrackItem';

class TrackList extends Component {
  constructor(props) {
    super(props);

    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onDeleteItem(id) {
    this.props.onDeleteItem(id);
  }

  render() {
    const {data} = this.props;

    return (
      <ul className="track-list">
        {
          data.map((trackData) => <TrackItem onDelete={this.onDeleteItem} data={trackData} key={trackData.id} />)
        }
      </ul>
    );
  }
}

export default TrackList;
