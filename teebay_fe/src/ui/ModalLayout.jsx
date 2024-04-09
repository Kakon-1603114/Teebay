const ModalLayout = ({ modalState, children }) => {
  
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
        modalState
          ? "w-full justify-center items-center flex  bg-black/20 h-screen z-10 "
          : "z-[-10]"
      }`}>
      {/* This is the backdrop element */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur ${
          modalState ? "block" : "hidden"
        }`}></div>
      {children}
    </div>
  );
};

export default ModalLayout;
