class Slider {
  constructor(array, cible, time) {
    this.tabImg = array; // Tableau d'images
    this.index = 0;
    this.imgElt = document.createElement("img");
    this.conteneur = document.getElementById(cible);
    this.time = time;
    this.imgEltSource = this.imgElt.setAttribute("src", this.tabImg[this.index]);
    this.append = this.conteneur.appendChild(this.imgElt);
    this.pause = this.pause.bind(this);
    this.right = this.right.bind(this);
    this.left = this.left.bind(this);
    this.key = this.key.bind(this);
    this.playPause = this.playPause.bind(this);
    this.playBoutton = document.querySelector(".fa-play-circle");
    this.pauseButton = document.querySelector(".fa-pause-circle");
    this.status;
    this.assign();
    this.play();
  }
  play() {
    this.status = true;
    this.next = setInterval(this.right, this.time);
  }
  right() {
    this.index++;
    if (this.index === this.tabImg.length) {
      this.index = 0;
    }
    this.imgElt.setAttribute("src", this.tabImg[this.index]);
  }
  left() {
    this.index--;
    if (this.index < 0) {
      this.index = this.tabImg.length - 1;
    }
    this.imgElt.setAttribute("src", this.tabImg[this.index]);
  }
  pause() {
    this.status = false;
    clearInterval(this.next);
  }
  key(e) {
    if (e.keyCode === 37) {
      this.conteneur.addEventListener("keydown", this.left());
    }
    else if (e.keyCode === 39) {
      this.conteneur.addEventListener("keydown", this.right());
    }
  }
  playPause() {
    if (this.status === true) {
      this.pause();
      this.pauseButton.style.display = "none";
      this.playBoutton.style.display = "contents";
    }
    else {
      this.play();
      this.playBoutton.style.display = "none";
      this.pauseButton.style.display = "contents";
    }
  }
  assign() {
    document.querySelector(".fa-arrow-alt-circle-left").addEventListener("click", this.left);
    document.querySelector(".fa-arrow-alt-circle-right").addEventListener("click", this.right);
    this.playBoutton.addEventListener("click", this.playPause);
    this.pauseButton.addEventListener("click", this.playPause);
    document.addEventListener("keydown", this.key);
  }
}