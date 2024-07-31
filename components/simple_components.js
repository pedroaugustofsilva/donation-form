/**
 * SimpleComponents is a class for managing and initializing components on a webpage.
 * It binds JavaScript classes to DOM elements using the `data-component` attribute.
 */
export class SimpleComponents {
    /**
     * Creates an instance of SimpleComponents.
     * @param {Object} components - An object mapping component names to their corresponding classes.
     */
    constructor(components = {}) {
        this.components = components;
        this.initializedComponents = {};

        Object.keys(this.components).forEach(c => this.initializedComponents[c] = []);
    }

    /**
     * Initializes components on the page after the DOM has fully loaded.
     * Binds JavaScript classes to elements marked with `data-component`.
     */
    load() {
        document.addEventListener('DOMContentLoaded', () => {
            const allComponents = document.querySelectorAll('[data-component]');

            allComponents.forEach(component => {
                const componentName = component.dataset.component;
                const componentClass = this.components[componentName];

                // Does not break the code execution if the component is not registered
                if (componentClass) {
                    this.initializedComponents[componentName].push(new componentClass(component, this));
                } else {
                    console.warn(`Component "${componentName}" not found in registered components.`);
                }
            });
        });
    }

    /**
     * Calls a method on all instances of a specified component.
     * @param {string} componentName - The name of the component to notify.
     * @param {string} action - The action to call on the component instances.
     * @param {Object} [params={}] - Parameters to pass to the method.
     */
    notifyComponent(componentName, action, params = {}) {
        if (this.initializedComponents[componentName]) {
            this.initializedComponents[componentName].forEach(c => c[action](params));
        }
    }
}
