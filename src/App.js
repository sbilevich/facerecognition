import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register'
import { Component } from 'react';
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '57672f0fe0bc4ce78384bd5cd30c7b20'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  constructor() {
    super()

    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {}
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.rawData.outputs[0].data.regions[0].region_info.bounding_box;

    return ({
      leftCol: clarifaiFace.left_col * 100,
      topRow: clarifaiFace.top_row * 100,
      rightCol: 100 - (clarifaiFace.right_col * 100),
      bottomRow: 100 - (clarifaiFace.bottom_row * 100)
    })
  }

  displayFaceBox = (box) => {
    this.setState({ box })
  }

  onModifyInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onSubmit = async () => {
    this.setState({
      imageUrl: this.state.input
    });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))

    const response = await fetch('https://safe-coast-47748.herokuapp.com/image', {
      method: 'PUT',
      body: JSON.stringify({
        userId: this.state.user.id
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
    const result = await response.json();
    this.setState({
      user: result
    })
  }
  onSignin = async (result) => {
    this.setState({
      user: result,
      route: result?.name ? 'home' : this.state.route,
    });
  }

  onRegistration = () => {
    this.setState({
      route: 'register'
    })
  }

  onRegister = async (result) => {
    console.log(result)
    this.setState({
      user: result,
      route: result?.name ? 'home' : this.state.route,
    });
  }

  onSignToggle = () => {
    if (this.state.route === 'home') {
      this.setState({
        route: 'signin',
        user: {}
      })
    } else if (this.state.route === 'register') {
      this.setState({
        route: 'signin'
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions} />
        <div className="topOpacity">
          <Logo />
          <Navigation route={this.state.route} onSignToggle={this.onSignToggle} />
        </div>
        {this.state.route === 'signin'
          ? <Signin onSignin={this.onSignin} onRegistration={this.onRegistration} />
          : this.state.route === 'register' ? <Register onRegister={this.onRegister} />
            : <div>

              <Rank user={this.state.user} />
              <ImageLinkForm onModifyInput={this.onModifyInput} onSubmit={this.onSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
        }
      </div>
    )
  }
}

export default App;
