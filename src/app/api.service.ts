import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public cartLength: Subject<any> = new Subject() 

  

  getAllFoods() {
   return this.http.get("https://restaurant.stepprojects.ge/api/Products/GetAll")
  }

  getCategories() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  }

  getFoodByCategory(id: number) {
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
  }

  getFoodsByFilter(veg:string, nuts: string, spic:any) {
    return this.http.get(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${veg}&nuts=${nuts}&spiciness=${spic}`)
  }

  postFood(body: any) {
   return this.http.post("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", body)
  }

  getCartList() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  }

  deleteItem(id: number) {
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`)
  }
  updateCart(body: any) {
    return this.http.put("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", body)
  }
  
}
