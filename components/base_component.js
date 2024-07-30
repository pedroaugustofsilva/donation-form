export class BaseComponent {
  constructor(element, app) {
      this.element = element;
      this.app = app;
      this.componentName = element.dataset.component;
      this.targetsMap = {};

      this.loadTargets();
      this.loadActions();

      this.initialize();
  }

  initialize() {}

  loadTargets() {
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

  loadActions() {
      this.#bindActions(this.element);

      const elementsWithAction = this.element.querySelectorAll(`[data-action-${this.componentName}]`);
      elementsWithAction.forEach(el => this.#bindActions(el));
  }

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

  #capitalize(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
