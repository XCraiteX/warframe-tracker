'use client';
import { API_URL } from '@/config';
import { FrameProps } from '@/interfaces/warframe/frame.props';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Frame({ name, warframe, blueprint, head, body, system, completed, user }: FrameProps) {
  const [s_blueprint, setBlueprint] = useState<boolean>(blueprint);
  const [s_head, setHead] = useState<boolean>(head);
  const [s_body, setBody] = useState<boolean>(body);
  const [s_system, setSystem] = useState<boolean>(system);
  const [s_completed, setCompleted] = useState<boolean>(completed);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      // Проверяем, инициализирован ли компонент
      axios.post(
        API_URL + '/update',
        {
          warframe: warframe,
          blueprint: s_blueprint,
          head: s_head,
          body: s_body,
          system: s_system,
        },
        { withCredentials: true },
      );
      if (s_blueprint == false || s_head == false || s_body == false || s_system == false) {
        setCompleted(false);
      }
    } else {
      setIsInitialized(true);
    }
  }, [s_blueprint, s_head, s_body, s_system]);

  return (
    <div
      className={`rounded-sm p-3 w-[200px] border-1 border-white/40 flex flex-col h-fit items-center gap-[6px] ${
        s_completed || (s_blueprint && s_head && s_body && s_system) ? 'bg-green-500/30' : 'bg-white/20'
      }`}
    >
      <img src={`/warframe/icons/frames/${warframe}.png`} width={120} height={120} className="border-b-2" />
      <h2 className="text-center text-lg">{name}</h2>
      <div
        className={`flex justify-between items-center w-full duration-[0.2s] px-2 py-1 rounded-sm border-1 border-white/40 ${
          s_blueprint ? 'bg-green-500/30 border-1 border-white/40' : 'bg-white/0'
        }`}
      >
        <p>Чертёж</p>
        <button
          className={`glass-btn duration-[0.2s] px-2 ${s_blueprint ? 'bg-red-500/60' : 'bg-green-500/60'}`}
          onClick={() => setBlueprint(!s_blueprint)}
        >
          {s_blueprint ? '-' : '+'}
        </button>
      </div>

      <div
        className={`flex justify-between items-center w-full duration-[0.2s] px-2 py-1 rounded-sm border-1 border-white/40 ${
          s_head ? 'bg-green-500/30 border-1 border-white/40' : 'bg-white/0'
        }`}
      >
        <p>Оптика</p>
        <button
          className={`glass-btn duration-[0.2s] px-2 ${s_head ? 'bg-red-500/60' : 'bg-green-500/60'}`}
          onClick={() => setHead(!s_head)}
        >
          {s_head ? '-' : '+'}
        </button>
      </div>

      <div
        className={`flex justify-between items-center w-full duration-[0.2s] px-2 py-1 rounded-sm border-1 border-white/40 ${
          s_body ? 'bg-green-500/30 border-1 border-white/40' : 'bg-white/0'
        }`}
      >
        <p>Каркас</p>
        <button
          className={`glass-btn duration-[0.2s] px-2 ${s_body ? 'bg-red-500/60' : 'bg-green-500/60'}`}
          onClick={() => setBody(!s_body)}
        >
          {s_body ? '-' : '+'}
        </button>
      </div>

      <div
        className={`flex justify-between items-center w-full duration-[0.2s] px-2 py-1 rounded-sm border-1 border-white/40 ${
          s_system ? 'bg-green-500/30 border-1 border-white/40' : 'bg-white/0'
        }`}
      >
        <p>Система</p>
        <button
          className={`glass-btn duration-[0.2s] px-2 ${s_system ? 'bg-red-500/60' : 'bg-green-500/60'}`}
          onClick={() => setSystem(!s_system)}
        >
          {s_system ? '-' : '+'}
        </button>
      </div>
    </div>
  );
}
