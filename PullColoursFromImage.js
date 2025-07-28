(() => new Promise((resolve, reject) => {
    /* Check if ColorThief is already loaded */
    if (window.ColorThief) return run();

    /* Load ColorThief from CDN */
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.2/color-thief.umd.js';
    script.onload = run;
    script.onerror = () => reject(new Error('Failed to load Color Thief library'));
    document.head.appendChild(script);

    /* Function to run once library is ready */
    function run() {
        const img = new Image();
        const start = Date.now();
        img.src = '%s'; /* <- Replace this with your image URL */

        img.onload = () => {
            try {
                const thief = new ColorThief();
                resolve({
                    dominantColor: thief.getColor(img),
                    palette: thief.getPalette(img, 5)
                });
            } catch (err) {
                reject(new Error('Color extraction failed: ' + err.message));
            }
        };

        img.onerror = () => {
            const type = img.src.startsWith('data:') ? 'data URL' : 'URL';
            const len = img.src.length;
            const dur = Date.now() - start;
            reject(new Error(`Failed to load image: ${type}, length ${len}, after ${dur}ms`));
        };
    }
}))();
