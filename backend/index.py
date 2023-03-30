import base64
from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
from PIL import Image
import io
import os
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("API_KEY")


def page_not_found(e):
    return jsonify({"error": "NOT FOUND"})


app.register_error_handler(404, page_not_found)


@app.route("/generateImage", methods=["POST"])
def generateImage():

    response = openai.Image.create(
        prompt=request.json["prompt"],
        n=1,
        response_format="b64_json",
        size="256x256"
    )
    # return jsonify({"url": response['data'][0]['url']})
    return jsonify({"url": response['data'][0]["b64_json"]})


@app.route("/edit", methods=["POST"])
def edit():
    width, height = 256, 256

    original=request.json["img"]
    mask=request.json["mask"]
    prompt=request.json["prompt"]

    originalImg = Image.open(io.BytesIO(
    base64.decodebytes(bytes(original, "utf-8"))))

    maskImg = Image.open(io.BytesIO(
    base64.decodebytes(bytes(mask, "utf-8"))))

    maskImg = maskImg.resize((width,height))
    originalImg = originalImg.resize((width,height))

    originalImg.save("mask.png")
    maskImg.save("original.png")

    response = openai.Image.create_edit(
        image=open("original.png", "rb"),
        mask=open("mask.png", "rb"),
        prompt=request.json["prompt"],
        response_format="b64_json",
        n=1,
        size="256x256"
    
    )

    # print(response['data'][0]["b64_json"])
    # print("ok")

    # return "ok"
    return jsonify({"url": response['data'][0]["b64_json"]})





@app.route("/variations", methods=["POST"])
def variations():

    # print(request.json['base64_url'])
    base64_str = request.json["base64_url"]
    img = Image.open(io.BytesIO(
    base64.decodebytes(bytes(base64_str, "utf-8"))))
    img.save('original.png')


    response = openai.Image.create_variation(
        image=open("original.png", "rb"),
        n=1,
        response_format="b64_json",
        size="256x256"
    )
    return jsonify({"url": response['data'][0]['b64_json']})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8888", debug=True)
