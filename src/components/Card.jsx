import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'timeago.js';
import avatar from '../img/tải xuống.jpg'
const Container = styled.div`
  margin-bottom: 10px;
  padding-bottom: 20px;
  width: 100%;
  height:${(props) => props.type === 'sm'?"100px":"260px"} ;
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && "grid"};
  grid-gap: ${(props) => props.type === 'sm'&& "10px"};
  grid-template-columns:${(props) => props.type === 'sm' && "2fr 3fr"};
  @media (max-width:900px) {
    
  }
  `
const Image = styled.img`
  width: 100%;
  height:${(props) => props.type === 'sm' ? "100px":"65%"} ;
  object-fit:cover;
  border-radius:2px;
`
const Details = styled.div`
  display: ${(props) => props.type!=='sm'&&"grid"};
  grid-template-columns:${(props) => props.type!=='sm'&&"1fr 5fr"}; 
  margin-top:6px;
  padding:0 2px;
  gap:12px;
`
const ChannelImage = styled.img`
  display:${(props) => props.type==='sm'&&"none"};
  margin-top:4px;
  width:36px;
  height:36px;
  background-color:#999;
  border-radius:50%;
  object-fit: cover;
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap:${(props) => props.type==='sm'?"4px":"3px"};
`
const Title = styled.h1`
  font-size:${(props) => props.type==='sm'?"13px":"14px"};
  font-weight:700;
  color:${({ theme }) => theme.text};
`
const ChannelName = styled.h2`
  font-size:${(props) => props.type==='sm'?"11px":"12px"};
  color:${({ theme }) => theme.textDetails};
  `
const Info = styled.div`
  font-size:${(props) => props.type==='sm'?"10px":"11px"};
  color:${({ theme }) => theme.textDetails};
  
`
const Card = ({ type, video }) => {
    const [channel, setChannel] = useState([]);
    useEffect(() => {
      const fetchChannel = async () => {
        const res = await axios.get(`http://localhost:8080/api/users/find/${video.userId}`);
        setChannel(res.data);
    }
    fetchChannel();
    }, [video?.userId]);
  return (
        <Link to={`/videos/${video?._id}`} style={{textDecoration:'none'}}>
    <Container type={type}  >
        <Image type={type} src={video?.imgUrl} />
        <Details type={type} >
          { !channel.img?
          <ChannelImage type={type} src={avatar} />
            :
          <ChannelImage type={type} src={channel.img} />
          }
          <Text type={type}>
            <Title type={type} >{video?.title}</Title>
            <ChannelName type={type}>{channel?.username}</ChannelName>
            <Info>{video?.views} views • {format(video?.createdAt) }</Info>
          </Text>
        </Details>
      </Container>
    </Link>
  )
}

export default Card