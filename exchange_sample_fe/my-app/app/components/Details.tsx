import Info from "./Info"
import Graph from "./Graph"
import OrderBook from "./OrderBook"

function Details() {
  return (
    <div>
      <hr className="border-t border-gray-700"/>
      <div className="my-2 mx-2"><Info/></div>
      <hr className="border-t border-gray-700"/>
      <Graph/>
      <OrderBook/>
    </div>
  )
}

export default Details
