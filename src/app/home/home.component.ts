import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgToastService } from 'ng-angular-popup';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [NavbarComponent]
})
export class HomeComponent implements OnInit {
  constructor(public apiServ: ApiService, private toast: NgToastService, public loading: NgxSpinnerService) {}
  ngOnInit(): void {
    this.showAllFoods();
    this.showCategories();
    this.loading.show();
    setTimeout(()=>{
      this.loading.hide()
    },1500)
  }

  public foodList: any;
  public categories: any;
  public exactFood!: number;
  public spicIndex: string = '';
  public nutsIndex: string = '';
  public vegetarianIndex: string = '';
 

  showCategories() {
    this.apiServ.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  filterByCategory(foodId: number) {
    this.exactFood = foodId;
    this.apiServ.getFoodByCategory(foodId).subscribe((data: any) => {
      console.log(data.products);
      this.foodList = data.products;
    });
  }

  filterByInputs() {
    this.apiServ
      .getFoodsByFilter(this.vegetarianIndex, this.nutsIndex, this.spicIndex)
      .subscribe((data) => {
        this.foodList = data;
      });
  }


  showAllFoods() {
    this.exactFood = 0;
    this.apiServ.getAllFoods().subscribe((data) => {
      this.foodList = data;
    });
  }

  addToCart(foodId: number, foodPrice: string) {
    
    let userPrompt = Number(prompt("Enter Quantity")) 
    this.apiServ.postFood({
      quantity: userPrompt,
      price: foodPrice,
      productId: foodId,
    }).subscribe({
      next: () => {
       
        this.toast.success({detail:"SUCCESS",summary:'წარმატებით დაემატა კალათაში ✅',duration: 3000});
        this.apiServ.getCartList().subscribe((data:any) => {
          console.log(data.length);
          this.apiServ.cartLength.next(data.length)
          
        })
      },
      error: () => {
        alert("Some error happened!!!")
      }
    });
  }
}