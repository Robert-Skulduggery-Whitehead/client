import "./App.css";
import io from "socket.io-client";
import Login from "./login/login";
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: io("http://localhost:3005", { autoConnect: false }),
    };
  }

  componentDidUpdate() {
    this.state.socket.on("connect", () => {
      this.forceUpdate();
    });
    this.state.socket.on("disconnect", () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  connectSocket = (ip) => {
    if (this.state.socket.disconnected) {
      let address = "http://" + ip + ":3005";
      this.setState({
        socket: io(address),
      });
    }
    this.forceUpdate();
  };

  render() {
    if (this.state.socket.disconnected) {
      return <Login connectSocket={this.connectSocket} />;
    } else if (this.state.socket.connected) {
      return (
        <div>
          <span>yeet</span>
        </div>
      );
    }
  }
}
