import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  margin: 10px auto;
  /* color: #111; */
  border: 3px solid antiquewhite;
  border-radius: 5px;
  background-color: #fffa;
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`;

const DetailsInfo = styled.div`
  display: flex;
  max-height: 100px;
  overflow: hidden;
  color: #111e;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 10px 0;
  background-color: #111a;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 98%;
  margin-bottom: 5px;
`;

const Rating = styled.div`
  background-color: gray;
  display: block;
  position: relative;
  border-radius: 4px;
  padding: 10px;
`;

const ReleaseDate = styled.div`
  background-color: black;
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

// const PlatformDiv = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
// `;

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
//   min-width: 65px;
//   /* height: 100px; */
//   margin: 1px;
//   border: 3px solid white;
//   /* border-radius: 50px; */
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
`;

export default function DetailRecipeParser(props) {
  // const { source } = useSelector((state) => state);

  console.log("Search recipe:");
  console.log(props.recipe);
  const recipe = props.recipe;

  // Destructuramos las propiedades de "Recipe"
  const { id, image, diets } = recipe || {};
  const name = recipe?.title || recipe?.name;
  const description = recipe?.summary || recipe?.description;
  const health_score = recipe?.healthScore || recipe?.health_score;
  const instructions = recipe?.analyzedInstructions || [
    { name: "Preparation", steps: recipe?.steps },
  ];

  // Obtención de los "Steps": hay diferencia entre los de la API y los de la DB
  // API: se encuentran dentro de "analyzedInstructions"
  // DB: están más simplificados, de modo que se iguala la estructura de "analyzedInstructions"
  // (así, es posible dar el mismo tratamiento a los Steps para renderizarlos, estandarizados)
  // Comentario final: lo único que se hace aquí es contar la cantidad de pasos
  let steps = 0;
  if (instructions?.length > 0) {
    instructions?.forEach((instruction) => (steps += instruction.steps.length)); //prettier-ignore
  } else if (recipe?.steps?.length > 0) {
    steps = recipe?.steps.length;
  }

  // Forma "simple" de detectar el source de cada Card: como el ID de las recetas de la DB es
  // un UUID, siempre tendrá un length considerablemente mayor al de las recetas de la API
  const source = recipe?.id?.length > 10 ? "database" : "api";

  // const {
  //   id,
  //   name,
  //   image,
  //   rating,
  //   diets,
  //   source,
  // } = props.recipe || [];

  // const miHTML = validarHTML(description);
  return (
    <Link to={`/DetailPage?id=${id}&source=${source}`}>
      <DetailContainer>
        <Title>{name}</Title>

        <InfoDiv>
          <Rating>Health Score: {health_score} ✰⭐</Rating>

          <ReleaseDate>
            Steps:
            <br />
            {steps}
          </ReleaseDate>

          <DetailsInfo>
            <div>{description}</div>
          </DetailsInfo>
        </InfoDiv>

        <Diets>{diets?.map((diet) => diet.name)}</Diets>

        <IMGDiv>
          <img src={image} alt="Recipe Background" />
        </IMGDiv>

        {/* <Label>Plataformas disponibles:</Label>
        <PlatformDiv>
          {platforms?.map((platform, index) => {
            return (
              <PlatformSpan key={index}>{platform.platform.name}</PlatformSpan>
            );
          })}
        </PlatformDiv> */}
      </DetailContainer>
    </Link>
  );
}
