import "./App.css";
import io from "socket.io-client";
import Login from "./login/login";
import React from "react";
import Controls from "./controls/controls";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: io("http://localhost:3005", { autoConnect: false }),
      data: {},
    };
  }

  componentDidUpdate() {
    this.state.socket.on("connect", () => {
      this.forceUpdate();
    });
    this.state.socket.on("data", (data) => {
      this.setState({
        data: data,
      });
    });
    this.state.socket.on("disconnect", () => {
      this.forceUpdate();
      this.state.socket.disconnect();
    });
  }

  componentWillUnmount() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  connectSocket = (ip) => {
    this.state.socket.disconnect();
    if (this.state.socket.disconnected) {
      let address = "http://" + ip + ":3005";
      this.setState({
        socket: io(address),
      });
    }
    this.forceUpdate();
  };

  swapTeams = () => {
    this.state.socket.emit("swapTeams");
  };

  sendGames = (games) => {
    this.state.socket.emit("getGames", games);
  };

  sendTeams = (teams) => {
    this.state.socket.emit("getTeams", teams);
  };

  render() {
    if (this.state.socket.disconnected) {
      return <Login connectSocket={this.connectSocket} />;
    } else if (this.state.socket.connected) {
      return (
        <Controls
          data={this.state.data}
          swapTeams={this.swapTeams}
          sendGames={this.sendGames}
          sendTeams={this.sendTeams}
        />
      );
    }
  }
}
