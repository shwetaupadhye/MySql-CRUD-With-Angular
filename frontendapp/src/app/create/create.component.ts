import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  // userform!: FormGroup

  constructor(private api: ApiserviceService, private router: ActivatedRoute) { }
  errMsg: any;
  successMsg: any;
  getParameterid: any;

  ngOnInit(): void {
    this.getParameterid = this.router.snapshot.paramMap.get('id');
    if (this.getParameterid) {
      this.api.getSingleData(this.getParameterid).subscribe((res) => {
        console.log(res, 'selected update data');
        this.userform.patchValue({
          fullname: res.data[0].fullname,
          email: res.data[0].email,
          mobile: res.data[0].mobile
        })
      })

    }
  }

  userform = new FormGroup({
    'fullname': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'mobile': new FormControl('', Validators.required)

  })
  userSubmit() {
    //console.log(this.userform.value);
    if (this.userform.valid) {
      console.log(this.userform.value);
      this.api.createData(this.userform.value).subscribe((res) => {
        console.log(res, 'Data Added')
        this.userform.reset();
        this.successMsg = res.message
      })
    }
    else {
      this.errMsg = 'All fielsd are required'
    }
  }

  //Update User
  updateUser() {
    console.log(this.userform.value);
    if (this.userform.valid) {
      this.api.updateData(this.userform.value, this.getParameterid).subscribe((res) => {
        console.log(res, 'data updated');
        this.successMsg = res.message;
      })
    } else {
      this.errMsg = 'All Fiels are Required'

    }
  }
}
