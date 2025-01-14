import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-100 py-4 m-2 rounded-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Plae Logo icon here */}
          <a className="p-3 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors" href="/">
            {/* <svg className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" fill="#yellow-500" />
            </svg> */}
            <img src='https://img.icons8.com/?size=100&id=YyEbAVyRYrMX&format=png&color=000000' width={40} height={40}/>
          </a>

          {/* Profile Section */}
          <div className="flex items-center space-x-3 bg-white rounded-full shadow-sm px-3 py-2">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/19/0a/10/190a10c77e85deed8d5004dd25cd422e.jpg"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col pr-2">
              <span className="text-sm font-medium text-gray-900">{user?.name || 'Guest Account'}</span>
              <span className="text-xs text-gray-500">{user?.accountType || 'Login/Signup'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const user = {
  id: '',
  name: '',
  phoneNumber: '',
  profilePicture: '',
  authenticated: false,
}; //implement later on......