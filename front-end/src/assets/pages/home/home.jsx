import './home.css'
import { Link } from 'react-router-dom';
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import CountUp from 'react-countup';
import img from '../../images/hero.jpg';
import { useStateContext } from '../../../contexts/ContextProvider';

export default function Home(){
    const {token}=useStateContext();

    const services = [
        { id: 1, title: 'Free Shipping', description: 'The Shipping is on us! Enjoy free delivery when you purchase 2 or more books.' ,icon:<TbTruckDelivery size={45}/>},
        { id: 2, title: 'Cash On Delivery', description: 'Payment is only processed upon receipt of your order and confirmation of its quality.',icon:<RiSecurePaymentLine size={45}/> },
        { id: 3, title: '24/7 Support', description: 'We have a dedicated 24/7 team, available to address any inquiries you may have.',icon:<BiSupport size={45}/> },
      ]
      const stats = [
        { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
        { id: 2, name: 'Assets under holding', value: '$119 trillion' },
        { id: 3, name: 'New users annually', value: '46,000' },
      ]
    return<>
    {/*----------hero section---------*/}
    <div className="overflow-hidden bg-white py-24 sm:py-16">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            <p className="mt-16 text-3xl tracking-tight text-gray-900 sm:text-4xl">Uncover the unseen at Peak</p>
            <p className="mt-4 text-lg leading-6 text-gray-600">
                Discover hidden realms and untold stories that await. Start your adventure with us today
            </p>
            {token ? 
            (<Link to='/reader/shop'><button className="header-btn" >Shop Now</button></Link>) 
            : 
            (<Link to='/shop'><button className="header-btn" >Shop Now</button></Link> )
            }
            <div className='mt-12 grid  gap-x-39 gap-y-8 lg:grid-cols-3'>
              <div>
                <p className='text-2xl  text-gray-900 '>Books</p>
                <div><span>+</span><CountUp start={0} end={30000} duration={3} className='text-base leading-7 text-gray-600'/></div>
              </div>


              <div>
                <p className='text-2xl text-gray-900 '>Authors</p>
                <div><span>+</span><CountUp start={0} end={2500} duration={4} className='text-base leading-7 text-gray-600'/></div>
              </div>


              <div>
                <p className=' text-2xl text-gray-900 '>Genres</p>
                <div><span>+</span><CountUp start={0} end={20} duration={5} className='text-base leading-7 text-gray-600'/></div>           
              </div>
             </div>                                 
          </div>
        </div>
        <img
          src={img}
          className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          width={2430}
          height={1420}
        />
      </div>
    </div>
  </div>
     {/*----------our services---------*/}
     <section>
        <div className="bg-white py-24 sm:py-5">
            <div className="container mx-auto">
                <p className='text-2xl mb-16 underline underline-offset-2'>Our Services</p>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                {services.map((service) => (
                    <div key={service.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <div className='mx-auto text-blue-900' >{service.icon}</div>
                    <dd className=" text-lg  tracking-tight text-gray-900 sm:text-xl">
                        {service.title}
                    </dd>
                    <dt className="text-base leading-7 text-gray-600">{service.description}</dt>
                    </div>
                ))}
                </dl>
            </div>
        </div>
    </section>
     {/*----------about us---------*/}
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.gray.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-gray-600/10 ring-1 ring-gray-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <p className='text-2xl underline underline-offset-2 '>About Us</p>
        <figure className="mt-10">
          <blockquote className="text-centerleading-8 text-gray-900 sm:text-xl sm:leading-9">
            <p >
              At Peak, we believe in the transformative power of stories. Whether you seek escape, knowledge,
               or joy, we're here to connect you with the perfect book.
               More than just a retailer, we're a catalyst for discovery, growth, and connection within our community. 
            </p>
          </blockquote>
        </figure>
      </div>
    </section>
    {/*----------about us---------*/}
    <div className="bg-white py-24 sm:py-32">
    <p className='text-2xl underline underline-offset-2 text-center gap-y-16 p-12'>Trusted By The Best Companies</p>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col ">
              
              <dd className=" tracking-tight  sm:text-5xl">
                <img src='https://www.penguinrandomhouse.com/wp-content/themes/penguinrandomhouse/images/prh-logo.svg' width={130} height={20}/>

              </dd>
            </div>
        
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                <img src='https://d3ialxc06lvqvq.cloudfront.net/wp-content/uploads/2023/04/27022218/macmillan-logo-red-1-287x64.png' width={230} height={20}/>

              </dd>
            </div>

            <div className="mx-auto flex max-w-xs flex-col ">
              
              <dd className=" tracking-tight  sm:text-5xl">
                <img src='https://www.hachettebookgroup.com/wp-content/themes/hachette-book-group-2023/client/src/svg/hbg-logo.svg' width={230} height={20}/>

              </dd>
            </div>
          </dl>
      </div>
    </div>
</>
}