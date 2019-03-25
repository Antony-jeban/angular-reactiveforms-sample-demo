import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

function emailValidation(c: AbstractControl): {[key: string]:  boolean} | null{
  const email = c.get('email')
  const reenter = c.get('reenteremail')
  if( email.pristine && reenter.pristine ){
    return null
  }
  if( email.value == reenter.value){
    return null
  } else {
    return { 'match': true }
  }
}


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public customerForm: FormGroup
  emailMessage: string
  validationmsg: object


  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
      this.validationmsg = {
  required: 'This field is required',
  email: 'Enter a valid Email',
  match: 'Email entered does not match'
}
    this.customerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: '',
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        reenteremail: ['', [Validators.required]]
      }, {validators: emailValidation}),
      phnoArray: this.fb.array([ this.createInput() ])
    })

    this.customerForm.get('emailGroup.email').valueChanges.subscribe(
      (value) => { this.setMessage(value) }
    )
  }

  populateData(){
    this.customerForm.patchValue({
      firstname: "Jeban",
      lastname: "Antony",
      emailGroup: {
        email: "antonyjeban@gmail.com"
      }
    })
  }

setMessage(data: AbstractControl) {
   this.emailMessage = ''
   if(((data.touched || data.dirty)) && data.errors) {
     this.emailMessage = Object.keys(data.errors).map(
       key => this.emailMessage += this.validationmsg[key]).join('');
   }
}

createInput() {
  return this.fb.group({ phone: '' })
}

getaddField() {
  this.customerForm.get('phnoArray')
}


}

