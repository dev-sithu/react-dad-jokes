import React, {Component} from 'react';
import axios from 'axios';

const API_URL = 'https://icanhazdadjoke.com';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);

    this.state = { jokes: [] };
  }

  async componentDidMount() {
    const jokes = [];

    while (jokes.length < this.props.numJokesToGet) {
      const response = await axios.get(API_URL, {
        headers: { Accept: 'application/json' }
      });

      jokes.push(response.data.joke);
    }

    this.setState({ jokes });
  }

  render() {
    return (
      <div className="JokeList">
        <h1>Dad Jokes</h1>
        <div className="JokeList-jokes">
          {
            this.state.jokes.map(joke => (
              <div>{joke}</div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default JokeList;
