import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, LogIn, UserPlus, Coffee, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      setLoading(false)
      return
    }

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password)
        if (error) {
          setMessage({ type: 'error', text: error.message })
        } else {
          setMessage({ 
            type: 'success', 
            text: 'Account created! Check your email to verify your account, then sign in.' 
          })
          setIsSignUp(false)
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) {
          setMessage({ type: 'error', text: error.message })
        } else {
          navigate('/admin')
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-orange-500 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-500 p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Coffee className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-white">BiteFlow</h1>
            <p className="text-red-100 mt-1">Admin Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-500 mt-1">
                {isSignUp ? 'Sign up to manage your store' : 'Sign in to access dashboard'}
              </p>
            </div>

            {/* Message */}
            {message.text && (
              <div className={`flex items-center gap-3 p-4 rounded-xl ${
                message.type === 'error' 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {message.type === 'error' 
                  ? <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  : <CheckCircle className="w-5 h-5 flex-shrink-0" />
                }
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@biteflow.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none pr-12"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isSignUp ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setMessage({ type: '', text: '' })
                  }}
                  className="ml-2 text-red-600 font-semibold hover:text-red-700"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Kiosk Link */}
        <div className="text-center mt-6">
          <a 
            href="/"
            className="text-white/90 hover:text-white font-medium flex items-center justify-center gap-2"
          >
            ← Back to Order Kiosk
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
