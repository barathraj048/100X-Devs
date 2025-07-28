import Navbar from "./components/navBar";
import TradePage from "./components/tradePage";
import Footer from "./components/Footer"
export default function Home() {
  return (
    <div className="px-12 py-4">
      <Navbar/>
      <TradePage/>
      <Footer/>
    </div>
  );
}
