import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public customerForm: FormGroup

  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.customerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: '',
      email: ''
    })
  }

  populateData(){
    this.customerForm.setValue({
      firstname: "Jeban",
      lastname: "Antony",
      email: "antonyjeban@gmail.com"
    })
  }

  // private addressMask(value) {
  //       if(!_.isString(value) || !value.length) {
  //           return false;
  //       }
  //       const totalArr = new Array(value.length);
  //       const maskArr = _.map(totalArr, () => [/^(?!\s)[a-z0-9A-Z\s\/\\-]*((?!\s).|^)$/]);
  //       return maskArr;
  //   }
}
