import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
 
constructor (public api: ApiService,public loading: NgxSpinnerService){}
 
  
ngOnInit(): void {
  this.getBusketItems();
  this.api.cartLength.subscribe(data => {
    console.log(data);
    this.basketLenght = data;
    console.log(this.basketLenght);
  })
}



public basketLenght: any;

getBusketItems(){
  this.api.getCartList().subscribe(
    (data:any) => {
      
      this.basketLenght = data.length;
      console.log(this.basketLenght);
      
      
    }
  )
}
}
