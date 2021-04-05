import sun from './sun.gif';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={sun} className="App-logo" alt="logo" />
        <div>
          Kyle Solar Site:
          <Fetch></Fetch>
        </div>

      </header>
    </div>
  );
}

class Fetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: []
    };
  }

  componentDidMount() {
    fetch("http://192.168.1.72/solar1")
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                result: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
  }

  render() {
    const { error, isLoaded, result } = this.state;
    if (error) {
      return <div class="error">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <div>
            {
              Object.keys(result).map((key, i) => (
                  <p key={i}>
                    <span>{key}: {result[key]}</span>
                  </p>
              ))
            }
          </div>
      );
    }
  }
}

export default App;
