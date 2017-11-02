import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";


@Injectable()
export class SchedulerService {
  
    //endpoint for interacting with locations
   locationUrl:string ='https://scheduling-app-jadtheparker.c9users.io:8080/api/locations';
   
   //This api endpoint is the locations that individuals can be scheduled   
   timeSlotUrl:string = "https://scheduling-app-jadtheparker.c9users.io:8080/api/timeSlots";
   
   //This is the endpoint for interacting with cart locations
   cartUrl:string = "https://scheduling-app-jadtheparker.c9users.io:8080/api/carts";
   
  constructor(public http: Http) { }
  
  //
  getLocation() {
        return this.http.get(this.locationUrl)
           .map(res =>res.json())
  }
 
  createLocation (location)  {
      return this.http.post(this.locationUrl,location)
      .map(res => res.json());
  }
  
  //we need to be able to delete locations
  deleteLocation(locationId) {
      return this.http.delete(this.locationUrl + "/"  + locationId)
       .map( res=> res.json());
      
  }
  
  createSchedule (slot) {
      
      return this.http.post(this.timeSlotUrl,slot)
        .map( res=> res.json());
  }
  //Get all slots that are available, including published and non published
  getSlots()  {
      
       return this.http.get(this.timeSlotUrl)
       .map(res => res.json());
      
  }
  //Only retrieve the time slots that were not booked
    getOpenSlots()  {
      
       return this.http.get(this.timeSlotUrl + "?filter[where][published]=true")
       .map(res => res.json());
      
  }
  
  //We need to update various slots information  to book them and change booked value to false
  updateSlot (slot)   {
      return this.http.put(this.timeSlotUrl, slot)
      .map( res=> res.json());
  }
  
  
  //We need a method to delete the slot
  deleteSlot(slotId) {
      
    return this.http.delete(this.timeSlotUrl + "/" + slotId)
    .map(res=> res.json());
      
  }
  
  
   getCarts() {
     
    return this.http.get(this.cartUrl)
    .map(res=> res.json());
      
  }
  
   addCart(cart) {
     
    return this.http.post(this.cartUrl,cart)
    .map(res=> res.json());
      
  }
  
  
  
  //we need to be able to delete locations
  deleteCart(cartId) {
      return this.http.delete(this.cartUrl + "/"  + cartId)
       .map( res=> res.json());
      
  }
  
  
  
}
