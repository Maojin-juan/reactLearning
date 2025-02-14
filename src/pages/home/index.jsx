function Home({ week }) {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h2 className="flex items-center justify-center text-6xl font-bold">
          React Learning
        </h2>
        <p className="text-3xl text-sky-500">{week ? `Week ${week}` : ""}</p>
      </div>
    </>
  );
}

export default Home;
