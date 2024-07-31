
import { SimpleComponents } from './components/simple_components.js';
import { FormComponent } from './components/form_component.js';
import { StatsComponent } from './components/stats_component.js';

const app = new SimpleComponents({
    form: FormComponent,
    stats: StatsComponent
});

app.load()
