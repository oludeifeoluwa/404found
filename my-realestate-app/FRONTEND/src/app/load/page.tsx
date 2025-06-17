import Link from "next/link"


export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-6">
        
        <div className=" text-lg font-medium " >
          <img src="logo.png"  width={100} height={100} />
        </div>

        
        <div className="flex flex-col items-center space-y-2"><span></span>
          <div className="flex items-center justify-center">
            <hr className="w-12 border-t border-black" />
            <span className="mx-2 text-2xl"><img src="User.png" alt="" /></span>
            <hr className="w-12 border-t border-black" />
          </div>
          <p className="text-sm text-gray-700">What are you?</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <button className="bg-black text-white px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-green-800">
            <span></span>
            <Link href="/user"><span>I'm a Buyer</span></Link>
            
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-green-800">
            <span></span>
            <Link href={"/agent"}><span>I'm a Real Estate Agent</span></Link>
          </button>
        </div>
      </div>
    </div>
  );
}
