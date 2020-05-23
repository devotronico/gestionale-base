export class DateManager {

  timeoutID;


  /**
   * metodo privato
   * Ai numeri minori di 10 aggiunge un zero davanti
   * la funzione applicata ai seguenti numeri  8, 9, 10
   * ritorna le stringhe 08, 09, 10
   * @param {Number} num
   * @returns {String} 08, 09, 10
   */
  setLeadingZero = num => {
    return num < 10 ? `0${num}` : num;
  };


  /**
   * Ritorna la data attuale come la
   * ritornano i moduli <input type="datetime-local">
   * formato mysql: '%Y-%m-%dT%H:%i'
   * formato php: Y-m-d\TH:i
   * @returns {String} es.: 2019-09-05T07:02
   */
  getCurrentDatetime = () => {
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = this.setLeadingZero(today.getMonth() + 1);
    const dd = this.setLeadingZero(today.getDate());
    const hour = this.setLeadingZero(today.getHours());
    const minute = this.setLeadingZero(today.getMinutes());

    return `${yyyy}-${mm}-${dd}T${hour}:${minute}`;
  };


  /**
   * Mostra la data attuale che si aggiorna ogni secondo.
   * Questo metodo viene richiamato ricorsivamente ogni secondo
   * formato mysql: %d/%m/%Y %H:%i:%S
   * formato php: d/m/Y H:i:s
   * formato es: 06/05/2019 08:02:00
   * @returns {undefined}
   */
  playCurrentDatetime = selector => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = this.setLeadingZero(date.getMonth() + 1);
    const dd = this.setLeadingZero(date.getDate());
    const hour = this.setLeadingZero(date.getHours());
    const minute = this.setLeadingZero(date.getMinutes());
    const second = this.setLeadingZero(date.getSeconds());

    const element = document.querySelector(selector);
    element.innerHTML = `${dd}/${mm}/${yyyy} ${hour}:${minute}:${second}`;
    element.setAttribute('datetime-local', `${yyyy}-${mm}-${dd}T${hour}:${minute}`);

    this.timeoutID = window.setTimeout(this.playCurrentDatetime.bind(null, selector), 1000);
  };

  /**
   * Blocca il timer avviato dalla funzione playCurrentDatetime
   */
  stopCurrentDatetime = () => {
    window.clearTimeout(this.timeoutID);
  };


  /**
   * Formattare uno dei seguenti formati:
   * 1. formato `DATETIME` senza carattere `T` e con secondi.   es.: 2019-05-06 08:02:03
   * 2. formato `DATETIME` senza carattere `T` e senza secondi. es.: 2019-05-06 08:02
   * 3. formato `DATETIME` con carattere `T` e con secondi.     es.: 2019-05-06T08:02:03
   * 4. formato `DATETIME` con carattere `T` e senza secondi.   es.: 2019-05-06T08:02:03
   * Descrizione formato `numerico-abbreviato`:
   * codice php: w-j-n-y-H:i
   * codice mysql: %w-%e-%c-%y-%H:%i
   * es.: 1-6-5-19-08:02
   * Dettagli del formato `numerico-abbreviato`:
   * 1. contiene solo numeri
   * 2. senza i zero che precedono i valori delle date (es: aprile = 3 e no 03)
   * 3. con i zero che precedono i valori delle ore e minuti se minori di dieci
   * @param {String} datetime
   * @returns {String} `numerico-abbreviato` w-j-n-y-H:i
   */
  formatDataInNumericShort = (datetime) => {

    const date = datetime ? new Date(datetime) : new Date();
    // const date = new Date(datetime);
    const dayWeekNum = date.getDay(); // Sunday - Saturday : 0 - 6
    const dayNum = date.getDate(); // Returns the day of the month (1-31)
    const monthNum = date.getMonth() + 1; // (January gives 0)
    const year = date.getFullYear().toString().slice(2); // Returns the year (2 digits for years)

    const hour = this.setLeadingZero(date.getHours()); // Returns the hour (00-23)
    const minute = this.setLeadingZero(date.getMinutes()); // Returns the minutes (00-59)

    return `${dayWeekNum}-${dayNum}-${monthNum}-${year}-${hour}:${minute}`
  };


  /**
   * Formattare una data dal formato `numerico-abbreviato` al
   * formato `DATETIME` con carattere `T` e senza secondi.
   * es.: 2019-05-06T08:02:03
   * @param {String} dateNumShort
   * @returns {String} `DATETIME` Y-m-d\TH:i
   */
  formatDataForHtmlInput = dateNumShort => {
    const dataTokens = dateNumShort.split('-');

    const longYear = `20${dataTokens[3]}`;
    const monthNumber = this.setLeadingZero(dataTokens[2]);
    const dayNumber = this.setLeadingZero(dataTokens[1]);

    const time = dataTokens[4];

    return `${longYear}-${monthNumber}-${dayNumber}T${time}`;
  };


  /**
   * Formattare una data dal formato `numerico-abbreviato` al
   * formato `italiano-breve` (es: Lun 6/Mag/19 08:02)
   * @param {String} dateNumShort - data nel formato w-j-n-y-H:i
   * @returns {String} `italiano-breve` es: Lun 6/Mag/19 08:02
   */
  static formatDataInItalyShort = dateNumShort => {
    // const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}(\s|T)[0-9]{2}:[0-9]{2}(:[0-9]{2})?/;
    // dateNumShort = regex.test(dateNumShort) ? formatDataInNumericShort(dateNumShort) : dateNumShort;

    const dataTokens = dateNumShort.split('-');
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


  /**
   * Formattare una data dal formato `numerico-abbreviato` al
   * formato `italiano-lungo` (es: Lunedì 6/Maggio/19 08:02)
   * @param {String} dateNumShort - data nel formato w-j-n-y-H:i
   * @returns {Object} `italiano-lungo` es: Lunedì 6/Maggio/19 08:02
   */
  formatDataInItalyLong = dateNumShort => {
    const dataTokens = dateNumShort.split('-'); // [b]
    const weekDayNumber = dataTokens[0]; // [c]
    const dayNumber = this.setLeadingZero(dataTokens[1]);
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


  /**
   * Controlla se la data inserita come secondo parametro è
   * maggiore della data inserita come primo parametro
   * Le date devono essere nei seguenti formati
   * 1. formato `DATETIME` senza carattere `T` e con secondi.   es.: 2019-05-06 08:02:03
   * 2. formato `DATETIME` senza carattere `T` e senza secondi. es.: 2019-05-06 08:02
   * 3. formato `DATETIME` con carattere `T` e con secondi.     es.: 2019-05-06T08:02:03
   * 4. formato `DATETIME` con carattere `T` e senza secondi.   es.: 2019-05-06T08:02:03
   * Il formato dei due parametri non deve essere obbligatoriamente identici.
   * le due date di esempio possono essere confrontate:
   * '2019-10-06 08:37:10' > '2019-10-05T08:37' ritorna true
   * Se il metodo ritorna false significa che:
   * 1. La data del primo parametro è maggiore della data del secondo
   * 2. I formati delle due date non consentono il confronto
   * @param {String} dateOne - formato datatime
   * @param {String} dateTwo - formato datatime
   * @returns {Boolean}
   */
  static checkWhichDateIsGreater = (dateOne, dateTwo) => {
    return new Date(dateTwo) > new Date(dateOne);
  };


  /**
   * Calcola il tempo trascorso tra due date
   * In base al terzo parametro ritorna il tempo trascorso in: minuti, ore, o giorni
   * @param {String} dateOne - formato datatime
   * @param {String} dateTwo - formato datatime
   * @param {String} calcTimeIn - valori accettati minuti|ore|giorni
   * @returns {String} tempo trascorso in: minuti, ore, o giorni
   */
  getDataDiffBetwenTwoHtmlInput = (dateOne, dateTwo, calcTimeIn = '') => {
    const firstDate = new Date(dateOne);
    const secondDate = new Date(dateTwo);

    // const oneDay = 24 * 60 * 60 * 1000; // ore*minuti*secondi*millisecondi
    // const oneHour = 60 * 60 * 1000; // minuti*secondi*millisecondi
    // const oneMinute = 60 * 1000; // minuti*secondi*millisecondi
    // const timeDiff = Math.round((secondDate - firstDate) / oneMinute);

    const arr = ['minuti', 'ore', 'giorni'];
    calcTimeIn = arr.includes(calcTimeIn) ? calcTimeIn : 'minuti';
    let time = 0;
    switch (calcTimeIn) {
      case 'minuti': time = 60 * 1000; break;  // ore*minuti*secondi*millisecondi
      case 'ore': time = 60 * 60 * 1000; break; // minuti*secondi*millisecondi
      case 'giorni': time = 24 * 60 * 60 * 1000; break; // minuti*secondi*millisecondi
    }

    const timeDiff = Math.round((secondDate - firstDate) / time);

    // const ore = Math.floor(timeDiff / 60) - 24;
    // const minuti = timeDiff - 60;
    // const tempo = `${ore}:${minuti}`
    // console.log('tempo: ', tempo);

    // const timeDiff = Math.round((firstDate - secondDate) / oneMinute);
    // const timeDiff = Math.round(Math.abs((firstDate - secondDate) / oneMinute));
    // console.log(timeDiff);
    return timeDiff;
  };




}





















