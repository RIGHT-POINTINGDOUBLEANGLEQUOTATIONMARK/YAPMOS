function getImageColors(imageUrl) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.2/color-thief.umd.js';
    document.head.appendChild(script);

    script.onload = () => {
      const colorThief = new ColorThief();
      
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        try {
          const dominantColor = colorThief.getColor(img);
          const palette = colorThief.getPalette(img, 5);
          resolve({ dominantColor, palette });
        } catch (e) {
          reject(e);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image.'));
    };

    script.onerror = () => reject(new Error('Failed to load Color Thief library.'));
  });
}

getImageColors("%s")
