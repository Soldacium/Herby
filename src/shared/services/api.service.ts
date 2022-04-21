import { ref, Ref, watch } from "vue";
import ResultImage from "../models/result-image.model";
import Notification from "../models/notification.model";
import ApiResponse from "../models/api-response.model";
import ApiCrestData from "../models/api-crest-data.model";
import UploadCrestData from "../models/crest-upload-data.model";
import CrestUploadData from "../models/crest-upload-data.model";
import Variant from "../models/crest-variant.model";
import CloudinaryResponse from "../models/cloudinary-response.model";

interface VariantUploadData {
  email: string;
  name: string;
  country_id: number;
  place: string;
  image_link: string;
  image_link2: string;
  cloudinary_public_id: string;
  description: string;
  id: string | number;
}

class ApiService {
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

  public static getSearchedCrests(query: string): Promise<ApiCrestData[]> {
    return fetch(
      `https://api.echosport.mobi/?component=SportLogoPublic&action=list&search=${query}`,
      {
        method: "GET",
      }
    )
      .then((response) => <Promise<ApiResponse>>response.json())
      .then((data) => data.data);
  }

  // id is just a number, but it's converted to string anyways
  public static getSingleCrest(
    crestId: number | string
  ): Promise<ApiCrestData | null> {
    return <Promise<ApiCrestData>>fetch(
      `https://api.echosport.mobi/?component=SportLogoPublic&action=get&logo_id=${crestId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data: ApiResponse) => data.data);
  }

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

    crestData.id
      ? Object.defineProperty(crestToUpload, "id", crestData.id)
      : "";
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

  public static uploadCrestVariants(
    variants: Variant[],
    originalCrest: ApiCrestData,
    email: string,
    loadingStates: Ref<{ vector: number; other: number }[]>,
    uploaded: Ref<boolean>
  ) {
    // const loadingStates: Ref<{ vector: number; other: number }[]> = ref([]);
    // const uploaded: Ref<boolean> = ref(false);
    variants.forEach(async (variant, i) => {
      const loadingState = {
        vector: 0,
        other: 0,
      };
      loadingStates.value[i] = loadingState;
      const progressVector = (progress: number) => {
        loadingState.vector = progress;
      };

      const progressOther = (progress: number) => {
        loadingState.other = progress;
      };

      let resV: CloudinaryResponse | undefined;
      let resO: CloudinaryResponse | undefined;
      if (variant.fileVector)
        await this.uploadFile(variant.fileVector, progressVector).then(
          (res) => (resV = res)
        );
      if (variant.fileNormal)
        await this.uploadFile(variant.fileNormal, progressOther).then(
          (res) => (resO = res)
        );

      const variantData: VariantUploadData = {
        email: email,
        name: variant.variantName,
        country_id: originalCrest.country_id,
        place: originalCrest.place,
        image_link: resV
          ? resV.image_link
          : (resO as CloudinaryResponse).image_link,
        image_link2: resO && resV ? resO.image_link : "",
        cloudinary_public_id: resV
          ? resV.cloudinary_public_id
          : (resO as CloudinaryResponse).cloudinary_public_id,
        description: variant.variantDescription,
        id: originalCrest.id,
      };

      this.uploadCrestVariant(variantData).then((res) => {
        uploaded.value = true;
      });
    });
    //return {loading: loadingStates, uploaded: uploaded};
  }

  public static uploadCrestVariant(
    variantData: VariantUploadData
  ): Promise<ApiCrestData> {
    return <Promise<ApiCrestData>>fetch(
      "https://api.echosport.mobi/?component=SportLogoPublic&action=new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variantData),
      }
    ).then((response) => response.json());
  }

  private static uploadFile(
    file: File,
    progress: (number: number, ...args: any[]) => any = () => {},
    folder = "logo"
  ): Promise<CloudinaryResponse> {
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
}

export { ApiService };
