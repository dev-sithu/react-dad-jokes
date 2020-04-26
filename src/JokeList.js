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

    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false
    };

    this.seenJokes = new Set(this.state.jokes.map(j => j.id));
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.getJokes();
  }

  async componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    this.setState({ loading: true });

    const jokes = [];

    while (jokes.length < this.props.numJokesToGet) {
      const response = await axios.get(API_URL, {
        headers: { Accept: 'application/json' }
      });

      const { id, joke: text } = response.data;

      if (!this.seenJokes.has(id)) {
        jokes.push({ id, text, votes: 0 });
        this.seenJokes.add(id);
      } else {
        console.log('FOUND A DUPLICATE!');
        console.log(id, text);
      }
    }

    this.setState(
      st => ({
        jokes: [...st.jokes, ...jokes],
        loading: false,
      }),
      () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      }),
      () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }

    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button className="JokeList-getmore" onClick={this.handleClick}>Fetch Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {
            this.state.jokes.map(j => (
              <Joke
                key={j.id}
                votes={j.votes}
                text={j.text}
                upvote={() => this.handleVote(j.id, 1)}
                downvote={() => this.handleVote(j.id, -1)}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default JokeList;
