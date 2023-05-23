// import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 95%;
  border-radius: 10px;
  background-image: repeating-linear-gradient(
    60deg,
    #2229,
    #2229 30px,
    #3339 30px,
    #3339 60px
  );
  z-index: 995;
`;

const LinksDiv = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-evenly;

  & a {
    text-decoration: none;
    display: block;
    margin: 0 20px;
  }
`;

export default function NavBar() {
  const location = useLocation();
  const urlsExcluidas = ["/newrecipe"];
  const history = useNavigate();
  const handleSearch = (event, input) => {
    event.preventDefault();
    history.push(`/search?query=${input}`);
  };

  return (
    <Nav>
      <LinksDiv>
        <Link to="/Home">Home</Link>
        <Link to="/NewRecipe">Create new recipe! 🍽</Link>
        <Link to="/About">About</Link>
      </LinksDiv>
      {!urlsExcluidas.includes(location.pathname.toLowerCase()) && (
        <SearchBar handleSearch={handleSearch}></SearchBar>
      )}
    </Nav>
  );
}
