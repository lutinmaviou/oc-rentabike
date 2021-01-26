class App {
  constructor() {
    //******** URL DE LA CARTE + TABLEAU D'IMAGES DIAPORAMA********
    this.url = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=10353d08884671995bf0355d64423c2fc3c12c76";
    const tab = [
      "images/plan1.PNG", "images/plan2.PNG", "images/plan3.PNG", "images/plan4.PNG", "images/plan5.PNG"
    ];
    //******** NEW SLIDER ********
    this.slider = new Slider(tab, "animation", 5000);
    //******** NEW MAP ********
    this.ajaxGet(this.url, function (response) {
      const stations = JSON.parse(response);
      console.log(stations);
      const map = new Map(stations);
    });
    //******** NEW RESERVATION ********
    this.reservation = new Reservation(20, 0);
  }
  ajaxGet(url, callback) {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
        // Appelle la fonction callback en lui passant la réponse de la requête
        callback(req.responseText);
      } else {
        //console.error(req.status + " " + req.statusText + " " + url);
        console.error(`${req.status} ${req.statusText} ${url}`);
      }
    });
    req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
  }

}
const app = new App();