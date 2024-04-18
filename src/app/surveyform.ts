export interface Surveyform {
  id?: string;
  surveyFormId?: string;
  surveyFormName?: string;
  questionForms: [{ answerType: string; question: string }];
}
