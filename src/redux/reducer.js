// prettier-ignore
const globalState = {
  apiRecipes             : []   , // Recetas de la API (para la HomePage)
  dbRecipes              : []   , // Recetas de la DB  (para la HomePage)
  diets                  : []   , // La lista de dietas
  searchResults          : []   , // Recetas buscadas desde la SearchBar
  currentSearch          : ""   , // El string que se buscó en la SearchBar
  currentSource          : "api", // Para saber cómo tratar las recetas en la búsqueda actual
  currentOrder           : ""   , // Orden aplicado actualmente
  currentFilter          : ""   , // Filtro aplicado actualmente
  filtered               : false, // Para saber si hay filtros aplicados actualmente
  apiRecipesUnfiltered   : []   , // Se guardará el estado original de las recetas para restablecerlo
  dbRecipesUnfiltered    : []   , // Se guardará el estado original de las recetas para restablecerlo
  searchResultsUnfiltered: []   , // Se guardará el estado original de las recetas para restablecerlo
  resultsToShow          : 9    , // Cuántos resultados por página se muestran
  currentPageApi         : 1    , // Para el número de página del paginador de recetas de la API
  currentPageDb          : 1    , // Para el número de página del paginador de recetas de la DB
  currentPageSearch      : 1    , // Para el número de página del paginador de searchResults
  preventApiCall         : false, // Para no recargar los datos en HomePage, si volvemos desde otra página
  formResponse           : {}   , // Respuesta al realizar Submit del form
};

