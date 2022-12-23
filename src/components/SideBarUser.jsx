import React, { useState } from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/features/Theme';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';

const Container = styled.div`
    background-color: ${({ theme }) => theme.bg};
    height: 100%;
    width: 100%;
    color: ${({theme})=>theme.text};
    font-size:14px;
    top:10vh;
    left:0;
    border-right:1px solid ${({ theme }) => theme.hr};
    @media (max-width: 600px) {
      position:fixed;
      height:10vh;
      bottom:0;
      top:7vh;
      z-index:99;
      width:100vw;
    }
    `
const Wrapper = styled.div`
    width: 100%;
    padding: 18px 15px;
    @media (max-width: 600px) {
      display: flex;
      padding:0px;
      overflow-x:scroll;
    }
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap:20px;
  cursor:pointer;
  padding:8px 15px;
  color: ${({ theme }) => theme.text};
  &:hover{
    background-color: ${({ theme }) => theme.hoverItem};
  }
  @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
      gap:0;
      align-items: center;
      padding:10px 12px;
    }
  `
const Hr = styled.hr`
    // @media (max-width: 600px) {
    //   display:none;
    // }
  margin:10px 0;
  border:0.6px solid ${({theme})=>theme.hr};
`
const Text = styled.div``

const SideBarUser = () => {
  return (
    <Container>
      <Wrapper>
        <Link to='/profile' style={{ textDecoration: 'none' }} >
          <Item>
            <HomeIcon/>
            <Text>Home</Text>
          </Item>
        </Link>
        <Link to='/profile/video' style={{ textDecoration: 'none' }} >
          <Item>
          <VideoLibraryOutlinedIcon/>
            <Text>Video</Text>
          </Item>
        </Link>
        <Link to='/profile/sub' style={{ textDecoration: 'none' }} >
          <Item>
            <SubscriptionsOutlinedIcon/>
            <Text>Subs</Text>
          </Item>
        </Link>
        <Hr />
        <Link to='/profile/saved' style={{ textDecoration: 'none' }} >
        <Item>
          <BookmarksOutlinedIcon/>
            <Text>Saved</Text>
        </Item>
        </Link>
        <Link to={`/profile/liked`} style={{ textDecoration: 'none' }} >
          <Item  >
            <ThumbUpOffAltOutlinedIcon/>
            <Text>Liked</Text>
          </Item>
        </Link>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
            <Text>Settings</Text>
        </Item>
        <Item>
          <FlagOutlinedIcon />
            <Text>Report</Text>
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon/>
            <Text>Help</Text>
        </Item>
        <Item>
          <InfoOutlinedIcon/>
            <Text>About</Text>
        </Item>
      </Wrapper>
    </Container>
  )
}

export default SideBarUser;
