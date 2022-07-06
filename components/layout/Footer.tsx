export const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-start max-w-screen-lg px-4 mx-auto py-8">
      <hr className="w-full border-1 border-gray-100 dark:border-gray-800 mb-8" />
      <div className="w-full grid grid-cols-1 gap-4 pb-16 sm:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/SaMaR0Hatroum"
          >
            GitHub
          </a>
          <a target="_blank" rel="noopener noreferrer" href="">
            Twitter
          </a>
        </div>
        <div className="flex flex-col space-y-4">
          <a target="_blank" rel="noopener noreferrer" href="">
            LinkedIn
          </a>
          <a target="_blank" rel="noopener noreferrer" href="">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
};
