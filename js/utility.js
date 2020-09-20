import Point from "./point.model.js";

// get mouse x,y coordinates
export const getMouseCoordsOnCanvas = (e, canvas) => {
  let react = canvas.getBoundingClientRect();
  let x = Math.round(e.clientX - react.left);
  let y = Math.round(e.clientY - react.top);

  return new Point(x, y);
};

// get length from start to end
export const findDistance = (coord1, coord2) => {
  let exp1 = Math.pow(coord2.x - coord1.x, 2);
  let exp2 = Math.pow(coord2.y - coord1.y, 2);
  let distance = Math.sqrt(exp1 + exp2);

  return distance;
};
