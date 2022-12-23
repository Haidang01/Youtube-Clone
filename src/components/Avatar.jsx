import React, { useState } from 'react'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import styled from 'styled-components';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/userSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { setTheme } from '../redux/features/Theme';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import avatars from '../img/tải xuống.jpg';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap:20px;
  color:${({ theme }) => theme.text};
`
const AvatarUser = styled.img`
    width: ${(props) => props.type==='lg'?"45px":"35px"};
    height:${(props) => props.type==='lg'?"45px":"35px"} ;
    border-radius:50%;
    object-fit: cover;
    background-color:#ccc;
   cursor: pointer;
   position: relative;
`
const Menu = styled.div`
    position: absolute;
    top: 30px;
    right: 70px;
    background-color:${({theme})=>theme.MenuAccount};
    color:${({ theme }) => theme.text};
    width: 300px;
    border-radius:5px;
    height: 520px;
    border:1px solid ${({ theme })=>theme.hr};
    @media (max-width:600px){
      width:auto;
      height:450px;
      right:35px;
    }

    `
const MenuWrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
`
const SectionTheme = styled.div`
    border-radius:5px;
    display:flex;
    align-items: center;
    padding:0 25px;
    width: 100%;
    height: 10%;
    cursor: pointer;
    font-size:14px;
`
const Section = styled.div`
    border-radius:5px;
    display:flex;
    align-items: center;
    padding:0 25px;
    width: 100%;
    height: 9%;
    cursor: pointer;
    font-size:14px;
    &:hover{
      background-color:${({theme})=>theme.hr}
    }
`
const Account = styled.div`
    height:auto;
    display:grid;
    grid-template-columns: 1fr 4fr;
    padding:15px 15px;
    padding-bottom:0;
    grid-gap:10px;
`
const Theme = styled.div``
const InfoAccount = styled.div`
    color:${({ theme }) => theme.text};
    display:flex;
    flex-direction:column;
    gap:3px;
`
const Hr = styled.hr`
  width:100%;
  border:0.6px solid ${({ theme }) => theme.hr};
  margin:2px 0;
`
const Email = styled.span`
    font-size:13px;
`
const ManageAccount = styled.span`
    font-size:14px;
    color:#3ea6ff;
    font-weight:500;
`
const UserName = styled.span`
    font-weight:15px;
    font-weight:500;
`
const Avatar = ({ currentUser,setOpen,open }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { currentTheme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logged out successfully');
  }
  return (
      <Container>
      <VideoCallOutlinedIcon onClick={() => setOpen(!open)} style={{ fontSize: '30px', cursor: 'pointer' }} />
        <NotificationsNoneOutlinedIcon style={{fontSize:'30px', cursor:'pointer'}}/>
      <AvatarUser src={currentUser.img?currentUser.img:avatars} onClick={()=>setOpenMenu(!openMenu)} />
      {openMenu &&
        <Menu>
          <MenuWrapper>
            <Account>
              <AvatarUser type='lg' src={currentUser.img?currentUser.img:avatars} />
              <InfoAccount>
                <UserName>{currentUser.username}</UserName>
                <Email>{currentUser.email}</Email>
                <Link to={`/profile`} onClick={() =>setOpenMenu(false)}  style={{ textDecoration: 'none' }} >
                  <ManageAccount >Manage your Account</ManageAccount>
                </Link>
              </InfoAccount>
            </Account>
            <Hr/>
            <Section onClick={() => { navigate('/profile'); setOpenMenu(false)}}>
                  <ManageAccountsOutlinedIcon style={{ fontSize: '33px', marginRight: '10px' }} /> Manage Account
              </Section>
            <Section><SwitchAccountOutlinedIcon style={{fontSize: '33px',marginRight:'10px'}}/>Switch Account</Section>
            <Section><LibraryBooksOutlinedIcon style={{fontSize: '33px',marginRight:'10px'}}/>Youtube studio</Section>
            <Section onClick={handleLogout} >
              <LogoutOutlinedIcon style={{fontSize: '33px',marginRight:'10px'}} /> Sign out
            </Section>
            <Hr/>
            <SectionTheme >
              <DarkModeOutlinedIcon style={{ fontSize: '33px', marginRight: '10px' }} />
              Appearance:
              <Theme onClick={() => dispatch(setTheme(!currentTheme))} style={{ marginTop: '5px'}} >
              {!currentTheme?<ToggleOffOutlinedIcon style={{fontSize: '40px',marginLeft:'40px'}}/>:<ToggleOnOutlinedIcon style={{fontSize: '40px',marginLeft:'40px'}}/> }
              </Theme>
            </SectionTheme>
            <Section><TranslateOutlinedIcon style={{fontSize: '33px',marginRight:'10px'}}/>Language</Section>
            <Section><LanguageOutlinedIcon style={{fontSize: '33px',marginRight:'10px'}}/>Location</Section>
            <Section><HelpOutlineOutlinedIcon style={{fontSize: '33px',marginRight:'10px'}}/>Help</Section>
            <Section><FeedbackOutlinedIcon style={{fontSize: '33px',marginRight:'10px'}}/>Help</Section>
          </MenuWrapper>
        </Menu>
      }
      </Container>  
  )
}

export default Avatar
