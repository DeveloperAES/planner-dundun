export const uploadFile = async ({ file }) => {
    // ImgBB API Key provided by user
    const API_KEY = "947b3e03fa73cc96c5850821cfa153fb";
    const URL = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(URL, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error?.message || "Error uploading to ImgBB");
        }

        // Return object structure compatible with AddPlanPage expectations
        return {
            url: data.data.url,
            delete_url: data.data.delete_url,
            thumb: data.data.thumb.url
        };

    } catch (error) {
        console.error("ImgBB Upload Error:", error);
        throw error;
    }
};
