import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App" >
      <body>
        <div className="background">
          <div id="solar1" className="uncover"></div>
          <div id="solar2" className="uncover"></div>
          <span class="popup">
            Live Solar Data:
            <Fetch></Fetch>
          </span>
        </div>
      </body>

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

    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);

      fetch("http://192.168.1.72/solar1")
          .then(res => res.json())
          .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  result: result
                });
                this.componentDidMount()
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                this.setState({
                  isLoaded: true,
                  error: error
                });
              }
          )
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
