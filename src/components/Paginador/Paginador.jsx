import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCurrentPage } from "../../redux/actions";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const DisabledPage = styled.span`
  color: gray;
  /* margin: 0 3px; */
`;

const EnabledPage = styled.span`
  /* margin: 0 3px; */
`;

const EnabledButton = styled.button`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 0;
  justify-content: center;
  align-items: center;
`;

const DisabledButton = styled.button`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 0;
  justify-content: center;
  align-items: center;
  background-color: #00aaff66;
  box-shadow: 0 0 10px #00aaff;
  &:hover {
    background-color: #00aaff66;
    box-shadow: 0 0 10px #00aaff;
  }
`;

export default function Paginador(props) {
  const { component } = props; //Component nos indica qué componente utiliza al paginador

  const { resultsToShow, apiRecipes, searchResults, currentPage } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  let totalPages;
  if (component === "HomePage") {
    totalPages = Math.ceil(apiRecipes?.length / resultsToShow);
  } else if (component === "SearchPage") {
    totalPages = Math.ceil(searchResults?.length / resultsToShow);
  }
  const pagesToShow = [];

  const numberOfLinks = 5; //                         // Cuántos links (max) se mostrarán en el paginador
  const offsetOfLetI = Math.floor(numberOfLinks / 2); // Cálculo para situar la página actual en el centro

  // Cálculos para el Paginador. Se intenta mostrar 5 links en total,
  // y en lo posible, la página actual se muestra en el medio (salvo
  // que sea 1, 2 o las últimas dos páginas disponibles para renderizar)

  // Ejemplos:
  //      CP + i - off   CP +  n                          Output
  // PN = 1  + (0 - 2) = 1  + (-2) = -1 0 1 2 3 (4) (5)  | [(4), (5), 1, 2, 3]
  // PN = 3  + (0 - 2) = 3  + (-2) =  1 2 3 4 5          | [1, 2, 3, 4, 5]
  // PN = 7  + (0 - 2) = 7  + (-2) =  5 6 7 8 9          | [5, 6, 7, 8, 9]
  // PN = 9  + (0 - 2) = 9  + (-2) = (5) (6) 7 8 9 10 11 | [8, 9, 10,(6), (7)]

  // prettier-ignore
  for (let i = 0; i < numberOfLinks; i++) {
    let pageNumber = currentPage - (i - offsetOfLetI);         // PN = 1 + (0 - 2) = 1 + (-2) = -1 0 1 2 3 (4) (5)
    if (pageNumber > 0) {                                      // -Si pageNumber es mayor a 0:           (AÑADIR)
      if (pageNumber <= totalPages) {                          //   -Si es menor o igual a totalPages    (AÑADIR)
        pagesToShow.push(pageNumber);                          //     lo añadimos al listado de paginas  (AÑADIR)
      } else {                                                 //   -Pero si es mayor a totalPages       (COMPENSAR)
        let compensation = pageNumber - numberOfLinks;         //     compensation es pageNumber disminuído en el nro de links
        if (compensation > 0) {                                //     -y sólo si pageNumber es mayor a 0 (COMPENSAR)
          pagesToShow.push(compensation);                      //       compensamos el faltante          (COMPENSAR)
        }
      }
    } else {                                                   // -Si pageNumber es menor a 0:           (COMPENSAR)
      let compensation = pageNumber + numberOfLinks;           //   compensation es pageNumber aumentado en el nro de links
      if (compensation <= totalPages) {                        //   -Sólo si es menor a totalPages       (COMPENSAR)
        pagesToShow.push(compensation)                         //     compensamos el faltalte
      }
    }
  }
  console.log("PagesToShow:");
  console.log(pagesToShow.sort((a, b) => a - b)); // El orden no importaba, ya que lo ordenamos en forma ascendente y listo

  const handlePageChange = (pageNum) => {
    dispatch(setCurrentPage(pageNum));
    console.log(`Cambiar página actual a ${pageNum}`);
  };

  return (
    <MainDiv>
      <p>Go to page:</p>
      <ButtonsDiv>
        {pagesToShow?.map((page, index) => {
          return page === currentPage ? (
            <DisabledButton key={index}>
              <DisabledPage>{page}</DisabledPage>
            </DisabledButton>
          ) : (
            <EnabledButton key={index} onClick={() => handlePageChange(page)}>
              <EnabledPage>{page}</EnabledPage>
            </EnabledButton>
          );
        })}
      </ButtonsDiv>
    </MainDiv>
  );
}
