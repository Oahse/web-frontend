
import React from 'react';
import Router from '@/routes/routes.jsx';  // Import the Router component that handles the app's routing
import NotFound from '@/pages/404.jsx';
import cerealImage from '@/assets/images/collections/cereals.jpg';
import legumesImage from '@/assets/images/collections/legumes.jpg';
import fruitsVegImage from "@/assets/images/collections/vegetable.png"
import oilseedsImage from '@/assets/images/collections/oilseeds.jpg';
import fibersImage from '@/assets/images/collections/fibres.webp';
import spicesHerbsImage from '@/assets/images/collections/spicesherbs.jpg';
import meatFishSweetenersImage from "@/assets/images/collections/meat.jpg";
import nutsFlowersBeveragesImage from '@/assets/images/collections/nuts.jpg';
import brandsImage from '@/assets/images/logo/banwe_logo_green.png';
import brand1Image from '@/assets/images/brand/asos.png';
import brand2Image from '@/assets/images/brand/asos.png';
import brand3Image from '@/assets/images/brand/asos.png';
function App() {
    // const {isMobile} = useDeviceType();
    const { isLoggedIn, user } = { isLoggedIn: true, user: {id:'1'} };
    const categories = [
          { name: 'Cereal Crops', image: cerealImage },
          { 
            name: 'Brands', 
            image: brandsImage, 
            items: [
              { name: 'Brand1', image: brand1Image },
              { name: 'Brand2', image: brand2Image },
              { name: 'Brand3', image: brand3Image }
            ] 
          },
          { name: 'Legumes', image: legumesImage },
          { name: 'Fruits & Vegetables', image: fruitsVegImage },
          { name: 'Oilseeds', image: oilseedsImage },
          { name: 'Fibers', image: fibersImage },
          { name: 'Spices and Herbs', image: spicesHerbsImage },
          { name: 'Meat, Fish & Sweeteners', image: meatFishSweetenersImage },
          { name: 'Nuts, Flowers & Beverages', image: nutsFlowersBeveragesImage }
        ];
    
    return (
      <Router 
          API_URL={'config.apiUrl'} 
          basename={"/"}  
          Companyname={'Bivis'} 
          isLoggedIn={isLoggedIn}
          user={user}
          currentUrl={'/'}
          notfound={<NotFound />}
          categories={categories}
      />
    );
}

export default App;
