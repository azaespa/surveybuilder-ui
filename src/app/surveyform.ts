export interface Surveyform {
  id?: string;
  surveyFormName?: string;
  questionForms: Array<Questionform>;
}

export interface Questionform {
  id?: string;
  answerType: string;
  question: string;
  choicesForms?: Array<Choicesform>;
}

export interface Choicesform {
  id?: string;
  choiceLetter: string;
  choice: string;
  questionFormId: string;
}
