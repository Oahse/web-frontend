import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";

const Checkout =()=>{
    const { isMobile} = useDeviceType();
    const [loading, setLoading] = useState(false);
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            <a href="javascript:void(0);" id="toggle-rtl" className="tf-btn animate-hover-btn btn-fill">RTL</a>
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>

                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="heading text-center">Check Out</div>
                    </div>
                </div>

                <section className="flat-spacing-11">
                    <div className="container">
                        <div className="tf-page-cart-wrap layout-2">
                            <div className="tf-page-cart-item">
                                <h5 className="fw-5 mb_20">Billing details</h5>
                                <form className="form-checkout">
                                    <div className="box grid-2">
                                        <fieldset className="fieldset">
                                            <label for="first-name">First Name</label>
                                            <input type="text" id="first-name" placeholder="Themesflat"/>
                                        </fieldset>
                                        <fieldset className="fieldset">
                                            <label for="last-name">Last Name</label>
                                            <input type="text" id="last-name"/>
                                        </fieldset>
                                    </div>
                                    <fieldset className="box fieldset">
                                        <label for="country">Country/Region</label>
                                        <div className="select-custom">
                                            <select className="tf-select w-100" id="country" name="address[country]"
                                                data-default="">
                                                <option value="---" data-provinces="[]">---</option>
                                                <option value="Australia"
                                                    data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]">
                                                    Australia</option>
                                                <option value="Austria" data-provinces="[]">Austria</option>
                                                <option value="Belgium" data-provinces="[]">Belgium</option>
                                                <option value="Canada"
                                                    data-provinces="[['Alberta','Alberta'],['British Columbia','British Columbia'],['Manitoba','Manitoba'],['New Brunswick','New Brunswick'],['Newfoundland and Labrador','Newfoundland and Labrador'],['Northwest Territories','Northwest Territories'],['Nova Scotia','Nova Scotia'],['Nunavut','Nunavut'],['Ontario','Ontario'],['Prince Edward Island','Prince Edward Island'],['Quebec','Quebec'],['Saskatchewan','Saskatchewan'],['Yukon','Yukon']]">
                                                    Canada</option>
                                                <option value="Czech Republic" data-provinces="[]">Czechia</option>
                                                <option value="Denmark" data-provinces="[]">Denmark</option>
                                                <option value="Finland" data-provinces="[]">Finland</option>
                                                <option value="France" data-provinces="[]">France</option>
                                                <option value="Germany" data-provinces="[]">Germany</option>
                                                <option value="Hong Kong"
                                                    data-provinces="[['Hong Kong Island','Hong Kong Island'],['Kowloon','Kowloon'],['New Territories','New Territories']]">
                                                    Hong Kong SAR</option>
                                                <option value="Ireland"
                                                    data-provinces="[['Carlow','Carlow'],['Cavan','Cavan'],['Clare','Clare'],['Cork','Cork'],['Donegal','Donegal'],['Dublin','Dublin'],['Galway','Galway'],['Kerry','Kerry'],['Kildare','Kildare'],['Kilkenny','Kilkenny'],['Laois','Laois'],['Leitrim','Leitrim'],['Limerick','Limerick'],['Longford','Longford'],['Louth','Louth'],['Mayo','Mayo'],['Meath','Meath'],['Monaghan','Monaghan'],['Offaly','Offaly'],['Roscommon','Roscommon'],['Sligo','Sligo'],['Tipperary','Tipperary'],['Waterford','Waterford'],['Westmeath','Westmeath'],['Wexford','Wexford'],['Wicklow','Wicklow']]">
                                                    Ireland</option>
                                                <option value="Israel" data-provinces="[]">Israel</option>
                                                <option value="Italy"
                                                    data-provinces="[['Agrigento','Agrigento'],['Alessandria','Alessandria'],['Ancona','Ancona'],['Aosta','Aosta Valley'],['Arezzo','Arezzo'],['Ascoli Piceno','Ascoli Piceno'],['Asti','Asti'],['Avellino','Avellino'],['Bari','Bari'],['Barletta-Andria-Trani','Barletta-Andria-Trani'],['Belluno','Belluno'],['Benevento','Benevento'],['Bergamo','Bergamo'],['Biella','Biella'],['Bologna','Bologna'],['Bolzano','South Tyrol'],['Brescia','Brescia'],['Brindisi','Brindisi'],['Cagliari','Cagliari'],['Caltanissetta','Caltanissetta'],['Campobasso','Campobasso'],['Carbonia-Iglesias','Carbonia-Iglesias'],['Caserta','Caserta'],['Catania','Catania'],['Catanzaro','Catanzaro'],['Chieti','Chieti'],['Como','Como'],['Cosenza','Cosenza'],['Cremona','Cremona'],['Crotone','Crotone'],['Cuneo','Cuneo'],['Enna','Enna'],['Fermo','Fermo'],['Ferrara','Ferrara'],['Firenze','Florence'],['Foggia','Foggia'],['Forlì-Cesena','Forlì-Cesena'],['Frosinone','Frosinone'],['Genova','Genoa'],['Gorizia','Gorizia'],['Grosseto','Grosseto'],['Imperia','Imperia'],['Isernia','Isernia'],['L'Aquila','L’Aquila'],['La Spezia','La Spezia'],['Latina','Latina'],['Lecce','Lecce'],['Lecco','Lecco'],['Livorno','Livorno'],['Lodi','Lodi'],['Lucca','Lucca'],['Macerata','Macerata'],['Mantova','Mantua'],['Massa-Carrara','Massa and Carrara'],['Matera','Matera'],['Medio Campidano','Medio Campidano'],['Messina','Messina'],['Milano','Milan'],['Modena','Modena'],['Monza e Brianza','Monza and Brianza'],['Napoli','Naples'],['Novara','Novara'],['Nuoro','Nuoro'],['Ogliastra','Ogliastra'],['Olbia-Tempio','Olbia-Tempio'],['Oristano','Oristano'],['Padova','Padua'],['Palermo','Palermo'],['Parma','Parma'],['Pavia','Pavia'],['Perugia','Perugia'],['Pesaro e Urbino','Pesaro and Urbino'],['Pescara','Pescara'],['Piacenza','Piacenza'],['Pisa','Pisa'],['Pistoia','Pistoia'],['Pordenone','Pordenone'],['Potenza','Potenza'],['Prato','Prato'],['Ragusa','Ragusa'],['Ravenna','Ravenna'],['Reggio Calabria','Reggio Calabria'],['Reggio Emilia','Reggio Emilia'],['Rieti','Rieti'],['Rimini','Rimini'],['Roma','Rome'],['Rovigo','Rovigo'],['Salerno','Salerno'],['Sassari','Sassari'],['Savona','Savona'],['Siena','Siena'],['Siracusa','Syracuse'],['Sondrio','Sondrio'],['Taranto','Taranto'],['Teramo','Teramo'],['Terni','Terni'],['Torino','Turin'],['Trapani','Trapani'],['Trento','Trentino'],['Treviso','Treviso'],['Trieste','Trieste'],['Udine','Udine'],['Varese','Varese'],['Venezia','Venice'],['Verbano-Cusio-Ossola','Verbano-Cusio-Ossola'],['Vercelli','Vercelli'],['Verona','Verona'],['Vibo Valentia','Vibo Valentia'],['Vicenza','Vicenza'],['Viterbo','Viterbo']]">
                                                    Italy</option>
                                                <option value="Japan"
                                                    data-provinces="[['Aichi','Aichi'],['Akita','Akita'],['Aomori','Aomori'],['Chiba','Chiba'],['Ehime','Ehime'],['Fukui','Fukui'],['Fukuoka','Fukuoka'],['Fukushima','Fukushima'],['Gifu','Gifu'],['Gunma','Gunma'],['Hiroshima','Hiroshima'],['Hokkaidō','Hokkaido'],['Hyōgo','Hyogo'],['Ibaraki','Ibaraki'],['Ishikawa','Ishikawa'],['Iwate','Iwate'],['Kagawa','Kagawa'],['Kagoshima','Kagoshima'],['Kanagawa','Kanagawa'],['Kumamoto','Kumamoto'],['Kyōto','Kyoto'],['Kōchi','Kochi'],['Mie','Mie'],['Miyagi','Miyagi'],['Miyazaki','Miyazaki'],['Nagano','Nagano'],['Nagasaki','Nagasaki'],['Nara','Nara'],['Niigata','Niigata'],['Okayama','Okayama'],['Okinawa','Okinawa'],['Saga','Saga'],['Saitama','Saitama'],['Shiga','Shiga'],['Shimane','Shimane'],['Shizuoka','Shizuoka'],['Tochigi','Tochigi'],['Tokushima','Tokushima'],['Tottori','Tottori'],['Toyama','Toyama'],['Tōkyō','Tokyo'],['Wakayama','Wakayama'],['Yamagata','Yamagata'],['Yamaguchi','Yamaguchi'],['Yamanashi','Yamanashi'],['Ōita','Oita'],['Ōsaka','Osaka']]">
                                                    Japan</option>
                                                <option value="Malaysia"
                                                    data-provinces="[['Johor','Johor'],['Kedah','Kedah'],['Kelantan','Kelantan'],['Kuala Lumpur','Kuala Lumpur'],['Labuan','Labuan'],['Melaka','Malacca'],['Negeri Sembilan','Negeri Sembilan'],['Pahang','Pahang'],['Penang','Penang'],['Perak','Perak'],['Perlis','Perlis'],['Putrajaya','Putrajaya'],['Sabah','Sabah'],['Sarawak','Sarawak'],['Selangor','Selangor'],['Terengganu','Terengganu']]">
                                                    Malaysia</option>
                                                <option value="Netherlands" data-provinces="[]">Netherlands</option>
                                                <option value="New Zealand"
                                                    data-provinces="[['Auckland','Auckland'],['Bay of Plenty','Bay of Plenty'],['Canterbury','Canterbury'],['Chatham Islands','Chatham Islands'],['Gisborne','Gisborne'],['Hawke's Bay','Hawke’s Bay'],['Manawatu-Wanganui','Manawatū-Whanganui'],['Marlborough','Marlborough'],['Nelson','Nelson'],['Northland','Northland'],['Otago','Otago'],['Southland','Southland'],['Taranaki','Taranaki'],['Tasman','Tasman'],['Waikato','Waikato'],['Wellington','Wellington'],['West Coast','West Coast']]">
                                                    New Zealand</option>
                                                <option value="Norway" data-provinces="[]">Norway</option>
                                                <option value="Poland" data-provinces="[]">Poland</option>
                                                <option value="Portugal"
                                                    data-provinces="[['Aveiro','Aveiro'],['Açores','Azores'],['Beja','Beja'],['Braga','Braga'],['Bragança','Bragança'],['Castelo Branco','Castelo Branco'],['Coimbra','Coimbra'],['Faro','Faro'],['Guarda','Guarda'],['Leiria','Leiria'],['Lisboa','Lisbon'],['Madeira','Madeira'],['Portalegre','Portalegre'],['Porto','Porto'],['Santarém','Santarém'],['Setúbal','Setúbal'],['Viana do Castelo','Viana do Castelo'],['Vila Real','Vila Real'],['Viseu','Viseu'],['Évora','Évora']]">
                                                    Portugal</option>
                                                <option value="Singapore" data-provinces="[]">Singapore</option>
                                                <option value="South Korea"
                                                    data-provinces="[['Busan','Busan'],['Chungbuk','North Chungcheong'],['Chungnam','South Chungcheong'],['Daegu','Daegu'],['Daejeon','Daejeon'],['Gangwon','Gangwon'],['Gwangju','Gwangju City'],['Gyeongbuk','North Gyeongsang'],['Gyeonggi','Gyeonggi'],['Gyeongnam','South Gyeongsang'],['Incheon','Incheon'],['Jeju','Jeju'],['Jeonbuk','North Jeolla'],['Jeonnam','South Jeolla'],['Sejong','Sejong'],['Seoul','Seoul'],['Ulsan','Ulsan']]">
                                                    South Korea</option>
                                                <option value="Spain"
                                                    data-provinces="[['A Coruña','A Coruña'],['Albacete','Albacete'],['Alicante','Alicante'],['Almería','Almería'],['Asturias','Asturias Province'],['Badajoz','Badajoz'],['Balears','Balears Province'],['Barcelona','Barcelona'],['Burgos','Burgos'],['Cantabria','Cantabria Province'],['Castellón','Castellón'],['Ceuta','Ceuta'],['Ciudad Real','Ciudad Real'],['Cuenca','Cuenca'],['Cáceres','Cáceres'],['Cádiz','Cádiz'],['Córdoba','Córdoba'],['Girona','Girona'],['Granada','Granada'],['Guadalajara','Guadalajara'],['Guipúzcoa','Gipuzkoa'],['Huelva','Huelva'],['Huesca','Huesca'],['Jaén','Jaén'],['La Rioja','La Rioja Province'],['Las Palmas','Las Palmas'],['León','León'],['Lleida','Lleida'],['Lugo','Lugo'],['Madrid','Madrid Province'],['Melilla','Melilla'],['Murcia','Murcia'],['Málaga','Málaga'],['Navarra','Navarra'],['Ourense','Ourense'],['Palencia','Palencia'],['Pontevedra','Pontevedra'],['Salamanca','Salamanca'],['Santa Cruz de Tenerife','Santa Cruz de Tenerife'],['Segovia','Segovia'],['Sevilla','Seville'],['Soria','Soria'],['Tarragona','Tarragona'],['Teruel','Teruel'],['Toledo','Toledo'],['Valencia','Valencia'],['Valladolid','Valladolid'],['Vizcaya','Biscay'],['Zamora','Zamora'],['Zaragoza','Zaragoza'],['Álava','Álava'],['Ávila','Ávila']]">
                                                    Spain</option>
                                                <option value="Sweden" data-provinces="[]">Sweden</option>
                                                <option value="Switzerland" data-provinces="[]">Switzerland</option>
                                                <option value="United Arab Emirates"
                                                    data-provinces="[['Abu Dhabi','Abu Dhabi'],['Ajman','Ajman'],['Dubai','Dubai'],['Fujairah','Fujairah'],['Ras al-Khaimah','Ras al-Khaimah'],['Sharjah','Sharjah'],['Umm al-Quwain','Umm al-Quwain']]">
                                                    United Arab Emirates</option>
                                                <option value="United Kingdom"
                                                    data-provinces="[['British Forces','British Forces'],['England','England'],['Northern Ireland','Northern Ireland'],['Scotland','Scotland'],['Wales','Wales']]">
                                                    United Kingdom</option>
                                                <option value="United States"
                                                    data-provinces="[['Alabama','Alabama'],['Alaska','Alaska'],['American Samoa','American Samoa'],['Arizona','Arizona'],['Arkansas','Arkansas'],['Armed Forces Americas','Armed Forces Americas'],['Armed Forces Europe','Armed Forces Europe'],['Armed Forces Pacific','Armed Forces Pacific'],['California','California'],['Colorado','Colorado'],['Connecticut','Connecticut'],['Delaware','Delaware'],['District of Columbia','Washington DC'],['Federated States of Micronesia','Micronesia'],['Florida','Florida'],['Georgia','Georgia'],['Guam','Guam'],['Hawaii','Hawaii'],['Idaho','Idaho'],['Illinois','Illinois'],['Indiana','Indiana'],['Iowa','Iowa'],['Kansas','Kansas'],['Kentucky','Kentucky'],['Louisiana','Louisiana'],['Maine','Maine'],['Marshall Islands','Marshall Islands'],['Maryland','Maryland'],['Massachusetts','Massachusetts'],['Michigan','Michigan'],['Minnesota','Minnesota'],['Mississippi','Mississippi'],['Missouri','Missouri'],['Montana','Montana'],['Nebraska','Nebraska'],['Nevada','Nevada'],['New Hampshire','New Hampshire'],['New Jersey','New Jersey'],['New Mexico','New Mexico'],['New York','New York'],['North Carolina','North Carolina'],['North Dakota','North Dakota'],['Northern Mariana Islands','Northern Mariana Islands'],['Ohio','Ohio'],['Oklahoma','Oklahoma'],['Oregon','Oregon'],['Palau','Palau'],['Pennsylvania','Pennsylvania'],['Puerto Rico','Puerto Rico'],['Rhode Island','Rhode Island'],['South Carolina','South Carolina'],['South Dakota','South Dakota'],['Tennessee','Tennessee'],['Texas','Texas'],['Utah','Utah'],['Vermont','Vermont'],['Virgin Islands','U.S. Virgin Islands'],['Virginia','Virginia'],['Washington','Washington'],['West Virginia','West Virginia'],['Wisconsin','Wisconsin'],['Wyoming','Wyoming']]">
                                                    United States</option>
                                                <option value="Vietnam" data-provinces="[]">Vietnam</option>
                                            </select>
                                        </div>
                                    </fieldset>
                                    <fieldset className="box fieldset">
                                        <label for="city">Town/City</label>
                                        <input type="text" id="city"/>
                                    </fieldset>
                                    <fieldset className="box fieldset">
                                        <label for="address">Address</label>
                                        <input type="text" id="address"/>
                                    </fieldset>
                                    <fieldset className="box fieldset">
                                        <label for="phone">Phone Number</label>
                                        <input type="number" id="phone"/>
                                    </fieldset>
                                    <fieldset className="box fieldset">
                                        <label for="email">Email</label>
                                        <input type="email" id="email"/>
                                    </fieldset>
                                    <fieldset className="box fieldset">
                                        <label for="note">Order notes (optional)</label>
                                        <textarea name="note" id="note"></textarea>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="tf-page-cart-footer">
                                <div className="tf-cart-footer-inner">
                                    <h5 className="fw-5 mb_20">Your order</h5>
                                    <form className="tf-page-cart-checkout widget-wrap-checkout">
                                        <ul className="wrap-checkout-product">
                                            <li className="checkout-product-item">
                                                <figure className="img-product">
                                                    <img src="images/products/brown.jpg" alt="product"/>
                                                    <span className="quantity">1</span>
                                                </figure>
                                                <div className="content">
                                                    <div className="info">
                                                        <p className="name">Ribbed modal T-shirt</p>
                                                        <span className="variant">Brown / M</span>
                                                    </div>
                                                    <span className="price">$25.00</span>
                                                </div>
                                            </li>
                                            <li className="checkout-product-item">
                                                <figure className="img-product">
                                                    <img src="images/products/kid-12.jpg" alt="product"/>
                                                    <span className="quantity">1</span>
                                                </figure>
                                                <div className="content">
                                                    <div className="info">
                                                        <p className="name">Vanilla White</p>
                                                    </div>
                                                    <span className="price">$35.00</span>
                                                </div>
                                            </li>
                                            <li className="checkout-product-item">
                                                <figure className="img-product">
                                                    <img src="images/products/beige-2.jpg" alt="product"/>
                                                    <span className="quantity">1</span>
                                                </figure>
                                                <div className="content">
                                                    <div className="info">
                                                        <p className="name">Cotton jersey top</p>
                                                        <span className="variant">Beige / S</span>
                                                    </div>
                                                    <span className="price">$8.00</span>
                                                </div>
                                            </li>
                                            <li className="checkout-product-item">
                                                <figure className="img-product">
                                                    <img src="images/products/orange-1.jpg" alt="product"/>
                                                    <span className="quantity">3</span>
                                                </figure>
                                                <div className="content">
                                                    <div className="info">
                                                        <p className="name">Ribbed Tank Top</p>
                                                        <span className="variant">Orange / S</span>
                                                    </div>
                                                    <span className="price">$54.00</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="coupon-box">
                                            <input type="text" placeholder="Discount code"/>
                                            <a href="#"
                                                className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn">Apply</a>
                                        </div>
                                        <div className="d-flex justify-content-between line pb_20">
                                            <h6 className="fw-5">Total</h6>
                                            <h6 className="total fw-5">$122.00</h6>
                                        </div>
                                        <div className="wd-check-payment">
                                            <div className="fieldset-radio mb_20">
                                                <input type="radio" name="payment" id="bank" className="tf-check" checked/>
                                                <label for="bank">Direct bank transfer</label>

                                            </div>
                                            <div className="fieldset-radio mb_20">
                                                <input type="radio" name="payment" id="delivery" className="tf-check"/>
                                                <label for="delivery">Cash on delivery</label>
                                            </div>
                                            <p className="text_black-2 mb_20">Your personal data will be used to process your order,
                                                support your experience throughout this website, and for other purposes
                                                described in our <a href="privacy-policy.html"
                                                    className="text-decoration-underline">privacy policy</a>.</p>
                                            <div className="box-checkbox fieldset-radio mb_20">
                                                <input type="checkbox" id="check-agree" className="tf-check"/>
                                                <label for="check-agree" className="text_black-2">I have read and agree to the
                                                    website <a href="terms-conditions.html"
                                                        className="text-decoration-underline">terms and conditions</a>.</label>
                                            </div>
                                        </div>
                                        <button
                                            className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center">Place
                                            order</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
            <Extras />
        </div>
    )
}
export default Checkout;