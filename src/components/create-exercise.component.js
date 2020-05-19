import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
	}

	componentDidMount(){
		axios('/users')
		.then(response => {
			this.setState({users: response.data, username: response.data[0].username});
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
	}

	onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
	}

	onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
	}
	
	onChangeDate(date) {
		this.setState({
			date: date
		});
	}

	onSubmit(e){
		e.preventDefault();
		const newExercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date
		}
		axios.post('/excercises/add',  newExercise)
		.then(response => {
				console.log(response.data);
				this.props.history.push("/");
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form>
          <div className="form-group">
            <label >Username:</label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(user => {
                return (
                  <option key={user._id} value={user.username}>
                    {user.username}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label >Description:</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              placeholder="Enter Description"
							onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label >Duration:</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              placeholder="Enter Duration"
							onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
