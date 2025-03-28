'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';

import { MdMarkEmailUnread } from 'react-icons/md';
import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState('');

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post(API_URL + '/registration', {
      login: login,
      email: email,
      password: password,
    });

    if (response.status == 200) {
      router.push('/login');
    } else {
      setStatus(response.statusText);
    }
  };

  return (
    <>
      <Background />
      <Header />
      <div className="flex w-full h-screen justify-center items-center flex-col gap-4">
        <form className="flex flex-col gap-3 p-4 warf-glass rounded-md mt-12 h-fit">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Регистрация</h2>
            <Link href="/login">
              <MdOutlineSwapHoriz size={40} className="glass-btn p-1" />
            </Link>
          </div>
          <hr />
          <label htmlFor="login" className="text-xl flex gap-2 items-center">
            <FaUser />
            Логин
          </label>
          <input
            type="text"
            id="login"
            className="outline-none p-2 bg-white/20 rounded-md"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <label htmlFor="email" className="text-xl flex gap-2 items-center">
            <MdMarkEmailUnread />
            Почта
          </label>
          <input
            type="email"
            id="email"
            className="outline-none p-2 bg-white/20 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="text-xl flex gap-2 items-center">
            <FaKey />
            Пароль
          </label>
          <input
            type="password"
            id="password"
            className="outline-none p-2 bg-white/20 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="text-xl border-1 border-white/40 rounded-md hover:border-white duration-[0.2s] hover:shadow-[0_0_8px_1px] shadow-white px-8 py-2 hover:bg-white/10 text-center cursor-pointer outline-none"
            onClick={register}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="text-center text-lg">{status}</p>
      </div>
    </>
  );
}
