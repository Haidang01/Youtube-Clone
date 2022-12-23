import React, { useState } from 'react'
import styled from 'styled-components'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { addView, dislike, getVideoId, like, setCurrentVideoNull, setVideoNull } from '../redux/features/videoSlice';
import { API } from '../redux/userAPI';
import { format } from 'timeago.js';
import { subscription } from '../redux/features/userSlice';
import Recommendation from '../components/Recommendation';
import { toast } from 'react-toastify';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { saved } from '../redux/features/profileSlice';
const Container = styled.div` 
  display: grid;
  grid-template-columns: 3fr 2fr;
  color:${({ theme }) => theme.text};
  padding:  20px 30px 20px 60px;
  grid-gap:30px;
  @media (max-width:600px){
    display: flex;
    width: 100vw;
    padding:0;
    flex-direction:column;
  }
  height:auto;
`
const Content = styled.div`
  height:auto;
  @media (max-width:600px){
    width:100%;
  }
`
const VideoWrapper = styled.div`
    width:100%;
    height:65vh;
    @media (max-width:600px){
      width: 100vw;
      height:35vh;
    }
`
const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
  margin-top: 30px;
  @media (max-width:600px){
    width:90vw;
    margin-left:10px;
  }

`
const Info = styled.span`
  color:${({ theme }) => theme.textDetails};
  font-size: 12px;
  @media (max-width:600px){
      font-size: 10px;
    }

`
const InfoChannel = styled.div`
    display: flex;
    gap:5px;
    flex-direction: column;
    
`
const Buttons = styled.div`
    display:flex;
    justify-content:space-between;
    color:${({ theme }) => theme.text};
    padding: 0 10px;
    @media (max-width:600px){
      overflow-x:scroll;
      width:100vw;
      gap:10px;
    }

`
const Button = styled.button`
    background-color:${({ theme }) => theme.bgLighter};
    border:none;
    cursor: pointer;
    padding:10px 1px ;
    color:${({ theme }) => theme.text};
    display: flex;
    align-items: center;
    gap:5px;
    font-size:17px;
    font-weight:600;
    @media (max-width:600px){
      display: flex;
      font-size:14px;
    }
`
const DetailsChannel = styled.div`
    display:flex;
    flex-direction:column;
    gap:20px;
    padding: 10px 0;
    @media (max-width:600px){
      padding: 10px 10px;
    }

`
const Channel = styled.div`
    display:flex;
    gap:20px;
    margin:5px 2px;
    @media (max-width:600px){
      gap:8px;
    }
`
const AvatarChannel = styled.img`
    width:40px;
    height:40px;
    object-fit: cover;
    border-radius:50%;
`
const ChannelName = styled.h1`
    font-size:16px;
    font-weight:500;
    color:${({ theme }) => theme.text};
    @media (max-width:600px){
      font-size:13px;
    }

`;
const Subscribe = styled.button`
    background-color:#cc0000;
    color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:10px 1px;
    border-radius:5px;
    font-size: 16px;
    border:none;
    font-weight:500;
    width:120px;
    height:40px;
    margin-right:10px;
    cursor:pointer;
    @media (max-width:600px){
      font-size: 11px;
      width:90px;
      height:35px;
    }

`
const Div = styled.div`
    display:flex;
    width:100%;
    justify-content: space-between;
`
const Description = styled.p`
    font-size:14px;
    padding: 5px 80px 5px 60px;
    font-weight:600;
    color:${({ theme }) => theme.text};
    @media (max-width:600px){
      padding:0px 2px;
    }
`;

const Hr = styled.hr`
  width:100%;
  margin:10px 1px;
  border:0.6px solid ${({theme})=>theme.hr};
`
const Views = styled.span`
  color:${({ theme }) => theme.textDetails};
  font-size:12px;
  margin-left:5px;
   @media (max-width:600px){
    width:90vw;
    margin-left:10px;
  }
`
const VideoFrame = styled.video`
  width:100%;
  height:100%;
  background-color:#ccc;
  object-fit:cover;
