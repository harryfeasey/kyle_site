import './App.css';
import turbine from './res/Turbine Blade2.png'
import React, {useState} from 'react';

function App() {

  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);

  return (
    <div className="App" >
      <body>
        <div className="background">
          <img src={turbine} className="turbine" alt="logo" />
          <div id="solar1" className="uncover"
               onMouseEnter={() => setIsShown1(true)}
               onClick={() => setIsShown1(true)}
               onMouseLeave={() => setIsShown1(false)}>
            Panel 1
          </div>
          <div id="solar2" className="uncover"
               onMouseEnter={() => setIsShown2(true)}
               onMouseLeave={() => setIsShown2(false)}>
            Panel 2

          </div>
          {isShown1 && (
          <div className="popup" id="popup1">
            <span>
              Solar 1 Data:<br/>
              <Fetch></Fetch>
            </span>
          </div>
          )}
          {isShown2 && (
              <div className="popup" id="popup2">
            <span>
              Solar 2 Data:<br/>
              <Fetch></Fetch>
            </span>
              </div>
          )}
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
      return <span class="error">Error: {error.message}</span>;
    } else if (!isLoaded) {
      return "Loading...";
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
