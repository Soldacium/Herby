import { ResultImage } from "../../../shared/models/result-image.model";

const result: ResultImage = {
  name: "example",
  link: "/details/example",
  formats: ["svg", "jpg", "png"],
  id: "1",
  image: "/src/shared/assets/icons/svg.svg",
};

const result2: ResultImage = {
  name: "example",
  link: "/details/example2",
  formats: ["svg", "jpg", "png"],
  id: "1",
  image: "/src/shared/assets/icons/jpg.svg",
};

const results = Array(20).fill(result2);
results[0] = result;

export default results;
