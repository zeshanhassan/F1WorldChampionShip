import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
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
        extraClass:
          chammpion.driverId === race.Results[0].Driver.driverId
            ? "chammpion"
            : "",
      });
    });

    return output;
  };
  return (
    <Loader loaded={!isFetching}>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Winner</th>
            <th>Nationality</th>
            <th>Race Name</th>
            <th>Date</th>
            <th>Circut Name</th>
            <th>Location</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {winnersData.length > 0 &&
            winnersData.map((wd, index) => (
              <tr className={wd.extraClass} key={index}>
                <td>{index + 1}</td>
                <td>
                  <a href={wd.WinnerInfo} target="_blank">
                    {wd.Winner}
                  </a>
                </td>
                <td>{wd.Nationality}</td>
                <td>{wd.RaceName}</td>
                <td>{wd.Date}</td>
                <td>{wd.CircutName}</td>
                <td>{wd.Location}</td>
                <td>
                  <a href={wd.MoreInfo} target="_blank">
                    More Info
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Loader>
  );
};
export default Winners;
