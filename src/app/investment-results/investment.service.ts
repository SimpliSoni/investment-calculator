import { Injectable, signal } from '@angular/core';
import type { InvestmentInput } from '../investment-input-model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  resultsData = signal<{
    year: number,
    intrest: number,
    valueEndOfYear: number,
    annualInvestment: number,
    totalInterest: number,
    totalAmountInvested: number,
  }[] | undefined>(undefined);

  CalculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } = data;
    const annualData: {
      year: number,
      intrest: number,
      valueEndOfYear: number,
      annualInvestment: number,
      totalInterest: number,
      totalAmountInvested: number,
    }[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - (annualInvestment * year) - initialInvestment;
      annualData.push({
        year: year,
        intrest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + (annualInvestment * year),
      });
    }

    this.resultsData.set(annualData);
  }
}