import React from 'react';

interface IWordListProps {
  list: HistoryRecord[];
}

const WordList = ({ list }: IWordListProps) => (
  <ul>
    {list.map((item, index) => (
      <li
        key={index}
        className={`w-fit min-w-80 p-2 my-2 rounded ${
          item.isPalindrome
            ? "bg-green-200 text-green-700"
            : "bg-red-200 text-red-700"
        }`}
      >
        {item.word} - {item.isPalindrome ? "Palíndromo" : "No palíndromo"}
      </li>
    ))}
  </ul>
);

export default WordList