import React, { useState } from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideos } from '../../redux/features/profileSlice'
import CardVideo from './CardVideo'
import EditVideoUser from './Modal/EditVideoUser'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-gap:15px;
  padding:20px 25px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 4fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 4fr);
    width:100vw;
  }
`

const VideoUser = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit,setDataEdit] = useState({});
  const { currentUser } = useSelector(state => state.user);
  const { AllUserVideos } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideos());
  }, [currentUser._id])
  return (
    <Container>
      {AllUserVideos&& AllUserVideos.length === 0 && <p>You don't have any videos</p>}
      {AllUserVideos && AllUserVideos.length > 0 && AllUserVideos.map(video => (
        <CardVideo
          key={video._id}
          setDataEdit={setDataEdit}
          setOpenEdit={setOpenEdit}
          video={video}
          
        />
      ))}
      {AllUserVideos && AllUserVideos.length > 0 && AllUserVideos.map(video => (
        <CardVideo
          key={video._id}
          setDataEdit={setDataEdit}
          setOpenEdit={setOpenEdit}
          video={video}
          
        />
      ))}
      {AllUserVideos && AllUserVideos.length > 0 && AllUserVideos.map(video => (
        <CardVideo
          key={video._id}
          setDataEdit={setDataEdit}
          setOpenEdit={setOpenEdit}
          video={video}
          
        />
      ))}
      
      {
        openEdit
        &&
        <EditVideoUser
        setOpenEdit={setOpenEdit}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        />
      }
    </Container>
  )
}

export default VideoUser
