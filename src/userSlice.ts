//  유저 정보를 가져와서 사용하는 비동기 액션

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Typedata } from 'shared/supabase.type';
import { supabasedata } from 'shared/supabase';
// import { UserInfo } from 'api/user';

import { RootState } from './redux/config/configStore';
import { UserInfo } from 'api/user';

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

interface UserState {
  userList: any[];
  useruid: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

interface State {
  name: string;
}

const initialState: State = {
  name: 'abc의 이름'
};

// const initialState: UserState = {
//   userList: [],
//   useruid: null,
//   status: 'idle',
//   error: null
// };

// const initialState = {
//   name: '아무이름 '
// };

// const currentuserinfo = (state = initialState, action: any) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

// const userSlice = createSlice({
//   name: '아무이름'
// });

const userSlice = createSlice({
  name: '아무이름',
  initialState,
  reducers: {
    setname: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  }
});

export default userSlice.reducer;
export const { setname } = userSlice.actions;
