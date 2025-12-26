import React from 'react'
import { Users, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react'

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-green-500 font-medium flex items-center gap-1">
        <TrendingUp size={16} />
        {change}
      </span>
      <span className="text-gray-400 ml-2">vs last month</span>
    </div>
  </div>
)

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$45,231.89" 
          change="+20.1%" 
          icon={DollarSign} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Active Users" 
          value="+2350" 
          change="+180.1%" 
          icon={Users} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Sales" 
          value="+12,234" 
          change="+19%" 
          icon={ShoppingBag} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Active Now" 
          value="+573" 
          change="+201" 
          icon={TrendingUp} 
          color="bg-purple-500" 
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-sm font-medium text-gray-500">Order ID</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Customer</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Product</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-900">#ORD-{2024000 + i}</td>
                  <td className="py-4 text-sm text-gray-600">John Doe</td>
                  <td className="py-4 text-sm text-gray-600">Nike Air Max</td>
                  <td className="py-4 text-sm text-gray-600">Oct 24, 2024</td>
                  <td className="py-4 text-sm font-medium text-gray-900">$120.00</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
