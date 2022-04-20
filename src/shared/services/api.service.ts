import { ref, Ref, watch } from "vue";
import ResultImage from "../models/result-image.model";
import Notification from "../models/notification.model";
import ApiResponse from "../models/api-response.model";
import ApiCrestData from "../models/api-crest-data.model";
import UploadCrestData from "../models/crest-upload-data.model";
import CrestUploadData from "../models/crest-upload-data.model";

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
  public static message: Ref<Notification> = ref(<Notification>{
    message: "",
    title: "",
    type: "error",
  });

  public static sendNotification(notification: Notification) {
    this.message.value = notification;
  }

  public static getLatestCrests(): Promise<ApiCrestData[]> {
    //<Promise<ApiCrestData[]>>
    return fetch(
      "https://api.echosport.mobi/?component=SportLogoPublic&action=list",
      {
        method: "GET",
      }
    )
      .then((response) => <Promise<ApiResponse>>response.json())
      .then((data) => data.data);
  }

  public static getSingleCrest(crestId: number) {}

  public static async uploadMainCrest(
    crestData: CrestUploadData
  ): Promise<any> {
    const crestToUpload = {
      email: crestData.email,
      name: crestData.name,
      country_id: crestData.country_id,
      place: crestData.place,
      image_link: "",
      image_link2: "",
      cloudinary_public_id: "",
      description: crestData.description,
    };
    if (crestData.fileVector) {
      await this.uploadFile(crestData.fileVector).then((uploadedFile) => {
        crestToUpload.image_link = uploadedFile.image_link;
        crestToUpload.cloudinary_public_id = uploadedFile.cloudinary_public_id;
      });
    }

    if (crestData.fileOther) {
      await this.uploadFile(crestData.fileOther).then((uploadedFile) => {
        crestToUpload.image_link
          ? (crestToUpload.image_link2 = uploadedFile.image_link)
          : () => {
              crestToUpload.image_link = uploadedFile.image_link;
              crestToUpload.cloudinary_public_id =
                uploadedFile.cloudinary_public_id;
            };
      });
    }

    fetch("https://api.echosport.mobi/?component=SportLogoPublic&action=new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crestToUpload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  public static async uploadCrestVariants(
    variants: [{ imgVector: File; imgTransparent: File }]
  ) {}

  private static uploadFile(
    file: File,
    progress: (number: number, ...args: any[]) => any = () => {},
    folder = "logo"
  ): Promise<{
    image_link: string;
    cloudinary_public_id: string;
    width: number;
    height: number;
  }> {
    let url = "https://api.cloudinary.com/v1_1/echosport/upload",
      xhr = new XMLHttpRequest(),
      fd = new FormData(),
      statusSuccess = 200,
      loaded = 100.0;

    return new Promise((resolve, reject) => {
      xhr.open("POST", url, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.upload.addEventListener("progress", (ev) => {
        let progressNumber = Math.round((ev.loaded * loaded) / ev.total);

        progress(progressNumber);
      });
      xhr.onerror = function () {
        console.warn({
          msg: "Util.Cloudinary: problem to upload image to Cloudinary",
          dump: xhr.responseText,
        });

        reject(xhr.responseText);
      };
      xhr.onload = function () {
        if (xhr.status === statusSuccess) {
          let response = JSON.parse(xhr.responseText),
            result;

          result = {
            image_link: response.secure_url,
            cloudinary_public_id: response.public_id,
            width: response.width,
            height: response.height,
          };

          resolve(result);
        } else {
          console.warn({
            msg: "Util.Cloudinary: problem to upload image to Cloudinary",
            dump: xhr.responseText,
          });

          reject(new Error(xhr.responseText));
        }
      };

      fd.append("upload_preset", "ucduyyzi");
      fd.append("folder", folder);
      fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
      fd.append("file", file);

      xhr.send(fd);
    });
  }

  /*
  private apiCrestDataListToResultImage(
    crestList: ApiCrestData[]
  ): ResultImage[] {
    const res: ResultImage[] = [];

    crestList.forEach((apiCrestData) => {
      let resultImage: ResultImage = {
        name: apiCrestData.name,
        link: string;
        id: string;
        imageTransparent: boolean;
        imageVector: boolean;
        image: string;
        image2: string;
        description: string;
      };
    });
  }
  */
}

export { NotificationsService };
