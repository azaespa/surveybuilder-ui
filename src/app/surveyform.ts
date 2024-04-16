export interface Surveyform {
  id?: string;
  surveyFormId?: string;
  surveyFormName?: string;
  questionForm: [{ answerType: string; question: string }];
}
