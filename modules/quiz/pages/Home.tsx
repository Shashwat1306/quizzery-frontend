import bgImage from "@/assets/image.jpg";
import SplitText from "../../../src/components/reactbits/splitText.tsx";

export const Home = () => {
  return (
    <div
      className="h-full flex items-center justify-center bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="text-center bg-white bg-opacity-80 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-4xl">
        <SplitText
          text="Welcome to Quizzery"
          tag="h1"
          className="text-6xl font-bold text-purple-700 mb-4"
          splitType="chars"
          delay={50}
          duration={0.9}
        />
        <div className="h-4" />

        <SplitText
          text="Your One-stop to conducting quizzes"
          tag="p"
          className="text-lg font-bold text-gray-700"
          splitType="words"
          delay={80}
          duration={0.9}
        />

        <div className="h-2" />

        <SplitText
          text="Please Login and Register to continue"
          tag="p"
          className="text-md font-bold text-gray-700"
          splitType="words"
          delay={100}
          duration={0.9}
        />
      </div>
    </div>
  );
};
