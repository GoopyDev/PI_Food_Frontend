import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormSteps from "./FormSteps";
import { validateForm } from "./FormPageValidation";
import { addRecipe, getDiets, setFormResponse } from "../../redux/actions";
import FoodBanner from "../../images/AddFood02.jpg";
import RecipeCreatedImg from "../../images/RecipeCreated.png";

const ImgBanner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 150px;
  border: 1px solid #fff7;
  border-radius: 20px 20px 0 0;
  background-image: radial-gradient(#0001, #000a), url(${FoodBanner});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ImgBannerPlus = styled.div`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-right: 50px;
  border-radius: 50px;
  color: #fffc;
  background-color: #fff4;
  font-size: xxx-large;
  font-weight: bold;
  line-height: 70px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-content: center; */
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
  border: 1px solid #fff3;
  border-radius: 20px;
  background-color: #111a;
`;

const Separator = styled.hr`
  border-color: #0099ff42;
  width: 80%;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  width: 35%;
  max-width: 600px;
  min-width: 350px;
`;

const DietsDiv = styled.div`
  padding: 10px 0;
  background-color: #000a;
`;

const DietsDivOffset = styled.div`
  left: 9%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AddStepButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  color: #294242;
  background-color: #8fd7d7;
  box-shadow: none;
  &:hover {
    color: white;
    background-color: #619292;
    box-shadow: none;
  }
`;

const PlusDiv = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  right: 5px;
  bottom: 5px;
  padding: 5px;
  border-radius: 5px;
  color: white;
  /* color: #294242; */
  background-color: #00000050;
`;

const ErrorMsg = styled.span`
  display: block;
  margin: auto;
  padding: 0 5px 2px 5px;
  color: darkred;
  background-color: #ffa3a3;
  border-radius: 5px;
  font-size: x-small;
  font-weight: bold;
`;

const SuccessDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 600px;
  height: 400px;
  padding: 50px;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%); */
  margin: auto;
  padding: 80px;
  box-sizing: border-box;
  border: 2px solid white;
  border-radius: 10px;
  color: #00856a;
  text-shadow: 0 0 7px black;
  -webkit-text-stroke: 2px white;
  font-size: xxx-large;
  font-weight: bold;
  background-color: #00000050;
  background-image: url(${RecipeCreatedImg});
  animation: fadeOut 5s ease-in 1;

  @keyframes fadeOut {
    0% {
      opacity: 0%;
      transform: scale(1) translate(-50%, -50%);
    }
    3% {
      opacity: 100%;
    }
    70% {
      opacity: 100%;
    }
    100% {
      opacity: 0%;
      transform: scale(1.05) translate(-47.5%, -47.5%);
    }
  }
`;

const SuccessTick = styled.span`
  background-color: #00856a;
  border: 4px solid white;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  box-shadow: 0 0 10px #000c;
  text-shadow: none;
  -webkit-text-stroke: 1px white;
`;

const ErrorMsgDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;
  height: 200px;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%); */
  margin: auto;
  padding: 5px;
  border: 2px solid #530000;
  border-radius: 10px;
  color: #8b0000;
  font-size: x-large;
  font-weight: bold;
  background-color: #ffa8a8ce;
  animation: fadeOut 5s ease-in 1;

  @keyframes fadeOut {
    0% {
      opacity: 0%;
      transform: scale(1) translate(-50%, -50%);
    }
    5% {
      opacity: 100%;
    }
    70% {
      opacity: 100%;
    }
    100% {
      opacity: 0%;
      transform: scale(1.1) translate(-45%, -45%);
    }
  }
  & p {
    margin: 0;
  }
  h2 {
    margin: 0;
    text-decoration: underline;
  }
`;

