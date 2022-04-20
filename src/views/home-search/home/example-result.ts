import ApiCrestData from "../../../shared/models/api-crest-data.model";
import ResultImage from "../../../shared/models/result-image.model";

let result: ApiCrestData = {
  cloudinary_public_id: "string",
  country_id: 1,
  created_by: 1,
  created_on: "string",
  description: "string",
  height: 1,
  id: 1,
  image_link: "/src/shared/assets/backgrounds/fc-barcelona.svg",
  image_transparent: true,
  image_vector: true,
  last_updated_by: 1,
  last_updated_on: "string",
  name: "Barcelona",
  place: "Barcelona",
  revision: null,
  user_id: 1,
  width: 1,
};

let result2: ApiCrestData = {
  cloudinary_public_id: "string",
  country_id: 1,
  created_by: 1,
  created_on: "string",
  description: "string",
  height: 1,
  id: 1,
  image_link: "/src/shared/assets/backgrounds/madrid-cf.svg",
  image_transparent: true,
  image_vector: true,
  last_updated_by: 1,
  last_updated_on: "string",
  name: "Barcelona",
  place: "Barcelona",
  revision: null,
  user_id: 1,
  width: 1,
};
const length = 20;
const getResults = (): ApiCrestData[] => {
  let res: ApiCrestData[] = [];
  for (let i = 0; i < length; i++) {
    let result = { ...result2 };
    result.id = i;
    res.push(result);
  }
  res[0] = result;
  return res;
};
let results: ApiCrestData[] = getResults();

export default results;
