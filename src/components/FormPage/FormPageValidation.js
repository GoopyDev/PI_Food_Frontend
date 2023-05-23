// Toma los estados recipeData y recipeDiets, y valida cada elemento con una funcion

export function validateForm(recipeState, dietsState) {
  const errors = {};
  const { name, description, image, steps } = recipeState;
  const { diets } = dietsState;

  function validateName(name) {
    let nameErrors = [];
    if (name === "") nameErrors.push("Name must be provided");
    if (name.length > 80)
      nameErrors.push("Name must contain less than 80 characters");

    // Cargamos errores en "errors", si hubo
    if (nameErrors.length > 0) errors.nameErrors = nameErrors;
  }

  function validateDescription(description) {
    let descriptionErrors = [];
    if (description === "")
      descriptionErrors.push("Provide a description for your recipe");
    if (description.length > 300)
      descriptionErrors.push("Description can't be longer than 300 characters");

    // Cargamos errores en "errors", si hubo
    if (descriptionErrors.length > 0)
      errors.descriptionErrors = descriptionErrors;
  }

  function validateURL(urlString) {
    let urlErrors = [];
    const urlRegExp = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[\w.-]*)*\/?$/i;
    if (!urlRegExp.test(urlString))
      urlErrors.push("Please check the URL provided");

    // Cargamos errores en "errors", si hubo
    if (urlErrors.length > 0) errors.urlErrors = urlErrors;
  }

  function validateSteps(stepsArray) {
    let stepsErrors = [];
    let emptySteps = false;
    if (stepsArray.length < 1)
      stepsErrors.push("You must specify at least 1 step for your recipe");
    stepsArray.forEach((step) => {
      if (step === "") emptySteps = true;
    });
    if (emptySteps) stepsErrors.push("Steps can't be empty");

    // Cargamos errores en "errors", si hubo
    if (stepsErrors.length > 0) errors.stepsErrors = stepsErrors;
  }

  function validateDiets(dietsArray) {
    let dietsErrors = [];
    if (dietsArray.length < 1)
      dietsErrors.push("You must select at least 1 diet for your recipe");

    // Cargamos errores en "errors", si hubo
    if (dietsErrors.length > 0) errors.dietsErrors = dietsErrors;
  }

  // Realiza las validaciones para cada propiedad
  validateName(name);
  validateDescription(description);
  validateURL(image);
  validateSteps(steps);
  validateDiets(diets);

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
}
