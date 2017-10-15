import Gauge from './components/gauge/gauge.component';
import Slider from './components/slider/slider.component';
import './event-handler';
import './style';

window.customElements.define('app-gauge', Gauge);
window.customElements.define('app-slider', Slider);
