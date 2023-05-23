import RecipeCard from "../RecipeCard/RecipeCard";
import styled from "styled-components";

const CardsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function CardsContainer(props) {
  const { recipesToShow } = props;
  // console.log(recipesToShow);

  return (
    <div>
      <CardsDiv>
        {recipesToShow.length ? (
          recipesToShow.map((recipe, index) => (
            <RecipeCard key={index} class="card" recipeData={recipe} />
          ))
        ) : (
          <div>No hay recetas para mostrar</div>
        )}
      </CardsDiv>
    </div>
  );
}
