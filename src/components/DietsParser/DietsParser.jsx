import styled from "styled-components";

//prettier-ignore
const dietColors = {
  "vegan"               : "darkgreen"     , // 
  "vegetarian"          : "green"         , // 
  "glutenFree"          : "darkgoldenrod" , // 
  "gluten free"         : "goldenrod"     , // 
  "dairy free"          : "darkturquoise" , // 
  "lacto ovo vegetarian": "darkolivegreen", // 
  "paleolithic"         : "darkred"       , // 
  "primal"              : "darkcyan"      , // 
  "whole 30"            : "blue"          , // 
  "pescatarian"         : "darkslateblue" , // 
  "ketogenic"           : "darkmagenta"   , // 
  "fodmap friendly"     : "orangered"     , // 
  "SampleDiet"          : "black"         , // 
  // 2                  : "darkblue"      , // 
  // 40                 : "darkviolet"    , // 
  // 1                  : "brown"         , // 
  // 59                 : "chocolate"     , // 
  // 6                  : "red"           , // 
  // 17                 : "navy"          , // 
};

const DietsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 5px 0;
  & span {
    border: 1px solid white;
    border-radius: 3px;
    margin: 3px 0 0 5px;
    padding: 0 3px 3px 3px;
  }
`;

export default function DietsParser(props) {
  const { diets, vegan, vegetarian, glutenFree } = props.dietsInfo;
  let associatedDiets = [];
  let exclusionsList = [];
  if (vegan) {
    associatedDiets.push("vegan");
    exclusionsList.push("vegan");
  }
  if (vegetarian) {
    associatedDiets.push("vegetarian");
    exclusionsList.push("vegetarian");
  }
  if (glutenFree) {
    associatedDiets.push("gluten free");
    exclusionsList.push("gluten free"); // Atento a que no se escriben de igual modo!
  }

  diets?.forEach((dietName) => {
    if (!exclusionsList.includes(dietName)) {
      console.log("Añado este elemento: ", dietName);
      associatedDiets.push(dietName);
    } else console.log("No añado este elemento repetido: ", dietName);
  });
  console.log("Associated Diets:");
  console.log(associatedDiets);

  return (
    <DietsBox>
      {associatedDiets?.map((diet, index) => (
        <span key={index} style={{ backgroundColor: `${dietColors[diet]}` }}>
          {diet}
        </span>
      ))}
    </DietsBox>
  );
}
