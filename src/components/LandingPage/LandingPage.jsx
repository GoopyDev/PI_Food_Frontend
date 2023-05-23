import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
  height: 50%;
  padding: 0 80px;
  border: 3px solid white;
  border-radius: 7px;
  background-color: #0009;
`;

export default function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Container>
        <h1>THE GOLDEN FORK</h1>
        {/* <p> */}
        Un sitio en donde encontrarás miles de videojuegos y sus reseñas,
        ratings, detalles de tus juegos favoritos y más, para que puedas
        explorar los juegos más exóticos y divertidos. Ideal para jugadores
        hábiles como tú que buscan nuevas aventuras y emociones en el mundo de
        los videojuegos."
        {/* </p> */}
        <Link to={"/home"}>
          <button>Acceder</button>
        </Link>
      </Container>
    </div>
  );
}
