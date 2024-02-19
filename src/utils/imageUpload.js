const imageUpload = async (image) => {
  try {
    const apiUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_key}`;

    const formData = new FormData();
    formData.append("image", image.split(",")[1]);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload failed: ${errorData.error.message}`);
    }
    const data = await response.json();
    const imageURL = data.data.url;
    return imageURL;
  } catch (error) {
    console.log(`Error uploading image: ${error.message}`);
  }
};

export default imageUpload;
