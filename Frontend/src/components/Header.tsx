'use client';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config';

export default function Header() {
  const [auth, setAuth] = useState<null | boolean>(null);
  const [login, setLogin] = useState<null | string>(null);

  useEffect(() => {
    if (auth == null) {
      setAuth(false);
      axios.get(API_URL + '/auth', { withCredentials: true }).then((response) => {
        if (response.data.status == 'OK') {
          setAuth(true);
          setLogin(response.data.login);
        } else {
          setAuth(false);
        }
      });
    }
  });

  return (
    <header className="flex fixed w-full z-50 bg-white/20 py-2 px-6 backdrop-blur-sm justify-between">
      <div className="flex items-center w-[30%]">
        <h2 className="text-xl">WARFRAME TRACKER</h2>
      </div>

      {auth && (
        <nav className="text-lg flex gap-6 items-center w-[30%] justify-center">
          <Link href="/frames" className="text-xl glass-btn px-3 py-1">
            Фреймы
          </Link>
          <Link href="/weapons" className="text-xl glass-btn px-3 py-1">
            Оружие
          </Link>
        </nav>
      )}

      <div className="items-center flex gap-2 w-[30%] justify-end">
        {auth ? (
          <>
            <h2 className="text-xl">{login}</h2>
          </>
        ) : (
          <Link
            href="/registration"
            className="text-xl border-1 border-white/40 rounded-md hover:border-white duration-[0.2s] hover:shadow-[0_0_8px_1px] shadow-white px-4 py-1 hover:bg-white/10"
          >
            Авторизация
          </Link>
        )}
      </div>
    </header>
  );
}
