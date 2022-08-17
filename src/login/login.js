import React from "react";
import "./login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: "127.0.0.1",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.connectSocket(this.state.ip);
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({
      ip: event.target.ip,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="ip">IP address</label>
        <input
          id="id"
          name="id"
          value={this.state.ip}
          onChange={this.handleChange}
        />
        <input type="submit" value="Connect" />
      </form>
    );
  }
}
