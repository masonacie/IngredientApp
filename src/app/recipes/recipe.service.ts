import { Injectable, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChange = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Creamy Chicken',
    //      'Allow the creaminess',
    //     'https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
    //     [
    //         new Ingredients('Chicken', 2),
    //         new Ingredients('Rice', 1),
    //         new Ingredients('Broccoli', 2),
    //         new Ingredients('Creamy Campbells Soup', 1)
    //     ]),
    //     new Recipe('Honey Glazed Shrimp',
    //      'Shrimp w/ Honey',
    //     'https://shewearsmanyhats.com/wp-content/uploads/2015/10/garlic-shrimp-recipe-1b-480x270.jpg',
    //     [
    //         new Ingredients('Shrimp', 2),
    //         new Ingredients('Butter', 1),
    //         new Ingredients('Honey', 2),
    //         new Ingredients('Southern Shrimp Seasoning', 1)
    //     ])
    //   ];
      private recipes: Recipe[] = [];


      constructor(private shoppingList: ShoppingListService) {}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChange.next(this.recipes.slice())
      }
    
      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredients[]) {
        this.shoppingList.addIngredients(ingredients)
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChange.next(this.recipes.slice())
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChange.next(this.recipes.slice())
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChange.next(this.recipes.slice());
      }
}