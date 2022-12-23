import React from 'react'
import styled from 'styled-components'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import { useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'
import { API } from '../redux/userAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #050505;
    display: flex;
    align-items: center;
    justify-content: center;
    color:${({ theme }) => theme.text};
    z-index: 1;
`
const Wrapper = styled.div`
    min-height: 550px;
    width: 738px;
    background-color: #212121;
    color:${({ theme }) => theme.text};
    z-index: 99;
    display: flex;
    flex-direction: column;
    gap:10px;
    position: relative;
    padding: 20px 50px;
    @media (max-width:600px){
      width: 100vw;
      height: 90vh;
      padding:20px 20px;
    }

`
const Title = styled.h1`
    text-align: center;
    @media (max-width:600px){
      font-size: 22px;
    }
`
const Close = styled.div`
    position: absolute;
    top: 10px;
    right:10px;
    cursor: pointer;
    @media (max-width:600px){
      top: 20px;
    }
`
const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.hr};
    color: ${({ theme }) => theme.text};
    border-radius:5px;
    padding: 10px 15px ;
    background-color: transparent;
    cursor: pointer;
`
const Desc = styled.textarea`
    border: 1px solid ${({ theme }) => theme.hr};
    color: ${({ theme }) => theme.text};
    border-radius:5px;
    padding: 10px 15px;
    background-color: transparent;
    cursor: pointer;
`
const Button = styled.button`
    border-radius:5px;
    border:none;
    padding: 10px 20px;
    font-weight:500;
    cursor: pointer;
    background-color: ${({ theme }) => theme.hr};
    color:${({ theme }) => theme.text};
    &:hover{
      background-color: ${({ theme }) => theme.textDetails};
    }
`
const Label = styled.label`
    font-size:14px;
`
const Upload = ({ setOpen }) => {
  const [img,setImg]=useState(undefined)
  const [video, setVideo] = useState(undefined)
  const [videoLoad,setVideoLoad] = useState(0)
  const [imgLoad,setImgLoad] = useState(0)
  const [inputs,setInputs] = useState({})
  const [tags,setTags] = useState([])
  //Upload file 
  const upLoadFile = (file,urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() +file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === 'imgUrl' ? setImgLoad(Math.round(progress)) : setVideoLoad(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;
    }
  }, 
  (error) => {},
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setInputs(pre => {
        return { ...pre, [urlType]: downloadURL }
      })
      });
  });}
  const navigate = useNavigate();
  const handleUpload = async(e) => {
    e.preventDefault();
    if (!img || !video || !inputs) {
      toast.error('Please select a video or a video file');
      return;
    }
    const res = await API.post('/videos', { ...inputs, tags });
    setOpen(false);
    if (res.status === 201) {
      toast.success('Videos uploaded successfully');
      navigate(`/videos/${res.data._id}`);
    }
  }
  const handleAddTags = (e) => {
    setTags(e.target.value.split(","));
  }
  useEffect(() => {
    video&&upLoadFile(video,'videoUrl');
  },[video])
  useEffect(() => {
    img&&upLoadFile(img,'imgUrl');
  }, [img])
  const handleChange = (e) => {
    setInputs(pre => {
      return { ...pre, [e.target.name]: e.target.value }
  })
  }
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)} >
          <CloseOutlinedIcon fontSize='large' />
        </Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoLoad > 0
          ?
          (`Uploading: ${videoLoad} %`)
          :
          <Input type={'file'} onChange={(e) => setVideo(e.target.files[0])} accept='video/*' />
        }
        <Input type={'text'} name='title' onChange={handleChange} placeholder='Title' />
        <Desc placeholder='Description' name='desc'  onChange={handleChange} rows={8} />
        <Input type={'text'} onChange={handleAddTags} placeholder='Tags' />
        <Label>Image:</Label>
        {imgLoad > 0
          ?
          (`Uploading: ${imgLoad} %`)
          :
          <Input type={'file'} onChange={(e) => setImg(e.target.files[0])} accept='image/*' />
        }
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  )
}

export default Upload
