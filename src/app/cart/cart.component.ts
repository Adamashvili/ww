import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  getProduct() {
    throw new Error('Method not implemented.');
  }
  apiServ: any;
  constructor(public service: ApiService, private toast: NgToastService) {}
  ngOnInit(): void {
   this.showCartList()
  }

  
  public cartList:any


  showCartList() {
    this.service.getCartList().subscribe((data:any) => {
      console.log(data);
      this.cartList = data;
      
      this.globalprice()
    })
  }

  deleteMyItem(cartId: number) {
    this.service.deleteItem(cartId).subscribe({
      next: () => {
        this.showCartList()
     this.service.getCartList().subscribe((data:any) => {
        this.service.cartLength.next(data.length)
     })
        this.toast.success({detail:"SUCCESS",summary:'წარმატებით წაიშალა ✅ !',duration:3000})
      },
      error: () => {
        alert("Error!!!")
      },
    })
  }

  increaseItem(item: any) {
    item.quantity++;
    this.globalprice()

    this.apiServ.updateCart({
      quantity: item.quantity,
      price: item.product.prie,
      productId: item.product.id,
    }).subscribe();
  }

  decreaseItem(item:any) {
    if(item.quantity >= 2) {
      item.quantity--
      this.globalprice()
      this.apiServ.updateCart({
        quantity: item.quantity,
        price: item.product.prie,
        productId: item.product.id,
      }).subscribe();
    } else {
      this.toast.error({detail:"ERROR",summary:'WRONG COMMAND'});
    }
  }

  public totalPrice: number = 0;
  globalprice(){
   this.totalPrice = 0;
  this.cartList.forEach((item:any)=> {
   this.totalPrice += item.product.price * item.quantity ;
 
  })
  }
}