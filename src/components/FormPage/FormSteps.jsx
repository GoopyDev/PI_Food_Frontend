import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9;
  border: 2px solid #fffc;
  border-radius: 5px;
`;

const StepNumber = styled.span`
  width: 30px;
`;

const TextArea = styled.textarea`
  width: 290px;
  max-width: 290px;
  min-width: 290px;
  min-height: 16px;
`;

const RemoveButton = styled.div`
  user-select: none;
  display: inline-block;
  margin: 0;
  line-height: 16px;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: white;
  background-color: darkred;
  &:hover {
    background-color: red;
  }
`;

export default function FormSteps(props) {
  const { steps, handleStepChange, removeStep } = props;
  return (
    <MainDiv>
      {steps?.map((step, index) => {
        return (
          <Step key={index}>
            <StepNumber>#{index + 1}</StepNumber>
            <TextArea
              id={`step${index}`}
              type="text"
              value={step}
              onChange={handleStepChange}
            />
            <RemoveButton id={`btn${index}`} onClick={removeStep}>
              x
            </RemoveButton>
          </Step>
        );
      })}
    </MainDiv>
  );
}
