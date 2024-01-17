import { DataContext } from 'pages/detail/Detail';
import React, { useContext, useEffect, useState } from 'react';

const SystemReqirement = () => {
  const data = useContext(DataContext);

  return (
    <>
      <h2>시스템 요구사항</h2>
      <p>
        {data && data.pc_requirements !== undefined ? (
          <div dangerouslySetInnerHTML={{ __html: data.pc_requirements.minimum }} />
        ) : null}
      </p>
      <div>
        <section>
          <label>운영체제</label>
          <label>프로세서</label>
          <label>메모리</label>
          <label>그래픽</label>
          <label>DirectX</label>
          <label>저장공간</label>
        </section>
        <section>
          <p>{data?.developers}</p>
          <p>{data?.developers}</p>
          <p>{data?.developers}</p>
          <p>{data?.developers}</p>
          <p>{data?.publishers}</p>
          <p>{data?.release_date.date}</p>
        </section>
      </div>
    </>
  );
};

export default SystemReqirement;
