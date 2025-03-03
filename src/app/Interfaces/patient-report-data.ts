import { AssessmentInfo } from "./assessment-info"
import { Country } from "./country"
import { PainScale } from "./pain-scale"
import { PatientAdditionalInfo } from "./patient-additional-info"
import { PatientHistory } from "./patient-history"
import { PatientInfo } from "./patient-info"
import { PatientInitialVitals } from "./patient-initial-vitals"
import { PatientVitals } from "./patient-vitals"

export interface PatientReportData {

AssessmentInfo:AssessmentInfo,
Country:Country,
CountrycurrentPage:number,
PermanentDiseases:string[]
Symptoms:string[],
additionalPatientInfo:PatientAdditionalInfo ,
lang:string, 
language: string,
painScale:PainScale
painedParts:number[],
patientHistory:PatientHistory
patientInfo:PatientInfo,
patientInitialVitals:PatientInitialVitals,
patientVitals:PatientVitals,
[key: string]: any;
}
