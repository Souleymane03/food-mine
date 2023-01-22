import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FoodService} from 'src/app/services/food.service';
import {FoodInterface} from 'src/app/shared/types/food.interface';
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: FoodInterface[] = []

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<FoodInterface[]>;
    activatedRoute.params.subscribe((params) => {
      if (params["searchTerm"])
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params["searchTerm"])
      else if (params['tag'])
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag'])
      else
        foodsObservable = this.foodService.getAll()

      foodsObservable.subscribe((foodFromServer) =>{
        this.foods = foodFromServer
      })
    })
  }

  ngOnInit(): void {
  }

}
