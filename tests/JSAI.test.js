import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form from "../src/components/FormPage/FormPage";
import FormSteps from "../src/components/FormPage/FormSteps";
import { jest } from "@jest/globals";

describe("Testing Form", () => {
  // test('Should submit the form with validated Recipe data', () => {
  test("Renders the required elements to collect Recipe data", () => {
    const { getByLabelText, getByText, container } = render(<Form />);
    const nameInput = getByLabelText("name");
    const descriptionInput = getByLabelText("description");
    const imageInput = getById(container, "image");
    const healthScoreInput = getById(container, "healthScore");
    const checkBox0 = getById(container, "checkbox0");
    const checkBox1 = getById(container, "checkbox1");
    const stepInput0 = getById(container, "step0");
    // const stepInput1 = getById(container, "step1");
    const addStepButton = getById(container, "addStep");
    const submitButton = getById(container, "submitter");
    // fireEvent.click()
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(healthScoreInput).toBeInTheDocument();
    expect(checkBox0).toBeInTheDocument();
    expect(checkBox1).toBeInTheDocument();
    expect(stepInput0).toBeInTheDocument();
    // expect(stepInput1).toBeInTheDocument();
    expect(addStepButton).toBeInTheDocument();

    //getById
    //getByText
    //getByLabelText

    // Simular el llenado del formulario
    // fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    // fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    // Simular el envío del formulario
    // fireEvent.click(submitButton);
  });
});

// const { expect } = require("chai");
// // /* eslint-disable no-undef */
// ("use strict");

// const {
//   counter,
//   cacheFunction,
//   getNombreInstructor,
//   getNombreAlumno,
//   textoAsteriscos,
//   textoGuiones,
//   textoUnderscore,
// } = require("../homework");

// describe("counter", () => {
//   it("should return a function", () => {
//     expect(typeof counter()).toBe("function");
//   });
//   it("should return 1 when the returned function is invoked", () => {
//     expect(counter()()).toBe(1);
//   });
//   it("should increment and return the number each time the function is invoked", () => {
//     const counterFunction = counter();
//     expect(counterFunction()).toBe(1);
//     expect(counterFunction()).toBe(2);
//     expect(counterFunction()).toBe(3);
//     expect(counterFunction()).toBe(4);
//     expect(counterFunction()).toBe(5);
//   });
//   it("should have two diferent acumulators if two counters are created", () => {
//     const counterOne = counter();
//     const counterTwo = counter();
//     expect(counterOne()).toBe(1);
//     expect(counterOne()).toBe(2);
//     expect(counterOne()).toBe(3);
//     expect(counterOne()).toBe(4);
//     expect(counterTwo()).toBe(1);
//     expect(counterTwo()).toBe(2);
//   });
// });

// describe("cacheFunction(cb)", function () {
//   const cb = function (x) {
//     return x * 2;
//   };
//   it("should return the callback function", function () {
//     expect(typeof cacheFunction(cb)).toEqual("function");
//   });
//   it("should return the callback functions result when the cached function is invoked", function () {
//     const cachedFunction = cacheFunction(cb);
//     expect(cachedFunction(5)).toBe(10);
//   });
//   it("should cache function results", function () {
//     const cachedFunction = cacheFunction(cb);
//     var resultOne = cachedFunction(2);
//     expect(resultOne).toBe(4);
//     var resultTwo = cachedFunction(3);
//     expect(resultTwo).toBe(6);
//     var resultTwo = cachedFunction(2);
//     expect(resultTwo).toBe(4);
//   });
//   it("should avoid calling cb function when not necessary", function () {
//     const cb = jest.fn();
//     const cachedFunction = cacheFunction(cb);
//     cachedFunction(true);
//     cachedFunction(true);
//     cachedFunction(true);
//     cachedFunction(true);
//     cachedFunction(true);
//     cachedFunction(10);
//     cachedFunction(10);
//     cachedFunction(10);
//     cachedFunction(10);
//     expect(cb).toHaveBeenCalledTimes(2);
//   });
// });

// describe("Bind", function () {
//   it('should return the correct name "Franco"', function () {
//     expect(getNombreInstructor()).toEqual("Franco");
//   });
//   it('should return the correct name "Juan"', function () {
//     expect(getNombreAlumno()).toEqual("Juan");
//   });
//   it('should return the correct string "*Hola*"', function () {
//     expect(textoAsteriscos("Hola")).toEqual("*Hola*");
//   });
//   it('should return the correct string "-Hola-"', function () {
//     expect(textoGuiones("Hola")).toEqual("-Hola-");
//   });
//   it('should return the correct string "_Hola_"', function () {
//     expect(textoUnderscore("Hola")).toEqual("_Hola_");
//   });
// });
