import Info from "./Info"
import Graph from "./Graph"
import OrderBook from "./OrderBook"

function Details() {
  return (
    <div>
      <hr className="border-t border-gray-700" />

      <div className="my-2 mx-2">
        <Info />
      </div>

      <hr className="border-t border-gray-700" />

      <div className="grid grid-cols-4 gap-4 my-2 mx-2">
        <div className="col-span-3">
          <Graph market=""/>
        </div>
        <div className="col-span-1 border-x border-gray-700 px-4">
          <OrderBook />
        </div>
      </div>
    </div>
  )
}

export default Details
