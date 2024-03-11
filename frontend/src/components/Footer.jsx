import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
    <footer className="bg-gray-900 text-white fixed bottom-0 w-full py-1">
    <div className="container mx-auto text-center">
            <p>Bus Ticketing &copy; {currentYear}</p>
          
        </div>
     
    </footer>
    </>
  );
};



export default Footer;