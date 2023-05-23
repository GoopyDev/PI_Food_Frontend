import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setPreventApiCall } from "../../redux/actions";

const MainDiv = styled.div`
  display: flex;
  position: absolute;
  top: 50px;
  left: 30px;
  z-index: 1001;
`;

export default function BackToHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setPreventApiCall(true));
    navigate("/Home");
  };

  return (
    <MainDiv>
      <button type="submit" onClick={handleClick}>
        Back to Home
      </button>
    </MainDiv>
  );
}
