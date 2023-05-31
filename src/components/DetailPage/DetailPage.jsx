import React from "react";
import { connect } from "react-redux";
import { getRecipeById, cleanSearch } from "../../redux/actions";
import styled from "styled-components";
import BackToHome from "../BackToHome/BackToHome";
import TopHiddenDiv from "../TopHiddenDiv/TopHiddenDiv";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 94.5%;
  margin-top: 220px;
  border: 5px solid #00d5ff;
  border-radius: 10px;
  background-color: #3339;
  background-position: center;
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
`;

const Diets = styled.div`
  display: flex;
  color: #333333;
  background-color: #eeeeeeaa;
  border: 3px dotted white;
  border-radius: 15px;
  width: 98%;
  /* margin: 0 10px; */
`;

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
  flex-wrap: wrap;
  text-align: justify;
  padding: 0 20px 20px 20px;
  @media screen and (max-width: 600px) {
    font-size: medium;
  }
  & > * {
    margin-right: 5px;
  }
`;

const Steps = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  font-size: x-large;
  margin: 0 10px 10px 10px;
  padding: 10px;
`;

const StepsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #222c;
  border-radius: 10px;
`;

const IndividualStep = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 65px;
  margin: 5px 5%;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #000a;
`;

const StepsTitle = styled.h4`
  margin: 20px 0 0 0;
`;

const StepsSpan = styled.span`
  display: flex;
  justify-content: center;
  width: 50px;
  background-color: #a52a2a99;
  border-radius: 5px 0 0 5px;
  align-items: center;
`;
const StepsText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-right: 15px;
  flex-direction: column;
  text-align: left;
  padding: 0px 20px;
  background-color: #5f9ea099;
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
        <TopHiddenDiv />
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
              <DescriptionTitle>Description:</DescriptionTitle>
              <DescriptionText
                dangerouslySetInnerHTML={{ __html: description }} // A testear con la "description" que viene desde la DB
              />
            </Description>
            <Steps>
              {instructions?.map((instruction, index) => {
                return (
                  <StepsDiv key={index}>
                    <p>
                      {(instruction.name !== "" && (
                        <StepsTitle>{instruction.name}</StepsTitle>
                      )) || <StepsTitle>Preparation</StepsTitle>}
                    </p>
                    {instruction.steps?.map((step, index) => {
                      return (
                        <IndividualStep key={index}>
                          <StepsSpan>{step.number}</StepsSpan>
                          <StepsText>{step.step}</StepsText>
                        </IndividualStep>
                      );
                    })}
                  </StepsDiv>
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
