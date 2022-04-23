import { ref, Ref, watch } from "vue";
import ResultImage from "../models/result-image.model";
import Notification from "../models/notification.model";
import deburr from "lodash.deburr";
import ApiCrestData from "../models/api-crest-data.model";
import { v4 as uuidv4 } from "uuid";

// dont need class
class UtilsService {
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

  public static getNormalizedString(str: string): string {
    return deburr(str);
  }

  public static getCrestUrl(crest: ApiCrestData) {
    return deburr(`/details/${crest.id}/${crest.name.replace(" ", "-")}`);
  }

  public static getUniqueId() {
    return uuidv4();
  }

  public static getPropByString(obj: any, propString: string) {
    if (!propString) return obj;

    var prop,
      props = propString.split(".");

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];

      var candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }
    return obj[props[i]];
  }
}

export { UtilsService };
