import ResultImage from "../../../shared/models/result-image.model";

let result: ResultImage = {
  name: "Barcelona",
  link: "/details/example",
  formats: ["svg", "jpg", "png"],
  id: "1",
  image: "/src/shared/assets/backgrounds/fc-barcelona.svg",
};

let result2: ResultImage = {
  name: "Madryt",
  link: "/details/example2",
  formats: ["svg", "jpg", "png"],
  id: "1",
  image: "/src/shared/assets/backgrounds/madrid-cf.svg",
};
const length = 20;
const getResults = (): ResultImage[] => {
  let res: ResultImage[] = [];
  for (let i = 0; i < length; i++) {
    let result = { ...result2 };
    result.id = i + "0";
    res.push(result);
  }
  res[0] = result;
  return res;
};
let results: ResultImage[] = getResults();

export default results;
