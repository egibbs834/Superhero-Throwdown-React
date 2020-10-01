import React from "react";
import {
  MDBView,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBProgress,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import "./index.css";

const VillainCard = (props) => {
  console.log("(VillainCard) props: ", props);
  function statBarColor(value) {
    // console.log("value: ", typeof value);
    if (value <= 50) {
      return "warning";
    } else if (value > 50 && value <= 75) {
      return "success";
    } else if (value > 75 && value <= 100) {
      return "danger";
    } else {
      return;
    }
  }
  // console.log(statBarColor());
  function tierList(value) {
    if (value <= 100) {
      return "F";
    } else if (value > 100 && value <= 200) {
      return "D";
    } else if (value > 200 && value <= 300) {
      return "C";
    } else if (value > 300 && value <= 400) {
      return "B";
    } else if (value > 400 && value <= 500) {
      return "A";
    } else if (value > 500 && value < 600) {
      return "S";
    } else if (value === 600) {
      return "GOD";
    } else {
      return;
    }
  }
  return (
    <MDBCol className="justify-content-center align-items-center text-center container-fluid">
      <div className="row justify-content-center align-items-center container-fluid">
        <MDBView hover zoom>
          <MDBCard style={{ width: "16rem" }} className="m-2">
            <MDBCardImage
              className="img-thumbnail"
              src={props.characters.img_url}
              style={{
                width: "100%",
                maxHeight: "338px",
              }}
              alt={`picture of ${props.characters.name}`}
            />
            <MDBCardBody
              style={{
                height: "27rem",
                padding: "none",
                textTransform: "capitalize",
              }}
            >
              <MDBCardTitle className="align-text-center myColor">
                <strong>{props.name}</strong>
              </MDBCardTitle>
              <hr></hr>
              <div fluid style={{ height: "13rem" }}>
                <MDBCardText className="marginBtm mt-0">
                  <strong>Tier Ranking: </strong>
                  <strong>
                    <span className="myColor">
                      {tierList(
                        parseInt(props.combat) +
                          parseInt(props.durability) +
                          parseInt(props.intelligence) +
                          parseInt(props.power) +
                          parseInt(props.speed) +
                          parseInt(props.strength)
                      )}
                    </span>
                  </strong>
                </MDBCardText>
                <MDBCardText>
                  <strong>
                    Total Power:{" "}
                    {parseInt(props.combat) +
                      parseInt(props.durability) +
                      parseInt(props.intelligence) +
                      parseInt(props.power) +
                      parseInt(props.speed) +
                      parseInt(props.strength)}
                  </strong>{" "}
                </MDBCardText>
                <MDBCardText className="marginBtm">
                  Alignment: {props.alignment}
                </MDBCardText>
                <MDBCardText className="marginBtm">
                  Race: {props.race}
                </MDBCardText>
                <MDBCardText className="marginBtm">
                  Height: {props.height}
                </MDBCardText>
                <MDBCardText className="marginBtm">
                  Weight: {props.weight}{" "}
                </MDBCardText>
                <MDBCardText className="">
                  Publisher: <strong>{props.publisher}</strong>
                </MDBCardText>
              </div>
              <hr></hr>
              <MDBDropdown className="text-center" size="sm" hover>
                <MDBDropdownToggle color="secondary">
                  Power Stats
                </MDBDropdownToggle>
                <MDBDropdownMenu color="secondary" basic>
                  <MDBDropdownItem>
                    Combat: {props.combat}
                    <MDBProgress
                      className="my-2"
                      material
                      value={props.combat}
                      color={statBarColor(parseInt(props.combat))}
                    />
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    Durability: {props.durability}
                    <MDBProgress
                      className="my-2"
                      material
                      value={props.durability}
                      color={statBarColor(parseInt(props.durability))}
                    />
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    Intelligence: {props.intelligence}
                    <MDBProgress
                      className="my-2"
                      material
                      value={props.intelligence}
                      color={statBarColor(parseInt(props.intelligence))}
                    />
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    Power: {props.power}
                    <MDBProgress
                      className="my-2"
                      material
                      value={props.power}
                      color={statBarColor(parseInt(props.power))}
                    />
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    Speed: {props.speed}
                    <MDBProgress
                      className="my-2"
                      material
                      value={props.speed}
                      color={statBarColor(parseInt(props.speed))}
                    />
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    Strength: {props.strength}
                    <MDBProgress
                      className="my-2"
                      material
                      value={props.strength}
                      color={statBarColor(parseInt(props.strength))}
                    />
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              <div className="row">
                <MDBBtn className="ml-auto" color="white" size="sm">
                  Add To
                </MDBBtn>
                <MDBBtn className="mr-auto" color="white" size="sm">
                  More Info
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBView>
        )
      </div>
    </MDBCol>
  );
};

export default VillainCard;
