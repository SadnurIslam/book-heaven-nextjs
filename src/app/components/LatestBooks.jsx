
import BooksCard from './BooksCard';

const LatestBooks = async () => {

    const books = await fetch('https://book-heaven-server-jade.vercel.app/books?limit=6&sort=latest').then(res => res.json());

    return (
        <section className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center md:text-left">Fresh on the Shelves</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
                {
                    books.map(book => <BooksCard key={book._id} book={book} />)
                }
            </div>
        </section>
    );
};

export default LatestBooks;
