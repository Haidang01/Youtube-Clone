import React, { useState } from 'react'
import styled from 'styled-components'
import Card from '../Card'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { getListVideoSaved } from '../../redux/features/profileSlice'

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
  }
`
const Item = styled.div`
  width:100%;
  height:100%;
  position:relative;
  color:${({theme})=>theme.textSoft}
`
const Title = styled.h4`
    color:${({ theme }) => theme.text};
`
const VideoSaved = () => {
  const { currentUser } = useSelector(state => state.user);
  const { VideosSaved } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListVideoSaved());
  }, [currentUser._id])
  return (
    <Container>
      {VideosSaved&& VideosSaved.length === 0 && <Title >You don't save any video</Title>}
      {VideosSaved&& VideosSaved.length > 0 && VideosSaved.map(video => (
        <Item key={video._id}>
          <MoreHorizOutlinedIcon style={{position:'absolute',top:'5px',right:'10px'}}/>
          <Card video={video} />
        </Item>
      ))}
    </Container>
  )
}

export default VideoSaved
