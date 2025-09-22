const BubbleLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-[100vw] h-[100vh]">
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="w-4 h-4 bg-gradient-to-br from-gray-800 to-gray-950 rounded-full animate-float"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>
      <span className="text-gray-500 text-sm font-medium">{text}</span>
    </div>
  );
};

export default BubbleLoader;