`
const Likes = styled.div`
display: flex;
`
const Video = () => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split('/')[2];
  const { currentVideo } = useSelector(state => state.video);
  const { VideosSaved } = useSelector(state => state.profile);
  useEffect(() => {
    dispatch(getVideoId(path))
    const fetchData = async () => {
      //Add Views
      const res = await API.put(`/videos/view/${currentVideo?._id}`)
      res.status === 200 && dispatch(addView(currentVideo.views + 1));
      // Get channel user
      const channelRes = await API.get(`/users/find/${currentVideo.userId}`);
      setChannel(channelRes.data);
    }
    currentVideo && fetchData();
  }, [path, currentVideo?.userId, currentVideo?._id])
  //LIKE VIDEO
  const handleLike = async () => {
    
    await API.put(`/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id));
  }
  const listId = VideosSaved.map(item => item._id);
  // DISLIKE VIDEO
  const handleDislike = async () => {
    await API.put(`/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id));
  }

  // SUBSCRIPTION
  
  const handleSub = async () => {
    if (!currentUser) {
      toast.error('Login for SUBSCRIBE');
      return;
    }
    currentUser.subscribedUsers.includes(channel._id)
      ?
      await API.put(`/users/unsub/${channel._id}`)
      :
      await API.put(`/users/sub/${channel._id}`);
    
    dispatch(subscription(channel._id));
  }
  //SAVE VIDEO
  const handleSave = async () => {
    if (!currentUser) {
      toast.error('Login for Save');
      return;
    }
    if (listId.includes(currentVideo._id)) {
      await API.put(`/videos/unsave/${currentVideo._id}`)
    } else {
      await API.put(`/videos/save/${currentVideo._id}`);
      toast.success('Saved video successfully');
    }
    
    dispatch(saved(currentVideo));
  }
  return (
    <Container >
      <Content>
        <VideoWrapper>
            <VideoFrame src={currentVideo?.videoUrl} controls/>          
        </VideoWrapper>
        <Title>{currentVideo?.title} </Title>
        <Views>{currentVideo?.views} views • {format(currentVideo?.createdAt)} </Views>
        <Buttons>
          <Button onClick={handleLike} >
            {
              currentVideo?.likes?.includes(currentUser?._id)
                ?
                  <ThumbUpIcon style={{ fontSize: "27px" }}  />
                :
            
                <ThumbUpOutlinedIcon style={{ fontSize: "27px" }} />
            }
            {currentVideo?.likes.length === 0 ? '' : currentVideo?.likes.length}
            <Likes>
            Like
            </Likes>
          </Button>
          <Button  onClick={handleDislike} >
            {currentVideo?.dislikes?.includes(currentUser?._id) ?
              <ThumbDownIcon style={{ fontSize: "27px" }} />
              :
              <ThumbDownOutlinedIcon style={{ fontSize: "27px" }} /> 
            }
            {currentVideo?.dislikes.length === 0 ? '' : currentVideo?.dislikes.length}
            <Likes>
              Dislike
            </Likes>
          </Button>
            <Button><ReplyOutlinedIcon/>Share</Button>
            <Button><FileDownloadOutlinedIcon/>Download</Button>
            <Button><ContentCutOutlinedIcon />Clip</Button>
          <Button onClick={handleSave} >
            {listId.includes(currentVideo?._id) ?
              <BookmarkOutlinedIcon/>:
             <BookmarksOutlinedIcon />
          }
            Save
          </Button>
          <Button><MoreHorizOutlinedIcon/></Button>
        </Buttons>
        <Hr />
        <DetailsChannel>
          <Channel>
            <AvatarChannel src={channel.img} />
            <Div>
              <InfoChannel>
                <ChannelName>{channel.username}</ChannelName>
                <Info>{channel.subscribers} subscribers</Info>
              </InfoChannel>
              <Subscribe onClick={handleSub} >
                {currentUser?.subscribedUsers?.includes(channel?._id)
                  ?
                  'SUBSCRIBED'
                  :
                  'SUBSCRIBE'
                } </Subscribe>
            </Div>
          </Channel>
          <Description>
            {currentVideo?.desc}
          </Description>
        </DetailsChannel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
        <Hr />
      </Content>

      <Recommendation tags={currentVideo?.tags} />
      
    </Container>
  )
}

export default Video
