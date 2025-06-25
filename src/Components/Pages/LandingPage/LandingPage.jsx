// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../../Utilities/Header';
// // import { cars } from '../../Utilities/Girls';
// import Footer from '../../Utilities/Footer';
// import { sendTelegramMessage } from '../../Utilities/Telegrammessage';
// import Trump from '../../../assets/trump.webp'
// import SwipeableNewsCard from '../../Utilities/SwipeCard';

import articles from "../../Utilities/articles";
import SwipeableNewsCard from "../../Utilities/SwipeCard";

const NewsPage = () => {
  return (
    <div className="grid gap-6 p-4">
      {articles.map((article) => (
        <SwipeableNewsCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default NewsPage;





// const LandingPage = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     sendTelegramMessage("👀 *New visitor on your landing page!*");
//   }, []);

//   return (
//     <div className="bg-[#f5f5f5] min-h-screen">
//       <Header />

//       {/* Banner */}
//       <div className="bg-[#03264d] text-white py-6 text-center">
//         <h1 className="text-3xl font-bold uppercase">Top Headlines</h1>
//         <p className="text-sm mt-1">From Terrabyte Media</p>
//       </div>

//       {/* Cards */}
//       {/* <div className="max-w-3xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {articles.map((article) => (
//           <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-md">
//             <img
//               src={article.image}
//               alt={article.title}
//               className="w-full h-40 object-cover"
//             />

//             <div className="p-4 space-y-2">
//               <div className="flex items-center space-x-2 text-xs">
//                 <span className="bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
//                   {article.label}
//                 </span>
//                 <span className="text-gray-600 font-semibold uppercase">{article.category}</span>
//               </div>

//               <h2 className="text-red-700 font-bold text-[15px] leading-snug">
//                 {article.title}
//               </h2>
//             </div>
//           </div>
//         ))}
//       </div> */}
// <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto px-4 py-8">
//   {articles.map((a) => (
//     <SwipeableNewsCard key={a.id} article={a} />
//   ))}
// </div>
//       <Footer />
//     </div>
//   );
// };

// export default LandingPage;
