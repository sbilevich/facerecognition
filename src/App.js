import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
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
      route: 'signin'
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.rawData.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(data.rawData.outputs[0].data.regions[0].region_info.bounding_box)
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

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  }

  onSignin = () => {
    this.setState({
      route: 'home'
    })
  }

  onSignToggle = (route) => {
    if (route === 'signin') {
      this.setState({ route: 'home' })
    } else {
      this.setState({ route: 'signin' })
    }

  }
  render() {
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions} />
        <Navigation route={this.state.route} onSignToggle={this.onSignToggle} />
        {this.state.route === 'signin'
          ? <Signin onSignin={this.onSignin} />
          : <div>
            <Logo />
            <Rank />
            <ImageLinkForm onModifyInput={this.onModifyInput} onSubmit={this.onSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        }
      </div>
    )
  }
}

export default App;
