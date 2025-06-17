"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  Star,
  MessageCircle,
  Home,
  Calendar,
  Brain,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("Buy");

  const propertyData = [
    {
      id: 1,
      price: "880k",
      title: "2 Bedroom in Lekki",
      image: "/images/o.jpg",
      agent: "Agent",
      description: "Description",
    },
    {
      id: 2,
      price: "990k",
      title: "6 Bedroom in Lekki",
      image: "/images/p.jpg",
      agent: "Agent",
      description: "Description",
    },
    {
      id: 3,
      price: "1.1M",
      title: "2 Bedroom in Lekki",
      image: "/i.jpg",
      agent: "Agent",
      description: "Description",
    },
  ];

  const filters = ["Buy", "Rent", "Recently Added", "Hot", "Favorites"];

  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4 fixed z-50 w-full ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div><img src="/logo.png" width={40}/></div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search New Houses"
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            </div>
            <button className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm sticky top-20 max-h-[480px]">
          <nav className="p-4 space-y-2 ">
            <a
              href="#"
              className="flex items-center space-x-3 bg-green-500 text-white px-4 py-3 rounded-lg"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-lg"
            >
              <Search className="w-5 h-5" />
              <span>Browse</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-lg"
            >
              <Home className="w-5 h-5" />
              <span>Properties</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-lg"
            >
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-lg"
            >
              <Brain className="w-5 h-5" />
              <span>Prediction AI</span>
            </a>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Link href='../../api/v1/auth/logout'> <button className="flex items-center space-x-3 bg-gray-800 text-white px-4 py-3 rounded-lg ">
              <LogOut className="w-5 h-5" />
             <span>Log Out</span>
            </button></Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="back">
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-300 text-4xl">☀️</span>
                <span className="font-semibold text-3xl">Welcome back {}</span>
              </div>
              <p className="text-green-100 ml-16">Let's find your dream home today</p>
            </div>
            <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-yellow-400 to-transparent opacity-30"></div>
          </div>

          {/* Stats Cards */}
          <div className="relative w-full">
            <div className="grid grid-cols-4 gap-6 mb-8 absolute -top-14 center w-10/12">
              <div className="bg-white rounded-lg p-4 shadow-sm ">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-3">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Saved homes</h3>
                <p className="text-2xl font-bold text-gray-900">100</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Upcoming</h3>
                <p className="text-sm text-gray-600">June 8 @ 2:30 PM</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Messages</h3>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-3">
                  <Home className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-800">New Listings</h3>
                <p className="text-sm text-gray-600">8 nearby</p>
              </div>
            </div>
          </div>
          {/* Search Question */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm mt-28">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What would you like to do today ?
            </h2>
            <input
              type="text"
              placeholder="Type your search here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Suggested Properties */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Suggested for you
                </h2>
                <p className="text-gray-600">Available houses near you</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-4 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-gray-800 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Property Cards */}
            <div className="relative">
              <div className="flex space-x-6 overflow-x-auto pb-4">
                {propertyData.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden min-w-[300px]"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <img src={property.image} alt="" />
                      </div>
                      <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 rounded text-sm">
                        {property.price}
                      </div>
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-sm">
                        For Sale
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm">
                            {property.agent}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {property.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
                          View Details
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                          Buy
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="text-right mt-4">
              <button className="text-blue-500 hover:text-blue-600 font-medium">
                Show more...
              </button>
            </div>
          </div>

          {/* AI Section */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Find your Dream House with Housify AI
                </h2>
                <p className="text-gray-600">Predict, Book and Enjoy</p>
              </div>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200">
                Logo
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Our Latest Reviews
            </h2>
            <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Reviews content would go here</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
