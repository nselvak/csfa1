import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Pizza } from '../models';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pizzaSize = SIZES[0]

  constructor(private fb: FormBuilder, private svc:PizzaService, private router: Router) {}
  send: Pizza[] = []
  checkArray: FormArray[] = []


  ngOnInit(): void {
    this.form = this.createForm()

  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

  form!: FormGroup
  email = ""

  private createForm(): FormGroup{
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      size: this.fb.control<number>(0, [Validators.required]),
      base: this.fb.control<boolean>(false, [Validators.required]),
      sauce: this.fb.control<string>('', [Validators.required]),
      toppings: this.fb.array([], [Validators.required]),
      comments: this.fb.control<string>(''),


    })
  }  
  processForm() {
    // this.form.get("base")?.setValue(this.pizzaSize)
    if (this.form.get("base")?.value == 'thick') 
      this.form.get("base")?.setValue(true)
    else
      this.form.get("base")?.setValue(false)

    const reg: Pizza= this.form.value as Pizza
    console.info(">>> New pizza Order: ", reg)
    // this.newReg.next(reg)
    this.send.push(reg);
    this.email=reg.email

    this.svc.createOrder(reg)
      .then(result => {
        console.info('>>> result: ', result)
      }) .catch(error => {
        console.error('>> error: ', error)
      })
    this.router.navigate([ '/orders/' + this.email ])
    this.form = this.createForm()

  }

  clicked() {
    console.info('>>>> clicked')
    this.email = this.form.get("email")?.value
    this.router.navigate([ '/orders/' + this.email ])
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('toppings') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
