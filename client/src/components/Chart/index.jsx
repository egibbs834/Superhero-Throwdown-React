import React, { useState, useContext, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import HeroContext from "../../context/heroContext";

function HeroChart(props) {
  console.log("HeroChart props :", props);
  const { heroContext } = useContext(HeroContext);
  const [state, setState] = useState({
    dataRadar: {
      labels: Object.keys(heroContext.powerStats),
      datasets: [
        {
          label: heroContext.name,
          backgroundColor: "rgba(194, 116, 161, 0.5)",
          borderColor: "rgb(194, 116, 161)",
          data: Object.values(heroContext.powerStats),
        },
      ],
    },
  });

  useEffect(() => {
    setState({
      dataRadar: {
        labels: Object.keys(heroContext.powerStats),
        datasets: [
          {
            label: heroContext.name,
            backgroundColor: "rgba(194, 116, 161, 0.5)",
            borderColor: "rgb(194, 116, 161)",
            data: Object.values(heroContext.powerStats),
          },
        ],
      },
    });
  }, [heroContext]);
  console.log({ heroContext });
  console.log(Object.values(heroContext.powerStats));

  return (
    <MDBContainer>
      <h3 className="mt-5">Hero Chart</h3>
      <Radar
        data={state.dataRadar}
        options={{
          responsive: true,
          scale: {
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0,
            },
          },
        }}
      />
    </MDBContainer>
  );
}

export default HeroChart;
