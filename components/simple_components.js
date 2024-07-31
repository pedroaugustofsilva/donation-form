export class SimpleComponents {
    constructor(components = {}) {
        this.components = components;
        this.initializedComponents = {};

        Object.keys(this.components).forEach(c => this.initializedComponents[c] = []);
    }

    load() {
        document.addEventListener('DOMContentLoaded', () => {
            const allComponents = document.querySelectorAll('[data-component]');

            allComponents.forEach(component => {
                let componentName = component.dataset.component;
                let componentClass = this.components[componentName];

                this.initializedComponents[componentName].push(new componentClass(component, this));
            });
        });
    }

    notifyComponent(componentName, method, params = {}) {
        this.initializedComponents[componentName].forEach(c => c[method](params));
    }
}