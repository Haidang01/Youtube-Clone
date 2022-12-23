import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addComment, getcomments } from '../redux/features/commentSlice'
import avatar from '../img/tải xuống.jpg'
const Container = styled.div`
  margin:30px 0;
   @media (max-width:600px){
    padding: 0 10px;
  }
`
const NewCommnent = styled.div`
  display: flex;
  gap:15px;
  align-items:center;
  margin:10px 0;
    
`
const Avatar = styled.img`
    width:35px;
    height:35px;
    object-fit: cover;
    border-radius:50%;
`
const TotalComments = styled.h1`
    font-size:17px;
    font-weight:600;
    margin:20px 0;
    color:${({ theme }) => theme.text};
   @media (max-width:600px){
    font-size:12px;
   }
`
const Input = styled.input`
    border:none;
    border-bottom:1px solid ${({ theme }) => theme.hr};
    width:85%;
    outline:none;
    padding:10px 10px;
    color:${({ theme }) => theme.text};
    background-color:${({ theme }) => theme.bgLighter};
   @media (max-width:600px){
    font-size:12px;
   }
    `
const Span = styled.span`
    color:${({ theme }) => theme.text};
    text-align:center;
    margin-top:30px;
    font-size:13px;
    margin-left:10px;
`
const CommentList= styled.div``
const Comments = ({videoId}) => {
  const { currentUser } = useSelector(state => state.user);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector(state => state.comment);
  useEffect(() => {
    dispatch(getcomments(videoId));
  }, [videoId]);
  useEffect(() => {
    error && toast.error(error);
  },[error])
  const handlePressEnter = e => {
    if (!currentUser) {
      toast.error('Login for comment');
      return;
    }
    if (e.charCode === 13 && e.code === 'Enter') {
      comment ? handleComment() : toast.error('Please enter a comment');
    setComment('')
      
    }
  }
  const handleComment = async () => {
    const data = {
      desc: comment,
      videoId:videoId
    }
    dispatch(addComment(data))
  }
  return (
    <Container>
      <TotalComments>{comments?.length} Comments</TotalComments>
      <NewCommnent>
        <Avatar src={currentUser?.img?currentUser?.img:avatar} />
        <Input value={comment} placeholder="Add a comment..." onKeyPress={handlePressEnter} onChange={e=>setComment(e.target.value)} />
      </NewCommnent>
      <CommentList>
        {comments.length === 0 && <Span>Comment not fond</Span>}
        {comments.length > 0 && comments.map(comment =><Comment key={comment._id} comment={comment}/>)}
      </CommentList>
    </Container>
  )
}

export default Comments
