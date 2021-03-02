import React, { useEffect, useState } from 'react'
import { BookDescription } from '../Types'
import { BookSearchItem } from './BookSearchItem'

type BookSearchDialogProps = {
  maxResults: number
  onBookAdd: (book: BookDescription) => void
}

function buildSearchUrl(
  title: string,
  author: string,
  maxResults: number
): string {
  const url = 'https://www.googleapis.com/books/v1/volumes?q='
  const conditions: string[] = []
  if (title) {
    conditions.push(`intitle:${title}`)
  }
  if (author) {
    conditions.push(`inauthor:${author}`)
  }
  return url + conditions.join('+') + `&maxResults=${maxResults}`
}

function extractBooks(json: any): BookDescription[] {
  const items: any[] = json.items
  return items.map((item: any) => {
    const volumeInfo: any = item.volumeInfo
    return {
      title: volumeInfo.title,
      authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : '',
      thumbnail: volumeInfo.imageLinks
        ? volumeInfo.imageLinks.smallThumbnail
        : '',
    }
  })
}

export const BookSearchDialog: React.FC<BookSearchDialogProps> = ({
  maxResults,
  onBookAdd,
}: BookSearchDialogProps) => {
  const [books, setBooks] = useState<BookDescription[]>([])
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)

  useEffect(() => {
    if (isSearching) {
      const url = buildSearchUrl(title, author, maxResults)
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((json) => {
          return extractBooks(json)
        })
        .then((books) => {
          setBooks(books)
        })
        .catch((err) => {
          console.error(err)
        })
    }
    setIsSearching(false)
  }, [isSearching])

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value)
  }

  const handleSearchClick = () => {
    if (!title && !author) {
      alert('条件を入力してください')
      return
    }
    setIsSearching(true)
  }
  const handleBookAdd = (book: BookDescription) => {
    onBookAdd(book)
  }
  const bookItems = books.map((b, idx) => {
    return (
      <BookSearchItem description={b} onBookAdd={handleBookAdd} key={idx} />
    )
  })
  return (
    <div className="dialog">
      <div className="operation">
        <div className="conditions">
          <input
            type="text"
            placeholder="著者名で検索"
            onChange={handleTitleInputChange}
          />
          <input
            type="text"
            placeholder="著者名で検索"
            onChange={handleAuthorInputChange}
          />
        </div>
        <div className="button-like" onClick={handleSearchClick}>
          検索
        </div>
      </div>
      <div className="search-results">{bookItems}</div>
    </div>
  )
}
