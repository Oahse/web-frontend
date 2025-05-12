export const formatDateValue = (value) => {
  
  // Try to parse as a Date
  const date = new Date(value);

  if (!isNaN(date.getTime()) && typeof value === 'string') {
    // It's a valid date string
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Return original value for non-date fields
  return value;
};

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
  
};

export const convertVideoToBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
};

export const base64ToFile = async (base64String, fileName) => {
  const res = await fetch(base64String);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
};
const colorMap = {
  "orange": "#FFA500",
  "blue": "#0000FF",
  "yellow": "#FFFF00",
  "black": "#000000",
  "red": "#FF0000",
  "green": "#008000",
  "purple": "#800080",
  "pink": "#FFC0CB",
  "brown": "#A52A2A",
  "white": "#FFFFFF",
  "gray": "#808080",
  "cyan": "#00FFFF",
  "magenta": "#FF00FF",
  "lime": "#00FF00",
  "indigo": "#4B0082",
  "violet": "#8A2BE2",
  "gold": "#FFD700",
  "silver": "#C0C0C0",
  "beige": "#F5F5DC",
  "navy": "#000080",
};

export const generateColorCode = (name = '')=> {
  // Normalize the name to lowercase
  const normalizedName = name.trim().toLowerCase();

  // Return the color code if it exists in the map, or a default color (e.g., gray)
  return colorMap[normalizedName] || "#808080"; // Default to gray if not found
}

