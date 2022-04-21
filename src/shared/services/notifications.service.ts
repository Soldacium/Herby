import { ref, Ref, watch } from "vue";
import ResultImage from "../models/result-image.model";
import Notification from "../models/notification.model";

class NotificationsService {
  public static message: Ref<Notification> = ref(<Notification>{
    message: "",
    title: "",
    type: "error",
  });

  public static sendNotification(notification: Notification) {
    this.message.value = notification;
  }
}

export { NotificationsService };
