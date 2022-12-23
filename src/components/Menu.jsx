import React, { useState } from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/features/Theme';
const Container = styled.div`
    background-color: ${({ theme }) => theme.bg};
    height: 100vh;
    color: ${({theme})=>theme.text};
    font-size:14px;
    top:10vh;
    position:fixed;
    left:0;
    bottom:0;
    border-right:1px solid ${({ theme }) => theme.hr};
    @media (max-width: 900px) {
      top:7vh;
      left:0;
    }
    @media (max-width: 600px) {
      position:fixed;
      height:10vh;
      bottom:0;
      width:100vw;
      top:90vh;
      bottom:0;
    }
`
const Wrapper = styled.div`
    padding: 18px 15px;
    width: 100%;
    @media (max-width: 600px) {
      display: flex;
      position:fixed;
      padding:0px;
      overflow-x:scroll;
      top:90vh;
      bottom:0;
    }

`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap:20px;
  cursor:pointer;
  padding:8px 15px;
  height: 60px;
  height: auto;
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
  margin:10px 0;
  width:100%;
  border:0.6px solid ${({theme})=>theme.hr};
    @media (max-width: 600px) {
      display:none;
    }
  `
const Text = styled.div``
const Menu = () => {
  const { currentTheme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  return (
    <Container>
      <Wrapper>
        <Link to='/' style={{ textDecoration: 'none',height:'10vh' }} >
          <Item>
            <HomeIcon/>
            <Text>Home</Text>
          </Item>
        </Link>
        <Link to='/trends' style={{ textDecoration: 'none',height:'10vh' }} >
          <Item>
            <ExploreOutlinedIcon />
            <Text>Trends</Text>
          </Item>
        </Link>
       
        <Link to='/sub' style={{ textDecoration: 'none',height:'10vh' }} >
          <Item>
            <SubscriptionsOutlinedIcon/>
            <Text>Subs</Text>
          </Item>
        </Link>
        <Hr/>
        <Item>
          <VideoLibraryOutlinedIcon/>
            <Text>Library</Text>
        </Item>
        <Link to={`/tags/music`} style={{ textDecoration: 'none',height:'10vh' }} >
          <Item  >
            <LibraryMusicOutlinedIcon/>
            <Text>Music</Text>
          </Item>
        </Link>
        <Link to={`/tags/sports`} style={{ textDecoration: 'none',height:'10vh' }} >
          <Item>
            <SportsBasketballOutlinedIcon/>
            <Text>Sports</Text>
          </Item>
        </Link>
        <Link to={`/tags/game`} style={{ textDecoration: 'none',height:'10vh' }} >
        <Item>
          <SportsEsportsOutlinedIcon/>
            <Text>Gaming</Text>
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
          <HelpOutlineOutlinedIcon />
            <Text>Help</Text>
        </Item>
        <Item onClick={()=>dispatch(setTheme(!currentTheme))} >
          <SettingsBrightnessOutlinedIcon/>
           {currentTheme?"Dark Mode":"Light Mode"}
        </Item>
      </Wrapper>
    </Container>
  )
}

export default Menu
