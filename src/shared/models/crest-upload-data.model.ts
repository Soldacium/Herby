export default interface CrestUploadData {
  fileVector?: File;
  fileOther?: File;
  email: string;
  name: string;
  country_id: number; // 2
  place: string;
  description: string;
  id?: number | string;
}
