import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

const BookingsChart = (props) => {
  const low = props.bookings.reduce((prev, current) => {
    const check = current.event.price < 2;
    return check ? prev + 1 : prev;
  }, 0);
  const medium = props.bookings.reduce((prev, current) => {
    const check = 2 < current.event.price && current.event.price < 5;
    return check < 5 ? prev + 1 : prev;
  }, 0);
  const high = props.bookings.reduce((prev, current) => {
    const check = 5 < current.event.price && current.event.price < 10;
    return check ? prev + 1 : prev;
  }, 0);
  const data = [
    { priceRange: "low", anz: low },
    { priceRange: "medium", anz: medium },
    { priceRange: "high", anz: high },
  ];
  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis max={7} />

        <BarSeries
          valueField="anz"
          argumentField="priceRange"
          color="rgba(78, 0, 129, 0.5)"
        />
        <Title text="Bookings" />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default BookingsChart;
