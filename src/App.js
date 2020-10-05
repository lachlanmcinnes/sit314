import React from 'react';
import './App.css';

import axios from 'axios';
class App extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
        id: 0,
        building: 0,
        level: 0,
        room: 0,
        state: 0
    }
}
  
  handleIDChange = (event) => {
    this.setState({
      id: event.target.value
    });
  }
  handleBuildingChange = (event) => {
    this.setState({
      building: event.target.value
    });
  }
  handleLevelChange = (event) => {
    this.setState({
      level: event.target.value
    });
  }
  handleRoomChange = (event) => {
    this.setState({
      room: event.target.value
    });
  }
  handleStateChange = (event) => {
    this.setState({
      state: event.target.value
    });
  }

  handleChangeSubmit = (event) => {

    const { id, building, level } = this.state;

    const params = {
      id,
      building,
      level
    }

    axios.post('http://localhost:5000/change',params)
      .then(res => {
        alert('ID: ' + this.state.id.toString() + ' Building: ' + this.state.building.toString() + ' Level: ' + this.state.level.toString());
        event.preventDefault();
      })
  }

  handleStateSubmit = (event) => {

    const { building, level, room, state } = this.state;

    const params = {
      building,
      level,
      room,
      state
    }

    axios.post('http://localhost:5000/state',params)
      .then(res => {
        alert("Completed");
        event.preventDefault();
      })
  }

  render() {

    return (
      <div>
        <form name="change" onSubmit={this.handleChangeSubmit.bind(this)}>
          <label>
            Set Variables for ID:
            <input type="number" placeholder="ID" onChange={this.handleIDChange} />
            <input type="number" placeholder="Building" onChange={this.handleBuildingChange} />
            <input type="number" placeholder="Level" onChange={this.handleLevelChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form name="setState" onSubmit={this.handleStateSubmit.bind(this)}>
          <label>
            Set State for Building/Level:
            <input type="number" placeholder="Building" onChange={this.handleBuildingChange} />
            <input type="number" placeholder="Level" onChange={this.handleLevelChange} />
            <input type="number" placeholder="Room" onChange={this.handleRoomChange} />
            <input type="number" placeholder="State" onChange={this.handleStateChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
