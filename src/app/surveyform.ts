export interface Surveyform {
  id?: string;
  surveyFormName?: string;
  questionForms: [
    {
      id?: string;
      answerType: string;
      question: string;
    }
  ];
}

export interface Questionform {
  id?: string;
  answerType: string;
  question: string;
}
