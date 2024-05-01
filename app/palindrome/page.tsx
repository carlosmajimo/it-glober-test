'use client'

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import useStickyState from '@/hooks/useStickyState';
import Menu from '@/components/Menu';

const WordList = dynamic(() => import('@/components/WordList'), { ssr: false });

export default function Palindrome() {
  const [word, setWord] = useState('');
  const [search, setSearch] = useState('');
  const [historyWords, setHistoryWords] = useStickyState<HistoryRecord[]>([], 'historyWords');

  const handleChange = (key: 'word' | 'search') => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const setter = { word: setWord, search: setSearch }
    setter[key](value.replace(/\s/g, ''));
  };

  const validatePalindrome = () => {
    const isPalindrome = word === word.split('').reverse().join('');

    if (isPalindrome) toast.success("La palabra ingresada es palindroma!");
    else toast.error("La palabra ingresada no es palindrome");
    
    setHistoryWords(prev => [...prev, { word, isPalindrome }])
  };

  const historyList = useMemo(() => !search ? historyWords ?? [] : historyWords.filter(record => record.word.includes(search)), [search, historyWords]);

  const clean = () => setWord('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Menu  />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Validador de Palíndromos</h1>
        <div className="mb-4 flex rounded-lg">
          <input
            type="text"
            className="w-80 py-3 px-4 block border-gray-200 shadow-sm rounded-s-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ingresa una palabra"
            value={word}
            onChange={handleChange("word")}
          />
          <button
            type="button"
            className="-ms-px py-3 px-4 inline-flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-bold text-white"
            disabled={!word}
            onClick={validatePalindrome}
          >
            Validar
          </button>
          <button
            onClick={clean}
            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none text-base"
          >
            <Icon icon="mdi:trash-can-outline" />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Historial de palabras</h2>
          <input
            type="text"
            placeholder="Buscar palabra"
            value={search}
            onChange={handleChange("search")}
            className="w-80 py-3 px-4 block border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          />
          <WordList list={historyList} />
        </div>
      </div>
    </main>
  );
}
