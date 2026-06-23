import { CVData } from "./types";
import cvDataJson from "../public/cv_data.json";

export const initialCVData: CVData = cvDataJson as unknown as CVData;
