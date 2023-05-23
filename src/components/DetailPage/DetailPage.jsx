import React from "react";
import { connect } from "react-redux";
import { getRecipeById, cleanSearch } from "../../redux/actions";
// import validarHTML from "./ValidarHTML";
import styled from "styled-components";
import BG_Image from "../../images/BG_Ingredients.jpg";
import BackToHome from "../BackToHome/BackToHome";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 94.5%;
  margin-top: 150px;
  border: 5px solid gold;
  border-radius: 10px;
  background-color: #3339;
  //prettier-ignore
  background-image: linear-gradient(to bottom, #3c0000d6,#8b0000d7 4%,transparent 20%, black 90%),
  linear-gradient(-45deg, goldenrod, gold, #fffbc2, white, goldenrod, gold, orange, yellow, darkgoldenrod, gold, white, yellow,
  #fffbc2, goldenrod, gold, #fffbc2, white, goldenrod, gold, orange, yellow, darkgoldenrod, gold, white, yellow);
  background-position: center;
  animation: shine 40s ease-in-out alternate 0s infinite;

  @keyframes shine {
    0% {
      background-size: 100%;
    }
    50% {
      background-size: 400%;
      background-position: 100% 80%;
    }
    75% {
      background-size: 250%;
      background-position: 90% 110%;
    }
    100% {
      background-size: 600%;
      background-position: 60% 85%;
    }
  }
`;

const TopFrame = styled.div`
  position: fixed;
  width: 100%;
  height: 170px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  /* background: fixed; */
  background-color: brown;
  background-image: url(${BG_Image});
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  z-index: 990;
`;

const Title = styled.h1`
  background-color: #111a;
  min-width: 400px;
  max-width: 98%;
  margin-bottom: 5px;
  padding: 15px;
  border: 5px solid white;
  border-radius: 10px;
  @media screen and (max-width: 500px) {
    min-width: 10px;
    width: 95%;
    max-width: 90% !important;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin-bottom: 5px;
`;

const ID = styled.h4`
  display: inline-block;
  border-radius: 5px;
  background-color: rgba(119, 119, 119, 0.467);
  padding: 3px;
  margin: 0 0 10px px 0;
`;
const HealthScore = styled.div`
  background-color: gray;
  display: block;
  position: relative;
  border-radius: 4px;
  padding: 10px;
  /* top: 250px; */
  /* left: 3.5%; */
  /* @media screen and (max-width: 850px) {
    position: relative;
    top: 0;
    left: 0;
    width: 50%;
  } */
`;
// const ReleaseDate = styled.div`
// background-color: black;
// display: block;
// position: relative;
// border-radius: 4px;
// padding: 10px;
/* top: 250px; */
/* right: 3.5%; */
/* right: 130px; */
/* @media screen and (max-width: 850px) {
    position: relative;
    top: 0;
    right: 0;
    width: 50%;
  } */
// `;

const Diets = styled.div`
  display: flex;
  color: #333333;
  background-color: #eeeeeeaa;
  border: 3px dotted white;
  border-radius: 15px;
  width: 98%;
  /* margin: 0 10px; */
`;

const Steps = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

// const Label = styled.div`
//   width: 98%;
//   background-color: black;
//   /* margin: 0 10px; */
//   border: 3px solid white;
//   border-radius: 5px;
// `;

// const PlatformSpan = styled.span`
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   background-color: teal;
//   width: 100px;
//   height: 100px;
//   margin: 10px 15px;
//   border: 3px solid white;
//   border-radius: 50px;
// `;

const IMGDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 10px 0;
  & img {
    width: 48.5%;
    border: 3px solid black;
    border-radius: 10px;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    & img {
      width: 98%;
      margin: 5px 0;
    }
  }
`;

const Description = styled.div`
  font-size: x-large;
  background-color: #222c;
  border-radius: 10px;
  margin: 0 10px 10px 10px;
  padding: 10px;
`;

const DescriptionTitle = styled.h4`
  margin: 20px 0 0 0;
`;

const DescriptionText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 20px 20px 20px;
  @media screen and (max-width: 600px) {
    font-size: medium;
  }
`;

class RecipeDetails extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  async componentDidMount() {
    const id = new URLSearchParams(window.location.search).get("id");
    const source =
      new URLSearchParams(window.location.search).get("source") || "api";
    console.log(
      `Envío petición de receta con los datos: ID: ${id} Source: ${source}`
    );
    await this.props.getRecipeById(id, source);
  }

  componentWillUnmount() {
    this.props.cleanSearch();
  }

  render() {
    console.log(this.props);
    // id name image description health_score steps
    // const { id, name, image, health_score, steps } = this.props.recipe || [];

    // Desde la API, llega "summary", y desde la DB llega "description"
    // Como sirven para el mismo propósito, deseo mostrar cualquiera que venga,
    // de modo que creo una const description que contendrá la prop que esté presente
    // const description = this.props.description || this.props.summary;

    // console.log(props.recipeData);
    // id name image description health_score steps
    const recipe = this.props?.recipeData?.searchResults[0] || undefined;
    const { id, image, diets } = recipe || {};
    const name = recipe?.title || recipe?.name;
    const description = recipe?.summary || recipe?.description;
    const health_score = recipe?.healthScore || recipe?.health_score;
    const instructions = recipe?.analyzedInstructions || [
      { name: "Preparation", steps: recipe?.steps },
    ];

    // const miHTML = validarHTML(description);
    return (
      <DetailContainer>
        <TopFrame />
        <BackToHome />
        {id ? (
          <div>
            <Title>{name}</Title>

            <InfoDiv>
              <HealthScore>
                HealthScore: {health_score}
                <br />
                ✰⭐
              </HealthScore>

              <ID>Recipe ID: {id}</ID>
            </InfoDiv>

            <Diets>{diets?.map((diet) => diet.name)}</Diets>

            <IMGDiv>
              <img src={image} alt={`${name} recipe`} />
            </IMGDiv>

            <Description>
              <DescriptionTitle>Descripción:</DescriptionTitle>
              <DescriptionText
                dangerouslySetInnerHTML={{ __html: description }} // A testear con la "description" que viene desde la DB
              />
            </Description>
            <Steps>
              {instructions?.map((instruction, index) => {
                return (
                  <div key={index}>
                    <p>
                      {(instruction.name !== "" && instruction.name) ||
                        "Preparation"}
                    </p>
                    {instruction.steps?.map((step, index) => {
                      return (
                        <div key={index}>
                          <span>{step.number}</span>
                          <p>{step.step}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Steps>
          </div>
        ) : (
          <div>
            <p>"No hay datos"</p>
          </div>
        )}
      </DetailContainer>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    recipeData: state,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getRecipeById: (id, source) => {
      dispatch(getRecipeById(id, source));
    },
    cleanSearch: () => {
      dispatch(cleanSearch());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
