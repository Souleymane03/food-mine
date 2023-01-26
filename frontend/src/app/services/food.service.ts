import { Injectable } from '@angular/core';
import { FoodModel } from '../shared/types/models/food_and_tag/food.model';
import { TagModel } from '../shared/types/models/food_and_tag/tag.model';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL
} from "../shared/constants/urls";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<FoodModel[]>{
    return this.http.get<FoodModel[]>(FOODS_URL)
  }

  getAllFoodsBySearchTerm(searchterm:string){
    return this.http.get<FoodModel[]>(FOODS_BY_SEARCH_URL+searchterm)
  }

  getAllTags():Observable<TagModel[]>{
    return this.http.get<TagModel[]>(FOODS_TAGS_URL)
  }

  getAllFoodsByTag(tag:string):Observable<FoodModel[]>{
    return this.http.get<FoodModel[]>(FOODS_BY_TAG_URL+tag)
  }

  getFoodById(foodId:string):Observable<FoodModel>{
    return this.http.get<FoodModel>(FOODS_BY_ID_URL+foodId)
  }
}
