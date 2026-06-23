import { CVData } from "./types";
import cvDataJson from "./cv_data.json";

export const initialCVData: CVData = cvDataJson as unknown as CVData;
