const Header = ({ title }) => {
  return (
    <header className="flex flex-items px-5 py-5 justify-between bg-white border-light-gray">
      <div className="flex flex-items gap-x-4">
        <img src="/src/assets/logo-mobile.svg" alt="logo-img" />
        <p className="text-black font-bold text-lg">{title}</p>
        <img src="/src/assets/react.svg" />
      </div>
      <div className="flex flex-items gap-x-4">
        <button className="bg-purple-600 hover:bg-purple-700 rounded-full px-4 py-2 flex items-center justify-center">
          <img src="/src/assets/icon-add-task-mobile.svg" alt="icon-mobile" />
        </button>
      </div>
    </header>
  );
};

export default Header;
