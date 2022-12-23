import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from './Card'
import { API } from '../redux/userAPI'

const Container = styled.div`
  height:auto;
  display:flex;
  flex-direction:column;
  gap:10px;
  padding:10px 1px;
  @media (max-width:600px){
    padding:0px 5px;
    
  }
`
const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState({});
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await API.get(`/videos/tags?tags=${tags}`);
      if (res.status === 200) {
        setVideos(res.data);
      }
    }
    fetchVideos();
  },[tags])
  return (
    <Container>
      {videos.length > 0
        ?
        videos.map(video => (
          <Card key={video._id} video={video} type='sm' />
        ))
        :
        <></>
      }
    </Container>
  )
}

export default Recommendation
