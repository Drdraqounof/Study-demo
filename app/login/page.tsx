
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  type AuthMode = 'login' | 'signup';
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [surveyDone, setSurveyDone] = useState(false);
  const [name, setName] = useState('');
  const [aiUsed, setAiUsed] = useState('');
  const [appsUsed, setAppsUsed] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Removed welcomeMsg and loginRole state
  const adminAccounts = [
    { email: 'rob@launchpadphilly.org', password: 'lpuser1' },
    { email: 'sanaa@launchpadphilly.org', password: 'lpuser2' },
    { email: 'taheera@launchpadphilly.org', password: 'lpuser3' },
  ];

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSurveyDone(false); // Reset surveyDone on login attempt
    setIsLoading(true);
    if (email && password) {
      try {
        // Call /api/logins to check/insert user
        const res = await fetch('/api/logins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        // If new user, increment visits
        if (data.newUser) {
          await fetch('/api/visits', { method: 'POST' });
        }
        // Check if admin
        const isAdmin = adminAccounts.some(acc => acc.email === email && acc.password === password);
        if (isAdmin) {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.removeItem('isAdmin');
        }
        setIsLoading(false);
        router.push('/dashboard');
      } catch (err) {
        setIsLoading(false);
        setError('Login failed');
      }
    } else {
      setIsLoading(false);
      setError('Login failed');
    }
  };

  useEffect(() => {
    // Check if survey is done (could use localStorage or a cookie)
    const done = localStorage.getItem("surveyDone");
    setSurveyDone(done === "true");
    if (!done) {
      router.push("/questions");
    }
  }, [router]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    if (email && password && name) {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        setIsLoading(false);
        if (res.ok) {
          setError('');
          setMode('login');
          setEmail('');
          setPassword('');
          setName('');
          setAiUsed('');
          setAppsUsed('');
          setEducationLevel('');
        } else {
          setError(data.error || 'Signup failed');
        }
      } catch (err) {
        setIsLoading(false);
        setError('Signup failed');
      }
    } else {
      setIsLoading(false);
      setError('Signup failed');
    }
  };

  // Removed handleRoleSelect and setSelectedRole

  // ...removed role selection screen...

  // Login Screen
  if (mode === 'login') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ maxWidth: 400, width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001', padding: 32 }}>
          <h2 style={{ color: '#4f46e5', marginBottom: 24, textAlign: 'center' }}>Login to StudyFlow</h2>
          {/* Removed teacher welcome message */}
          {error && (
            <div style={{ color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={20} style={{ marginRight: 8 }} />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label htmlFor="login-email" style={{ fontWeight: 500 }}>Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #e5e7eb', marginBottom: 8 }}
            />
            <label htmlFor="login-password" style={{ fontWeight: 500 }}>Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              disabled={isLoading}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #e5e7eb', marginBottom: 8 }}
            />
            {/* Removed teacher code input from login */}
            <button
              type="submit"
              disabled={isLoading}
              style={{ padding: '12px 0', background: '#4f46e5', color: '#fff', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1rem', marginTop: 8 }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
            Don&apos;t have an account?{' '}
            <a href="#" style={{ color: '#4f46e5', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { setMode('signup'); setEmail(''); setPassword(''); setError(''); }}>Sign up</a>
          </div>
          <button
            style={{ marginTop: 16, background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: 8, padding: '10px 0', width: '100%', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Signup Screen
  if (mode === 'signup') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ maxWidth: 400, width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001', padding: 32 }}>
          <h2 style={{ color: '#4f46e5', marginBottom: 24, textAlign: 'center' }}>Sign Up for StudyFlow</h2>
          {error && (
            <div style={{ color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={20} style={{ marginRight: 8 }} />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label htmlFor="signup-name" style={{ fontWeight: 500 }}>Full Name</label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="John Doe"
              required
              disabled={isLoading}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #e5e7eb', marginBottom: 8 }}
            />
            <label htmlFor="signup-email" style={{ fontWeight: 500 }}>Email</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #e5e7eb', marginBottom: 8 }}
            />
            <label htmlFor="signup-password" style={{ fontWeight: 500 }}>Password</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              disabled={isLoading}
              minLength={6}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #e5e7eb', marginBottom: 8 }}
            />
            {/* Removed extra questions from signup. Questions will be asked on a separate page. */}
            <button
              type="submit"
              disabled={isLoading}
              style={{ padding: '12px 0', background: '#4f46e5', color: '#fff', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1rem', marginTop: 8 }}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
            <a href="#" style={{ color: '#4f46e5', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { setMode('login'); setEmail(''); setPassword(''); setName(''); setAiUsed(''); setAppsUsed(''); setEducationLevel(''); setError(''); }}>Already have an account? Log in</a>
          </div>
        </div>
      </div>
    );
  }

  // Fallback (should never render)
  return null;
}
