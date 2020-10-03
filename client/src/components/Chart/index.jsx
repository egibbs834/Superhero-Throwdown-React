import React, { useState, useContext, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdbreact";

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

  let cardTextAppearance = Object.entries(heroContext.appearance);
  let cardTextBiography = Object.entries(heroContext.biography);
  let cardTextConnections = Object.entries(heroContext.connections);
  console.log({ cardTextBiography });
  let cardTextWork = Object.entries(heroContext.work);

  return (
    <MDBContainer>
      <MDBRow>
        <MDBBtn
          className="text-white text-center"
          color="secondary"
          style={{ width: "100%", height: "50%" }}
          disabled
        >
          <MDBIcon icon="user-secret" size="4x" />
          <h2 className="mt-4">Field Report</h2>
        </MDBBtn>
      </MDBRow>

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
      <MDBRow className="mt-5">
        <MDBCol md="3" className="mb-5">
          <MDBCard style={{ height: "100%", width: "100%" }}>
            <MDBBtn className="text-white" color="secondary" disabled>
              <MDBIcon icon="address-card" size="4x" />
              <br />
              <h6 className="mt-1">Appearance:</h6>
            </MDBBtn>
            <MDBCardBody>
              {cardTextAppearance.map((appearance, i) => {
                return (
                  <MDBCardText key={i}>{`${appearance[0].toUpperCase()} : ${
                    appearance[1]
                  } `}</MDBCardText>
                );
              })}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6" className="mb-5">
          <MDBCard style={{ height: "100%", width: "100%" }}>
            <MDBBtn className="text-white" color="secondary" disabled>
              <MDBIcon icon="book" size="4x" />
              <br />
              <h6 className="mt-1">Biography:</h6>
            </MDBBtn>
            <MDBCardBody>
              {cardTextBiography.map((appearance, i) => {
                return (
                  <MDBCardText key={i}>{`${appearance[0].toUpperCase()} : ${
                    appearance[1]
                  } `}</MDBCardText>
                );
              })}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="3" className="mb-5">
          <MDBCard style={{ height: "100%", width: "100%" }}>
            <MDBBtn className="text-white" color="secondary" disabled>
              <MDBIcon icon="briefcase" size="4x" />
              <br />
              <h6 className="mt-1">Work:</h6>
            </MDBBtn>
            <MDBCardBody>
              {cardTextWork.map((appearance, i) => {
                return (
                  <MDBCardText key={i}>{`${appearance[0].toUpperCase()} : ${
                    appearance[1]
                  } `}</MDBCardText>
                );
              })}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol className="mb-5">
          <MDBCard style={{ height: "100%", width: "100%" }}>
            <MDBBtn className="text-white" color="secondary" disabled>
              <MDBIcon icon="hands-helping" size="4x" />
              <br />
              <h6 className="mt-1">Connections:</h6>
            </MDBBtn>
            <MDBCardBody>
              {cardTextConnections.map((appearance, i) => {
                return (
                  <MDBCardText key={i}>{`${appearance[0].toUpperCase()} : ${
                    appearance[1]
                  } `}</MDBCardText>
                );
              })}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default HeroChart;
