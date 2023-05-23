// import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getHomeRecipes,
  setCurrentPage,
  setPreventApiCall,
} from "../../redux/actions";
import CardsContainer from "../CardsContainer/CardsContainter";
import Paginador from "../Paginador/Paginador";

export default function HomePage() {
  const dispatch = useDispatch();

  const { apiRecipes, dbRecipes, preventApiCall } = useSelector(
    (state) => state
  );
  const isLoading = !apiRecipes.length && !dbRecipes.length;

  useEffect(() => {
    dispatch(setCurrentPage(1));
    if (!preventApiCall) dispatch(getHomeRecipes());
    else dispatch(setPreventApiCall(false));
  }, [dispatch]);

  return (
    <div style={{ width: "95%", marginTop: "200px" }}>
      <hr />
      <h2>API Recipes</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        apiRecipes.length > 0 && <CardsContainer recipesToShow={apiRecipes} />
      )}
      <Paginador component="HomePage" />
      <hr />
      <h2>DataBase Recipes</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        dbRecipes.length > 0 && <CardsContainer recipesToShow={dbRecipes} />
      )}
      {/* <CardsContainer recipeToShow={dbRecipes} /> */}
      <hr />
    </div>
  );
}
