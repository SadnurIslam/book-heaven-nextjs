import GenreCard from './GenreCard';

const ExploreByGenre = () => {
    const genres = [
        {
            name: 'Fiction',
            image: 'https://plus.unsplash.com/premium_photo-1682124752476-40db22034a58?auto=format&fit=crop&q=60&w=500'
        },
        {
            name: 'Mystery',
            image: 'https://images.unsplash.com/photo-1482424917728-d82d29662023?auto=format&fit=crop&q=60&w=500'
        },
        {
            name: 'Fantasy',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=60&w=500'
        },
        {
            name: 'Biography',
            image: 'https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?auto=format&fit=crop&q=60&w=500'
        }
    ];

    return (
        <section className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center md:text-left">Explore by Genre</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {genres.map((genre, index) => <GenreCard key={index} genre={genre} />)}
            </div>
        </section>
    );
};

export default ExploreByGenre;
