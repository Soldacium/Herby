export default interface Notification {
  title: string;
  message: string;
  type: "error" | "warning" | "success" | "information";
}
