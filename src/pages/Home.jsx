import React, { useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import Menu from '../components/Menu'
import { useEffect } from 'react'
import { API } from '../redux/userAPI';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5.7fr;
  padding:7px 10px;
  min-height:90vh;
  @media (max-width:900px) {
    grid-template-columns: 1fr 3fr;
  }
  @media (max-width:600px){
    padding:7px 0px;
    display: flex;
    flex-direction: column;

  };
`
const Videos = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-gap:15px;
  padding:20px 25px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 4fr);
    grid-gap:10px;
    padding-left :40px;
    padding-right:10px;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
   @media (max-width:600px){
    display: flex;
    width:100%;
    flex-direction: column;
    padding:10px 5px;
    margin-right:7px;
  }
`

const Sidebar = styled.div`
  width:100%;
  height:100%;
  left:0;
  bottom:0;
`
const Title = styled.span`
    width:20vw;
    color: ${({ theme }) => theme.text};
    text-align: center;
`
const Home = ({type}) => {
  const [video, setVideo] = useState([]);
  useEffect(() => {
    const fetchVideo = async () => {
        const res = await API.get(`http://localhost:8080/api/videos/${type}`);
      setVideo(res.data);
    }
    fetchVideo();
  }, [type]);
  
  return (
    <Container> 
      <Sidebar>
        <Menu />
      </Sidebar>
      <Videos>
        {type==='sub'&&video.length===0&& <Title>You have not subscribed anyone yet </Title> }
        {video.map((video, index) => (
          <Card key={video._id} video={video} />
        ))}
      </Videos>
    </Container>
  )
}

export default Home