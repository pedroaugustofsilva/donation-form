import { BaseComponent } from './base_component.js';

export class FormComponent extends BaseComponent {
    constructor(element, app) {
        super(element, app);
        this.emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    }

    checkValidEmail() {
        let email = this.emailTarget.value;
        if (!(this.emailPattern.test(email))) {
            alert('E-mail is invalid');
            return false;
        } else {
            return true;
        }
    }

    checkValidAmount() {
        const amount = this.amountDonated;

        debugger
        if (!Number.isFinite(amount) || amount <= 0) {
            alert('The donation amount must be a valid number greater than 0');
            return false;
        } else {
            return true;
        }
    }

    clearAmounts() {
        this.amountTargets.forEach(amount => amount.checked = false);
    }

    clearCustomAmount() {
        this.customAmountTarget.value = null;
    }

    get amountDonated() {
        let defaultAmounts = this.amountTargets.filter(amount => amount.checked)[0];

        if (defaultAmounts) return parseFloat(defaultAmounts.value);

        return parseFloat(this.customAmountTarget.value);
    }

    submitForm(e) {
        e.preventDefault();

        debugger
        if (this.checkValidEmail() && this.checkValidAmount()) {
            this.app.notifyComponent('stats', 'increaseDonations');
            this.app.notifyComponent('stats', 'increaseDonationAmount', { amountDonated: this.amountDonated });
            alert('Thank you for your donation!');
            this.element.reset();
        }
    }
}
