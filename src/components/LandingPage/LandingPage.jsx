import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
  -webkit-text-stroke: 0.2px black;
  text-shadow: black 0px 0px 5px;
  font-size: large;
  padding: 0 80px;
  border: 3px solid white;
  border-radius: 7px;
  background-color: #000000be;
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
        <h1>THE SACRED FORK</h1>
        <p>
          Welcome to "The Sacred Fork" - your culinary journey awaits! Explore a
          treasure trove of mouthwatering recipes from around the world, all at
          your fingertips. Whether you're a seasoned chef or a passionate
          foodie, our cloud-based recipe collection is here to inspire and
          satisfy your taste
        </p>
        <p>
          Discover a diverse range of recipes shared by our vibrant community of
          food enthusiasts. From traditional family favorites to innovative
          creations, there's something for everyone. With the option to save
          your favorite recipes to your local database, you can create a
          personalized cookbook filled with culinary delights.
        </p>
        <p>
          Let your culinary curiosity take flight as you explore the world of
          "The Sacred Fork" - where food becomes a sacred experience.
        </p>
        <Link to={"/home"}>
          <button>Acceder</button>
        </Link>
      </Container>
    </div>
  );
}
