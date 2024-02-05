import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
    <footer>
      
        <div>
          <div className="text-center py-3  fixed bottom-0 w-full
           bg-gray-400 backdrop-blur">
            <p>Bus Ticketing &copy; {currentYear}</p>
          </div>
        </div>
     
    </footer>
    </>
  );
};

export default Footer;