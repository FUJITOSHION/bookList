import { BookDescription } from '../Types'

type BookSearchItemProps = {
  description: BookDescription
  onBookAdd: (book: BookDescription) => void
}

export const BookSearchItem: React.FC<BookSearchItemProps> = ({
  description,
  onBookAdd,
}: BookSearchItemProps) => {
  const handleAddBookClick = () => {
    onBookAdd(description)
  }
  return (
    <div className="book-search-item">
      <h2>{description.title}</h2>
      <div className="authors">{description.authors}</div>
      {description.thumbnail ? (
        <img src={description.thumbnail} alt="" />
      ) : null}
      <div className="add-book" onClick={handleAddBookClick}>
        <span>+</span>
      </div>
    </div>
  )
}
