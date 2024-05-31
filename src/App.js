import logo from './logo.svg';
import './App.css';
import {CityInput} from "./CityInput";
import ImageList from "./ImageList";
import {useEffect, useState} from "react";

function App() {
  const [images, setImages] = useState([])
  const [bgImage, setBgImage] = useState('')
  const [bgdes, setBgdes] = useState('Loading...')

  useEffect(() => {
     const description= !!bgImage && bgImage?.des && bgImage.des ? bgImage.des.charAt(0).toUpperCase() + bgImage.des.slice(1) : 'Loading...'
    setBgdes(description)
  }, [bgImage]);

  // why charAt(0) is () not []

  useEffect(() => {
    images.length > 0 && setBgImage(images[0])
  }, [images])

  const updateImages = newImages => setImages(newImages)
  const updateBG = img => {
    console.log('new background image set by ImageList component', img)
    setBgImage(img)
  }

  return <div className='App' style={{background: bgImage && bgImage.regular && `url('${bgImage.regular}') no-repeat center center/cover fixed`}}>
    <div className='description'>
      {bgdes}
    </div>
    <div className='searchBar'>
      <CityInput cbUpdateImages={updateImages}/>
    </div>

    <ImageList images={images} updateBG={updateBG}/>
  </div>

}

export default App;
