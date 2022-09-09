import React from "react";
import "./controls.css";

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Get teams from database (socket) and make team names drop down / text edit
      // Even add differnt option for adding team to database
      // Get teams from imgs in folder already
      teams: {},
      bestOf: 0,
      bestOfArray: [undefined],
      games: {
        game1: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game2: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game3: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game4: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game5: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game6: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game7: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
      },
      teamLeft: {
        name: null,
        img: null,
      },
      teamRight: {
        name: null,
        img: null,
      },
      teamsSet: false,
      hudToggle: "hidden",
      playersToggle: "hidden",
    };
    this.state.bestOfArray = Array.apply(
      null,
      Array(props.data.series.bestOf || 0)
    );
  }

  handleSubmit = (event) => {};

  handleChange = (event) => {
    this.props.data[event.target.id].name = event.target.value;
    this.forceUpdate();
  };

  handleChangeGame = (name) => (event) => {
    let games = this.state.games;
    games[name.substr(0, 5)][name.substr(5, name.length - 5)] =
      event.target.value;
    this.setState({
      games: games,
    });
  };

  handleSwapTeams = (event) => {
    event.preventDefault();
    this.props.swapTeams();
    event.preventDefault();
  };

  shouldComponentUpdate(prevState, prevProps) {
    if (this.props !== prevProps) {
      return true;
    }
    if (this.state !== prevState) {
      return true;
    }
  }

  render() {
    return (
      <div class="controls">
        <div class="controlsLeft">
          {Object.keys(this.props.data.allplayers).map((id) => {
            if (
              this.props.data.allplayers[id].observer_slot > 0 &&
              this.props.data.allplayers[id].observer_slot < 6
            ) {
              return (
                <div class="controlsPlayerLeft">
                  <span>{this.props.data.allplayers[id].name}</span>
                  <input
                    type="text"
                    id="leftPlayer"
                    name="leftPlayer"
                    value={this.props.data.allplayers[id].name}
                    onChange={(event) => {
                      this.props.data.allplayers[id].name = event.target.value;
                      this.forceUpdate();
                    }}
                  ></input>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      let data = {
                        id: id,
                        name: this.props.data.allplayers[id].name,
                      };
                      this.props.sendPlayer(data);
                      event.preventDefault();
                    }}
                  >
                    Submit
                  </button>
                </div>
              );
            }
          })}
        </div>
        <div class="controlsCenter">
          <form id="teamLeft" onSubmit={this.handleSubmit}>
            <label for="teamLeftName">LEFT</label>
            <input
              id="left"
              name="teamLeftName"
              onChange={this.handleChange}
              value={this.props.data.left.name}
            />
          </form>
          <button
            type="button"
            onClick={() => {
              let teams = {
                left: this.props.data.left,
                right: this.props.data.right,
              };
              this.props.sendTeams(teams);
            }}
          >
            Submit Teams
          </button>
          <form id="teamRight" onSubmit={this.handleSubmit}>
            <label for="teamRightName">RIGHT</label>
            <input
              id="right"
              name="teamRightName"
              onChange={this.handleChange}
              value={this.props.data.right.name}
            />
          </form>
          <button
            id="btnSwapTeams"
            type="button"
            onClick={this.handleSwapTeams}
          >
            Swap Teams
          </button>
          <div class="series">
            <form id="seriesForm" onSubmit={this.handleSubmit}>
              <label for="bestOf">Best Of</label>
              <select
                value={this.props.data.series.bestOf}
                name="bestOf"
                id="bestOf"
                onChange={(event) => {
                  this.props.data.series.bestOf = event.target.value;
                  this.setState({
                    bestOfArray: Array.apply(
                      null,
                      Array(parseInt(event.target.value) || 0)
                    ),
                  });
                }}
              >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </form>
          </div>
          <div class="controlsGamesGameContainer">
            {this.state.bestOfArray.map((x, i) => (
              <div class="controlsGame">
                {"Game " + (i + 1)}
                <br />
                <select
                  id="map"
                  name="GameMapSelect"
                  onChange={this.handleChangeGame("game" + (i + 1) + "map")}
                >
                  <option value="">Select a map</option>
                  <option value="vertigo">Vertigo</option>
                  <option value="mirage">Mirage</option>
                  <option value="inferno">Inferno</option>
                  <option value="overpass">Overpass</option>
                  <option value="nuke">Nuke</option>
                  <option value="dust2">Dust2</option>
                  <option value="ancient">Ancient</option>
                </select>
                <select
                  id="teamPicked"
                  name="teamPicked"
                  onChange={this.handleChangeGame("game" + (i + 1) + "picked")}
                >
                  <option value="">Picked By</option>
                  <option value={this.state.teamLeft.name}>
                    {this.props.data.left.name}
                  </option>
                  <option value={this.state.teamRight.name}>
                    {this.props.data.right.name}
                  </option>
                  <option value="Decider">Decider</option>
                </select>
                <select
                  id="teamWinner"
                  name="teamWinner"
                  onChange={this.handleChangeGame("game" + (i + 1) + "winner")}
                >
                  <option value="">Winner</option>
                  <option value={this.state.teamLeft.name}>
                    {this.props.data.left.name}
                  </option>
                  <option value={this.state.teamRight.name}>
                    {this.props.data.right.name}
                  </option>
                  <option value="current">Currently playing</option>
                  <option value="tbp">Upcoming</option>
                </select>
                <br />
                <label>W Score</label>
                <br />
                <input
                  type="text"
                  name="Winner Score"
                  value={this.state.games["game" + (i + 1)].winnerScore || ""}
                  onChange={this.handleChangeGame(
                    "game" + (i + 1) + "winnerScore"
                  )}
                ></input>
                <br />
                <label>L Score</label>
                <br />
                <input
                  type="text"
                  name="Loser Score"
                  value={this.state.games["game" + (i + 1)].loserScore || ""}
                  onChange={this.handleChangeGame(
                    "game" + (i + 1) + "loserScore"
                  )}
                ></input>
              </div>
            ))}
          </div>
          <button
            id="gamesSubmitButton"
            type="button"
            onClick={(event) => {
              let data = {};
              data.games = this.state.games;
              data.bestOf = this.props.data.series.bestOf;
              console.log(data);
              this.props.sendGames(data);
              event.preventDefault();
            }}
          >
            Submit Games
          </button>
          <button
            id="btnShowOverlay"
            type="button"
            onClick={(event) => {
              this.props.showOverlay();
              event.preventDefault();
            }}
          >
            Show overlay
          </button>
          <button
            id="btnShowOverlay"
            type="button"
            onClick={(event) => {
              this.props.hideOverlay();
              event.preventDefault();
            }}
          >
            Hide overlay
          </button>
          <button
            id="btnCloseOverlay"
            type="button"
            onClick={(event) => {
              this.props.closeOverlay();
              event.preventDefault();
            }}
          >
            Close overlay
          </button>
        </div>
        <div class="controlsRight">
          {Object.keys(this.props.data.allplayers).map((id) => {
            if (
              this.props.data.allplayers[id].observer_slot == 0 ||
              this.props.data.allplayers[id].observer_slot > 5
            ) {
              return (
                <div class="controlsPlayerRight">
                  <span>{this.props.data.allplayers[id].name}</span>
                  <input
                    type="text"
                    id="rightPlayer"
                    name="rightPlayer"
                    value={this.props.data.allplayers[id].name}
                    onChange={(event) => {
                      this.props.data.allplayers[id].name = event.target.value;
                      this.forceUpdate();
                    }}
                  ></input>
                  <button
                    id="rightPlayerButton"
                    type="button"
                    onClick={(event) => {
                      let data = {
                        id: id,
                        name: this.props.data.allplayers[id].name,
                      };
                      this.props.sendPlayer(data);
                      event.preventDefault();
                    }}
                  >
                    Submit
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
//inline function onChange handlers for all the form componenents??? BestOf Example
