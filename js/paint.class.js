import Detect from "./detect.class.js";
import { GATE, POINTER, STORE, WALL_1, WALL_2 } from "./tools.js";
import { findDistance, getMouseCoordsOnCanvas } from "./utility.js";

class Paint {
  constructor(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.context = canvas.getContext("2d");
  }

  set activeTool(tool) {
    this.tool = tool;
  }

  init = () => {
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, 640, 480);
    this.canvas.onmousedown = (e) => this.onMouseDown(e);
  };

  // click once
  onMouseDown = (e) => {
    this.savedData = this.context.getImageData(
      0,
      0,
      this.canvas.clientWidth,
      this.canvas.clientHeight
    );
    this.canvas.onmousemove = (e) => this.onMouseMove(e);
    document.onmouseup = (e) => this.onMouseUp(e);

    this.startPos = getMouseCoordsOnCanvas(e, this.canvas);

    // Pointer tool selected
    if (this.tool === POINTER) {
      new Detect(this.canvas, this.startPos, this.color);
    }

    // Store tool selected
    if (this.tool == STORE) {
      this.context.strokeStyle = "#808080";
      this.context.lineWidth = 3;
      this.context.fillStyle = "#808080";
      this.context.fillRect(
        this.startPos.x - 50,
        this.startPos.y - 50,
        100,
        100
      );
      this.context.fillStyle = "#ffffff";
      this.context.font = "1.5em Georgia";
      this.context.fillText(
        `Store`,
        this.startPos.x - 30,
        this.startPos.y + 10
      );
    }
  };
  // click and drag
  onMouseMove = (e) => {
    this.currentPos = getMouseCoordsOnCanvas(e, this.canvas);
    switch (this.tool) {
      case WALL_1:
      case WALL_2:
      case GATE:
        this.drawShape();
      case POINTER:
        break;
      default:
        break;
    }
  };
  // Release mouse
  onMouseUp = (e) => {
    this.canvas.onmousemove = (e) => null;
    document.onmouseup = (e) => this.onMouseUp(e);
  };

  drawShape = () => {
    this.context.putImageData(this.savedData, 0, 0);
    this.context.beginPath();

    // Draw Square Wall
    if (this.tool === WALL_1) {
      this.context.strokeStyle = "#ff0000";

      this.context.lineWidth = 1;
      this.context.rect(
        this.startPos.x,
        this.startPos.y,
        this.currentPos.x - this.startPos.x,
        this.currentPos.y - this.startPos.y
      );
      // Draw Circle Wall
    } else if (this.tool === WALL_2) {
      let distance = findDistance(this.startPos, this.currentPos);
      this.context.strokeStyle = "#ff0000";
      this.context.lineWidth = 1;
      this.context.arc(
        this.startPos.x,
        this.startPos.y,
        distance,
        0,
        2 * Math.PI,
        false
      );
      // Draw Gate
    } else if (this.tool === GATE) {
      this.context.strokeStyle = "#000000";
      this.context.lineWidth = 7;
      this.context.fillStyle = "#000000";
      this.context.moveTo(this.startPos.x, this.startPos.y);
      this.context.lineTo(this.currentPos.x, this.currentPos.y);
      this.drawConfigBox(this.currentPos.x + 20, this.currentPos.y);
    }
    this.context.stroke();
  };
  // Draw Config Box
  drawConfigBox = (getX, getY) => {
    this.context.rect(getX + 20, getY, 30, 30);
  };
}
export default Paint;
