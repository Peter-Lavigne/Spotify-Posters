// https://stackoverflow.com/a/41168203/12895068
export function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

export function trimWhitespace(canvas) {
  const context = canvas.getContext('2d');

  let topLeftX = 0;
  let topLeftY = 0;

  let bottomRightX = canvas.width;
  let bottomRightY = canvas.height;

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  const getRGB = (x, y) => {
    const rgbStart = ((y * (canvas.width * 4)) + (x * 4));
    const r = imageData.data[rgbStart];
    const g = imageData.data[rgbStart + 1];
    const b = imageData.data[rgbStart + 2];
    return [r, g, b];
  }

  const isWhite = (r, g, b) => {
    return r === 255 && g === 255 && b === 255;
  }

  for (let y = 0; y < canvas.height; y++) {
    let colWhite = true;
    for (let x = 0; x < canvas.width; x++) {
      const [r, g, b] = getRGB(x, y);
      if (!isWhite(r, g, b)) {
        colWhite = false;
        topLeftY = y;
        break;
      }
    }
    if (!colWhite) break;
  };

  for (let y = canvas.height - 1; y >= 0; y--) {
    let colWhite = true;
    for (let x = 0; x < canvas.width; x++) {
      const [r, g, b] = getRGB(x, y);
      if (!isWhite(r, g, b)) {
        colWhite = false;
        bottomRightY = y;
        break;
      }
    }
    if (!colWhite) break;
  };

  for (let x = 0; x < canvas.width; x++) {
    let rowWhite = true;
    for (let y = 0; y < canvas.height; y++) {
      const [r, g, b] = getRGB(x, y);
      if (!isWhite(r, g, b)) {
        rowWhite = false;
        topLeftX = x;
        break;
      }
    }
    if (!rowWhite) break;
  };

  for (let x = canvas.width - 1; x >= 0; x--) {
    let rowWhite = true;
    for (let y = 0; y < canvas.height; y++) {
      const [r, g, b] = getRGB(x, y);
      if (!isWhite(r, g, b)) {
        rowWhite = false;
        bottomRightX = x;
        break;
      }
    }
    if (!rowWhite) break;
  };

  topLeftX += 1; // there's a 1-pixel-wide gray line. not sure why.

  const width = bottomRightX - topLeftX;
  const height = bottomRightY - topLeftY;

  const croppedCanvas = context.getImageData(topLeftX, topLeftY, width, height);
  canvas.width = width;
  canvas.height = height;
  context.putImageData(croppedCanvas, 0, 0);

  return canvas;
}

export function resizeRightMargin(canvas) {
  const context = canvas.getContext('2d');
  let width = canvas.width;
  let leftX = 0;
  let height = canvas.height;
  let topY = 0;

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const backgroundColorR = imageData.data[0];
  const backgroundColorG = imageData.data[1];
  const backgroundColorB = imageData.data[2];

  const getRGB = (x, y) => {
    const rgbStart = ((y * (canvas.width * 4)) + (x * 4));
    const r = imageData.data[rgbStart];
    const g = imageData.data[rgbStart + 1];
    const b = imageData.data[rgbStart + 2];
    return [r, g, b];
  }

  const isBackgroundColor = (r, g, b) => {
    return r === backgroundColorR && g === backgroundColorG && b === backgroundColorB;
  }

  for (let x = 0; x < canvas.width; x++) {
    let colBG = true;
    for (let y = 0; y < canvas.height; y++) {
      const [r, g, b] = getRGB(x, y);
      if (!isBackgroundColor(r, g, b)) {
        colBG = false;
        leftX = x;
        break;
      }
    }
    if (!colBG) break;
  };

  for (let x = canvas.width - 1; x >= 0; x--) {
    let colBG = true;
    for (let y = 0; y < canvas.height; y++) {
      const [r, g, b] = getRGB(x, y);
      if (!isBackgroundColor(r, g, b)) {
        colBG = false;
        width = x + leftX;
        break;
      }
    }
    if (!colBG) break;
  };

  for (let y = 0; y < canvas.height; y++) {
    let rowBG = true;
    for (let x = 0; x < canvas.width; x++) {
      const [r, g, b] = getRGB(x, y);
      if (!isBackgroundColor(r, g, b)) {
        rowBG = false;
        topY = y;
        break;
      }
    }
    if (!rowBG) break;
  };

  for (let y = canvas.height - 1; y >= 0; y--) {
    let rowBG = true;
    for (let x = 0; x < canvas.width; x++) {
      const [r, g, b] = getRGB(x, y);
      if (!isBackgroundColor(r, g, b)) {
        rowBG = false;
        height = y + topY;
        break;
      }
    }
    if (!rowBG) break;
  };

  const croppedCanvas = context.getImageData(0, 0, width, height);
  canvas.width = width;
  canvas.height = height;
  context.putImageData(croppedCanvas, 0, 0);

  return canvas;
}