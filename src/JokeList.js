import React, {Component} from 'react';
import axios from 'axios';
import Joke from "./Joke";
import './JokeList.css';

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

      jokes.push({
        id: response.data.id,
        joke: response.data.joke,
      });
    }

    this.setState({ jokes });
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button className="JokeList-getmore">New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {
            this.state.jokes.map(j => (
              <Joke key={j.id} id={j.id} joke={j.joke} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default JokeList;
