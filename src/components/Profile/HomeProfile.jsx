import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import avatar from '../../img/tải xuống.jpg'
const Wrapper = styled.div`
  padding:30px 20px;
  @media (max-width:600){
    width:100vw;
  }
`
const PublicInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:20px;
`
const Avatar = styled.img`
    width:110px;
    height:110px;
    border-radius:50%;
    object-fit: contain;
`
const Title = styled.h2`
    font-weight: 500;
    color:${({theme})=>theme.text}
    `
const Span = styled.span`
    color:${({theme})=>theme.text}
`
const HomeProfile = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <Wrapper>
        <PublicInfo>
          <Avatar src={currentUser.img?currentUser.img:avatar} />
          <Title>Welcome, {currentUser.username}</Title>
          <Span>Manage your info, privacy and security to make Google work better for you.</Span>
      </PublicInfo>
      </Wrapper>
  )
}

export default HomeProfile
