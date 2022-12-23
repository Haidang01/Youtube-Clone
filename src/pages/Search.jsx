import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Menu from '../components/Menu'
import { API } from '../redux/userAPI'
import Card from '../components/Card'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5.7fr;
  padding:7px 10px;
  min-height:90vh;
`
const Videos = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-gap:15px;
  padding:20px 25px;
`

const Sidebar = styled.div`
  width:10vw;
  height:100%;
  left:0;
  bottom:0;
`
const Title = styled.span`
    color: ${({ theme }) => theme.text};
    width:100%;
    align-items: center;
`

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await API.get(`/videos/search${query}`);
      setVideos(res.data);
    }
    fetchVideos();
  }, [query])
  
  return (
    <Container> 
      <Sidebar>
        <Menu />
      </Sidebar>
      <Videos>
        {videos.length===0&& <Title>Your search did not match any videos. </Title> }
        {videos.map((video, index) => (
          <Card key={video._id} video={video} />
        ))}
      </Videos>
    </Container>
  )
}

export default Search
