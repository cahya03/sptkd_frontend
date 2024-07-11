import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
        <div className="flex" style={{minHeight: "100vh"}}>
          <div className="w-1/5 bg-white">
            <Sidebar/>
          </div>
          <div className="pt-16 w-4/5 p-4 bg-gray-100">
            <main>{children}</main>
          </div>
        </div>
    </React.Fragment>
  )
}

export default Layout