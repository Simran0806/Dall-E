
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


export const editImage = async (img, mask, prompt) => {
    try {

        if (!prompt) {
            alert("Please enter a valid prompt");
            return;
        }
        console.log("wait");
        console.log(img);
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        console.log(mask.split(",")[1]);
        mask = mask.split(",")[1]


        const response = await axios.post("http://localhost:8888/edit", { img, mask, prompt });

        console.log(response.data.url);
        return response.data.url

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