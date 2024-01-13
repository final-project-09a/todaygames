import RecommendList from 'components/homepage/recommendList';
import NewGames from 'components/homepage/NewGames';
import GenreFilter from 'components/homepage/GenreFilter';
import Header from 'components/Header';

const Home = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <h1>추천리스트</h1>
        <RecommendList />
      </div>
      <div>
        <h1>새로나온 게임</h1>
        <NewGames />
      </div>
      <div>
        <h1>장르별 탐색</h1>
        <GenreFilter />
      </div>
    </>
  );
};

export default Home;
