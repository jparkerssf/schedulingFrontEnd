/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import {SchedulerService} from '../scheduler.service';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {
 
//Array to hold all published and unpublished time slots    
slotsArray = [];  

timeSlot = {
    
    startTime: ' ',
    endTime:' ',
    month:' ',
    day: '',
    cartName:' ',
    location:' ',
    published:false,
    booked:false,
    publisher :  {userName:"jadon",id:123 },
    

}

//variables we will databind to then post the time slot
startTime:string;
endTime:string;
month:string;
cartName:string;
  cartLocation:string;
day:string;
locationName:string;



cartsArray = [];

//We push all the current locations into this array upon entering the page
locationsArray = [];

    constructor(private schedulerService: SchedulerService) {
        
         //Call our api to initialize all the carts
      this.schedulerService.getCarts()
      .subscribe(
        (carts) => {
          
            this.cartsArray = carts;
            console.log("We got the carts back",this.cartsArray);
          
        },  (error) => {
          
           console.log("There was an error getting the cart locations", error);
        }
     )
     
      //On initaliazation we need to get all of the locations to display in the template
  this.schedulerService.getLocation()
  .subscribe(
      (locations) =>  {
         console.log("locations",locations);
         this.locationsArray = locations;
         console.log("locations array", this.locationsArray)
      }
    )
  

     
    
         //On entering page we need to get all the created time slots
         this.schedulerService.getSlots()
         .subscribe(
                (data) => {
                     console.log("we got some time slots", data);
                        this.slotsArray = data;
                       console.log("slots array", this.slotsArray);
                }
            )
        }//end of constructor function
    
    
    //method to update the slot and book the selected record
    bookSlot(timeSlot) {
          
            //We need to set the booked value to false and send the updated object to the server
            timeSlot.booked  = true;
            this.schedulerService.updateSlot(timeSlot)
            .subscribe(
                (data) =>  {
                        
                        console.log("the selected slot was updated and booked", data);

                    }
                )
            }
            
    //Create new time slots
    createSlot() {
        
        this.timeSlot.startTime = this.startTime;
        this.timeSlot.endTime =this.endTime;
        this.timeSlot.month = this.month;
        this.timeSlot.cartName = this.cartName;
        this.timeSlot.location = this.cartLocation;
        this.timeSlot.day = this.day;
        this.schedulerService.createSchedule(this.timeSlot)
        .subscribe(
            (data) => {
                
                console.log("A shift was created", data);
                 window.location.reload(); 

            }
            
        )
    }
    
    //We need a method to remove the shifts    
    removeShift(slotID) {
      
        
    
        this.schedulerService.deleteSlot(slotID)
         .subscribe(
                (data)=> {
                    
                    console.log("A shift got deleted", data);
                    window.location.reload(); 

                }
           )
         
    } ///end of removeShift method         
    
    
    //A method to be able to publish the slot selected
    
    publishSlot(slot){
        
         slot.published  = true;
            this.schedulerService.updateSlot(slot)
            .subscribe(
                (data) =>  {
                        
                        console.log("the selected slot was updated and published", data);

                    }
                )
        
    }
    
    
    

}//End of class
