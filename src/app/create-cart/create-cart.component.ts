import { Component, OnInit } from '@angular/core';
import {SchedulerService} from '../scheduler.service';

@Component({
  selector: 'app-create-cart',
  templateUrl: './create-cart.component.html',
  styleUrls: ['./create-cart.component.scss']
})
export class CreateCartComponent implements OnInit {

constructor(private schedulerService: SchedulerService) { }
  
  //variables(location name and address) to bind data to to post our location information
name:string;
address:string;

//We push all the current locations into this array upon entering the page
locationsArray = [];

//We need an object to post our data to
 location = {
    locationName:'',
    locationAddress: ' '
     
  }


  ngOnInit() {
  //On initaliazation we need to get all of the locations to display in the template
  this.schedulerService.getLocation()
  .subscribe(
      (locations) =>  {
         console.log("locations",locations);
         this.locationsArray = locations;
         console.log("locations array", this.locationsArray)
      }
    )
  }
  
//method to create new locations
locationCreate(){
  
  this.location.locationName = this.name;
  this.location.locationAddress = this.address;
   ///post the location
  this.schedulerService.createLocation(this.location)
   .subscribe( 
        (data)  =>  {
            console.log("data was posted", data);
            window.location.reload(); 
       }
   )
    //reload the page after creating a new location
    
}//end of location create method



//Method to delete locations
deleteLocation(location) {
    
    this.schedulerService.deleteLocation(location.id)
    
    .subscribe ( 
        (deletedLocation) => {
              console.log("deleted location", deletedLocation)
                window.location.reload();
         }
      )
}///end of delete location method




}//Class ends here
