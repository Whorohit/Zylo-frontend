export const shareContent = async ({ title, text, url }) => {
  try {
    // First try copying to clipboard as a fallback
    await navigator.clipboard.writeText(url);
    
    // Then try Web Share API if available
    if (navigator.share) {
      await navigator.share({ title, text, url });
    }
    
    return true;
  } catch (error) {
    console.error('Sharing failed:', error);
    return false;
  }
};