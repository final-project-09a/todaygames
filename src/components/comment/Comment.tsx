import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabasedata } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';
import { getComments } from 'api/comments';
import { User } from '@supabase/supabase-js';
import { QUERY_KEYS } from 'query/keys';

interface CommentType {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
}

const Comment: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [useruid, setuseruid] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>('');

  return <>댓글 컴포넌트</>;
};

export default Comment;
