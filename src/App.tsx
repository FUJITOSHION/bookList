import React, { useEffect, useState } from 'react'
import './App.css'

import { BookToRead, BookDescription } from './Types'
import { BookRow } from './components/BookRow'
import Modal from 'react-modal'
import { BookSearchDialog } from './components/BookSearchDialog'

Modal.setAppElement('#root')

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
  },
}

const dummyBooks: BookToRead[] = [
  {
    id: 1,
    title: 'はじめてのReact',
    authors: 'ダミー',
    memo: '',
  },
  {
    id: 2,
    title: 'React Hooks入門',
    authors: 'ダミー',
    memo: '',
  },
  {
    id: 3,
    title: '実践Reactアプリケーション開発',
    authors: 'ダミー',
    memo: '',
  },
]

const APP_KEY = 'react-book'

export const App: React.FC = () => {
  const [books, setBooks] = useState<BookToRead[]>([] as BookToRead[])
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const storedBooks = localStorage.getItem(APP_KEY)
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(books))
  }, [books])

  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = books.map((b) => {
      return b.id === id ? { ...b, memo: memo } : b
    })
    setBooks(newBooks)
  }

  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((b) => b.id !== id)
    setBooks(newBooks)
  }

  const handleBookAdd = (book: BookDescription) => {
    const newBook: BookToRead = { ...book, id: Date.now(), memo: '' }
    const newBooks = [...books, newBook]
    setBooks(newBooks)
    setModalIsOpen(false)
  }

  const bookRows = books.map((b) => {
    return (
      <BookRow
        book={b}
        key={b.id}
        onMemoChange={handleBookMemoChange}
        onDelete={handleBookDelete}
      />
    )
  })

  const handleAddClick = () => {
    setModalIsOpen(true)
  }
  const handleModalClose = () => {
    setModalIsOpen(false)
  }

  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like" onClick={handleAddClick}>
          本を追加
        </div>
      </section>
      <section className="main">{bookRows}</section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <BookSearchDialog maxResults={20} onBookAdd={handleBookAdd} />
      </Modal>
    </div>
  )
}
