import { apiUnsplashKey } from "./keys.js";

const apiUnsplashUrl = 'https://api.unsplash.com';

// Function to make the Unsplash request and display a photo
export async function fetchPhoto(city) {
  try {
    const response = await fetch(`${apiUnsplashUrl}/photos/random?query=${city}&client_id=${apiUnsplashKey}`);
    const photoData = await response.json();

    const cityPhoto = document.getElementById('city-photo');

    if (photoData.urls && photoData.urls.regular) {
      cityPhoto.src = photoData.urls.regular;
    } else {
      cityPhoto.src = 'assets/pictures/imageRemplacement.jpg';
    }
  } catch (error) {
    console.log(error);
  }
}
