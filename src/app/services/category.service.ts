import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  //load all categoires on front end 

  public categories()
  {
    return this._http.get(`${baseUrl}/category/`);
  }

  // add new category to back end
  public addCategory(category: any)
  {
    return this._http.post(`${baseUrl}/category/`,category);
  }

  // delete category
  public deleteCategory(cid:any)
  {
    return this._http.delete(`${baseUrl}/category/${cid}`);
  }
}
