const Chip = () => {
  return (
    <div className=" w-[60px] h-[40px] relative overflow-hidden shadow-[inset_1px_1px_0_rgba(0,0,0,0.53)] rounded-[5px] bg-[#cfa77b] bg-gradient-to-b from-[#e5c8a9] to-[#b58d63]">
      <div className="top-3 w-[100px] h-[16px] border absolute border-solid border-[rgba(0,0,0,0.53)]"></div>
      <div className="absolute w-[20px] h-[40px] left-[calc(50%_-_10.5px)] rounded-tl-none rounded-tr-[91px_114px] rounded-br-[10px] rounded-bl-[141px] top-px bg-gradient-to-b from-[#e0b68a] to-[#b58d63]"></div>
    </div>
  );
};

export default Chip;
