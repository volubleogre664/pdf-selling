import Book from "../components/Book";

function Home({ history }) {
  return (
    <div className="p-5 pt-1">
      <h1>This is the home page</h1>

      <div className="flex flex-col gap-5">
        <Book history={history} />
        <Book />
        <Book />
        <Book />
      </div>
    </div>
  );
}

export default Home;
