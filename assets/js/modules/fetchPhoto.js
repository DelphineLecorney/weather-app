import { apiUnsplashKey } from "./keys.js";

const apiUnsplashUrl = 'https://api.unsplash.com';

// Function asynchronous with a city parameter to make the Unsplash request and display a photo
export async function fetchPhoto(city) {
  try {
    const response = await fetch(`${apiUnsplashUrl}/photos/random?query=${city}&client_id=${apiUnsplashKey}`);
    const photoData = await response.json();

    const cityPhoto = document.getElementById('city-photo');
    // If photoData has property urls, it sets the src attribute
    if (photoData.urls && photoData.urls.regular) {
      cityPhoto.src = photoData.urls.regular;
      // Else it takes a fallback image
    } else {
      cityPhoto.src = 'assets/pictures/imageRemplacement.jpg';
    }
  } catch (error) {
    console.log(error);
  }
}
