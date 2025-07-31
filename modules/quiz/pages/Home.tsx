export const Home = () => {
  return (
    <div
      className="h-full flex items-center justify-center bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: "url('../../image.jpg')" }}
    >
      <div className="text-center bg-white bg-opacity-80 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-4xl">
        <h1 className="text-6xl font-bold text-purple-700 mb-4">
          Welcome to Quizzery
        </h1>
        <br />
        <br />
        <p className="text-lg font-bold text-gray-700">
          Your One-stop to conducting quizzes
        </p>
        <br />
        <p className="text-md font-bold text-gray-700">
          Please Login and Register to continue
        </p>
      </div>
    </div>
  );
};
