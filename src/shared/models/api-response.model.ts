import ApiCrestData from "./api-crest-data.model";

export default interface ApiResponse {
  appVersion: string;
  authorizationRequired: boolean;
  data: [ApiCrestData];
  logged: boolean;
  message: string;
  success: boolean;
  totalCount: number;
  transactionId: string;
}
