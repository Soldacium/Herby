import { ref, Ref, watch } from "vue";
import ApiCrestData from "../models/api-crest-data.model";
import ResultImage from "../models/result-image.model";

class SavedCrestsService {
  static savedCrestsKey = "imagesKey";
  // private iterationsKey = "iterations";

  static localStorage = localStorage;
  static crests: Ref<ApiCrestData[]> = ref([]);

  // setup empty key: values if not already present
  constructor() {
    // SavedCrestsService.crests.push = function() { Array.prototype.push.apply(this, arguments);  processQ();};
    /*
    if (this.getIterationsNumbers() == null) {
      localStorage.setItem(this.iterationsNumbersKey, JSON.stringify([]));
    }
    */
  }

  private static _initialize = (() => {
    watch(SavedCrestsService.crests.value, (newCrests, oldCrests) => {
      console.log(newCrests);
      this.updateLocalStorage();
    });

    if (!localStorage.getItem(SavedCrestsService.savedCrestsKey)) {
      SavedCrestsService.updateLocalStorage();
    } else {
      SavedCrestsService.crests.value = this.getSavedCrests();
      // console.log(SavedCrestsService.crests.value, this.getSavedCrests());
    }
  })();

  public static getSavedCrests(): ApiCrestData[] {
    SavedCrestsService.crests.value = JSON.parse(
      localStorage.getItem(SavedCrestsService.savedCrestsKey) as string
    ) as ApiCrestData[];
    return SavedCrestsService.crests.value;
  }

  public static saveCrest(crest: ApiCrestData): void {
    SavedCrestsService.crests.value.push(crest);
  }

  public static unsaveCrest(crest: ApiCrestData): void {
    const index = SavedCrestsService.crests.value.indexOf(crest);
    SavedCrestsService.crests.value.splice(index, 1);
  }

  public static updateLocalStorage(): void {
    localStorage.setItem(
      SavedCrestsService.savedCrestsKey,
      JSON.stringify(SavedCrestsService.crests.value)
    );
  }
}

export { SavedCrestsService };

/*
  private getIterationKey(iterationNumber: number): string {
    return "iteration" + iterationNumber;
  }

  private getIterationsNumbers(): number[] {
    return JSON.parse(
      localStorage.getItem(this.iterationsNumbersKey) as string
    ) as number[];
  }

  changeIterationsNumbers(interationNumber: number, mode: "delete" | "add") {
    const iterations = this.getIterationsNumbers();
    if (mode === "delete") {
      iterations.splice(iterations.indexOf(interationNumber), 1);
    } else {
      iterations.push(interationNumber);
    }
    console.log(iterations);
    localStorage.setItem(this.iterationsNumbersKey, JSON.stringify(iterations));
  }

  getAllIterations(): ResultImage[] {
    const iterationsNumbers = this.getIterationsNumbers();
    const iterations: ResultImage[] = [];
    iterationsNumbers.forEach((number) => {
      const iteration = JSON.parse(
        localStorage.getItem(this.getIterationKey(number)) as string
      ) as ResultImage;
      iterations.push(iteration);
    });
    return iterations;
  }

  saveIteration(iteration: ResultImage): ResultImage {
    localStorage.setItem(
      this.getIterationKey(iteration.number),
      JSON.stringify(iteration)
    );
    this.changeIterationsNumbers(iteration.number, "add");
    console.log(this.getIteration(iteration.number), this.getAllIterations());
    return iteration;
  }

  editIteration(iteration: ResultImage): ResultImage {
    localStorage.setItem(
      this.getIterationKey(iteration.number),
      JSON.stringify(iteration)
    );
    return iteration;
  }

  getIteration(number: number): ResultImage {
    return JSON.parse(
      localStorage.getItem(this.getIterationKey(number)) as string
    ) as Iteration;
  }

  deleteIteration(number: number) {
    localStorage.removeItem(this.getIterationKey(number));
    this.changeIterationsNumbers(number, "delete");
  }
  */
