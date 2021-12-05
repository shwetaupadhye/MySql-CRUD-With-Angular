import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private api: ApiserviceService) { }
  readUser: any;
  successMsg: any;

  ngOnInit(): void {
    // this.api.getAllUser().subscribe((res) => {
    //   console.log('get all', res);
    //   this.readUser = res.data;
    // })
    this.getAlldata();
  }

  //delete Id
  deleteId(id: any) {
    //console.log(id, "selected id")
    this.api.deleteData(id).subscribe((res) => {
      console.log(res, 'deleted Id No');
      this.successMsg = res.message
      this.getAlldata();
      //Instance Load Data
      // this.api.getAllUser().subscribe((res) => {
      //   console.log('get all', res);
      //   this.readUser = res.data;
      // })
    })


  }
  getAlldata() {
    this.api.getAllUser().subscribe((res) => {
      console.log('get all', res);
      this.readUser = res.data;
    })

  }
}