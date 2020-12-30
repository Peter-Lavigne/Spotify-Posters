import React, { useState, useEffect } from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const Poster = ({ backgroundColor, images, spacing, cols, posterWidthInches, posterHeightInches, takingPicture, pictureScale }) => {
  const [horizontalPadding, setHorizontalPadding] = useState(0);
  const [verticalPadding, setVerticalPadding] = useState(0);

  // reading the pixel width is sometimes off by a few
  // I haven't been able to fiure out why
  // re-rendering is a good temporary fix
  const [widthPixels, setWidthPixels] = useState(0);
  const [heightPixels, setHeightPixels] = useState(0);

  useEffect(() => {
    if (takingPicture) {
      return;
    }

    const poster = document.getElementById('poster');
    const width = poster.clientWidth;
    const height = poster.clientHeight;
    setWidthPixels(width);
    setHeightPixels(height);

    const unmodifiedHeight = verticalPadding === 0 ?
      width * height / (width - (horizontalPadding * 2)) :
      height - (verticalPadding * 2);

    const unpaddedRatio = width / unmodifiedHeight;
    const desiredRatio = posterWidthInches / posterHeightInches;

    if (unpaddedRatio > desiredRatio) {
      const desiredHeight = 1 / (desiredRatio / width);
      setHorizontalPadding(0);
      setVerticalPadding((desiredHeight - unmodifiedHeight) / 2);
    } else if (unpaddedRatio < desiredRatio) {
      setVerticalPadding(0);
      setHorizontalPadding((width - ((width * width) / (desiredRatio * unmodifiedHeight))) / 2);
    } else {
      setVerticalPadding(0);
      setHorizontalPadding(0);
    }
  }, [
    images,
    spacing,
    cols,
    posterWidthInches,
    posterHeightInches,
    widthPixels,
    heightPixels,
    takingPicture
  ]);

  const scaledSpacing = takingPicture ? spacing * pictureScale : spacing;
  const scaledHorizontalPadding = takingPicture ? horizontalPadding * pictureScale : horizontalPadding;
  const scaledVerticalPadding = takingPicture ? verticalPadding * pictureScale : verticalPadding;

  return (
    <div id='poster'>
      <div style={{ backgroundColor, padding: scaledSpacing, display: 'flex' }}>
        <div style={{ paddingLeft: scaledHorizontalPadding, paddingRight: scaledHorizontalPadding, paddingTop: scaledVerticalPadding, paddingBottom: scaledVerticalPadding }}>
          <ImageList cols={cols} gap={scaledSpacing} >
            {images.map(image => (
              <ImageListItem key={image.id}>
                <img
                  className="poster-img"
                  src={image.url}
                  alt={`Album Art for album with id ${image.id}`}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    </div>
  );
};

export default Poster;
