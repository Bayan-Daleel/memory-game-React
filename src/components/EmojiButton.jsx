import React from "react";
import { decodeEntity } from 'html-entities';

const EmojiButton = ({
  index,
  emoji,
  handleClick,
  selectedCardEntry,
  matchedCardEntry,
}) => {
  const btnContent = selectedCardEntry || matchedCardEntry ? decodeEntity(emoji.htmlCode[0]) : "?";
  let btnStyle = matchedCardEntry
    ? "btn--emoji__back--matched"
    : selectedCardEntry
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";
const btnAria= 
    matchedCardEntry?`${decodeEntity(emoji.name)}.Matched.`:
    selectedCardEntry?`${decodeEntity(emoji.name)}. Not Matched yet.`:
    "Card upside down"

  return (
    <button
      aria-label={`Position ${index+1} :${btnAria}`}
      aria-live="polite"
      className={`btn btn--emoji ${btnStyle}`}
      onClick={selectedCardEntry?null :handleClick}
      disabled={matchedCardEntry}
    >
      {btnContent}
    </button>
  );
};

export default EmojiButton;
