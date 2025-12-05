import Hero from "../components/Hero";
import Influencers from "../components/Influencers";
import Brands from "../components/Brands";
import MostViewedProducts from "../components/MostViewedProducts";
import NewArrivals from "../components/NewArrivals";
import DiscountedProducts from "../components/DiscountedProducts";

function Home() {
  return (
    <div>
      <div>
        <Hero/>
        <Influencers/>
        <Brands/>
        <NewArrivals/>
        <DiscountedProducts/>
        <MostViewedProducts/>
      </div>
    </div>
  );
}

export default Home;
