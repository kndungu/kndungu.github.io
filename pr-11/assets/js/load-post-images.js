/**
 * Progressive image loading for post thumbnails
 * Tries multiple image formats and falls back to default if none exist
 */
(function() {
    'use strict';
    
    // Image format priority (best to fallback)
    const formats = ['.webp', '.png', '.jpg', '.jpeg', '.svg'];
    
    /**
     * Try to load an image from multiple formats
     */
    function tryLoadImage(img, basePath) {
        let formatIndex = 0;
        
        function tryNext() {
            if (formatIndex >= formats.length) {
                // All formats failed, keep the default image
                return;
            }
            
            const format = formats[formatIndex];
            const testImg = new Image();
            
            testImg.onload = function() {
                // Success! Replace the default with this image
                img.src = basePath + format;
            };
            
            testImg.onerror = function() {
                // This format failed, try next
                formatIndex++;
                tryNext();
            };
            
            // Start loading
            testImg.src = basePath + format;
        }
        
        tryNext();
    }
    
    /**
     * Initialize image loading for all post thumbnails
     */
    function initPostImages() {
        const thumbnails = document.querySelectorAll('.post-thumbnail[data-post-image]');
        
        thumbnails.forEach(function(img) {
            const basePath = img.getAttribute('data-post-image');
            if (basePath) {
                tryLoadImage(img, basePath);
            }
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPostImages);
    } else {
        initPostImages();
    }
})();
