// Faq.jsx
import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import { TfiViewList } from "react-icons/tfi";

const faqs = [
  {
    question: "Return & Replcements",
    answer: <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Return & Replacement</h1>
    <h2 className="text-2xl font-semibold mb-4">For Imported Products (International Shipping)</h2>
    <ul className="list-disc list-inside space-y-4 text-gray-700">
      <li>The shipping period for an imported product can be between 3-4 weeks for delivery.</li>
      <li>Only prepaid orders are allowed for imported products.</li>
      <li>Cancellation will not be allowed once the product is shipped from an international location.</li>
      <li>The customer will be informed of the shipping status by email.</li>
      <li>Products are generally shipped within 3-4 days from an international location.</li>
      <li>Refusal to accept the product at the time of delivery will not be considered and no refund will be given in such cases.</li>
      <li>
        Return/replacement requests for any orders must be submitted within 10 days of receipt of the product. However, in case of damaged/missing/empty package/wrong product, request should be made within 2 days of receiving the product.
      </li>
      <li>Warranty applicable if specified by manufacturer.</li>
      <li>All warranties are subject to the manufacturer.</li>
    </ul>
  </div>
  },
  {
    question: "Returns & Cancellation",
    answer:  <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Returns & Cancellation</h1>
    <h2 className="text-2xl font-semibold mb-4">In India</h2>
    <p className="mb-4 text-gray-700">
      We have a 7-day return policy, which means you have 7 days after receiving your item to request a return.
    </p>
    <p className="mb-4 text-gray-700">
      To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
    </p>
    <p className="mb-4 text-gray-700">
      To start a return, you can contact us at <a href="mailto:care@uoons.com" className="text-blue-600 underline">care@uoons.com</a>. Please note that returns will need to be accepted by the company and this is subject to as per the seller’s Returns Policy.
    </p>
    <p className="mb-4 text-gray-700">
      If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted. Please note that if your country of residence is not India, shipping your goods may take longer than expected.
    </p>
    <p className="mb-4 text-gray-700">
      You can always contact us for any return questions at <a href="mailto:care@uoons.com" className="text-blue-600 underline">care@uoons.com</a>.
    </p>
    <h2 className="text-2xl font-semibold mb-4">Damages and Issues</h2>
    <p className="mb-4 text-gray-700">
      Please inspect your order upon receipt and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we may evaluate the issue and make it right.
    </p>
    <p className="mb-4 text-gray-700">
      Certain types of items cannot be returned, like perishable goods (such as decorative local items, flowers, or plants etc.), custom products (such as special orders or personalized items), and personal care goods (such as beauty products, Electric Ear Cleaners, Electric Oral Hygiene Products, Sexual Wellness), some products are like Music Instrument Accessories, Automobiles, Auto Accessories, Healthcare Devices, Bird/Insect Ultrasonic Repeller, Hookah Charcoal/Flavor/Mouth-tip, Electric Wire, LED Bulb/Tube Light/Battery. We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
    </p>
    <p className="mb-4 text-gray-700">
      Unfortunately, we cannot accept returns on sale items or gift cards.
    </p>
    <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
    <p className="mb-4 text-gray-700">
      The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
    </p>
  </div>
  },
  {
    question: "Payments",
    answer: <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Payments</h1>
    <h2 className="text-2xl font-semibold mb-4">In India</h2>
    <p className="mb-4 text-gray-700">
      Shipping period for an imported product may range between 3-4 weeks for delivery.
    </p>
  </div>
  },
  {
    question: "Refunds",
    answer: <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Refunds</h1>
    <h2 className="text-2xl font-semibold mb-4">In India</h2>
    <p className="mb-4 text-gray-700">
      We will notify you once we’ve received and inspected your return to let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
    </p>
    <p className="mb-4 text-gray-700">
      If more than 15 business days have passed since we’ve approved your return, please contact us at <a href="mailto:care@uoons.com" className="text-blue-600 underline">care@uoons.com</a>
    </p>
    <h2 className="text-2xl font-semibold mb-4">When are Refunds provided?</h2>
    <p className="mb-4 text-gray-700">
      We work to provide the most hassle-free online shopping experience. We want to make sure that your money is safe. We initiate the refund process as soon as the details are received. Damaged products are returned to our warehouse and quality checked for refund approval.
    </p>
    <h2 className="text-2xl font-semibold mb-4">I still haven't received the refund in my bank account. Why?</h2>
    <p className="mb-4 text-gray-700">
      If you have received any mail/message from us to confirm your refund request, rest assured that we have initiated your refund request and are following up with financial organizations for the same. Sometimes financial organizations take longer to process the refund request. However, if the refund has not been received by the date we promised, you can contact us again.
    </p>
    <h2 className="text-2xl font-semibold mb-4">I paid the amount in upfront when I bought the product from Uoons, how do I get a refund?</h2>
    <p className="mb-4 text-gray-700">
      Your payment is secure. In case of prepaid order (payment through credit card/debit card/net banking/UPI/Wallet), the amount is refunded to the same account as you paid within 7-10 working days. Sometimes, with any unwanted circumstances, we proceed through NEFT bank transfer to your bank account. Uoons will contact you for your bank account details.
    </p>
    <h2 className="text-2xl font-semibold mb-4">I paid cash on delivery, how would I get the refund?</h2>
    <p className="mb-4 text-gray-700">
      If the mode of payment was Cash on Delivery (COD), we will initiate a NEFT bank transfer to your bank account. Uoons will contact you for your bank account details. It usually takes 7-10 days for your money to appear in your bank account.
    </p>
  </div>
  },
  {
    question: "Shipping & Delivery",
    answer: <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Shipping & Delivery</h1>
    <h2 className="text-2xl font-semibold mb-4">For Products</h2>
    <p className="mb-4 text-gray-700">
      Uoons Ecommerce Private Limited ("we" and "us") is the operator of (www.uoons.com) ("Website") / (Uoons App) (“Android App”). By placing an order through this Website/App you will be agreeing to the terms below. These are provided to ensure both parties are aware of and agree upon this arrangement to mutually protect and set expectations on our service.
    </p>
    <h3 className="text-xl font-semibold mb-2">General</h3>
    <p className="mb-4 text-gray-700">
      Subject to stock availability. We try to maintain accurate stock counts on our website but from time-to-time there may be a stock discrepancy and we will not be able to fulfill all your items at time of purchase. In this instance, we will fulfill the available products to you, and contact you about whether you would prefer to await restocking of the backordered item or if you would prefer for us to process a refund.
    </p>
    <h3 className="text-xl font-semibold mb-2">Shipping Costs</h3>
    <p className="mb-4 text-gray-700">
      Shipping costs are calculated during checkout based on weight, dimensions, and destination of the items in the order. Payment for shipping will be collected with the purchase. This price will be the final price for shipping cost to the customer.
    </p>
    <h3 className="text-xl font-semibold mb-2">Returns</h3>
    <h4 className="text-lg font-semibold mb-1">3.1 Return Due To Change Of Mind</h4>
    <p className="mb-4 text-gray-700">
      Uoons will happily accept returns due to change of mind as long as a request to return is received by us within 7 days of receipt of item and are returned to us in original packaging, unused and in resellable condition.
      Return shipping will be paid at the customers expense and will be required to arrange their own shipping.
      Once returns are received and accepted, refunds will be processed to store credit for a future purchase. We will notify you once this has been completed through email. Uoons will refund the value of the goods returned but will NOT refund the value of any shipping paid.
    </p>
    <h4 className="text-lg font-semibold mb-1">3.2 Warranty Returns</h4>
    <p className="mb-4 text-gray-700">
      Uoons will happily honor any valid warranty claims, provided a claim is submitted within 30 days of receipt of items.
      Customers will be required to pre-pay the return shipping, however we will reimburse you upon successful warranty claim.
      Upon return receipt of items for warranty claim, you can expect Uoons to process your warranty claim within 7 to 10 days.
      Once warranty claim is confirmed, you will receive the choice of:
      <ul className="list-disc ml-6">
        <li>Refund to your payment method</li>
        <li>A refund in store credit</li>
        <li>A replacement item sent to you (if stock is available)</li>
      </ul>
    </p>
    <h3 className="text-xl font-semibold mb-2">Delivery Terms</h3>
    <h4 className="text-lg font-semibold mb-1">4.1 Transit Time Domestically</h4>
    <p className="mb-4 text-gray-700">
      In general, domestic shipments are in transit for 2 - 7 days.
    </p>
    <h4 className="text-lg font-semibold mb-1">4.2 Transit time Internationally</h4>
    <p className="mb-4 text-gray-700">
      Generally, orders shipped internationally are in transit for 4 - 22 days. This varies greatly depending on the courier you have selected. We are able to offer a more specific estimate when you are choosing your courier at checkout.
    </p>
    <h4 className="text-lg font-semibold mb-1">4.3 Change Of Delivery Address</h4>
    <p className="mb-4 text-gray-700">
      Orders placed before 11:30 AM in business day (Pre-paid orders) will be dispatched the same day, otherwise, within the next business day.
      Our warehouse operates on Monday - Friday during standard business hours, except on national holidays at which time the warehouse will be closed. In these instances, we take steps to ensure shipment delays will be kept to a minimum.
    </p>
    <h4 className="text-lg font-semibold mb-1">4.4 Change Of Delivery Address</h4>
    <p className="mb-4 text-gray-700">
      For change of delivery address requests, we are able to change the address at any time before the order has been dispatched.
    </p>
    <h4 className="text-lg font-semibold mb-1">4.5 P.O. Box Shipping</h4>
    <p className="mb-4 text-gray-700">
      Uoons will ship to P.O. box addresses using postal services only. We are unable to offer couriers services to these locations.
    </p>
    <h4 className="text-lg font-semibold mb-1">4.6 Military Address Shipping</h4>
    <p className="mb-4 text-gray-700">
      We are able to ship to military addresses using USPS. We are unable to offer this service using courier services.
    </p>
    <h4 className="text-lg font-semibold mb-1">4.7 Items Out Of Stock</h4>
    <p className="mb-4 text-gray-700">
      If an item is out of stock, we will wait for the item to be available before dispatching your order. Existing items in the order will be reserved while we await this item.
    </p>
    <h4 className="text-lg font-semibold mb-1">4.8 Delivery Time Exceeded</h4>
    <p className="mb-4 text-gray-700">
      If delivery time has exceeded the forecasted time, please contact us so that we can conduct an investigation.
    </p>
    <h3 className="text-xl font-semibold mb-2">Tracking Notifications</h3>
    <p className="mb-4 text-gray-700">
      Upon dispatch, customers will receive a tracking link from which they will be able to follow the progress of their shipment based on the latest updates made available by the shipping provider.
    </p>
    <h3 className="text-xl font-semibold mb-2">Parcels Damaged In Transit</h3>
    <p className="mb-4 text-gray-700">
      If you find a parcel is damaged in-transit, if possible, please reject the parcel from the courier and get in touch with our customer service. If the parcel has been delivered without you being present, please contact customer service with next steps.
    </p>
    <h3 className="text-xl font-semibold mb-2">Duties & Taxes</h3>
    <h4 className="text-lg font-semibold mb-1">7.1 GSTIN</h4>
    <p className="mb-4 text-gray-700">
      GSTIN has already been applied to the price of the goods as displayed on the website.
    </p>
    <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
    <p className="mb-4 text-gray-700">
      For all customer service enquiries, please email us at <a href="mailto:care@uoons.com" className="text-blue-600 underline">care@uoons.com</a>
    </p>
  </div>
  },
  {
    question: "Orders",
    answer: <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Orders</h1>
    </div>
  },
  {
    question: "Coupons & Offers",
    answer: <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Coupons & Offers</h1>

    {/* Section: Redemption */}
    <h2 className="text-2xl font-semibold mb-4">Redemption of Coupon Codes</h2>
    <p className="mb-4 text-gray-700">
      Customers' coupon codes are not redeemable on our affiliate and business hub offers.
    </p>

    {/* Section: Changes and Cancellations */}
    <h2 className="text-2xl font-semibold mb-4">Changes and Cancellations</h2>
    <p className="mb-4 text-gray-700">
      Uoons reserves the right to change or cancel any promotion or offers at its sole discretion without giving any prior information.
    </p>

    {/* Section: Coupon Codes on COD Orders */}
    <h2 className="text-2xl font-semibold mb-4">Coupon Codes on COD Orders</h2>
    <p className="mb-4 text-gray-700">
      Coupon codes cannot be applied to Cash on Delivery (COD) orders.
    </p>
  </div>
  },
  {
    question: "Security Tips",
    answer:  <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Security Tips for Safe Online Shopping with Uoons!</h1>

    {/* Section: Beware of Fraudulent Websites/Apps */}
    <h2 className="text-2xl font-semibold mb-4">Beware of Fraudulent Websites/Apps</h2>
    <p className="mb-4 text-gray-700">
      Beware of fraudulent (duplicate/unofficial) websites and fake offers.
    </p>

    {/* Section: Never Share Account Details */}
    <h2 className="text-2xl font-semibold mb-4">Never Share Account Details</h2>
    <p className="mb-4 text-gray-700">
      If someone claims to be a Uoons representative, never share your Uoons account details like personal details, password, OTP, or credit/debit card details with anyone over call or email.
    </p>

    {/* Section: No Deposit Requests */}
    <h2 className="text-2xl font-semibold mb-4">No Deposit Requests</h2>
    <p className="mb-4 text-gray-700">
      Uoons never asks you to deposit money in any bank account.
    </p>

    {/* Section: Report Suspicious Activity */}
    <h2 className="text-2xl font-semibold mb-4">Report Fraudulent Activity</h2>
    <p className="mb-4 text-gray-700">
      Report any fraudulent or suspicious emails, calls, or SMS to us immediately at <a href="mailto:care@uoons.com" className="text-blue-600 underline">care@uoons.com</a>.
    </p>
  </div>
  },
  {
    question: "Shopping",
    answer: <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Shopping</h1>
      </div>
  },
  {
    question: "No Return Products",
    answer: <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Non-Returnable Products</h1>

    {/* Category: Auto Accessories */}
    <h2 className="text-2xl font-semibold mb-4">Auto Accessories</h2>
    <ul className="list-disc ml-6 mb-4 text-gray-700">
      <li>Additives</li>
      <li>Air Fresheners</li>
      <li>Brighteners</li>
      <li>Cleaners</li>
      <li>Bike/Car Stickers</li>
      <li>Degreasers</li>
      <li>Dent/Scratch Removers</li>
      <li>Filler Putty</li>
      <li>Headlight Vinyl Films</li>
      <li>Liquid Solutions</li>
      <li>Lubricants</li>
      <li>Polish</li>
      <li>Power Steering Fluids</li>
      <li>Sealants</li>
      <li>Oils and Wax</li>
    </ul>

    {/* Category: Automobiles */}
    <h2 className="text-2xl font-semibold mb-4">Automobiles</h2>
    <ul className="list-disc ml-6 mb-4 text-gray-700">
      <li>Cars</li>
      <li>Mopeds</li>
      <li>Motorcycles and Scooters</li>
      <li>Toys</li>
    </ul>

    {/* Category: Bath and Spa */}
    <h2 className="text-2xl font-semibold mb-4">Bath and Spa</h2>
    <ul className="list-disc ml-6 mb-4 text-gray-700">
      <li>Bath Bubble/Body</li>
      <li>Bath Spa Massager</li>
    </ul>

    

  </div>
  },
];

