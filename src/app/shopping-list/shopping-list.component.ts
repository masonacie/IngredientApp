import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[];
  private subscription: Subscription;

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingList.getIngredients();
    this.subscription = this.shoppingList.ingredientsChange
    .subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredients = ingredients
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index) {
    this.shoppingList.startedEditing.next(index);
  }


}
