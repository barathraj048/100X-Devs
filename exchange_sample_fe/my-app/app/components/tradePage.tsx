import Details from "./Details";
import OrderTab from "./OrderTab";

function TradePage() {
  return (
    <div className="w-full h-full grid grid-cols-6">
      <div className="col-span-5">
        <Details />
      </div>

      <div className="col-span-1">
        <OrderTab />
      </div>
    </div>
  );
}

export default TradePage;
