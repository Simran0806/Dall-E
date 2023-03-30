import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { TypeAnimation } from 'react-type-animation';



import { editImage, generateImage, generateVariations } from './Utils/utilFunctions'
import Edit from './pages/Edit'
import BG from './component/BG';



function App() {


  const getImg = async () => {

    if (prompt.length) {

      setLoading(true)
      const temp = await generateImage(prompt)
      //console.log(url)
      setUrl(temp)
      setLoading(false)
    }
    else {
      alert("please enter a valid prompt")
    }

  }
  const getVariations = async () => {


    setLoading(true)
    const temp = await generateVariations(url)
    setUrl(temp)
    setLoading(false)

  }
  const getEdited = async (url) => {

    setUrl(url)

  }




  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className='main-container'>


      <h1>DALL-E</h1>

      <div>
        <TypeAnimation
          sequence={[
            'your text prompts to images',
            1000, // Waits 1s
            'unleash your imagination',
            1000, // Waits 2s

          ]}
          wrapper="h2"
          cursor={true}
          repeat={Infinity}
        />
      </div>

      <div className='prompt-container'>
        <input onKeyDown={(e) => {
          if (e.key == "Enter" && !loading) {
            getImg(prompt)
          }
        }} placeholder='a 3D render of a alien using an iphone' type="text" onChange={(e) => { setPrompt(e.target.value) }} style={{ "color": "white" }} />
        <button disabled={loading} onClick={getImg} style={{ "color": "white" }}>Generate</button>
      </div>



      <div className='generated-image-container'>
        <img src={`data:image/png;base64,${url}`} alt="" />
      </div>
      {
        url &&
        <button onClick={() => { setEdit(!edit) }} style={{ "color": "white" }}>EDIT IMAGE</button>
      }
      {url && <div className='options'>
        <button onClick={() => { getVariations() }} >VARIATIONS</button>
      </div>}

      {loading && <div>
        <TypeAnimation
          sequence={[
            'connecting to DALL-E',
            500,
            'painting image',
            500,
            'almost done',
            500,
            '............',
            500,

          ]}
          wrapper="h2"
          cursor={true}
          repeat={Infinity}
        />
      </div>}

      {
        edit &&
        <Edit prompt={prompt} setLoading={setLoading} setEdit={setEdit} getEdited={getEdited} />
      }

      <BG />
    </div>
  )
}

export default App
