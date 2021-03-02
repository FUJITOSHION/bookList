import { BookToRead } from '../Types'

type BookRowProps = {
  book: BookToRead
  onMemoChange: (id: number, memo: string) => void
  onDelete: (id: number) => void
}

export const BookRow: React.FC<BookRowProps> = ({
  book,
  onMemoChange,
  onDelete,
}: BookRowProps) => {
  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onMemoChange(book.id, e.target.value)
  }
  const handleDeleteClick = () => {
    onDelete(book.id)
  }
  return (
    <div className="book-row">
      <div title={book.title} className="title">
        {book.title}
      </div>
      <div title={book.authors} className="authors">
        {book.authors}
      </div>
      <input
        type="text"
        className="memo"
        value={book.memo}
        onChange={handleMemoChange}
      />
      <div className="delete-row" onClick={handleDeleteClick}>
        削除
      </div>
    </div>
  )
}
