import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent {
  subscribersArray: any;
  constructor(private subsServices: SubscribersService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subsServices.loadData().subscribe((val) => {
      this.subscribersArray = val;
    });
  }

  onDelete(userId:any){
    this.subsServices.deleteData(userId)
  }
}
