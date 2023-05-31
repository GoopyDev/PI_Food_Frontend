import styled from "styled-components";
import About_Frame from "../../images/About_Frame.png";
// import About_BG01 from "../../images/About_BG01.png";
import About_BG02 from "../../images/About_BG02.jpg";
// import About_Wood01 from "../../images/About_Wood01.jpg";

const AboutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  text-shadow: 0 0 4px aqua;
  width: 800px;
  height: 600px;
  margin-top: 190px;
  /* background-color: #333; */
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
  overflow: auto;
  scrollbar-width: thin; /* Para navegadores Firefox */
  -ms-overflow-style: none; /* Para navegadores Internet Explorer y Edge */
  &::-webkit-scrollbar {
    width: 0.2rem; /* Ancho de la barra de desplazamiento */
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff7; /* Color de fondo de la barra de desplazamiento */
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3; /* Color de fondo del riel de la barra de desplazamiento */
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <ImgDiv>
        <BGDiv>
          <Logo src="logo.png" alt="The Sacred Fork" />
          <AboutText>
            At "The Sacred Fork", we believe that food is not merely sustenance,
            but a profound experience that brings people together. Our mission
            is to celebrate the art of cooking, foster culinary exploration, and
            cultivate a thriving community passionate about good food. With our
            cloud-based recipe platform, we aim to empower home cooks,
            professional chefs, and food enthusiasts alike. Our curated
            collection of recipes spans cultures, flavors, and dietary
            preferences, providing a diverse and inclusive space for culinary
            creativity to flourish. From the comfort of your kitchen, embark on
            a culinary adventure that transcends borders. Immerse yourself in a
            world of tantalizing aromas, vibrant colors, and unforgettable
            flavors. Our recipe database, fueled by the contributions of our
            passionate community, ensures there's always something new and
            exciting to discover. As advocates for healthy living, we offer the
            option to filter recipes by various dietary requirements. Whether
            you're a vegetarian, gluten-free, or following a specific diet, "The
            Sacred Fork" has you covered. Furthermore, you can prioritize your
            well-being by sorting recipes based on their health score, allowing
            you to make informed choices for your body and mind. "The Sacred
            Fork" is more than just a recipe platform; it's a community united
            by a shared love for exceptional cuisine. Engage with fellow food
            enthusiasts, exchange tips and tricks, and build lasting
            connections. Together, we celebrate the joy of cooking, the pleasure
            of sharing, and the transformative power of food. Join us on this
            culinary journey and let "The Sacred Fork" be your guide to a world
            of delectable flavors and culinary inspiration.
          </AboutText>
        </BGDiv>
      </ImgDiv>
    </AboutContainer>
  );
};

export default About;
