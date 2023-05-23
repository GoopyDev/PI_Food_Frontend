import { Link } from "react-router-dom";
import styled from "styled-components";
import "./RecipeCard.module.css";

//prettier-ignore
const dietColors = {
  "vegan"               : "darkgreen"     , // 
  "vegetarian"          : "green"         , // 
  "glutenFree"          : "darkgoldenrod" , // 
  "gluten free"         : "goldenrod"     , // 
  "dairy free"          : "darkturquoise" , // 
  "lacto ovo vegetarian": "darkolivegreen", // 
  "paleolithic"         : "darkred"       , // 
  "primal"              : "darkcyan"      , // 
  "whole 30"            : "blue"          , // 
  "pescatarian"         : "darkslateblue" , // 
  "ketogenic"           : "darkmagenta"   , // 
  "fodmap friendly"     : "orangered"     , // 
  "SampleDiet"          : "black"         , // 
  2                     : "darkblue"      , // 
  40                    : "darkviolet"    , // 
  1                     : "brown"         , // 
  59                    : "chocolate"     , // 
  6                     : "red"           , // 
  17                    : "navy"          , // 
};

const CardContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 48%;
  margin-bottom: 10px;
  background-color: #222a;
  border: 3px solid white;
  border-radius: 10px;
  transition: all 0.5s;
  z-index: 1;
  &:hover {
    transform: scale(1.05);
    filter: saturate(1.2) contrast(1.2);
    z-index: 999;
    border: 3px solid turquoise;
  }
  @media screen and (max-width: 800px) {
    width: 95%;
  }
  &.noStyle {
    display: inline-block;
    text-decoration: none;
  }
`;

const CardSectionLeft = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 70%;
  border-right: 3px dotted #333a;
`;

const CardSectionRight = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Description = styled.p`
  font-size: "small";
  color: #ddd;
  margin: "0 0 5px 0";
`;

const DietBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  & span {
    border-radius: 3px;
    margin: 3px 0 0 5px;
    padding: 0 3px;
  }
`;
const StepsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #7777;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
  border-radius: 0 7px 0 0;
  overflow: hidden;
`;

const CardImg = styled.img`
  height: 100%;
`;

export default function RecipeCard(props) {
  // console.log(props.recipeData);
  // id name image description health_score steps
  const { id, image, diets } = props.recipeData || {};
  const name = props.recipeData.title || props.recipeData.name;
  const description = props.recipeData.summary || props.recipeData.description;
  const health_score = props.recipeData.healthScore || props.recipeData.health_score; // prettier-ignore

  // Obtención de los "Steps": hay diferencia entre los de la API y los de la DB
  // API: se encuentran dentro de "analyzedInstructions"
  // DB: están más simplificados, de modo que se iguala la estructura de "analyzedInstructions"
  // (así, es posible dar el mismo tratamiento a los Steps para renderizarlos, estandarizados)
  // Comentario final: lo único que se hace aquí es contar la cantidad de pasos
  let steps = 0;
  if (props?.recipeData?.analyzedInstructions?.length > 0) {
    props.recipeData.analyzedInstructions.forEach((instruction) => (steps += instruction.steps.length)); //prettier-ignore
  } else if (props.recipeData.steps?.length > 0) {
    steps = props.recipeData.steps.length;
  }

  // Forma "simple" de detectar el source de cada Card: como el ID de las recetas de la DB es
  // un UUID, siempre tendrá un length considerablemente mayor al de las recetas de la API
  const source = id?.length > 10 ? "database" : "api";

  return (
    <CardContainer key={id} className="card">
      <Link to={`/DetailPage?id=${id}&source=${source}`}>
        <CardSectionLeft>
          <h2 style={{ marginBottom: "0" }}>{name}</h2>
          <Description dangerouslySetInnerHTML={{ __html: description }} />
          <DietBox>
            {diets?.length > 0 &&
              diets?.map((diet, index) => (
                <span
                  key={index}
                  style={{ backgroundColor: `${dietColors[diet]}` }}
                >
                  {diet}
                </span>
              ))}
          </DietBox>
        </CardSectionLeft>

        <CardSectionRight>
          <ImageContainer>
            {image && <CardImg src={image} alt="RecipeImg" />}
          </ImageContainer>
          <label>Health Score: {health_score}</label>
          <StepsBox>Steps: {steps}</StepsBox>
        </CardSectionRight>
      </Link>
    </CardContainer>
  );
}
