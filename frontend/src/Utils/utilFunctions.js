
import axios from "axios"


// generate image

export const generateImage = async (prompt) => {

    try {
        const response = await axios.post("http://localhost:8888/generateImage", { prompt })
        console.log(response.data.url);
        return response.data.url

    } catch (error) {
        console.log(error);
        return
    }

};


export const editImage = async () => {
    try {
        console.log("wait");
        const response = await openai.createImageEdit(
            img,
            mask,
            "make the sky as a galaxy",
            1,
            "256x256"
        );
        let image_url = response.data.data[0].url;
        console.log(image_url);
    } catch (error) {
        console.log(error);
    }
}



export const generateVariations = async (base64_url) => {
    try {
        const response = await axios.post("http://localhost:8888/variations", { base64_url })
        console.log(response.data.url);
        return response.data.url
    } catch (error) {
        console.log(error);
        return
    }
}