// Detect Color
class Detect {
  constructor(canvas, point, color) {
    this.context = canvas.getContext("2d");
    this.imageData = this.context.getImageData(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );

    const getColor = this.getPixel(point);
    const store = [128, 128, 128, 255];

    if (this.compareArray(getColor, store)) {
      let storePopUP = prompt("Name this store :", "");

      // Popup window for Store
      if (storePopUP == null || storePopUP == "") {
        alert("Name not given");
      } else {
        alert(storePopUP + " store is open for business!");
      }
    }
  }

  // Compare color Array
  compareArray = (arr1, arr2) => {
    let arrLength;
    if ((arrLength = arr1.length) != arr2.length) return false;
    for (let i = 0; i < arrLength; i++) if (arr1[i] !== arr2[i]) return false;
    return true;
  };

  // Get Pixel Color
  getPixel = (point) => {
    if (
      (point.x < 0 || point.y < 0 || point.x >= this.imageData.width,
      point.y >= this.imageData.height)
    ) {
      return [-1, -1, -1, -1];
    } else {
      const offset = (point.y * this.imageData.width + point.x) * 4;
      return [
        this.imageData.data[offset + 0],
        this.imageData.data[offset + 1],
        this.imageData.data[offset + 2],
        this.imageData.data[offset + 3],
      ];
    }
  };
}
export default Detect;
