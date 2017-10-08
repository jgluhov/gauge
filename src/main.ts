import './event-handler';
import Gauge from './gauge/gauge';
import Slider from './slider/slider';
import './style';

window.customElements.define('app-gauge', Gauge);
window.customElements.define('app-slider', Slider);