const sidebarLinks = [
  { name: "Sign In/Register", icon: MdOutlineDashboard },
  { name: "Our Policies", icon: MdOutlineDashboard },
  { name: "Uoons+", icon: MdOutlineDashboard },
  { name: "Payment Operations", icon: MdOutlineDashboard },
  { name: "Uoons Surety", icon: MdOutlineDashboard },
  { name: "Service Center", icon: MdOutlineDashboard },
  { name: "FAQ", icon: MdOutlineDashboard },
  { name: "Uoons", icon: MdOutlineDashboard },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-blue-100 text-gray-900 py-10 px-5">
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="sm:block hidden w-1/4  p-6 bg-white shadow-lg rounded-lg">
          <nav className="space-y-6">
            {sidebarLinks.map((link, index) => (
              <div key={index} className="flex items-center space-x-3 text-lg font-semibold text-gray-600 hover:text-gray-900 cursor-pointer transition">
                <link.icon className="text-2xl" />
                <span>{link.name}</span>
              </div>
            ))}
          </nav>
        </div>
        <div className='sm:hidden p-6 bg-white shadow-lg rounded-lg text-2xl'>
        <TfiViewList />
        </div>
        {/* Main Content */}
        <div className="w-3/4 ml-8">
          <h1 className="text-5xl font-extrabold text-center mb-8 text-blue-600">Frequently Asked Questions</h1>
          <p className="text-center text-lg mb-12 text-gray-700">Your questions answered here.</p>
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <div 
                    className="flex justify-between items-center cursor-pointer p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    onClick={() => toggleFaq(index)}
                  >
                    <h2 className="text-xl font-semibold">{faq.question}</h2>
                    {openIndex === index ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
                  </div>
                  {openIndex === index && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Faq;
