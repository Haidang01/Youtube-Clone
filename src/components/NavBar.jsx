import React, { useState } from 'react'
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logo from '../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from './Avatar';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import Upload from './Upload';
const Container = styled.div`
  position: fixed;
  top: 0;
  background-color:${({ theme }) => theme.bg};
  height:10vh;
  width: 100%;
  z-index:1;
  border-bottom:0.5px solid ${({ theme }) => theme.hr};
  @media (max-width: 500px) {
    height:15vh;
    margin-bottom:0;
  }
  @media (max-width: 900px) {
    height:7vh;
  }
  `
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height:100%;
  padding:0 30px;
  justify-content:space-between;
  @media (max-width:600px){
    padding:10px 15px;
  }
  @media (max-width: 900px) {
    padding:10px 20px;
  }
`
const Logo = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:5px;
  font-weight: bold;
  font-size:18px;
  color:${({ theme }) => theme.logo};
  border:none;
`
const Img = styled.img`
  height: 25px;
`
const Search = styled.div`
  display: flex;
  align-items: center;
  width:45%;
  height:70%;
  margin-left:60px;
  color:${({ theme }) => theme.text};
  
  @media (max-width: 900px) {
    height:80%;
  }
  @media (max-width:600px){
    display:none;
  }
`
const ButtonSearched = styled.div`
    border-radius: 0 40px 40px 0;
    cursor: pointer;
    height: 100%;
    width: 15%;
    margin: 0;
    background-color: ${({ theme }) => theme.btnSearch};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.borderBtnSearch};
`
const Input = styled.input`
    color: ${({ theme }) => theme.colorInput};
    border: none;
    margin: 0px;
    height: 100%;
    outline: none;
    width:70%;
    border-radius: 40px 0 0 40px;
    margin-left: 32px;
    padding: 10px 4px 10px 25px;
    font-size: 16px;
    font-weight: 600;
    line-height: 30px;
    border: 1px solid ${({ theme }) => theme.borderInputSearch};
    border-right: none;
    background-color:${({ theme }) => theme.inputSearch};
`
const Button = styled.button`
  padding:5px 15px;
  background-color:transparent;
  border:1px solid #3ea6ff;
  color:#3ea6ff;
  border-radius:5px;
  cursor: pointer;
  font-weight:bold;
  display: flex;
  align-items: center;
  gap:5px;
`
const Mic = styled.div`
    background-color:${({ theme }) => theme.inputSearch};
    width:45px;
    height:100%;
    justify-content: center;
    border-radius:50%;
    display: flex;
    align-items: center;
    margin-left:10px;
    cursor: pointer;
    &:hover{
    background-color: ${({ theme }) => theme.btnSearch};
    }
`
const NavBar = ({ darkMode }) => {
  const { currentUser } = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const handleSearch = async () => {
    navigate(`/search?q=${q}`);
    setTimeout(() => {
      setQ('');
    },20000)
  }

  return (
    <>
    <Container>
      <Wrapper>
        <Link to='/' style={{textDecoration:'none'}} >
          <Logo>
            <Img src={logo} />
            Youtube
          </Logo>
        </Link>
        <Search>
          <Input value={q} placeholder="Search" onChange={(e)=>setQ(e.target.value)} />
          <ButtonSearched onClick={handleSearch}>
            <SearchOutlinedIcon  style={{ fontSize: "22px",color:darkMode?"white":"black"}} />
          </ButtonSearched>
          <Mic>
            <MicOutlinedIcon/>
          </Mic>
        </Search>
        {currentUser
          ?
          <Avatar setOpen={setOpen} open={open} currentUser={currentUser} />
          :
          <Link to='/signin' style={{ textDecoration: 'none' }} >
            <Button>
              <AccountCircleIcon />SIGN IN
            </Button>
          </Link>
        }
      </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default NavBar
