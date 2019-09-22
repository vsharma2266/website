import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition,
//   keyframes
// } from '@angular/animations';

@Component({
  selector: 'portfolio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('flyInOut', [
  //     state('in', style({opacity: '1'})),
  //     transition('void => in', [
  //       animate(300)
  //     ])
  //   ])
  // ]
})
export class AppComponent implements OnInit {

  inputForm: FormGroup;


  constructor(private fb: FormBuilder) {

  }

  // activeComponent = 'timeline';


  ngOnInit(): void {

    this.inputForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      eid: ['', Validators.required],
      email: ['', Validators.required],
      
    })
  }

  // onSwitch(component: string) {
  //   this.activeComponent = component;
  // }
  // title = 'portfolio';

  submit() {
    // http call
    console.log("this");
    
  }

  isSubmitDisabled() {    
    return !!!this.inputForm.valid
  }

}
