import Identicon from '@polkadot/react-identicon';   //used for icons of Substrate account

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom';


const TestimonialOwl = ({provideAddressToSendCoins}) =>{
	const settings = {
		dots: false,
		infinite: true,
		arrows: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
				  slidesToShow: 5,
				  slidesToScroll: 1,
				  
				},
			},
			{
				breakpoint: 1024,
				settings: {
				  slidesToShow: 4,
				  slidesToScroll: 1,				  
				},
			},
			
			{
				breakpoint: 768,
				settings: {
				  slidesToShow: 3,
				  slidesToScroll: 1,
				},
			},
			{
				breakpoint: 400,
				settings: {
				  slidesToShow: 2,
				  slidesToScroll: 1,
				},
			},
		],
	};
	return(
		<>
			<Slider className="testimonial-two px-4 owl-carousel contacts-slider" {...settings}>
				<div className="items">
					<div className="text-center"  onClick={() => provideAddressToSendCoins("5G9KtfNMn6mqFq5BJueXZWqvEppagLRQiK7Hkd5Ng9aTRdKC")}>
						<Identicon value={"5G9KtfNMn6mqFq5BJueXZWqvEppagLRQiK7Hkd5Ng9aTRdKC"} size={64} theme={'polkadot'}/>
						<h5 className="mb-0"><Link to={"#"} className="text-black">Olivia</Link></h5>
					</div>
				</div>
				<div className="items">
					<div className="text-center" onClick={() => provideAddressToSendCoins("5FNZdmuPipRa8fz5ab12Y8P2dKx9zFbMgNyDwoWQMLynbPg8")}>
						<Identicon value={"5FNZdmuPipRa8fz5ab12Y8P2dKx9zFbMgNyDwoWQMLynbPg8"} size={64} theme={'polkadot'}/>
						<h5 className="mb-0"><Link to={"#"} className="text-black">Helen</Link></h5>
					</div>
				</div>
				<div className="items">
					<div className="text-center" onClick={() => provideAddressToSendCoins("5F1hqrYBhnhhkvYd1q9QzfXy8BYJJXtL3EKfYBkcBtpHRnHx")}>
						<Identicon value={"5F1hqrYBhnhhkvYd1q9QzfXy8BYJJXtL3EKfYBkcBtpHRnHx"} size={64} theme={'polkadot'}/>
						<h5 className="mb-0"><Link to={"#"} className="text-black" >Emma</Link></h5>
					</div>
				</div>
				<div className="items">
					<div className="text-center" onClick={() => provideAddressToSendCoins("5SzoyC8ADM7geLiaVAS4NFMscwuvHorcasBj5NjHKheXoW8a")}>
						<Identicon value={"5SzoyC8ADM7geLiaVAS4NFMscwuvHorcasBj5NjHKheXoW8a"} size={64} theme={'polkadot'}/>
						<h5 className="mb-0"><Link to={"#"} className="text-black">Jenny</Link></h5>
					</div>
				</div>
				<div className="items">
					<div className="text-center" onClick={() => provideAddressToSendCoins("5QTpTQHHvisMv9unNSRDEqYR8wqAdHHBZe4NjyfFMZuKjtMG")}>
						<Identicon value={"5QTpTQHHvisMv9unNSRDEqYR8wqAdHHBZe4NjyfFMZuKjtMG"} size={64} theme={'polkadot'}/>
						<h5 className="mb-0"><Link to={"#"} className="text-black">Martha</Link></h5>
					</div>
				</div>
			</Slider>
		</>
	)
}
export default TestimonialOwl;