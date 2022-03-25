import { ResultImage } from "../../../shared/models/result-image.model";

const result: ResultImage = {
  name: "example",
  link: "/details/example",
  formats: [".svg", ".jpg", ".png"],
  id: "1",
  image: "/src/shared/assets/icons/abstract.svg",
};

const results = Array(20).fill(result);

export default results;
