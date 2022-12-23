import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { API } from '../redux/userAPI'
import { format } from 'timeago.js';
import avatar from '../img/tải xuống.jpg'
const Container = styled.div`
  display: flex;
  gap:15px;
  margin:40px 7px; 
`
const Avatar = styled.img`
    width:35px;
    height:35px;
    object-fit: cover;
    border-radius:50%;
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap:7px;
`
const Name = styled.span`
    font-size:15px;
    color: ${({ theme }) => theme.text};
    font-weight:500;
    @media (max-width:600px){
      font-size:12px;
    }
`
const Date = styled.span`
    font-size:11px;
    color: ${({ theme }) => theme.textDetails};
    font-weight:600;
    margin-left:10px;
    @media (max-width:600px){
      font-size:9px;
    }
`
const Text = styled.span`
    font-size:13px;
    color: ${({ theme }) => theme.text};
    word-spacing: 0.5px;
    width:90%;
    text-align: justify;
    @media (max-width:600px){
      font-size:10px;
    }
` 
const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserComment = async() => {
      const res = await API.get(`/users/find/${comment?.userId}`);
      setUser(res.data);
    };
    fetchUserComment();
  },[comment._id])
  return (
    <Container>
      <Avatar src={user.img?user.img:avatar} />
      <Details>
        <Name>{user?.username}<Date>{format(comment.createdAt)}</Date></Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  )
}

export default Comment