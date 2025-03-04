
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiveTranslationsService {

textsToTranslate: string[] = [
  // Patient Information
  "Patient Info", "Name", "Patient Name", "Name is required", "Minimum 3 characters required",
  "Age", "Patient Age", "Age is required", "Must be a number", "Min Allowed Age is 1", "Max Allowed Age is 100",
  "Gender", "Must Choose a gender", "Change Gender",

  // Vitals
  "Patient Initial Vitals", "patient's vital signs",
  "Weight", "Height", "Blood Pressure", "Oxygen Rate", "Blood Sugar", "Heart Rate", "Breathe Rate", "Temperature",

  // Symptoms
  "Do you have any of the following symptoms?",
  "Armache", "Back Pain", "Vomit", "Toothache", "Diabetic", "Dizziness", "Sneezing", "Eye Pain",
  "Pulse Measurement", "Nausea", "Allergy", "Hand Ache", "Weight Scale", "Stomach Pain",
  "Heart Rate", "Heart Attack", "Shoulder Pain", "Temperature","Dizznies","Pulse Measurment","Heart Rate","HandAche",
  "Blood_Pressure","Breathe_Rate","Blood_Sugar",

  // Pain Assessment
  "How strong is your pain?", "no Pain", "mild", "moderate", "severe", "very Severe", "worst Pain",
  "Identify areas of pain","Do yoy have any of the following symptoms ?","Do you any allergy ?",
  "Do you have any permanent diseases ?","Do you have any Infectious diseases ?",

  // Chronic Diseases & Conditions
  "Identify your chronic diseases", "Permanent Diseases", "More Details",
  "Do you have any allergy?", "Yes", "No", "Has Allergy",
  "Do you have any permanent diseases?", "Permanent Condition",
  "Do you have any infectious diseases?", "Contagious Condition","optional","required","Must be Number",

  // Female-Specific Questions
  "Are you pregnant?", "Pregnancy Status","Are you pregnent ?","Do you have female period ?",
  "Do you have female period?", "In Period",

  // Additional Patient Information
  "Additional Patient Info", "Additional Information", "Optional",

  // Case Evaluation & Examination
  "Case evaluation information",
  "Examiner Name", "Examination Location", "Treatment Location",
  "Examination Location is required", "At Examination Point", "Nearest Medical Center", "Nearest Hospital",
  "Patient Report", "Examination Result", "Date","Choose your Country","Search By Name",

  // Pain Duration & Timing
  "Pain Duration", "How long has this been troubling you?",
  "From Morning", "From Evening", "Less than 24 hours",
  "After taking the treatment", "After eating", "2 hours ago", "4 hours ago",

  // Meal Timing
  "When was your last meal?", "More than 4 hours", "More than 12 hours",

  // Prescription & Medical History
  "Presubscribed Medications", "Patient History",
  "Last Meal Time", "Prescription", "Symptoms", "More Info",
  "How long has this been troubling you ?","When was your last meal ?",
  "More Than 12 Hours","More Than 4 Hours","Case evaluation","How strong is your pain ?",
    // Button Name
    "Done","Finish & Save","Back","Next","Previous"
    ,'Please Choose your Language' ,'Language','Choose a Language','Choose Country','No Countries Matched for this value :' ,

    'Patient Pain Level',"Patient's vital signs","yes",'no',

    'years Old'

];
  constructor(private http: HttpClient, private __TranslateService: TranslateService) {}

  translateText(text: string, targetLang: string): Observable<string> {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    return this.http.get<any>(url).pipe(
      map((response) => response[0][0][0]) // Extract translated text
    );
  }

  translateTexts(texts: string[], targetLang: string): Observable<{ [key: string]: string }> {
    const requests = texts.map(text => {
      if (!text.trim()) {
        return of(''); // If text is empty, return empty string
      }

       const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      return this.http.get<any>(url).pipe(
        map(response => {
          // Validate response structure
          if (response && Array.isArray(response) && response[0] && Array.isArray(response[0]) &&
              response[0][0] && Array.isArray(response[0][0]) && response[0][0][0]) {
            return response[0][0][0]; // Extract translated text
          } else {
            // console.error('Unexpected API response format:', response);
            return 'Translation error'; // Fallback text
          }
        }),
        catchError(error => {
          console.error('Translation API error:', error);
          return of('Translation error'); // Handle error and return a default message
        })
      );
    });

    return forkJoin(requests).pipe(
      map((translations: string[]) => {
        const translationMap: { [key: string]: string } = {};
        texts.forEach((text, index) => {
          translationMap[text] = translations[index] || 'Translation error';
        });
        return translationMap;
      })
    );
  }
 

  setTranslations(lang: string, translations: { [key: string]: string }) {
    this.__TranslateService.setTranslation(lang, translations, true); // Merges translations
    this.__TranslateService.use(lang);
  }

   loadTranslations(lang: string) {
    this.translateTexts(this.textsToTranslate, lang).subscribe(translations => {
      this.setTranslations(lang, translations);
    });
  }

}
