const IMGBB_API_KEY = '83e3f88941efd1059a89f016ff302d9e';

/**
 * Uploads an image file to ImgBB and returns the direct image URL.
 * @param {File} imageFile 
 * @returns {Promise<string>} Direct image URL
 */
export async function uploadToImgBB(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (data.success) {
    return data.data.url;
  } else {
    throw new Error(data.error?.message || 'Failed to upload image to ImgBB');
  }
}
