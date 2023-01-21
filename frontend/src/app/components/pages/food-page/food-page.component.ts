import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { FoodInterface } from 'src/app/shared/types/food.interface';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {

  food!:FoodInterface

  constructor(activatedRoute:ActivatedRoute,private foodService:FoodService){
    activatedRoute.params.subscribe((params) => {
      if(params["id"])
      this.food = foodService.getFoodById(params["id"])
    })
  }

}
