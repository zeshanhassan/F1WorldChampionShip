import { useEffect, useState } from "react";
import Loader from "react-loader";
import moment from "moment";
import {
  getRaceWinnersData,
  getWorldChampionByYear,
} from "./../../Services/F1RaceService";
import "./index.css";

const Winners = ({ year }) => {
  const [winnersData, setWinnersData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getWinners = async (chammpion) => {
    const result = await getRaceWinnersData(year);
    const {
      data: {
        MRData: {
          RaceTable: { Races },
        },
      },
    } = result;

    setWinnersData(getRaceReqData(Races, chammpion));
    setIsFetching(false);
  };

  const getChampionByYear = async () => {
    setIsFetching(true);
    const result = await getWorldChampionByYear(year);
    const {
      data: {
        MRData: {
          StandingsTable: { StandingsLists },
        },
      },
    } = result;
    const currentChampion = StandingsLists[0].DriverStandings[0].Driver;
    getWinners(currentChampion);
  };
  useEffect(() => {
    getChampionByYear();
  }, []);
  const getRaceReqData = (data, chammpion) => {
    const output = [];

    data.forEach((race) => {
      output.push({
        Winner: `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`,
        WinnerInfo: race.Results[0].Driver.url,
        WinnerId: race.Results[0].Driver.driverId,
        Nationality: race.Results[0].Driver.nationality,
        RaceName: race.raceName,
        Date: moment(race.date).format("YYYY-MM-DD"),
        CircutName: race.Circuit.circuitName,
        Location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
        MoreInfo: race.url,
        Points: race.Results[0].points,
        Position: race.Results[0].position,
        Team: race.Results[0].Constructor.name,
        Laps: race.Results[0].laps,
        isChampion:
          chammpion.driverId === race.Results[0].Driver.driverId ? true : false,
      });
    });

    return output;
  };
  return (
    <Loader loaded={!isFetching}    
    color="#dc2d13"
    width={20}
    
    >
      {winnersData.length > 0 &&
        winnersData.map((wd, index) => (
          <div className="list-item" key={index}>
            <div className="list-image">
              <img src="/images/bg.jpg" />
              {wd.isChampion && (
                <span className="list-wrap-label">
                  <span className="list-label">Champion</span>
                </span>
              )}
            </div>
            <div className="list-body">
              <h2 className="list-title">{wd.CircutName}</h2>
              <div className="decor"></div>
              
              <ul className="ul-list">
                <li className="list-row">
                  <span className="list-title">Nationality:</span>
                  <span className="list-info">{wd.Nationality}</span>
                </li>
                <li className="list-row">
                  <span className="list-title">Race Name:</span>
                  <span className="list-info">{wd.RaceName}</span>
                </li>
                <li className="list-row">
                  <span className="list-title">Location:</span>
                  <span className="list-info">{wd.Location}</span>
                </li>
                <li className="list-row">
                  <span className="list-title">Date:</span>
                  <span className="list-info">{wd.Date}</span>
                </li>
                <li className="list-row">
                  <span className="list-title">Team:</span>
                  <span className="list-info">{wd.Team}</span>
                </li>
                <li className="list-row">
                  <span className="list-title">Laps:</span>
                  <span className="list-info">{wd.Laps}</span>
                </li>
              </ul>
              <div className="list-price">
                Winner info:
                <span className="list-price-number">
                  <a href={wd.WinnerInfo} target="_blank">
                    {wd.Winner}
                  </a>
                </span>
              </div>
            </div>
          </div>
        ))}
    </Loader>
  );
};
export default Winners;