export default function rootReducer(state = globalState, action) {
  switch (action.type) {
    case "GET_HOME_RECIPES": // Obtengo resultados para la HomePage
      return {
        ...state,
        apiRecipes: [...action.payload.dataAPI],
        dbRecipes: [...action.payload.dataDB],
      };
    case "GET_RECIPES":
      return {
        ...state,
        apiRecipes: [...action.payload],
        dbRecipes: [...action.payload],
      };
    case "GET_RECIPE_BY_ID":
      return { ...state, searchResults: [action.payload] };
    case "GET_RECIPE_BY_NAME":
      return { ...state, searchResults: [...action.payload] };
    case "GET_DIETS":
      return { ...state, diets: [...action.payload] };
    case "CLEAN_SEARCH":
      return { ...state, searchResults: [] };
    case "RESET_FILTERS":
      return {
        ...state,
        filtered: false,
        currentOrder: "",
        currentFilter: "",
        apiRecipes: [...state.apiRecipesUnfiltered],
        dbRecipes: [...state.dbRecipesUnfiltered],
        searchResults: [...state.searchResultsUnfiltered],
        apiRecipesUnfiltered: [],
        dbRecipesUnfiltered: [],
        searchResultsUnfiltered: [],
      };
    case "ADD_RECIPE":
      return {
        ...state,
        dbRecipes: [...state.dbRecipes, action.payload],
      };
    case "ORDER_RECIPES":
      let api = [];
      let db = [];
      let sea = [];
      if (state.apiRecipes) {
        api = [...state.apiRecipes];
        console.log("API:");
        console.log(api);
        console.log("-------------");
      }
      if (state.dbRecipes) {
        db = [...state.dbRecipes];
        console.log("DB:");
        console.log(db);
        console.log("-------------");
      }

      let auxName = "name";
      let auxHealthScore = "health_score";
      if (state.searchResults) {
        sea = [...state.searchResults];
        if (!sea.name) auxName = "title";
        if (!sea.health_score) auxHealthScore = "healthScore";

        console.log("searchResults:");
        console.log(sea);
        console.log("-------------");
      }

      if (action.payload.toLowerCase() === "a-z") {
        console.log("Ordenando por Nombre Ascendente");
        api?.sort((a, b) => a.title.localeCompare(b.title));
        db?.sort((a, b) => a.name.localeCompare(b.name));
        sea?.sort((a, b) => a[auxName].localeCompare(b[auxName]));
      }
      if (action.payload.toLowerCase() === "z-a") {
        console.log("Ordenando por Nombre Descendente");
        api?.sort((a, b) => b.title.localeCompare(a.title));
        db?.sort((a, b) => b.name.localeCompare(a.name));
        sea?.sort((a, b) => b[auxName].localeCompare(a[auxName]));
      }
      if (action.payload.toLowerCase() === "healthscore asc") {
        console.log("Ordenando por HealthScore Ascendente");
        api?.sort((a, b) => a.healthScore - b.healthScore);
        db?.sort((a, b) => a.health_score - b.health_score);
        sea?.sort((a, b) => a[auxHealthScore] - b[auxHealthScore]);
      }
      if (action.payload.toLowerCase() === "healthscore des") {
        console.log("Ordenando por HealthScore Descendente");
        api?.sort((a, b) => b.healthScore - a.healthScore);
        db?.sort((a, b) => b.health_score - a.health_score);
        sea?.sort((a, b) => b[auxHealthScore] - a[auxHealthScore]);
      }
      return {
        ...state,
        apiRecipes: [...api],
        dbRecipes: [...db],
        searchResults: [...sea],
      };
    case "FILTER_RECIPES":
      let modifiedProps = {};

      // Sección para la copia de los datos originales (sin filtrar)
      if (!state.filtered) {
        // Se guarda copia de las recetas sólo si es el primer filtro
        console.log("Guardemos los arrays originales!");
        modifiedProps.apiRecipesUnfiltered = [...state.apiRecipes];
        modifiedProps.dbRecipesUnfiltered = [...state.dbRecipes];
        modifiedProps.searchResultsUnfiltered = [...state.searchResults];
      }

      // Seccion para las variables de filtrado, que toman el valor del estado global
      let api2 = [];
      let db2 = [];
      let sea2 = [];
      if (state.apiRecipes) api2 = [...state.apiRecipes];
      if (state.dbRecipes) db2 = [...state.dbRecipes];
      if (state.searchResults) sea2 = [...state.searchResults];

      // Comenzamos a filtrar cada array de recetas según la dieta seleccionada
      // Para API, hay que distinguir entre [vegan, vegetarian, glutenFree] y el array de diets
      let specialDiets = ["vegan", "vegetarian", "glutenfree"];
      if (api2.length > 0) {
        if (specialDiets.includes(action.payload.toLowerCase())) {
          modifiedProps.apiRecipes = api2.filter(
            (recipe) => recipe[action.payload] === true
          );
          // console.log(api2.filter((recipe) => recipe[action.payload] === true));
        } else {
          modifiedProps.apiRecipes = api2.filter(
            (recipe) =>
              recipe.diets.length > 0 && recipe.diets.includes(action.payload)
          );
          // console.log(api2.filter((recipe) => recipe.diets.length > 0 && recipe.diets.includes(action.payload)));
        }
      }
      // Para DB, filtramos con el array de la propiedad diets
      if (db2.length > 0) {
        modifiedProps.dbRecipes = db2?.filter((recipe) =>
          recipe.diets.includes(action.payload)
        );
      }

      // Para SEARCH RESULTS, consultaremos el source y en base a eso filtramos
      if (sea2.length > 0) {
        if (state.currentSource === "api") {
          if (specialDiets.includes(action.payload)) {
            modifiedProps.searchResults = sea2?.filter(
              (recipe) => recipe?.diets?.[action.payload] === true
            );
          } else {
            modifiedProps.searchResults = sea2?.filter((recipe) =>
              recipe?.diets?.includes(action.payload)
            );
          }
        } else if (state.currentSource === "database") {
          sea2?.filter((recipe) => recipe?.diets?.includes(action.payload));
        }
      }
      if (
        api2.length !== modifiedProps.apiRecipes?.length ||
        db2.length !== modifiedProps.dbRecipes?.length ||
        sea2.length !== modifiedProps.searchResults?.length
      ) {
        modifiedProps.filtered = true;
      }
      console.log(modifiedProps);
      return { ...state, ...modifiedProps };
    case "SET_CURRENT_SEARCH":
      return { ...state, currentSearch: action.payload };
    case "SET_CURRENT_ORDER":
      return { ...state, currentOrder: action.payload };
    case "SET_CURRENT_FILTER":
      return { ...state, currentFilter: action.payload };
    case "SET_CURRENT_SOURCE":
      return { ...state, currentSource: action.payload };
    case "SET_RESULTS_NUMBER":
      return { ...state, resultsToShow: action.payload };
    case "SET_CURRENT_PAGE":
      if (action.payload.component === "HomePageApi") {
        return { ...state, currentPageApi: action.payload.pageNumber };
      } else if (action.payload.component === "HomePageDatabase") {
        return { ...state, currentPageDb: action.payload.pageNumber };
      } else if (action.payload.component === "SearchPage") {
        return { ...state, currentPageSearch: action.payload.pageNumber };
      }
      return { ...state };
    case "SET_PREVENT_API_CALL":
      return { ...state, preventApiCall: action.payload };
    case "SET_FORM_RESPONSE":
      return { ...state, formResponse: action.payload };
    default:
      return { ...state };
  }
}
