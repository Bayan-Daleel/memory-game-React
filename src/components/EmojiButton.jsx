import React from "react";
import { decodeEntity } from 'html-entities';

const EmojiButton = ({
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

  return (
    <button
      aria-label={emoji.name}
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
