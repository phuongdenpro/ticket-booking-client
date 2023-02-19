import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import './index.scss';



const UploadImage = (props) => {
  const { onChange, images } = props;
  // const getUrlFromIMG = async (fromData) => {
  //   const data = new FormData();
  //   data.append("images", fromData[0].file, fromData[0].file.name);

  //   const a = await uploadImage(data);
  //   console.log("a", a);
  // };

  // const [images, setImages] = useState([]);
  const maxNumber = 69;
  // const onChange = (imageList, addUpdateIndex) => {
  //   // data for submit
  //   console.log("alo", imageList, addUpdateIndex);
  //   setImages(imageList);

  //   func(imageList);
  // };

  // const func = async (image) => {
  //   console.log("image", image);
  //   function readFileAsync() {
  //     return new Promise((resolve, reject) => {
  //       const file = image;
  //       getUrlFromIMG(file).then((response) => {
  //         if (!response) {
  //           return;
  //         }
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           resolve({
  //             id: response?.data?.id,
  //             url: response?.data?.url,
  //             name: response?.data?.name,
  //             type: "image",
  //           });
  //         };
  //         reader.onerror = reject;
  //         // reader.readAsBinaryString(file);
  //       });
  //     });
  //   }

  //   const temp = await readFileAsync();
  // };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="url"
        acceptType={['jpg', 'png']}
      >
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          <div
            className="upload__image-wrapper"
            style={{
              flexDirection: 'row',
              display: 'flex',
            }}
          >
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <Button className="close" onClick={() => onImageRemove(index)}>
                  <CancelIcon />
                </Button>
                <img src={image.url || image} alt="" width="100" />
              </div>
            ))}

            <div className={imageList.length ? 'view-upload-length' : 'view-upload'}>
              <div
                className="upload-image"
                style={isDragging ? { color: 'red' } : {}}
                onClick={onImageUpload}
                {...dragProps}
              >
                <AddPhotoAlternateOutlinedIcon />
              </div>
              {!imageList?.length && <span className="txt-limit">** kích thước tối đa: 1MB</span>}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default UploadImage;
