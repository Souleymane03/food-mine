import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { FoodInterface } from '../shared/types/food.interface';
import { TagInterface } from '../shared/types/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():FoodInterface[]{
    return sample_foods
  }

  getAllFoodsBySearchTerm(searchterm:string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchterm.toLowerCase()))
  }

  getAllTags():TagInterface[]{
    return sample_tags
  }

  getAllFoodsByTag(tag:string):FoodInterface[]{
    return tag === "All" ?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag))
  }

  getFoodById(foodId:string):FoodInterface{
    return this.getAll().filter(food => food.id === foodId)[0] ?? new FoodInterface()
  }
}
