export default interface ApiCrestData {
  cloudinary_public_id: string;
  country_id: number;
  created_by: number;
  created_on: string;
  description: string;
  height: number;
  id: number;
  image_link: string;
  image_link2?: string;
  image_link3?: string;
  image_transparent: boolean;
  image_vector: boolean;
  last_updated_by: number;
  last_updated_on: string;
  name: string;
  place: string;
  revision: any | null;
  user_id: number;
  width: number;
}
