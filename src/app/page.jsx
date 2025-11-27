import Banner from "./components/Banner";
import LatestBooks from "./components/LatestBooks";
import ExploreByGenre from "./components/ExploreByGenre";
import BookOfTheWeek from "./components/BookOfTheWeek";
import Newsletter from "./components/Newsletter";


const Home = () => {

  return (
    <div className='flex flex-col gap-16'>
      <Banner />
      <LatestBooks />
      <ExploreByGenre />
      <BookOfTheWeek />
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
