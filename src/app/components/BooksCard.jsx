import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const BooksCard = ({ book }) => {
  return (
    <Link href={`/books/${book._id}`} className="group">
      <div className="card-container flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all">
        <Image
          src={book.coverImage}
          alt={book.title}
          className="w-full h-52 md:h-60 object-cover rounded-t-2xl"
          width={400}
          height={300}
        />

        <div className="space-y-1 py-4 px-3">
          <div className="badge badge-soft badge-warning">{book.genre}</div>
          <h3 className="text-lg text-primary font-bold line-clamp-1">{book.title}</h3>
          <p className="text-sm text-secondary truncate">{book.author}</p>

          <div className="flex items-center gap-1 text-yellow-400 mt-1">
            {[0, 1, 2, 3, 4].map(i => (
              <Star
                key={i}
                size={16}
                fill={book.rating > i ? "currentColor" : "none"}
              />
            ))}
            <span className="text-sm ml-1 text-secondary">({book.rating.toFixed(1)})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BooksCard;
