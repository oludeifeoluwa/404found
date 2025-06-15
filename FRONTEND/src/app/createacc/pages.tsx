// app/create-account/page.tsx or pages/create-account.tsx

import Link from 'next/link';

export default function CreateAccount() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        {/* Logo */}
        <div className="bg-gray-200 rounded-md px-6 py-3 text-lg font-medium">
          Logo
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <div className="flex items-center justify-center mt-2">
            <hr className="w-16 border-t border-black" />
            <span className="mx-2 text-sm font-medium">Buyer</span>
            <hr className="w-16 border-t border-black" />
          </div>
        </div>

        {/* Form Container */}
        <div className="relative w-full border border-gray-300 p-6 rounded-md">
          {/* Back Arrow */}
          <button className="absolute left-[-25px] top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2">
            ←
          </button>

          {/* Form Fields */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Middle Name</label>
              <input
                type="text"
                placeholder="Hudson"
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Peterson"
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Continue
            </button>
          </form>

          {/* Sign-in Link */}
          <p className="text-xs text-center mt-4">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-500 underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
