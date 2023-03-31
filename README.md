
# DALL E 

A Web Application implementing the features of OpenAi Dall E.




## Installation

Clone the repository


```bash
cd DALL-E

cd frontend
  yarn
  yarn dev

cd ..
cd backend
    pip install -r requirements.txt
    python3 index.py
    make sure to create a .env file and add your OpenAi api key as
    API_KEY=your api key
```
## API Reference

All these endpoints are in the backend/index.py

    Before using this, refer to the documentations provided below to get your API_KEY.

#### Generate Image by prompt

```http
  POST /generateImage
```
    This will return a base64_string of the generated image.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `prompt` | `string` | **Required**|


#### Edit Image

```http
  POST /edit
```
    This will return a base64_string of the edited image.

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `prompt`      | `string` | **Required** |
| `original image`      | `base64_string` | **Required** |
| `mask_image`      | `base64_string` | **Required** |


#### Generate Variations Of The Image

```http
  POST /varations
```
    This will return a base64_string of the edited image.

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `original image`      | `base64_string` | **Required** |

    This will return a base64_string of a variation of the existing image.




## Documentation

[OpenAi Documentation](https://platform.openai.com/docs/api-reference/introduction)

[DALL E Image Documentation](https://platform.openai.com/docs/api-reference/images)


