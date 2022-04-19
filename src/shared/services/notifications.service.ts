import { ref, Ref, watch } from "vue";
import ResultImage from "../models/result-image.model";
import Notification from "../models/notification.model";

class NotificationsService {
  // static savedCrestsKey = "imagesKey";
  // private iterationsKey = "iterations";

  // static localStorage = localStorage;
  // static crests: Ref<ResultImage[]> = ref([]);

  // setup empty key: values if not already present
  constructor() {
    // SavedCrestsService.crests.push = function() { Array.prototype.push.apply(this, arguments);  processQ();};
    /*
    if (this.getIterationsNumbers() == null) {
      localStorage.setItem(this.iterationsNumbersKey, JSON.stringify([]));
    }
    */
  }
  public static message: Ref<Notification> = ref({
    message: "",
    title: "",
    type: "error",
  } as Notification);

  public static sendNotification(notification: Notification) {
    this.message.value = notification;
  }
}

export { NotificationsService };
