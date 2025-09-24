let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Mouse events
    document.addEventListener("mousemove", (e) => this.handleMove(e, paper));
    paper.addEventListener("mousedown", (e) => this.startDrag(e, paper));
    window.addEventListener("mouseup", () => this.endDrag());

    // Touch events
    document.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        this.handleMove(e.touches[0], paper);
      }
    });
    paper.addEventListener("touchstart", (e) => {
      if (e.touches.length > 0) {
        this.startDrag(e.touches[0], paper);
      }
    });
    window.addEventListener("touchend", () => this.endDrag());
  }

  handleMove(e, paper) {
    if (!this.rotating) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
    }

    const dirX = this.mouseX - this.mouseTouchX;
    const dirY = this.mouseY - this.mouseTouchY;
    const dirLength = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
    const dirNormalizedX = dirX / dirLength;
    const dirNormalizedY = dirY / dirLength;

    const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
    let degrees = (180 * angle) / Math.PI;
    degrees = (360 + Math.round(degrees)) % 360;
    if (this.rotating) {
      this.rotation = degrees;
    }

    if (this.holdingPaper) {
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  }

  startDrag(e, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ++;
    this.mouseTouchX = this.mouseX = e.clientX;
    this.mouseTouchY = this.mouseY = e.clientY;
    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
  }

  endDrag() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

// Initialize all paper elements
const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

// Birthday song trigger
function startMusic() {
  const audio = document.getElementById("birthday-audio");
  audio.play().catch((err) => console.log("Autoplay blocked:", err));
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}
document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);

// Go to special page index1
document.getElementById("heart-btn").addEventListener("click", () => {
  window.location.href = "index1.html";
});