export default function CreateRecipeForm() {
  /////////////////////////////////////////////////////////////////////////////
  // Definición de variables y estados
  /////////////////////////////////////////////////////////////////////////////
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    image: "",
    healthScore: 10,
    steps: [""],
  });

  const [recipeDiets, setRecipeDiets] = useState({
    diets: [],
  });

  const [errorList, setErrorList] = useState({
    name: [],
    description: [],
    image: [],
    steps: [],
    diets: [],
  });

  const dispatch = useDispatch();
  const dietsArray = useSelector((state) => state.diets);
  const { formResponse } = useSelector((state) => state);
  let showingMessage = false;
  if (formResponse.data?.length > 0) showingMessage = true;
  if (showingMessage) {
    setTimeout(() => {
      showingMessage = false;
      dispatch(setFormResponse({}));
    }, 5000);
  }

  /////////////////////////////////////////////////////////////////////////////
  // Definición de funciones
  /////////////////////////////////////////////////////////////////////////////

  const handleGenericChange = (event) => {
    setRecipeData({ ...recipeData, [event.target.name]: event.target.value });

    setErrorList({});
    validateFields(
      { ...recipeData, [event.target.name]: event.target.value },
      recipeDiets
    );
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let newDiets = [];
    if (checked) {
      // Agregamos la dieta al array de dietas, si está marcada
      newDiets = [...recipeDiets.diets, value];
      setRecipeDiets({ diets: newDiets });

      setErrorList({});
      validateFields(recipeData, { diets: newDiets });
    } else {
      // Quitamos la dieta del array de dietas si se desmarca
      newDiets = [...recipeDiets.diets];
      setRecipeDiets({ diets: newDiets.filter((diet) => diet !== value) });

      setErrorList({});
      validateFields(recipeData, {
        diets: newDiets.filter((diet) => diet !== value),
      });
    }
  };

  const handleHealthBarChange = (event) => {
    setRecipeData({ ...recipeData, healthScore: Number(event.target.value) });
  };

  const addStep = () => {
    let newSteps = [...recipeData.steps, ""];
    setRecipeData({ ...recipeData, steps: newSteps });
  };

  const removeStep = (event) => {
    let newSteps = [...recipeData.steps];
    console.log("ID:");
    console.log(event.target.id);
    newSteps.splice(event.target.id.slice(3), 1); // El id es "btn1". Quitamos "btn" para quedarnos con el nro de id
    setRecipeData({ ...recipeData, steps: newSteps });
  };

  const handleStepChange = (event) => {
    let newSteps = [...recipeData.steps];
    console.log("Cambio en el input:");
    console.log(event.target.id);
    console.log(event.target.id.slice(4)); // El id es "step1". Quitamos "step" para quedarnos con el nro de id
    newSteps[event.target.id.slice(4)] = event.target.value;
    setRecipeData({ ...recipeData, steps: newSteps });

    setErrorList({});
    validateFields({ ...recipeData, steps: newSteps }, recipeDiets);
  };

  const validateFields = (recipeChanges, dietsChanges) => {
    const { isValid, errors } = validateForm(recipeChanges, dietsChanges);
    if (!isValid) setErrorList(errors);
    else setErrorList({});
  };

  const closeMessage = (event) => {
    event.target.style.visibility = "hidden";
    dispatch(setFormResponse({}));
  };

  const resetForm = () => {
    setRecipeData({
      name: "",
      description: "",
      image: "",
      healthScore: 10,
      steps: [""],
    });
    setRecipeDiets({
      diets: [],
    });
    setErrorList({
      name: [],
      description: [],
      image: [],
      steps: [],
      diets: [],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Me submitearon!");
    const { isValid, errors } = validateForm(recipeData, recipeDiets);

    if (isValid) {
      console.log("Che.. el formulario es válido!");
      console.log("Steps:");
      console.log(recipeData.steps);
      let compiledSteps = [];
      recipeData.steps.forEach((step, index) => {
        compiledSteps.push({ number: index + 1, step: step });
      });
      let newRecipe = {
        recipe: {
          name: recipeData.name,
          image: recipeData.image,
          description: recipeData.description,
          health_score: recipeData.healthScore,
          steps: [...compiledSteps],
          diets: [...recipeDiets.diets],
        },
      };
      console.log(newRecipe);
      dispatch(addRecipe(newRecipe));
    } else {
      setErrorList(errors);
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  // useEffect
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  /////////////////////////////////////////////////////////////////////////////
  // Renderizado
  /////////////////////////////////////////////////////////////////////////////

  return (
    <Container>
      <ImgBanner>
        <ImgBannerPlus>+</ImgBannerPlus>
      </ImgBanner>
      <Form action="Submit" onSubmit={handleSubmit}>
        {/* id name image description health_score steps */}
        <h1>Create new recipe</h1>
        <hr />
        <label htmlFor="name">Recipe name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Write a title for your recipe"
          value={recipeData.name}
          onChange={handleGenericChange}
        />
        {errorList.nameErrors?.map((msg, index) => (
          <ErrorMsg key={index}>{msg}</ErrorMsg>
        ))}
        <Separator />

        <label htmlFor="description:">Description:</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Write your recipe description or summary"
          value={recipeData.description}
          onChange={handleGenericChange}
        ></textarea>
        {errorList.descriptionErrors?.map((msg, index) => (
          <ErrorMsg key={index}>{msg}</ErrorMsg>
        ))}
        <Separator />

        <label htmlFor="image">Recipe image URL:</label>
        <input
          type="url"
          name="image"
          id="image"
          placeholder="Provide an image's URL for your recipe"
          value={recipeData.image}
          onChange={handleGenericChange}
        />
        {errorList.urlErrors?.map((msg, index) => (
          <ErrorMsg key={index}>{msg}</ErrorMsg>
        ))}
        <Separator />

        <label htmlFor="healthScore">Health score:</label>
        <span>{recipeData.healthScore}</span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={recipeData.healthScore}
          name="healthScore"
          id="healthScore"
          onChange={handleHealthBarChange}
        />
        <Separator />

        <label htmlFor="diets">Diets:</label>
        <DietsDiv>
          <DietsDivOffset>
            {dietsArray?.map((dietName, index) => {
              return (
                <div key={index} style={{ width: "49%", textAlign: "left" }}>
                  <label>
                    <input
                      type="checkbox"
                      value={dietName}
                      onChange={handleCheckboxChange}
                      checked={recipeDiets.diets?.includes(dietName)}
                    />
                    {dietName}
                  </label>
                </div>
              );
            })}
          </DietsDivOffset>
        </DietsDiv>
        {errorList.dietsErrors?.map((msg, index) => (
          <ErrorMsg key={index}>{msg}</ErrorMsg>
        ))}
        <Separator />

        <label>Recipe steps:</label>
        <FormSteps
          steps={recipeData?.steps}
          handleStepChange={handleStepChange}
          removeStep={removeStep}
        />
        <AddStepButton type="button" onClick={addStep}>
          Add step
          <PlusDiv>+</PlusDiv>
        </AddStepButton>
        {errorList.stepsErrors?.map((msg, index) => (
          <ErrorMsg key={index}>{msg}</ErrorMsg>
        ))}
        <Separator />

        <button type="submit">Create recipe</button>
      </Form>

      {/* Sección de condicionales para mensajes */}
      {formResponse?.status < 300 && (
        <SuccessDiv onClick={closeMessage}>
          <div></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Recipe
            <br />
            created!
            <SuccessTick>✔</SuccessTick>
          </div>
        </SuccessDiv>
      )}
      {formResponse?.status > 399 && (
        <ErrorMsgDiv onClick={closeMessage}>
          <h2>Error</h2>
          <p>{formResponse?.data}</p>
        </ErrorMsgDiv>
      )}
      {formResponse?.status < 300
        ? console.log(
            `La condición 1 (Success) funciona. Status: ${formResponse.status}`
          )
        : console.log(
            `La condición 2 (Error) funciona. Status: ${formResponse.status}`
          )}
    </Container>
  );
}
