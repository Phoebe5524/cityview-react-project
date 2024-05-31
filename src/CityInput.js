import {useEffect, useState} from "react";
import {AccessKey, BasicUrl, DefaultCity} from "./consts";
import axios from "axios";
import './CityInput.scss'

export const CityInput = ({cbUpdateImages}) => {
    // event handler for key down
    const [city, setCity] = useState(DefaultCity)
    const [images, setImages] = useState([])
    const cbInput = (evt) => {
        let newCity = evt.target.value.trim().toLowerCase()

        evt.key === 'Enter' &&
        newCity !== city &&
        (() => {
            // let city = evt.target.value.trim().toLowerCase()
            // console.log('new city input: ', city)
            setCity(newCity)
            console.log('new city', city, newCity)
            fetchCity(newCity)
        })()
    }

    useEffect(() => {fetchCity(DefaultCity)}, [])

    const fetchCity = newCity =>
        // axios third party library
        axios.get(BasicUrl, {
            params: {
                query: newCity,
                orientation: 'landscape',
            },
            headers: {
                Authorization: `Client-ID ${AccessKey}`
            }
        }).then(res => {
            console.log('raw data: ', res)
            let {data: {results}} = res
            console.log('results===> ', results)

            let imageList = results.map(item => ({
                des: item.alt_description,
                regular: item.urls.regular,
                thumb: item.urls.thumb
            }))

            console.log('tidy data: ', imageList)
            setImages(imageList)
            cbUpdateImages(imageList)
        }).catch(err => console.log('fetch city http error!', err))


    return <>
        <h2 className='cityName'>New City: {city}</h2>
        <input type="text"
               className='inputCity'
               placeholder="Search City here..."
               onKeyDown={cbInput}
        />
    </>

    {/*{JSON.stringify(images)}*/}

}