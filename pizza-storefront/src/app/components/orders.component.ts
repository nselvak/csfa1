import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private svc: PizzaService) { }

  email!: string

  details: OrderSummary[] =[]


  ngOnInit(): void {


    this.email = this.activatedRoute.snapshot.params['email']
    console.info('>>> Email: ', this.email)

    this.svc.getOrders(this.email)
    .then(result => {
      console.info('>>> Result Details: ', result)

      for (let i = 0; i < result.length; i++) {
        this.details.push(result[i])
      }
      console.info('>>> Details: ', this.details)

    })
    .catch(error => {
      console.error('>>>> error: ', error)
    })
  }

}
