import React from 'react';
import { Dumbbell, Newspaper, Calendar, Users, Link } from 'lucide-react';
import Blog from './Blog';
import { NavLink } from 'react-router-dom';
import Classes from './Classes';

const LandingPage = () => {
  return (
    <div className="min-h-screen fontt  ">
    

      <main className=" w-full p-3 ">
        
        <section className=" flex md:flex-row flex-col justify-center items-center mb-12   h-screen w-[100%]">
          <div className='flex flex-col  justify-center items-center'>
          <h1 className="text-5xl md:text-4xl lg:text-7xl font-bold mb-4 text-white text-center">Welcome to Swabi Muscles Gym</h1>
          <p className="md:text-2xl text-center md:p-8 text-white">Embrace a path to wellness and vitality that empowers your body and mind.
          Your journey to a healthier, happier you begins right here, right now</p>
          <div className='flex gap-3 mt-4'>
        <NavLink to='/contact'>  <button className='text-xl bg-[#6e2424] py-3 px-5 font-semibold hover:text-white text-white rounded-full hover:bg-black '>Contact Us</button></NavLink>
        {/* <NavLink to='/admin'>   <button className='text-xl bg-[#6e2424] py-3 px-5 font-semibold hover:text-white text-white rounded-full hover:bg-black'>Admin</button></NavLink> */}
        </div>
        </div>
        <img src='/logo.png' className='w-fit'/>
        </section>

        <section className=" mb-12">
          
         <Blog/>
        </section>
        <section className="  mb-12">
         <Classes/>
        </section>

        <section className="bg-gray-800 p-8 rounded-lg mb-12">
          <h2 className="text-3xl font-bold mb-4 text-blue-300">Why Choose SMG Gym?</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>State-of-the-art equipment</li>
            <li>Expert trainers and nutritionists</li>
            <li>Wide variety of classes for all fitness levels</li>
            <li>Supportive community atmosphere</li>
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-4 border-t border-gray-700">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SMG Gym. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;