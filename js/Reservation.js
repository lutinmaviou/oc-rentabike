class Reservation {
  constructor(min, sec) {
    this.cvs = new Canvas("cvs", 300, 150, "black");
    this.min = min;
    this.minElt;
    this.sec = sec;
    this.secElt;
    this.tmp = (this.min * 60 + this.sec); //nb de secondes
    this.tmpElt;
    this.restoreTimer;
    this.count = this.count.bind(this);
    this.end = this.end.bind(this);
    this.assign();
    this.restore();
    this.remindIdentity();
    this.showCanvas = this.showCanvas.bind(this);
  }
  // Démarrage du compteur à chaque nouvelle réservation possible
  count() {
    // Si rien dans le champ canvas : obligation de signer
    if ((this.cvs.lastX === 0) && (this.cvs.lastY === 0) && (this.cvs.lastPos === null)) {
      $("#signRequired").text("Merci de signer votre réservation").css("color", "rgb(230, 51, 45)").css("fontSize", "1.3em");
    }
    else {
      localStorage.setItem("name", document.getElementById("name").value);
      localStorage.setItem("firstName", document.getElementById("first_name").value);
      sessionStorage.setItem("stationName", document.getElementById("station_name").innerHTML);
      this.minElt = this.min;
      this.secElt = this.sec;
      this.tmpElt = (this.minElt * 60 + this.secElt);
      this.timer = setInterval(() => {
        if (this.tmpElt > 0) {
          clearInterval(this.restoreTimer);
          this.tmpElt--;
          this.minElt = Math.floor(this.tmpElt / 60);
          this.secElt = Math.floor(this.tmpElt - this.minElt * 60);
          sessionStorage.setItem("min", this.minElt);
          sessionStorage.setItem("sec", this.secElt);
          sessionStorage.setItem("tmp", this.tmpElt);
          this.minElt < 10 ? this.minElt = "0" + this.minElt : this.minElt;
          this.secElt < 10 ? this.secElt = "0" + this.secElt : this.secElt;
          $("#infos_resa").text(`Vélo réservé à la station n° ${sessionStorage.getItem("stationName")} par ${localStorage.getItem("name").toUpperCase()} ${localStorage.getItem("firstName").toUpperCase()}`).css("color", "whitesmoke");
          $("#compteur").text(`Temps restant : ${this.minElt}mn ${this.secElt}s`).css("color", "rgb(27, 148, 223)");
          $("#book").prop("disabled", true).css("visibility", "hidden");
          document.getElementById("canvas").style.visibility = "hidden";
          document.getElementById("infos").style.visibility = "visible";
          document.getElementById("cancel").style.visibility = "visible";
          document.getElementById("nom").style.color = " rgb(75, 74, 74)";
          document.getElementById("prenom").style.color = " rgb(75, 74, 74)";
          $("#signRequired").text("");
        }
        else {
          sessionStorage.clear();
          clearInterval(this.timer);
          this.minElt = this.min;
          this.secElt = this.sec;
          this.tmpElt = this.tmp;
          $("#compteur").text("Réservation expirée").css("color", "rgb(230, 51, 45)");
          $("#book").prop("disabled", false).css("visibility", "hidden");
          this.cvs.ctx.clearRect(0, 0, this.cvs.canvas.width, this.cvs.canvas.height);
          this.cvs.lastX = 0;
          this.cvs.lastY = 0;
          this.cvs.lastPos = null;
          document.getElementById("cancel").style.visibility = "hidden";
        }
      }, 1000);
    }
  }
  //Restauration de la réservation au rafraîchissement de la page (sessionStorage)
  restore() {
    this.restoreTimer = setInterval(() => {
      if (sessionStorage.getItem("tmp") > 0) {
        this.minElt = sessionStorage.getItem("min");
        this.secElt = sessionStorage.getItem("sec");
        this.tmpElt = sessionStorage.getItem("tmp");
        this.tmpElt--;
        this.minElt = Math.floor(this.tmpElt / 60);
        this.secElt = Math.floor(this.tmpElt - this.minElt * 60);
        sessionStorage.setItem("min", this.minElt);
        sessionStorage.setItem("sec", this.secElt);
        sessionStorage.setItem("tmp", this.tmpElt);
        this.minElt < 10 ? this.minElt = "0" + this.minElt : this.minElt;
        this.secElt < 10 ? this.secElt = "0" + this.secElt : this.secElt;
        $("#infos").css("visibility", "visible");
        $("#infos_resa").text(`Vélo réservé à la station n° ${sessionStorage.getItem("stationName")} par ${localStorage.getItem("name").toUpperCase()} ${localStorage.getItem("firstName").toUpperCase()}`).css("color", "whitesmoke");
        $("#compteur").text(`Temps restant : ${this.minElt}mn ${this.secElt}s`).css("color", "rgb(27, 148, 223)");
        $("#book").prop("disabled", true);
      }
      else if (this.tmpElt <= 0) {
        sessionStorage.clear();
        clearInterval(this.timer);
        this.minElt = this.min;
        this.secElt = this.sec;
        this.tmpElt = this.tmp;
        $("#compteur").text("Réservation expirée").css("color", "rgb(230, 51, 45)");
        $("#book").prop("disabled", false);
        $("#cancel").css("visibility", "hidden");
      }
    }, 1000);
  }
  // localStorage des nom et prénom
  remindIdentity() {
    $("#name").val(localStorage.getItem("name"));
    $("#first_name").val(localStorage.getItem("firstName"));
  }
  // Fin du temps imparti à la résevation en cours
  end() {
    sessionStorage.clear();
    clearInterval(this.timer);
    this.minElt = this.min;
    this.secElt = this.sec;
    this.tmpElt = this.tmp;
    this.cvs.lastX = 0;
    this.cvs.lastY = 0;
    $("#compteur").text("Réservation annulée").css("color", "rgb(230, 51, 45)");
    $("#book").prop("disabled", false);
    $("#cancel").css("visibility", "hidden");
  }
  showCanvas() {
    if ((document.getElementById("name").value === "") || (document.getElementById("first_name").value === "")) {
      document.getElementById("nom").style.color = "rgb(230, 51, 45)";
      document.getElementById("prenom").style.color = "rgb(230, 51, 45)";
    }
    else {
      document.getElementById("canvas").style.visibility = "visible";
      document.getElementById("infos").style.visibility = "hidden";
    }
  }
  assign() {
    document.getElementById("confirm").addEventListener("click", this.count);
    document.getElementById("cancel").addEventListener("click", this.end);
    document.getElementById("book").addEventListener("click", this.showCanvas);
  }
}