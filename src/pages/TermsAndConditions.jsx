import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Header from '../components/Navbar';
import Footer from '../components/Footer';

const terms = [
  "75th Independence Day Uoons Freedom Celebration Sale Rs. 1, offer(s) is limited to selected products and valid till stock last.",
  "1 user can avail only 1 product during Uoons Freedom Celebration Sale on 14th & 15th August 2021.",
  "Sale Rs. 1, offer(s) is limited to one quantity at one order all the time. T&C Apply",
  "Offer can be availed 1 time during the campaign validity.",
  "Warranty & Guarantee provided by the manufactures.",
  "Home delivery over pan India with only Rs. 50 delivery charge.",
  "Offer is applicable after making a valid successful payment. Offer Duration.",
  "Uoons Freedom CelebrationOffer is not valid on COD.",
  "You need to make the payment between 14th August, 12:01:00 AM to 15th August 2021, 23:59:00 PM, to get the offer.",
  "In cases of fraudulent/suspicious transactions, Uoons solely reserves the right to revoke the offer and the eligibility of the customer in the offer.",
  "This sale is open for all registered user of www.uoons.com across India.",
  "At its sole discretion, the company reserves the right to cancel or postpone the programme or alter or revise or delete part of the programme without any prior notice.",
  "The benefits, rewards and products of this programme are non-transferable, non-exchangeable and non-returnable for any other value and person.",
  "One log-in ID can avail one products only.",
  "You are accessing the BETA version of www.uoons.com. You might encounter any bugs, lack of functionality, glitches, delayed deliveries, billing errors, products add to cart error or any others problems on this beta website, these are treated as technical errors and company have the right to cancel or modify your order.",
  "Delivery dates communicated or acknowledged by Seller are approximate only, and Seller shall not be liable for, nor shall Seller be in breach of its obligations to Buyer, because of any delivery made within a reasonable time before or after the stated delivery date. Seller agrees to use commercially reasonable efforts to meet the delivery dates communicated or acknowledged by it on the condition that Buyer provides all necessary order and delivery information sufficiently prior to the agreed delivery date.",
  "Disputes, If any, will be settled under the jurisdiction in Indore, Madhya Pradesh.",
];

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <div className="pt-12 bg-gradient-to-r from-blue-100 to-blue-200 px-4 pb-16">
        <h2 className="text-center text-5xl font-bold mb-8 text-blue-900">Terms & Conditions</h2>
        <div className="w-full max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-2xl">
          <ul className="space-y-8">
            {terms.map((term, index) => (
              <li key={index} className="flex items-start space-x-4">
                <FaCheckCircle className="flex-shrink-0 text-green-600 mt-1.5 text-3xl" />
                <p className="text-gray-800 leading-relaxed text-lg">{term}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
