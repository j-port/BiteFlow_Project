import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-orange-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
