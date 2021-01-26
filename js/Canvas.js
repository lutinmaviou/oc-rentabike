class Canvas {
  constructor(id, width, height, color) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.lineWidth = 3;
    this.ctx.strokeStyle = color;
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.drawing; // Status variable
    this.lastX = 0;
    this.lastY = 0;
    this.clearButton = document.getElementById("reset");
    this.mouseDraw = this.mouseDraw.bind(this);
    this.mouseDown();
    this.delete = this.delete.bind(this);
    this.eventListeners();
    // TACTILE //
    this.initTouchEvents();
    this.start();
    this.lastPos = null;
  }
  mouseDown() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.drawing = true;
      this.ctx.beginPath();
      this.lastX = e.offsetX;
      this.lastY = e.offsetY;
      this.ctx.moveTo(this.lastX, this.lastY);
    });
  }
  mouseDraw(e) {
    if (!this.drawing) return;
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
  }
  delete() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.lastX = 0;
    this.lastY = 0;
    this.canvas.width = this.canvas.width; // Tactile
  }
  eventListeners() {
    this.canvas.addEventListener("mousemove", this.mouseDraw);
    this.canvas.addEventListener("mouseup", (e) => {
      this.drawing = false;
    });
    this.canvas.addEventListener("mouseout", (e) => {
      this.drawing = false;
    });
    this.clearButton.addEventListener("click", this.delete);
    document.getElementById("cancel").addEventListener("click", this.delete);
  }

  // TACTILE //
  initTouchEvents() {
    this.canvas.addEventListener("touchstart", (e) => {
      if (e.cancelable) {
        e.preventDefault();
      };
      if (e.touches.length > 0) this.start(this.positionToucher(e));
    });
    this.canvas.addEventListener("touchend", (e) => {
      if (e.cancelable) {
        e.preventDefault();
      };
      if (e.touches.length > 0) this.stop(this.positionToucher(e));
    });
    this.canvas.addEventListener("touchmove", (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }; if (e.touches.length > 0) this.move(this.positionToucher(e));
    });
  }
  position(pos) {
    const rect = this.canvas.getBoundingClientRect(); //va chercher la position relative et la taille de l'Ã©lÃ©ment par rapport Ã  sa zone d'affichage
    pos.x = (pos.x - rect.left) / (rect.right - rect.left) * this.canvas.width; //rÃ©cupÃ¨re la position exacte de la souris en X
    pos.y = (pos.y - rect.top) / (rect.bottom - rect.top) * this.canvas.height; //idem en Y
    return pos;
  }
  positionToucher(e) {
    return this.position({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }); //rÃ©cupÃ¨re la position du premier toucher dans le navigateur
  }
  dessiner(pos1, pos2) {
    this.ctx.moveTo(pos1.x, pos1.y); //point de dÃ©part
    this.ctx.lineTo(pos2.x, pos2.y); //point d'arrivÃ©e
    this.ctx.stroke();
  }
  start(pos) {
    this.lastPos = pos; //prend la derniÃ¨re pos connue
  }
  stop(pos) {
    if (this.lastPos) { //si lastpos n'est pas null, on dessine et on arrÃªte pour finir le dessin
      this.dessiner(this.lastPos, pos);
      this.lastPos = null; //on a fini de dessiner, Ã©vite de lier le dernier tracÃ© Ã  un nouveau tracÃ©
    }
  }
  move(pos) {
    if (this.lastPos) {
      const newPos = pos;
      this.dessiner(this.lastPos, newPos);
      this.lastPos = newPos; //relie la derniÃ¨re pos avec la nouvelle pour signifier le mouvement
    }
  }
}