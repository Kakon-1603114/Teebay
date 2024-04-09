
import PriceInput from "./PriceInput";

const Prices = ({ productInfo, setProductInfo }) => {

  return (
    <div className="w-full flex flex-col gap-5">
      <p className="text-2xl font-semibold text-center">
        Provide description of your product
      </p>
     <PriceInput productInfo = {productInfo} setProductInfo = {setProductInfo}/>
    </div>
  );
};

export default Prices;
