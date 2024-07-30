import { FormComponent } from './components/form_component.js';
import { StatsComponent } from './components/stats_component.js';

class App {
    constructor(components = {}) {
        this.components = components;
        this.initializedComponents = {};

        Object.keys(this.components).forEach(c => this.initializedComponents[c] = []);
    }

    load() {
        const allComponents = document.querySelectorAll('[data-component]');

        allComponents.forEach(component => {
            let componentName = component.dataset.component;
            let componentClass = this.components[componentName];

            this.initializedComponents[componentName].push(new componentClass(component, this));
        });
    }

    notifyComponent(componentName, method, params = {}) {
        this.initializedComponents[componentName].forEach(c => c[method](params));
    }
}

const app = new App({
    form: FormComponent,
    stats: StatsComponent
});

document.addEventListener('DOMContentLoaded', () => app.load());
