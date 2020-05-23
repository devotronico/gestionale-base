// https://gist.github.com/WebReflection/6076a40777b65c397b2b9b97247520f0

// Add Zeros
// function addZero(n) {
//   return (parseInt(n, 10) < 10 ? '0' : '') + n;
// }

const setLeadingZero = num => {
  return num < 10 ? `0${num}` : num;
};

var timeoutID;

const playCurrentDatetime = selector => {
  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = setLeadingZero(today.getMonth() + 1);
  const dd = setLeadingZero(today.getDate());
  const hour = setLeadingZero(today.getHours());
  const minute = setLeadingZero(today.getMinutes());
  const second = setLeadingZero(today.getSeconds());

  const element = document.querySelector(selector);
  element.innerHTML = `${dd}/${mm}/${yyyy} ${hour}:${minute}:${second}`;
  element.setAttribute('datetime-local', `${yyyy}-${mm}-${dd}T${hour}:${minute}`);

  timeoutID = window.setTimeout(playCurrentDatetime.bind(null, selector), 1000);
};

const stopCurrentDatetime = () => {
  window.clearTimeout(timeoutID);
};

/**
 * Ritorna la data come la ritornano i moduli <input type="datetime-local"
 * formato: '%Y-%m-%dT%H:%i'
 * es.: 2019-09-05T07:02
 */
const getCurrentDatetimeStatic = () => {
  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = setLeadingZero(today.getMonth() + 1);
  const dd = setLeadingZero(today.getDate());
  const hour = setLeadingZero(today.getHours());
  const minute = setLeadingZero(today.getMinutes());

  return `${yyyy}-${mm}-${dd}T${hour}:${minute}`;
};


/**
 * Formattare uno dei seguenti formati:
 * 1. formato `DATETIME` senza carattere `T` e con secondi.   es.: 2019-05-06 08:02:03
 * 2. formato `DATETIME` senza carattere `T` e senza secondi. es.: 2019-05-06 08:02
 * 3. formato `DATETIME` con carattere `T` e con secondi.     es.: 2019-05-06T08:02:03
 * 4. formato `DATETIME` con carattere `T` e senza secondi.   es.: 2019-05-06T08:02:03
 * Nel formato `numerico-abbreviato`. es: 1-6-5-19-08:02
 * Descrizione del formato `numerico-abbreviato`:
 * 1. solo numeri senza lettere
 * 2. senza i zero che precedono i valori delle singole date e
 * 3. con i zero che precedono i valori delle ore e minuti
 * @param {String} datestring
 */
const formatDataInNumericShort = (datestring) => {
  const date = new Date(datestring);
  const dayWeekNum = date.getDay(); // Sunday - Saturday : 0 - 6
  const dayNum = date.getDate(); // Returns the day of the month (1-31)
  const monthNum = date.getMonth() + 1; // (January gives 0)
  const year = date.getFullYear().toString().slice(2); // Returns the year (2 digits for years)

  const hour = setLeadingZero(date.getHours()); // Returns the hour (00-23)
  const minute = setLeadingZero(date.getMinutes()); // Returns the minutes (00-59)

  return `${dayWeekNum}-${dayNum}-${monthNum}-${year}-${hour}:${minute}`
};


/**
 * Formattare una data dal formato `numerico-abbreviato` al
 * formato `italiano-breve` (es: Lun 6/Mag/19 08:02)
 * Descrizione formato `numerico-abbreviato`:
 * codice php: w-j-n-y-H:i
 * codice mysql: %w-%e-%c-%y-%H:%i
 * es.: 1-6-5-19-08:02
 * Dettagli del formato `numerico-abbreviato`:
 * 1. contiene solo numeri
 * 2. senza i zero che precedono i valori delle date (es: aprile = 3 e no 03)
 * 3. con i zero che precedono i valori delle ore e minuti se minori di dieci
 * @param {String} datestring - data nel formato w-j-n-y-H:i | datatime
 */
const formatDataInItalyShort = datestring => {
  // const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}(\s|T)[0-9]{2}:[0-9]{2}(:[0-9]{2})?/;
  // datestring = regex.test(datestring) ? formatDataInNumericShort(datestring) : datestring;
  const dataTokens = datestring.split('-');
  const weekDayNumber = dataTokens[0];
  const shortDayNumber = dataTokens[1];
  const month = dataTokens[2];
  const shortYear = dataTokens[3];
  const time = dataTokens[4];
  const shortDayWeekList = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  const shortDayWeek = shortDayWeekList[weekDayNumber];
  const shortMonthList = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
  const shortMonth = shortMonthList[month - 1];

  return `${shortDayWeek} ${shortDayNumber}/${shortMonth}/${shortYear} ${time}`;
};


const formatDataItalyAndLong = dataShort => {
  const dataTokens = dataShort.split('-'); // [b]
  const weekDayNumber = dataTokens[0]; // [c]
  const dayNumber = setLeadingZero(dataTokens[1]);
  const month = dataTokens[2]; // [e]
  const longYear = `20${dataTokens[3]}`;
  const time = dataTokens[4]; // [h]

  const dayWeekList = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const dayWeek = dayWeekList[weekDayNumber];

  const longMonthList = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  const longMonth = longMonthList[month - 1];

  // const watch = String.fromCodePoint('0x231A');
  return { dayWeek, dayNumber, longMonth, longYear, time };
};


const formatDataForHtmlInput = dataShort => {
  const dataTokens = dataShort.split('-'); // [b]

  const longYear = `20${dataTokens[3]}`;
  const monthNumber = setLeadingZero(dataTokens[2]);
  const dayNumber = setLeadingZero(dataTokens[1]);

  const time = dataTokens[4]; // [h]

  return `${longYear}-${monthNumber}-${dayNumber}T${time}`;
};


const checkWhichDateIsGreater = (dateFirstInput, dateSecondInput) => {
  return new Date(dateFirstInput) > new Date(dateSecondInput);
};


const getDataDiffBetwenTwoHtmlInput = (dateFirstInput, dateSecondInput) => {
  const firstDate = new Date(dateFirstInput);
  const secondDate = new Date(dateSecondInput);

  // const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  // const oneHour = 60 * 60 * 1000; // minutes*seconds*milliseconds
  const oneMinute = 60 * 1000; // minutes*seconds*milliseconds
  const diffDays = Math.round((secondDate - firstDate) / oneMinute);
  // const diffDays = Math.round((firstDate - secondDate) / oneMinute);
  // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneMinute));
  console.log(diffDays);
  return diffDays;
};


export {
  playCurrentDatetime,
  stopCurrentDatetime,
  formatDataInItalyShort,
  formatDataItalyAndLong,
  formatDataForHtmlInput,
  checkWhichDateIsGreater,
  getDataDiffBetwenTwoHtmlInput,
  formatDataInNumericShort
};
