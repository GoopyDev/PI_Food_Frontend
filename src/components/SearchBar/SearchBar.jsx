import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filtros from "../Filtros/Filtros";
import {
  cleanSearch,
  resetFilters,
  setCurrentSearch,
  setCurrentSource,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const MainDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(to bottom, #000c, #002b64cc);
  padding: 10px 0;
  border: 3px solid white;
  border-radius: 10px;
  width: 95.5%;
  top: 50px;
  z-index: 1000;
`;

const SearchContainer = styled.div`
  /* client\src\components\SearchBar\SearchBar.jsx */
  /* client\src\images\NES-Controller_SearchBar.png */
  display: flex;
  justify-content: center;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const ElementsBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;
  align-items: center;
  margin: 10px;
`;

const OptionsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const LabelContainer = styled.div`
  display: flex;
  /* width: 55%; */
  justify-content: space-around;
  color: white;
  font-weight: bold;
  text-shadow: #00545f 0px 0px 4px;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 212px;
  height: 32px;
  margin: 0;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 0 10px #fffc;
`;

const SearchButton = styled.button`
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  font-size: large;
  line-height: 10px;
  color: #000b;
  background-color: aqua;
  border-radius: 0 10px 10px 0;
  border-bottom: 2px solid #4b6868;
  border-right: 2px solid darkslategray;
  border-top: 2px solid #000a;
  &:hover {
    background-color: #00e1e1;
  }
`;

export default function SearchBar(props) {
  const [input, setInput] = useState({
    search: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentSource } = useSelector((state) => state);

  function buscar() {
    dispatch(cleanSearch());
    dispatch(resetFilters());
    const itemBuscado = /^\d+$/.test(input.search)
      ? Number(input.search)
      : input.search;
    console.log(`Estoy buscando un: "${typeof itemBuscado}"`);
    dispatch(setCurrentSearch(itemBuscado)); // Guardamos la búsqueda en el estado global
    typeof itemBuscado === "number"
      ? navigate(`/SearchPage?id=${itemBuscado}&source=${currentSource}`)
      : navigate(`/SearchPage?name=${itemBuscado}&source=${currentSource}`);
  }

  function handleChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      // dispatch(getVideogameById(input.search));
      buscar();
    }
  }

  const handleRadioButtonChange = (event) => {
    dispatch(setCurrentSource(event.target.value));
  };

  return (
    <MainDiv>
      <SearchContainer>
        <ElementsBox>
          <LabelContainer>
            <label htmlFor="search">Buscar recetas</label>
          </LabelContainer>
          <div style={{ display: "flex" }}>
            <SearchInput
              type="text"
              name="search"
              id="search"
              value={input.search}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
            <SearchButton type="submit" onClick={buscar}>
              🔎
            </SearchButton>
          </div>
        </ElementsBox>
        <ElementsBox>
          <label htmlFor="source">Source:</label>

          <OptionsBox>
            <label>
              <input
                type="radio"
                name="source"
                value="api"
                checked={currentSource === "api"}
                onChange={handleRadioButtonChange}
              />
              API
            </label>
            <label>
              <input
                type="radio"
                name="source"
                value="database"
                checked={currentSource === "database"}
                onChange={handleRadioButtonChange}
              />
              Database
            </label>
          </OptionsBox>
        </ElementsBox>
      </SearchContainer>
      <hr style={{ width: "75%", borderColor: "#0099ff42" }} />
      <Filtros />
    </MainDiv>
  );
}
