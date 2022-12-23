import React from 'react'
import styled from 'styled-components'
import SideBarUser from '../components/SideBarUser'
import { Outlet } from 'react-router-dom'
const Container = styled.div`
  min-height:90vh;
  width:100%;
  display: grid;
  grid-template-columns: 1fr 5.7fr;
    @media (max-width: 900px) {
      display:grid;
     min-height:93vh;

    }
    @media (max-width: 600px) {
    padding:7px 0px;
    display: flex;
    flex-direction: column;
    margin-top:7vh;
    }

`

const Profile = () => {
  return (
    <Container>
      <SideBarUser />
      <Outlet/>
    </Container>
  )
}

export default Profile
