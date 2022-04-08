import { ResultImage } from "../../../shared/models/result-image.model";

const result: ResultImage = {
  name: "Barcelona",
  link: "/details/example",
  formats: ["svg", "jpg", "png"],
  id: "1",
  image: "/src/shared/assets/backgrounds/fc-barcelona.svg",
};

const result2: ResultImage = {
  name: "Madryt",
  link: "/details/example2",
  formats: ["svg", "jpg", "png"],
  id: "1",
  image: "/src/shared/assets/backgrounds/madrid-cf.svg",
};

const results = Array(20).fill(result2);
results[0] = result;

export default results;
