import React from "react";

const NewsLetterBox: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now $ get 20% off
      </p>
      <p className="text-gray-400">
        Subscribe now to receive exclusive updates, offers, and tips directly to
        your inbox
      </p>
      <form
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
        onSubmit={handleSubmit}>
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          name="email"
        />
        <button
          className="bg-black text-white text-xs px-10 py-4"
          type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
