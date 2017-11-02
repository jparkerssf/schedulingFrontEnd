import { Component, OnInit } from '@angular/core';
import {SchedulerService} from '../scheduler.service';


@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {
  
  
  
//variables(location name and address) to bind data to to post our cart information
name:string;

//We push all the current locations into this array upon entering the page
cartsArray = [];






//We need an object to post our data to
cart = {
    cartName:''
  }





  constructor(private schedulerService:SchedulerService) { }

  ngOnInit() {
    
      //Call our api to initialize all the carts
      this.schedulerService.getCarts()
      .subscribe(
        (carts) => {
          
            this.cartsArray = carts;
          
        },  (error) => {
          
           console.log("There was an error getting the cart locations", error);
        }
     )
    
    
  }


//method to create new carts
createCart(){
  
  this.cart.cartName = this.name;
   ///post the location
  this.schedulerService.addCart(this.cart)
   .subscribe( 
        (data)  =>  {
          console.log("data was posted", data);
          window.location.reload(); 
       }, (error) => {
         
        console.log("There was an error", error);
       }
    )
    //reload the page after creating a new location
    
}//end of create carts method



deleteCart(cart) {
    
    this.schedulerService.deleteCart(cart.id)
    
    .subscribe ( 
        (deletedCart) => {
              console.log("deleted a cart", deletedCart)
                window.location.reload();
         }
      )
}///end of delete carts method





}//end of class
