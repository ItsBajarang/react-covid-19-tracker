import React from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./chart.module.css";

class Chart extends React.Component {
  state = {
    dailyData: [],
  };

  async componentDidMount() {
    let dailyData = await fetchDailyData();
    this.setState({ dailyData: dailyData });
  }

  render() {
    let { dailyData } = this.state;
    let { data, country } = this.props;

    const lineChart = dailyData ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

    const barChart = data.confirmed ? (
      <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              //label: "People",
              labels: ["Infected", "Recovered", "Deaths"],
              backgroundColor: [
                "rgba(0,0,255,0.5)",
                "rgba(0,255,0,0.5)",
                "rgba(255,0,0,0.5)",
              ],
              data: [data.confirmed.value, data.recovered.value, data.deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: true },
          title: {
            display: true,
            text: `Current state in ${this.props.country}`,
          },
        }}
      />
    ) : null;

    return (
      <div className={styles.container}>{country ? barChart: lineChart} </div>
    );
  }
}

export default Chart;
