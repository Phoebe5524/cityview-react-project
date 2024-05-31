import './ImageList.scss'

const ImageList = ({images, updateBG}) => { //{ }叫啥
    return <div className='carousel'>
        {
            images && images.map((img, index) =>
                <div key={index}
                     onClick={() => updateBG(img)}
                     style={{background: `url('${img.thumb}') no-repeat center center/cover fixed`}}></div>)
        }
    </div>
}
//weishenme jia { } yao return
export default ImageList