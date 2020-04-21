import React, {Component} from 'react';

class Joke extends Component {
  render() {
    return (
      <div key={this.props.id}>{this.props.joke}</div>
    );
  }
}

export default Joke;
