import axios from "axios";
import {
  GET_HOME_RECIPES,
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  GET_RECIPE_BY_NAME,
  GET_DIETS,
  CLEAN_SEARCH,
  RESET_FILTERS,
  ADD_RECIPE,
  ORDER_RECIPES,
  FILTER_RECIPES,
  SET_CURRENT_SEARCH,
  SET_CURRENT_ORDER,
  SET_CURRENT_FILTER,
  SET_CURRENT_SOURCE,
  SET_RESULTS_NUMBER,
  SET_CURRENT_PAGE,
  SET_PREVENT_API_CALL,
  SET_FORM_RESPONSE,
} from "./action-types";

// Defino mis funciones "action creators"

// Obtener recetas de la API y DB para la HomePage
export const getHomeRecipes = () => {
  return async function (dispatch) {
    console.log("Obteniendo recetas...");
    const API = await axios
      .get("http://localhost:3001/recipes?source=api")
      .then((response) => response.data)
      .catch((error) => {
        throw Error({ message: error.message });
      });
    const DB = await axios
      .get("http://localhost:3001/recipes?source=database")
      .then((response) => response.data)
      .catch((error) => {
        throw Error({ message: error.message });
      });
    const data = { dataAPI: API, dataDB: DB };
    dispatch({ type: GET_HOME_RECIPES, payload: data }); // Se accede como "data.API" o "data.DB"
  };
};

// Obtener recetas mediante barra de búsqueda definiendo un SOURCE (api o database)
export const getRecipes = (source = "api") => {
  return async function (dispatch) {
    console.log(`Obteniendo recetas desde ${source}...`);
    const data = await axios
      .get(`http://localhost:3001/recipes?source=${source}`)
      .then((response) => response.data)
      .catch((error) => {
        throw Error({ message: error.message });
      });
    dispatch({ type: GET_RECIPES, payload: data }); // Obtiene un objeto "Recipe" de la API o la DB
  };
};

export const getRecipeById = (id, source = "api") => {
  return async function (dispatch) {
    console.log(
      `Obteniendo detalles de la receta con ID ${id} desde ${source}...`
    );
    const data = await axios
      .get(`http://localhost:3001/recipes/${id}?source=${source}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
    dispatch({ type: GET_RECIPE_BY_ID, payload: data });
  };
};

export const getRecipeByName = (recipe, source = "api") => {
  return async function (dispatch) {
    console.log(`Buscando recetas que coincidan con el nombre ${recipe}...`);
    const data = await axios
      .get(
        `http://localhost:3001/recipes?recipeName=${recipe}&source=${source}`
      )
      .then((response) => response.data)
      .catch((error) => console.log(error));
    dispatch({ type: GET_RECIPE_BY_NAME, payload: data }); // Obtiene un objeto "Recipe"
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    console.log(
      "Obtengo la lista de dietas (que el servidor se arregle de dónde las obtiene XD"
    );
    const data = await axios
      .get(`http://localhost:3001/diets`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
    console.log("Las dietas obtenidas");
    console.log(data);
    dispatch({ type: GET_DIETS, payload: data });
  };
};

export const cleanSearch = () => {
  return {
    type: CLEAN_SEARCH, // Limpia la propiedad SearchResults del Estado Global
  };
};

export const addRecipe = (objRecipe) => {
  return async function (dispatch) {
    console.log(objRecipe);
    let detailedResponse;
    const data = await axios
      .request({
        url: `http://localhost:3001/recipes`,
        method: "POST",
        data: objRecipe,
        headers: {
          "Content-Type": "application/json",
        },
      })
      // .post(`http://localhost:3001/recipes`, { ...objRecipe })
      .then((response) => {
        detailedResponse = {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
        };
        return response.data;
      })
      .catch(
        (error) =>
          (detailedResponse = {
            data: error.response.data.error,
            status: error.response.status,
            statusText: error.response.statusText,
          })
      );
    console.log("POST Data:");
    console.log(data);
    console.log("DetailedResponse:");
    console.log(detailedResponse);
    // dispatch({ type: ADD_RECIPE, payload: objRecipe }); // Inserta un registro en la DataBase si los datos están correctos
    dispatch({
      type: SET_FORM_RESPONSE,
      payload: {
        data: detailedResponse.data,
        status: detailedResponse.status,
        statusText: detailedResponse.statusText,
      },
    });
  };
};

export const orderRecipes = (orderBy) => {
  return {
    type: ORDER_RECIPES,
    payload: orderBy,
  };
};

export const filterRecipes = (filterBy) => {
  return {
    type: FILTER_RECIPES,
    payload: filterBy,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};

export const setCurrentSearch = (searchString) => {
  console.log(searchString);
  return {
    type: SET_CURRENT_SEARCH,
    payload: searchString,
  };
};

export const setCurrentOrder = (currentOrder) => {
  console.log(currentOrder);
  return {
    type: SET_CURRENT_ORDER,
    payload: currentOrder,
  };
};

export const setCurrentFilter = (currentFilter) => {
  console.log(currentFilter);
  return {
    type: SET_CURRENT_FILTER,
    payload: currentFilter,
  };
};

export const setCurrentSource = (source) => {
  console.log("Source: ", source);
  return {
    type: SET_CURRENT_SOURCE,
    payload: source,
  };
};

export const setResultsNumber = (number) => {
  console.log("ResultsToShow: ", number);
  return {
    type: SET_RESULTS_NUMBER,
    payload: number,
  };
};

export const setCurrentPage = (pageNumber) => {
  console.log("PageNumber: ", pageNumber);
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNumber,
  };
};

export const setPreventApiCall = (status) => {
  console.log("PreventApiCall: ", status);
  return {
    type: SET_PREVENT_API_CALL,
    payload: status,
  };
};

export const setFormResponse = (obj) => {
  console.log("setFormResponse: ", obj);
  return {
    type: SET_FORM_RESPONSE,
    payload: obj,
  };
};
