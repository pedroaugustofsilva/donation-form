/**
 * BaseComponent is a base class for creating component classes that interact with DOM elements.
 * It handles the binding of DOM elements and events to component methods.
 */
export class BaseComponent {
    /**
     * Creates an instance of BaseComponent.
     * @param {HTMLElement} element - The root DOM element associated with the component.
     * @param {SimpleComponents} app - The SimpleComponents app.
     */
    constructor(element, app) {
        this.element = element;
        this.app = app;
        this.componentName = element.dataset.component;
        this.targetsMap = {};
  
        this.#loadTargets();
        this.#loadActions();
  
        this.initialize();
    }
  
    /**
     * A method to be overridden by subclasses for custom initialization logic.
     */
    initialize() {}
  
    /**
     * Loads target elements specified by `data-target-{componentName}` attributes.
     * Maps these elements for easy reference in the component's methods.
     * @private
     */
    #loadTargets() {
        const targetElements = this.element.querySelectorAll(`[data-target-${this.componentName}]`);
        
        targetElements.forEach(targetElement => {
            const targetName = targetElement.dataset[`target${this.#capitalize(this.componentName)}`];
  
            if (!this.targetsMap[targetName]) {
                this.targetsMap[targetName] = [];
            }
  
            this.targetsMap[targetName].push(targetElement);
        });
  
        Object.keys(this.targetsMap).forEach(key => {
            if (this.targetsMap[key].length > 1) {
                this[`${key}Targets`] = this.targetsMap[key];
            } else {
                this[`${key}Target`] = this.targetsMap[key][0];
            }
        });
    }
  
    /**
     * Binds actions specified by `data-action-{componentName}` attributes to methods of the component.
     * The expected format for the attribute value is `event#methodName`.
     * @private
     */
    #loadActions() {
        // Bind for the root element
        this.#bindActions(this.element);
  
        // Binds for the children
        const elementsWithAction = this.element.querySelectorAll(`[data-action-${this.componentName}]`);
        elementsWithAction.forEach(el => this.#bindActions(el));
    }
  
    /**
     * Binds an action specified by a data attribute to a method of the component.
     * @param {HTMLElement} element - The element with the `data-action-{componentName}` attribute.
     * @private
     */
    #bindActions(element) {
        const actionData = element.dataset[`action${this.#capitalize(this.componentName)}`];
        if (actionData) {
            const [event, actionName] = actionData.split('#');
            if (typeof this[actionName] === 'function') {
                element.addEventListener(event, e => this[actionName](e));
            } else {
                console.warn(`Action ${actionName} not found on component: ${this.componentName}`);
            }
        }
    }
  
    /**
     * Capitalizes the first letter of a string.
     * @param {string} str - The string to capitalize.
     * @returns {string} - The capitalized string.
     * @private
     */
    #capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  }
