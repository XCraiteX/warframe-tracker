'use client';
import Frame from '@/components/warframe/Frame';
import { API_URL } from '@/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FrameRequestProps } from '@/interfaces/warframe/frame.request';
import { FrameProps } from '@/interfaces/warframe/frame.props';

export default function Home() {
  const [data, setData] = useState<null | FrameRequestProps>(null);
  const [sent, setSent] = useState<boolean>(false);

  useEffect(() => {
    if (sent == false) {
      setSent(true);
      axios.get(API_URL + '/get_frames', { withCredentials: true }).then((response) => {
        console.log(response);
        if (response.data.status == 'OK') {
          console.log(response.data);
          setData(response.data);
        }
      });
    }
  });

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex mt-18 w-full h-full justify-center flex-col items-center">
        <h2 className="text-2xl text-center">
          Варфреймы
          <br />
          {data?.completed} / {data?.count}
        </h2>
        <div className="flex w-[96%] flex-wrap gap-6 mt-4 m-12">
          {data &&
            data?.warframes.map((frame: FrameProps) => (
              <Frame
                key={frame.name}
                name={frame.name}
                warframe={frame.warframe}
                blueprint={frame.blueprint}
                head={frame.head}
                body={frame.body}
                system={frame.system}
                completed={frame.completed}
                user={frame.user}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
