import styled from "styled-components";
import {
  filterRecipes,
  getDiets,
  orderRecipes,
  resetFilters,
  setCurrentFilter,
  setCurrentOrder,
} from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const MainDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  width: 30%;
  & select {
    height: 20px;
    transition: all 0.5s;
  }
`;

const SubItem = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-evenly;
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 5px;
  height: 20px;
  color: black;
  background-color: aqua;
`;

const ResetBox = styled.div`
  animation: fadeIn 1s ease 0s 1;
  @keyframes fadeIn {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

export default function Filtros() {
  // const [selectedOption, setSelectedOption] = useState("");
  const orderBy = ["a-z", "z-a", "HealthScore asc", "HealthScore des"];
  const { diets, currentOrder, currentFilter, filtered } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  // Control para deshabilitar los filtros y ordenamiento en la pagina de Details
  const location = useLocation();
  const disabledPaths = ["/DetailPage", "/About"];
  // Si el Path coincide con alguna ruta deshabilitada, indicamos "notAllowed",
  // es decir, no se habilitan los "Select" en esa ruta
  const notAllowed = disabledPaths.includes(location.pathname) ? true : false;

  const handleOrderChange = (event) => {
    // console.log("Selected: ", event.target.value);
    dispatch(setCurrentOrder(event.target.value));
    dispatch(orderRecipes(event.target.value));
  };

  const handleFilterChange = (event) => {
    dispatch(setCurrentFilter(event.target.value));
    dispatch(filterRecipes(event.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <MainDiv>
      <Item>
        <label htmlFor="order">Order:</label>
        <select
          name="order"
          placeholder="Choose an option..."
          value={currentOrder}
          onChange={handleOrderChange}
          disabled={notAllowed}
        >
          <option disabled={true} value="">
            Choose an option...
          </option>
          {orderBy.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Item>
      <Item>
        <label htmlFor="filter">Filter by diet:</label>
        <SubItem>
          <select
            name="filter"
            placeholder="Choose diet..."
            value={currentFilter}
            onChange={handleFilterChange}
            disabled={notAllowed}
            style={{ width: "100%" }}
          >
            <option disabled={true} value="">
              Choose diet...
            </option>
            {typeof diets[0] === "string" &&
              diets?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
          {filtered && (
            <ResetBox>
              <ResetButton name="reset" onClick={handleResetFilters}>
                Reset
              </ResetButton>
            </ResetBox>
          )}
        </SubItem>
      </Item>
    </MainDiv>
  );
}
