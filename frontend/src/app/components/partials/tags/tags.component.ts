import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { TagModel } from 'src/app/shared/types/models/food_and_tag/tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {

  tags?:TagModel[]

  constructor(foodService:FoodService){
    foodService.getAllTags().subscribe((serverTags) =>{
      this.tags = serverTags
    })
  }

}
