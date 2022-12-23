import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getListUserSub } from '../../redux/features/profileSlice'
import avatar from '../../img/tải xuống.jpg'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  padding:10px 25px;
  grid-gap:20px;
`
const ChannelImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius:50%;
  object-fit: cover;
`
const ChannelName = styled.h3`
  color:${({theme})=>theme.text};
`
const Channel = styled.div`
  display:flex;
  flex-direction: column;
  gap:10px;
  justify-content: center;
  align-items: center;
  padding:10px;
  height: 200px;
`
const Title = styled.h4`
    color:${({ theme }) => theme.text};
`
const SubUser = () => {
  const { currentUser } = useSelector(state => state.user);
  const { UsersSub } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListUserSub());
  }, [currentUser._id])
  console.log(UsersSub.username);
  return (
    <Container>
      {UsersSub?.length===0&& <Title >You don't sub any video</Title>}
      {UsersSub?.length > 0 && UsersSub.map(user => (
        <Channel key={user._id} >
          <ChannelImg src={user.img?user.img:avatar } />
          <ChannelName>{user.username}</ChannelName>
        </Channel>
        ))}
    </Container>
  )
}

export default SubUser
