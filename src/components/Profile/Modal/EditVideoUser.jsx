import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../../firebase'
import { API } from '../../../redux/userAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color:${({ theme }) => theme.text};
    z-index: 3;
`
const BG = styled.div`
    background-color: #000;
    opacity: 0.9;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;

`
const Wrapper = styled.div`
    min-height: 550px;
    width: 738px;
    background-color: ${({theme }) => theme.bg};
    color:${({ theme }) => theme.text};
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap:10px;
    position: relative;
    padding: 20px 50px;
`
const Title = styled.h1`
    text-align: center;
    color: ${({ theme }) => theme.text};
`
const Close = styled.div`
    position: absolute;
    top: 10px;
    right:10px;
    cursor: pointer;
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
const EditVideoUser = ({ dataEdit, setOpenEdit,setDataEdit }) => {
  const [img,setImg]=useState(undefined)
  const [video, setVideo] = useState(undefined)
  const [videoLoad,setVideoLoad] = useState(0)
  const [imgLoad,setImgLoad] = useState(0)
  const [inputs, setInputs] = useState({
    title: dataEdit.title,
    desc:dataEdit.desc,
  })
  const [tags,setTags] = useState(dataEdit.tags.join(','))
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
    
    const res = await API.put(`/videos/${dataEdit._id}`, { ...inputs, tags });
    setOpenEdit(false);
    if (res.status === 200) {
      toast.success('Videos has been edited');
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
    <>
      <BG/>
    <Container>
      <Wrapper>
        <Close onClick={() => setOpenEdit(false)} >
          <CloseOutlinedIcon fontSize='large' />
        </Close>
        <Title>Update Video</Title>
        <Label>Video:</Label>
        {videoLoad > 0
          ?
          (`Uploading: ${videoLoad} %`)
          :
          <Input type={'file'} onChange={(e) => setVideo(e.target.files[0])} accept='video/*' />
        }
        <Input type={'text'} value={inputs.title} name='title' onChange={handleChange} placeholder='Title' />
        <Desc placeholder='Description' value={inputs.desc} name='desc'  onChange={handleChange} rows={8} />
        <Input type={'text'} value={tags} onChange={handleAddTags} placeholder='Tags' />
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
        </>
  )
}

export default EditVideoUser
