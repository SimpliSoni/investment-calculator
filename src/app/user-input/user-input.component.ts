import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment-results/investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  private investmentService = inject(InvestmentService);
  enteredInitialInvestment = signal('0')
  enteredAnnualInvestment = signal('0')
  enteredExpectedReturn = signal('5')
  enteredDuration = signal('10')

  onSubmit() {
    this.investmentService.CalculateInvestmentResults({ 
      initialInvestment: parseFloat(this.enteredInitialInvestment()),
      annualInvestment: parseFloat(this.enteredAnnualInvestment()),
      expectedReturn: parseFloat(this.enteredExpectedReturn()),
      duration: parseInt(this.enteredDuration(), 10),
    });

    this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10'); 
  }
}
