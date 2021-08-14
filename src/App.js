import React from "react";
import { connect } from "react-redux";
import { GET_F1SEASONS_DATA } from "./Actions";
import Loader from "react-loader";
import { ToastContainer } from "react-toastify";
import Seasons from "./Components/Seasons";
import { Container, Row } from "react-bootstrap";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getF1Seasons();
  }
  render() {
    const { isFetching, seasons } = this.props;
    let seasonData = [];
    if (Object.keys(seasons).length > 0) {
      seasonData = seasons.SeasonTable.Seasons;
    }
    return (
      <>
      <header className="App-header">
          <h1>F1 WORLD CHAMPIONS</h1>
        </header>
      <Loader loaded={!isFetching} color="#dc2d13"
      width={20}>        
        <div className="seasons">
          <div className="season-container">
          <Container style={{ marginTop: "30px" }}>
            <Row>{seasonData.length > 0 && <Seasons data={seasonData} />}</Row>
          </Container>
          </div>
          
        </div>
      </Loader>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    seasons: state.f1Seasons.f1SeasonsData,
    isFetching: state.f1Seasons.isFetching,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getF1Seasons: () => {
      dispatch({ type: GET_F1SEASONS_DATA });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
