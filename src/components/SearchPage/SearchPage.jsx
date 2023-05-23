import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getRecipeById,
  getRecipeByName,
  setCurrentPage,
  setCurrentSearch,
} from "../../redux/actions";
import DetailRecipeParser from "../DetailRecipeParser/DetailRecipeParser";
import styled from "styled-components";
import Paginador from "../Paginador/Paginador";

const MainDiv = styled.div`
  margin-top: 170px;
`;

const SearchPage = () => {
  // const [state, setState] = useState({
  //   busqueda: "",
  // });
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    currentSearch,
    currentSource,
    currentPage,
    searchResults,
    resultsToShow,
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    // Parsear los parámetros de la URL
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    const id = params.get("id");

    const searchFor = id ?? name;

    // Un fix, por si se accede a la ruta "SearchPage" manualmente:
    if (!currentSearch) dispatch(setCurrentSearch(searchFor));

    async function getRecipeInfo(id, name) {
      if (id) {
        // Realizar la petición de un recipe por ID
        await dispatch(getRecipeById(id, currentSource));
      } else if (name) {
        // Realizar la petición de recipes por nombre
        await dispatch(getRecipeByName(name, currentSource));
      }
    }
    getRecipeInfo(id, name);
  }, [dispatch, currentSearch, currentSource, location.search]);
  // }, [dispatch, location.search]);

  let start = (currentPage - 1) * 10;
  let end = start + resultsToShow;
  // if (end > searchResults.length) end = searchResults.length;

  return (
    <MainDiv>
      <h1>
        Showing {searchResults.length} results for: "{currentSearch}"
      </h1>
      {searchResults?.slice(start, end).map((recipe, index) => (
        <DetailRecipeParser key={index} recipe={recipe} />
      ))}
      <Paginador component="SearchPage" />
    </MainDiv>
  );
};

export default SearchPage;
