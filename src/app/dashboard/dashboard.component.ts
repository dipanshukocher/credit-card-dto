import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService, IcardData } from '../shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private sharedService: SharedService) { }
  creditCardForm;
  currentYear = (new Date()).getFullYear();
  expiryYears = [];
  expiryMonths = [];
  returnData: IcardData[];
  initialValue: number;
  updateData: Subscription;
  ngOnInit(): void {
    for (let i = this.currentYear; i <= this.currentYear + 5; i++) {
      this.expiryYears.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.expiryMonths.push(i);
    }
    this.creditCardForm = new FormGroup({
      cardNumber: new FormGroup({
        cardNum1: new FormControl('', [Validators.required, Validators.minLength(4)]),
        cardNum2: new FormControl('', [Validators.required, Validators.minLength(4)]),
        cardNum3: new FormControl('', [Validators.required, Validators.minLength(4)]),
        cardNum4: new FormControl('', [Validators.required, Validators.minLength(4)]),
      }),
      expiryMonth: new FormControl('', Validators.required),
      expiryYear: new FormControl('', Validators.required),
      cardHolderName: new FormControl('', Validators.required),
      cardCVV: new FormControl(''),
      amount: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern(/^[1-9]\d*$/)])
    });
  }

  checkLength(ev, len) {
    if (ev.target.value.length === len) { return false; }
  }

  onSubmit(): void {
    const cardNumberKeys = [];
    for (const key in this.creditCardForm.value.cardNumber) {
      if (this.creditCardForm.value.cardNumber.hasOwnProperty(key)) {
        cardNumberKeys.push(this.creditCardForm.value.cardNumber[key].toString());
      }
    }
    this.creditCardForm.value.cardNumber = cardNumberKeys.join('');
    this.updateCardData(this.creditCardForm.value);
  }

  updateCardData(payload?): void {
    this.updateData = this.sharedService.creditData(payload).subscribe(res => {
      this.returnData = res;
      this.creditCardForm.reset();
    }, err => {
      this.handleError(err);
    });
  }

  handleError(error: HttpErrorResponse) {
    console.log('Server Error');
    return throwError(error);
  }

  ngOnDestroy() {
    if (this.updateData) {
      this.updateData.unsubscribe();
    }
  }

}
