import styled from "styled-components";
import About_Frame from "../../images/About_Frame.png";
// import About_BG01 from "../../images/About_BG01.png";
import About_BG02 from "../../images/About_BG02.jpg";
// import About_Wood01 from "../../images/About_Wood01.jpg";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  text-shadow: 0 0 4px aqua;
  width: 800px;
  height: 600px;
  background-color: #333;
  // prettier-ignore
  background-image:
    linear-gradient(to bottom, #3c1e00d5, #8b4100d6 4%, transparent 20%, black 90% ),
    linear-gradient( -45deg, goldenrod, gold, #fffbc2, white, goldenrod, gold, orange, yellow, darkgoldenrod, gold, white, yellow, #fffbc2, goldenrod, gold, #fffbc2, white, goldenrod, gold, orange, yellow, darkgoldenrod, gold, white, yellow );
  /* linear-gradient( -45deg, #67c2ff, #64b5f6, #fffbc2, #e1f5fe, #67c2ff, #64b5f6, #b2ebf2, #e0f2f1, #e0f2f1, #64b5f6, #fffbc2, #67c2ff, #64b5f6, #fffbc2, #e1f5fe, #67c2ff, #64b5f6, #b2ebf2, #e0f2f1, #e0f2f1, #64b5f6 ); */
  /* linear-gradient(-45deg, #2EC4B6, #3CAEA3, #F0F3BD, #FFFFFF, #2EC4B6, #3CAEA3, #F17300, #FFD166, #FF5733, #3CAEA3, #FFFFFF, #FFD166, #2EC4B6, #3CAEA3, #F0F3BD, #FFFFFF, #2EC4B6, #3CAEA3, #F17300, #FFD166, #FF5733, #3CAEA3, #FFFFFF, #FFD166); */
  /* background-size: cover; */
  color: white;
  z-index: -1;
  animation: shine 40s ease-in-out alternate 0s infinite;

  @media screen and (max-width: 910px) {
    width: 640px;
    height: 480px;
    font-size: medium;
  }
  @media screen and (max-width: 650px) {
    width: 400px;
    height: 300px;
    font-size: smaller;
  }

  @keyframes shine {
    0% {
      background-size: 100%;
    }
    50% {
      background-size: 400%;
      background-position: 100% 80%;
    }
    75% {
      background-size: 250%;
      background-position: 90% 110%;
    }
    100% {
      background-size: 600%;
      background-position: 60% 85%;
    }
  }
`;

const ImgDiv = styled.div`
  display: flex;
  margin: 0px;
  padding: 0px;
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${About_Frame});
  background-size: cover;
  filter: drop-shadow(0 0 10px black) opacity(0.9) saturate(1.5);
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BGDiv = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px;
  position: relative;
  width: 90%;
  height: 85%;
  background-color: #111;
  background-image: url(${About_BG02});
  background-size: 133%;
  background-position: 75% center;
  background-repeat: no-repeat;
`;

const Logo = styled.img`
  width: 150px;
  height: 100px;
`;

const AboutText = styled.p`
  /* font-size: 1.2rem; */
  /* margin-top: 5px; */
  margin: 40px;
  padding: 10px;
  background-color: #0009;
  border-radius: 10px;
  text-align: center;
`;

const About = () => {
  return (
    <AboutContainer>
      <ImgDiv>
        <BGDiv>
          <Logo src="logo.png" alt="Videogames Blackhole" />
          <AboutText>
            Videogames Blackhole es una aplicación web que ofrece información
            sobre videojuegos. Este proyecto fue creado utilizando tecnologías
            como React, Node.js y PostgreSQL. El creador de la aplicación es un
            estudiante de Fullstack Developer con conocimientos en desarrollo de
            juegos en Unity, Python y otras tecnologías. También es músico, le
            gusta la pintura, dibujos y la música.
          </AboutText>
        </BGDiv>
      </ImgDiv>
    </AboutContainer>
  );
};

export default About;
