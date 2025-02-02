import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor(private http:HttpClient) { }

  public quizzes()
  {
    return this.http.get(`${baseUrl}/quizz/`);
  }

  public addQuiz(quiz:any)
  {
    return this.http.post(`${baseUrl}/quizz/`,quiz);
  }

  // delete quiz
  public deleteQuiz(qId:any)
  {
    return this.http.delete(`${baseUrl}/quizz/${qId}`);
  }

  // get a single quizz
  public getQuiz(qId:any)
  {
    return this.http.get(`${baseUrl}/quizz/${qId}`);
  }

  // update quiz
  public updateQuiz(quiz:any)
  {
    return this.http.put(`${baseUrl}/quizz/`,quiz);
  }

  // get quizzes of category
  public getQuizzesOfCategory(cid:any)
  {
    return this.http.get(`${baseUrl}/quizz/category/${cid}`);
  }

  //get active quizz
  public getActiveQuizzes()
{
    return this.http.get(`${baseUrl}/quizz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid:any)
  {
    return this.http.get(`${baseUrl}/quizz/category/active/${cid}`);
  }
}
