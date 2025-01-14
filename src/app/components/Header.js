import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-100 py-4 m-2 rounded-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Plae Logo icon here */}
          <a className="p-3 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors" href = "/">
            <svg className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10zm0-2c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
            </svg>
          </a>

          {/* Profile Section */}
          <div className="flex items-center space-x-3 bg-white rounded-full shadow-sm px-3 py-2">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src="/profile-placeholder.jpg"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col pr-2">
              <span className="text-sm font-medium text-gray-900">{user?.name || 'Login/Signup'}</span>
              <span className="text-xs text-gray-500">{user?.accountType || 'with TrueCaller'}</span>
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