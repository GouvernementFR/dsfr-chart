import { CategoryScale, Chart, Filler, LinearScale, PointElement, Tooltip } from 'chart.js';
import { FRANCE } from '@/utils/constants.js';

Chart.register(Tooltip, Filler, LinearScale, CategoryScale, PointElement);

/**
 * Capitalize the first letter of a string
 * @param {string} string The string to capitalize
 * @returns {string} The capitalized string
 */
export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Slugify a string
 * @param {string} string The string to slugify
 * @returns {string} The slugified string
 */
export const slugify = (string) =>
  string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toLowerCase();

/**
 * Converts a number to a human-readable french format
 * @param {number|string} value The number to convert
 * @returns {string} The formatted number
 */
export const formatNumber = (value) => {
  // Return original value if not a valid number
  if (isNaN(value)) {
    return value;
  }

  // Format as integer or decimal number
  if (Number.isInteger(value)) {
    return parseInt(value).toLocaleString('fr-FR');
  } else {
    return parseFloat(value).toLocaleString('fr-FR', { maximumFractionDigits: 2 });
  }
};

/**
 * Check if the device is a mobile
 * @returns {boolean} True if the device is a mobile, false otherwise
 * @see https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 */
export const isMobile = function () {
  const nav = navigator.userAgent || navigator.vendor || window.opera;
  /* eslint-disable */
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(nav) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      nav.substr(0, 4),
    )
  );
  /* eslint-enable */
};

/**
 * Retrieve the department object from its code
 * @param {string} code The department code
 * @returns {object} The department object
 */
export const getDep = (code) => FRANCE.find((item) => item.department_value === code);

/**
 * Retrieve the region object from its code
 * @param {string} code The region code
 * @returns {object} The region object
 */
export const getReg = (code) => FRANCE.find((item) => item.region_value === code);

/**
 * Retrieve all department codes
 * @returns {string[]} The department codes
 */
export const getAllDep = () => FRANCE.map((item) => item.department_value);

/**
 * Retrieve all region codes
 * @returns {string[]} The region codes
 */
export const getAllReg = () => FRANCE.map((item) => item.region_value);

/**
 * Retrieve the department codes from a region code
 * @param {string} code The region code
 * @returns {string[]} The department codes
 */
export const getDepsFromReg = (code) => {
  const items = FRANCE.filter((item) => item.region_value === code);
  return items.map((item) => item.department_value);
};

/**
 * Configure the default values for chart.js
 */
export const configureChartDefaults = () => {
  Chart.defaults.font.family = 'Marianne';
  Chart.defaults.font.size = 12;
  Chart.defaults.font.lineHeight = 1.66;
  Chart.defaults.color = '#6b6b6b';
  Chart.defaults.borderColor = '#cecece';
};

export const chartMixins = {
  methods: {
    capitalize,
    formatNumber,
  },
};

export const mapMixins = {
  methods: {
    getDep,
    getReg,
    getAllDep,
    getAllReg,
    getDepsFromReg,
  },
};

export const svgMixins = {
  props: {
    onenter: Function,
    onleave: Function,
    onclick: Function,
    ondblclick: Function,
  },
};
