import { Component, OnInit } from '@angular/core';
import {SchedulerService} from '../scheduler.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private schedulerService:SchedulerService) { }
  
  
  
//Array to hold all published time slots    
slotsArray = [];  
  ngOnInit() {
    
    this.schedulerService.getOpenSlots()
    .subscribe( 
      (data) => {
        
          console.log("We got the open slots back from the server ", data);
          this.slotsArray = data;
        
      }, (error) =>{
        
        console.log('There was an error retreiving the requested data', error);
        
         }
      )
  }//end of onInit function

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



}//completion of class





