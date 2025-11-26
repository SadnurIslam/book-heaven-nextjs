import Banner from "./components/Banner";
import LatestBooks from "./components/LatestBooks";


const Home = () => {

  return (
    <div className='flex flex-col gap-16'>
      <Banner />
      <LatestBooks />
      {/* <ExploreByGenre />
      <BookOfTheWeek /> */}
    </div>
  );
};

export default Home;
