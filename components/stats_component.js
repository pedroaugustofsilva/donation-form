import { BaseComponent } from './base_component.js';

export class StatsComponent extends BaseComponent {
    initialize() {
        this.currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        this.totalDonationsTarget.innerHTML = 0;
        this.raisedTarget.innerHTML = this.formatCurrency(0);
    }

    increaseDonations() {
        this.totalDonationsTarget.innerHTML = parseInt(this.totalDonationsTarget.innerHTML) + 1;
    }

    increaseDonationAmount({ amountDonated }) {
        const currentRaised = this.#convertCurrencyToFloat(this.raisedTarget.innerHTML);
        this.raisedTarget.innerHTML = this.formatCurrency(currentRaised + amountDonated);
    }

    formatCurrency(value) {
        return this.currencyFormatter.format(value);
    }

    #convertCurrencyToFloat(currencyStr) {
        const cleanedStr = currencyStr.replace(/[$,]/g, '');
        return parseFloat(cleanedStr);
    }
}
