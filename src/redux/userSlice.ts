//  유저 정보를 가져와서 사용하는 비동기 액션

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Typedata } from 'shared/supabase.type';
import { UserInfo } from 'api/user';
import { RootState } from './config/configStore';

// 비동기 액션 생성
//export const fetchingUserInfo = createAsyncThunk<{ user: Typedata['public']['Tables']['userinfo']['Row'] }>('Userinfo');
// 사용자 정보를 가져와야함
// 오류처리
// redux slice 생성
// 초기상태 설정
// reducers 리듀서 정의
// extraReducers 비동기 액션 처리
// 비동기 액션 pending, fullfilled , reject 상태 처리
// 리듀서 내보내기
// 비동기 액션 내보내기
