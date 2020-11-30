
let btnActivar;
let btnApagar;

function setup() {
  createCanvas(600, 600);
  btnActivar = createButton("Activar Led");
  btnApagar = createButton("Apagar Led");

}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
