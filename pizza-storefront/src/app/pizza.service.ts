// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 

import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom } from "rxjs"
import { Pizza } from "./models"


@Injectable()
export class PizzaService {

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(data: Pizza) { 
    // const data = new FormData()
    console.log(">>>> create order",data)
    return firstValueFrom(
            this.http.post<Pizza>('/api/order',data)

    )
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string): Promise<[]> { 

    return firstValueFrom(
      this.http.get<any>(`/api/order/${email}`)
  )
  }


}
