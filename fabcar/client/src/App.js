import React from 'react';
import { Button } from 'reactstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
    this.queryAllCar = this.queryAllCar.bind(this);
  }

  queryAllCar() {
    fetch('http://localhost:8000/api/queryallcars')
    .then(response => response.json())
    .then(data => this.setState({ data }));
  }

  render() {
    return (
      <div>
        <Button color='primary' onClick={this.queryAllCar}>Get All Car</Button>
        <p>{this.state.data !== '' ? JSON.stringify(this.state.data) : '' }</p>
      </div>
    )
  }
}

export default App;
