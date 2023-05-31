import styled from "styled-components";
import BG_Image from "../../images/BG_Ingredients.jpg";

const TopFrame = styled.div`
  position: fixed;
  width: 100%;
  height: 218px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  /* background: fixed; */
  background-color: brown;
  background-image: url(${BG_Image});
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  z-index: 990;
`;

export default function TopHiddenDiv() {
  return <TopFrame />;
}
