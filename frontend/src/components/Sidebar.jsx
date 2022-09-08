const Sidebar = ({children, title}) => {
  return (
    <div className="h-screen grid grid-rows-6 grid-cols-6 lg:p-8">
      <div className="z-[2] col-span-6 row-start-4 row-span-3 lg:col-span-2 lg:row-start-1 lg:row-span-6 rounded-lg lg:rounded-3xl h-full flex flex-col bg-white overflow-auto">
        <div className="text-3xl font-bold text-center p-4">{title}</div>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
