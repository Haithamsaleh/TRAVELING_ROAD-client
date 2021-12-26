import React, { useState } from "react";

const Book = ({ book, completeTask }) => {
  return (
    <>
          <li onDoubleClick={() => completeTask(book.id, book.isCompleted)}>
        {book.book}<br/>{book.bookPdf}
      </li>

    </>
  );
};

export default Book;
