import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { FoodInterface } from '../shared/types/food.interface';
import { TagInterface } from '../shared/types/tag.interface';
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

  getAll():Observable<FoodInterface[]>{
    return this.http.get<FoodInterface[]>(FOODS_URL)
  }

  getAllFoodsBySearchTerm(searchterm:string){
    return this.http.get<FoodInterface[]>(FOODS_BY_SEARCH_URL+searchterm)
  }

  getAllTags():Observable<TagInterface[]>{
    return this.http.get<TagInterface[]>(FOODS_TAGS_URL)
  }

  getAllFoodsByTag(tag:string):Observable<FoodInterface[]>{
    return this.http.get<FoodInterface[]>(FOODS_BY_TAG_URL+tag)
  }

  getFoodById(foodId:string):Observable<FoodInterface>{
    return this.http.get<FoodInterface>(FOODS_BY_ID_URL+foodId)
  }
}
