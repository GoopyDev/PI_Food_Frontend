import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getHomeRecipes,
  setCurrentPage,
  setPreventApiCall,
} from "../../redux/actions";
import CardsContainer from "../CardsContainer/CardsContainter";
import Paginador from "../Paginador/Paginador";
import TopHiddenDiv from "../TopHiddenDiv/TopHiddenDiv";

export default function HomePage() {
  const dispatch = useDispatch();

  const {
    apiRecipes,
    dbRecipes,
    preventApiCall,
    resultsToShow,
    currentPageApi,
    currentPageDb,
  } = useSelector((state) => state);
  const isLoading = !apiRecipes.length && !dbRecipes.length;

  useEffect(() => {
    dispatch(setCurrentPage(1, "HomePageApi"));
    dispatch(setCurrentPage(1, "HomePageDb"));
    if (!preventApiCall) dispatch(getHomeRecipes());
    else dispatch(setPreventApiCall(false));
  }, [dispatch, preventApiCall]);

  useEffect(() => {
    dispatch(setCurrentPage(1, "HomePageApi"));
    dispatch(setCurrentPage(1, "HomePageDb"));
  }, [dispatch, apiRecipes, dbRecipes]);

  let apiStart = (currentPageApi - 1) * resultsToShow;
  let apiEnd = apiStart + resultsToShow;
  let dbStart = (currentPageDb - 1) * resultsToShow;
  let dbEnd = dbStart + resultsToShow;

  return (
    <div style={{ width: "95%", marginTop: "200px" }}>
      <TopHiddenDiv />
      <hr />
      <h2>API Recipes</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        apiRecipes?.length > 0 && (
          <CardsContainer recipesToShow={apiRecipes?.slice(apiStart, apiEnd)} />
        )
      )}
      <Paginador component="HomePageApi" />
      <hr />
      <h2>DataBase Recipes</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        dbRecipes?.length > 0 && (
          <CardsContainer recipesToShow={dbRecipes?.slice(dbStart, dbEnd)} />
        )
      )}
      <Paginador component="HomePageDatabase" />
      <hr />
    </div>
  );
}
