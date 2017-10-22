import './assets/img/favicon';
import Gauge from './components/gauge/gauge.component';
import Input from './components/input/input.component';
import './store-handler';
import './style';

window.customElements.define('app-gauge', Gauge);
window.customElements.define('app-input', Input);
