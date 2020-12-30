import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import html2canvas from 'html2canvas';
import { saveAs, trimWhitespace, resizeRightMargin } from '../canvasHelpers';

const Export = ({ takingPicture, setTakingPicture, pictureScale, setPictureScale }) => {
  useEffect(() => {
    if (!takingPicture) {
      return;
    }

    const options = {
      useCORS: true,
      width: window.innerWidth * pictureScale + 100,
      height: (window.innerHeight * pictureScale + 100) * 3,
      windowWidth: window.innerWidth * pictureScale,
      windowHeight: (window.innerHeight * pictureScale) * 3
    }

    html2canvas(document.getElementById('poster'), options).then(function (canvas) {
      const trimmedCanvas = resizeRightMargin(trimWhitespace(canvas));
      saveAs(trimmedCanvas.toDataURL(), 'poster.png');
      setTakingPicture(false);
      setPictureScale(null);
    });
  }, [takingPicture]);

  const generatePoster = () => {
    const image = document.getElementsByClassName('poster-img')[0];

    const scale = 640 / image.width;

    setTakingPicture(true);
    setPictureScale(scale);
  }

  const onMobile = window.innerWidth < 450;
  const buttonText = onMobile ?
    "Posters cannot be downloaded on mobile" :
    (takingPicture ?
      "Creating Poster. This will take a moment." :
      "Download Poster")

  return (
    <Button variant="contained" fullWidth disabled={onMobile || takingPicture} onClick={generatePoster}>
      {buttonText}
    </Button>
  );
};

export default Export;
