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



 export  const fetchFromAPI = async (url, method = "GET", body = null) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
  
    if (!data.success) throw new Error(data.message || "Request failed");
    return data;
};