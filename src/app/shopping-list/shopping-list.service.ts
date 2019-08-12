import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChange = new Subject<Ingredients[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Thyme', 6)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredients){
        this.ingredients.push(ingredient)
        this.ingredientsChange.next(this.ingredients.slice());  
    }
    addIngredients(ingredients: Ingredients[]) {
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChange.next(this.ingredients.slice())
    } 
    getIngredient(index: number) {
        return this.ingredients[index]
    }

    deleteIngredients(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredients) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChange.next(this.ingredients.slice())
    }
}