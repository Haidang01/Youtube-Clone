import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../Card'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { API } from '../../redux/userAPI';
import { useDispatch } from 'react-redux';
import { deleteVideo } from '../../redux/features/profileSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Item = styled.div`
  width:100%;
  height:100%;
  position:relative;
  color:${({ theme }) => theme.bg};
  @media (max-width: 900px) {
    height:300px;
  }
  @media (max-width: 600px) {
  }
`
const Menu = styled.div`
  position:absolute;
  padding:2px 0px;
  top:25px;
  right:10px;  
  z-index:1;
  width:100px;
  background-color:${({ theme }) => theme.bg};
  border:1px solid ${({ theme }) => theme.hr};
  border-radius: 3px;
`
const Hr = styled.hr`
  border:0.6px solid ${({theme})=>theme.hr};
`
const Section = styled.div`
  cursor:pointer;
  color:${({ theme }) => theme.text};
  padding: 6px 0px;
  width:100%;
  text-align:center;
  display: flex;
  font-weight:bold;
  font-size:14px;
  align-items:center;
  justify-content:center;
  gap:5px;
  &:hover{
    background-color: ${({ theme }) => theme.hoverItem};
  }
`
const CardVideo = ({video,setOpenEdit,setDataEdit}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const res= await API.delete(`/videos/${video._id}`);
    if (res.status === 200) { 
      dispatch(deleteVideo(video._id));
      toast.success(`Video deleted successfully`);
      navigate('/profile/video');
    } else {
      toast.error(`Video not deleted`);
    }
  }
  return (
    <Item key={video._id}>
          {openMenu &&
            <Menu>
              <Section
                onClick={() => {
                  setOpenEdit(true);
                  setDataEdit(video);
                  setOpenMenu(false);
                }} >
                <BorderColorOutlinedIcon style={{ fontSize: '22px', marginRight: '6px' }} />
                Edit
              </Section>
              <Hr />
              <Section
                onClick={handleDelete} >
                <DeleteOutlineOutlinedIcon />
                Delete
              </Section>
            </Menu>
          }
          <MoreHorizOutlinedIcon
            onClick={() => setOpenMenu(!openMenu)}
            style={{ cursor: 'pointer', position: 'absolute', top: '5px', right: '10px' }}
          />
         <Card video={video} />
        </Item>
  )
}

export default CardVideo
