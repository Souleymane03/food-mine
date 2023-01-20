import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { TagInterface } from 'src/app/shared/types/tag.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {

  tags?:TagInterface[]

  constructor(foodService:FoodService){
    this.tags = foodService.getAllTags()
  }

}
