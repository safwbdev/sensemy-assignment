import Paint from "./paint.class.js";
import { POINTER, SAVE_JSON, SAVE_IMG } from "./tools.js";

var paint = new Paint("canvas");

// DEFAULT ACTIVE TOOL
paint.activeTool = POINTER;

paint.init();

// SELECT TOOL
document.querySelectorAll("[data-tool]").forEach((item) => {
  item.addEventListener("click", (e) => {
    document.querySelector("[data-tool].active").classList.toggle("active");
    item.classList.toggle("active");
    paint.activeTool = item.getAttribute("data-tool");
  });
});

// SELECT COMMAND
document.querySelectorAll("[data-command]").forEach((item) => {
  item.addEventListener("click", (e) => {
    let command = item.getAttribute("data-command");

    // SAVE JSON IMAGE DATA
    if (command === SAVE_JSON) {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      const imgData = context.getImageData(
        0,
        0,
        canvas.clientWidth,
        canvas.clientHeight
      );

      const jsonDownload = document.createElement("a");

      jsonDownload.href = URL.createObjectURL(
        new Blob([JSON.stringify(imgData, null, 2)], {
          type: "text/plain",
        })
      );

      jsonDownload.setAttribute("download", "imagedata.json");
      document.body.appendChild(jsonDownload);
      jsonDownload.click();
      document.body.removeChild(jsonDownload);

      // SAVE IMAGE FILE
    } else if (command === SAVE_IMG) {
      const canvas = document.getElementById("canvas");
      const image = canvas
        .toDataURL("image/png", 1.0)
        .replace("image/png", "image/octet=stream");

      const link = document.createElement("a");
      link.download = "image.png";
      link.href = image;
      link.click();
    }
  });
});
