import React from 'react'

const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-4 bg-black">
        <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} VoyageAI. All rights reserved.
        </p>
        <p className="text-sm text-gray-400">
            Made with ❤️ by <a href="https://instagram.com/lvs.gthnj" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors duration-200">
                lvs
            </a>
        </p>
        </div>
    </footer>
  )
}

export default Footer