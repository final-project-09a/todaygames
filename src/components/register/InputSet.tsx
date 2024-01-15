import React from 'react';
import { Titles, TitleInput, ContentInput } from './styles';

function InputSet() {
  return (
    <div>
      <Titles>
        제목
        <TitleInput />
      </Titles>
      <Titles>
        게임
        <TitleInput />
      </Titles>
      <Titles>
        태그
        <TitleInput />
      </Titles>
    </div>
  );
}

export default InputSet;
