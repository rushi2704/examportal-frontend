import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionOfQuiz(qid:any)
  {
  return   this._http.get(`${baseUrl}/question/quizz/all/${qid}`);
  }

  // add question 

  public addQuestion(question:any)
  {
    return this._http.post(`${baseUrl}/question/`,question)
  }

  // update questiion
  public updateQuestion(question:any)
  {
    return this._http.put(`${baseUrl}/question/`,question)
  }

  // get single question
  public getQuestionOfQuizz(qid:any)
  {
  return   this._http.get(`${baseUrl}/question/${qid}`);
  }

  // delete question by que id
  public deleteQuestion(questionid:any) 
  {
    return this._http.delete(`${baseUrl}/question/${questionid}`);
  }

  // get single question
  public getQuestionOfQuizzForTest(qid:any)
  {
  return   this._http.get(`${baseUrl}/question/quizz/${qid}`);
  }

  //eval quiz
  public evalQuiz(questions:any)
  {
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions)
  }
}
