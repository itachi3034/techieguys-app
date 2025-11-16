import React, { useState, createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// ------------------ Auth Context ------------------
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (email, password) => {
    const role = email.includes('admin') ? 'admin' : 'student';
    const userObj = { name: email.split('@')[0], email, role };
    setUser(userObj);
    return userObj;
  };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
function useAuth() {
  return useContext(AuthContext);
}

// ------------------ Protected Routes ------------------
function RequireAuth({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

// ------------------ Layout Components ------------------
function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg">
            T
          </div>
          <span className="font-semibold text-sm md:text-base text-slate-100">
            TechieGuys <span className="text-cyan-400">Innovative</span> Solutions
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm text-slate-200">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>

          {user ? (
            <button
              onClick={logout}
              className="ml-3 rounded-full px-4 py-1.5 text-xs font-medium bg-slate-100 text-slate-900 hover:bg-white transition"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/signin"
              className="ml-3 rounded-full px-4 py-1.5 text-xs font-medium bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 shadow hover:shadow-lg transition"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative group"
    >
      <span>{children}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500 group-hover:w-full transition-all" />
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-10">
      <div className="max-w-6xl mx-auto text-center text-xs text-slate-400">
        © 2025 TechieGuys Innovative Solutions. All rights reserved.
      </div>
    </footer>
  );
}

// ------------------ Public Pages ------------------
function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-slate-100">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left: hero text */}
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase mb-3">
            Future of Tech Talent
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Empowering the Next Generation of
            <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Software & AI Professionals
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 mb-6">
            Hands-on training in DSA, Machine Learning, and industry-grade internships – designed
            to take you from beginner to job-ready engineer.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              to="/services"
              className="rounded-full px-5 py-2 text-xs font-medium bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 shadow-lg hover:shadow-xl transition"
            >
              Explore Programs
            </Link>
            <Link
              to="/contact"
              className="rounded-full px-5 py-2 text-xs font-medium border border-slate-600 text-slate-100 hover:border-cyan-400 hover:text-cyan-300 transition"
            >
              Book a Free Counseling
            </Link>
          </div>

          <div className="flex gap-6 text-xs text-slate-400">
            <div>
              <p className="text-slate-200 font-semibold">500+</p>
              <p>Learners trained</p>
            </div>
            <div>
              <p className="text-slate-200 font-semibold">20+</p>
              <p>Live projects</p>
            </div>
            <div>
              <p className="text-slate-200 font-semibold">10+</p>
              <p>Partner companies</p>
            </div>
          </div>
        </div>

        {/* Right: image card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-violet-500/10 to-transparent blur-3xl -z-10" />
          <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/70 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80"
              alt="Students collaborating with laptops"
              className="h-60 w-full object-cover"
            />
            <div className="p-4 space-y-2 text-xs">
              <p className="font-semibold text-slate-100">TechieGuys Virtual Lab</p>
              <p className="text-slate-400">
                Live code reviews, 1:1 mentorship, and problem-solving sessions that feel like
                working in a real engineering team.
              </p>
              <div className="flex gap-3 text-[11px]">
                <Badge>DSA</Badge>
                <Badge>Machine Learning</Badge>
                <Badge>Internships</Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature / services preview */}
      <section className="mt-12 grid md:grid-cols-3 gap-6">
        <ServiceCard
          title="DSA Training"
          subtitle="Master algorithms & interview prep"
          image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
          tag="Placement Ready"
        />
        <ServiceCard
          title="Machine Learning"
          subtitle="Hands-on ML models & AI workflows"
          image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
          tag="AI Projects"
        />
        <ServiceCard
          title="Internships & Soft Skills"
          subtitle="Real projects + communication, teamwork, and presentation skills"
          image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
          tag="Industry Ready"
        />
      </section>
    </main>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[10px] text-slate-300">
      {children}
    </span>
  );
}

function ServiceCard({ title, subtitle, image, tag }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg"
    >
      <div className="h-32 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-2 text-xs">
        <span className="inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-[10px] text-cyan-300">
          {tag}
        </span>
        <h3 className="font-semibold text-sm text-slate-100">{title}</h3>
        <p className="text-slate-400">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 text-slate-100">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 mb-2">About Us</p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Building engineers who can ship real products.
          </h2>
          <p className="text-sm text-slate-300 mb-3">
            At TechieGuys Innovative Solutions we blend structured fundamentals with real-world
            exposure. From DSA to Machine Learning to internships, everything is designed to mimic
            how modern tech teams actually work.
          </p>
          <p className="text-sm text-slate-300">
            Small cohorts, mentor-led sessions, code reviews, and project-based learning ensures
            that every learner walks away with a strong portfolio and confidence to crack
            interviews.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=600&q=80"
            alt="Students coding together"
            className="rounded-2xl border border-slate-800 object-cover h-32 md:h-40"
          />
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
            alt="Team collaboration"
            className="rounded-2xl border border-slate-800 object-cover h-32 md:h-40"
          />
          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
            alt="Mentorship session"
            className="rounded-2xl border border-slate-800 object-cover h-32 md:h-40"
          />
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
            alt="Presentation"
            className="rounded-2xl border border-slate-800 object-cover h-32 md:h-40"
          />
        </div>
      </div>
    </main>
  );
}

function Services() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 text-slate-100">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Programs</h2>
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-100">DSA Training</h3>
          <p className="text-slate-300">
            Coding interview preparation, data structures, algorithms, time & space complexity,
            competitive programming patterns, and mock interviews.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-100">Machine Learning</h3>
          <p className="text-slate-300">
            Python for ML, supervised & unsupervised learning, model evaluation, deployment basics,
            and end-to-end ML projects with real datasets.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-100">Internships</h3>
          <p className="text-slate-300">
            Work on production-style projects with mentors reviewing your code, Git/GitHub workflow,
            documentation, and demo days.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-100">Soft Skill Training</h3>
          <p className="text-slate-300">
            Communication skills, teamwork, resume building, LinkedIn optimization, and presenting
            your projects confidently in interviews.
          </p>
        </div>
      </div>
    </main>
  );
}

function Contact() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-slate-100">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Contact Us</h2>
      <p className="text-sm text-slate-300 mb-6">
        Tell us a bit about yourself and what you&apos;re looking for. We&apos;ll get back within
        24 hours with next steps, program details, and guidance.
      </p>
      <div className="grid md:grid-cols-5 gap-8">
        <form className="space-y-3 md:col-span-3">
          <input className="w-full p-2 rounded border border-slate-700 bg-slate-900 text-sm" placeholder="Full Name" />
          <input className="w-full p-2 rounded border border-slate-700 bg-slate-900 text-sm" placeholder="Email" />
          <input className="w-full p-2 rounded border border-slate-700 bg-slate-900 text-sm" placeholder="Phone / WhatsApp" />
          <textarea
            className="w-full p-2 rounded border border-slate-700 bg-slate-900 text-sm"
            placeholder="Tell us what you want to learn or build..."
            rows={5}
          />
          <button className="w-full md:w-auto bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-medium px-6 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition">
            Send Message
          </button>
        </form>

        <div className="md:col-span-2 space-y-3 text-xs text-slate-300">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="font-semibold text-slate-100 mb-1">Visit / Connect</p>
            <p>Bangalore · Hybrid / Remote</p>
            <p className="mt-2">Email: hello@techieguys.in</p>
            <p>Phone: +91-98765-43210</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <main className="flex items-center justify-center px-4 py-10 text-slate-100">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <p className="text-xs text-slate-400 mb-4">
          Use any email with <span className="font-mono text-cyan-300">admin</span> in it to enter
          the admin dashboard.
        </p>
        <form onSubmit={handleLogin} className="space-y-3 text-sm">
          <input
            className="w-full p-2 rounded border border-slate-700 bg-slate-950"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 rounded border border-slate-700 bg-slate-950"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-medium px-4 py-2 rounded-full">
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}

// ------------------ Dashboard Layout ------------------
function DashboardLayout() {
  return (
    <div className="min-h-[80vh] flex bg-slate-950 text-slate-100">
      <aside className="w-60 border-r border-slate-800 bg-slate-900/80">
        <div className="px-4 py-4 border-b border-slate-800">
          <h3 className="font-semibold text-sm text-slate-100">Admin Panel</h3>
          <p className="text-[11px] text-slate-400">Manage users, courses & insights</p>
        </div>
        <nav className="flex flex-col px-2 py-4 text-sm">
          <DashboardLink to="/dashboard">Overview</DashboardLink>
          <DashboardLink to="/dashboard/users">Users</DashboardLink>
          <DashboardLink to="/dashboard/courses">Courses</DashboardLink>
        </nav>
      </aside>
      <section className="flex-1 p-6 bg-slate-950">
        <Outlet />
      </section>
    </div>
  );
}

function DashboardLink({ to, children }) {
  return (
    <Link
      to={to}
      className="rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800/70 hover:text-cyan-300 mb-1 text-xs"
    >
      {children}
    </Link>
  );
}

function DashboardOverview() {
  const data = [
    { name: 'Jan', users: 30 },
    { name: 'Feb', users: 50 },
    { name: 'Mar', users: 90 },
    { name: 'Apr', users: 70 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Overview</h2>

      <div className="grid md:grid-cols-3 gap-4 text-xs">
        <MetricCard label="Active Students" value="1,240" />
        <MetricCard label="Ongoing Internships" value="24" />
        <MetricCard label="Courses" value="8" />
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow">
        <h3 className="font-semibold text-sm mb-3 text-slate-100">Monthly Signups</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: 12 }} />
              <Line type="monotone" stroke="#22d3ee" strokeWidth={2} dataKey="users" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow flex flex-col justify-between">
      <p className="text-[11px] text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function UsersPage() {
  const users = [
    { id: 1, name: 'alice', email: 'alice@example.com', role: 'student' },
    { id: 2, name: 'bob', email: 'bob@example.com', role: 'student' },
    { id: 3, name: 'charlie', email: 'admin@example.com', role: 'admin' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Users</h2>
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden text-xs">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr className="text-slate-400">
              <th className="p-3 text-left font-medium">#</th>
              <th className="p-3 text-left font-medium">Name</th>
              <th className="p-3 text-left font-medium">Email</th>
              <th className="p-3 text-left font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-800 hover:bg-slate-800/40">
                <td className="p-3">{u.id}</td>
                <td className="p-3 capitalize">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 uppercase text-[10px] tracking-wide">
                  <span className="inline-flex rounded-full px-2.5 py-1 bg-slate-800 text-slate-200">
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CoursesPage() {
  const courses = [
    { id: 'DSA', title: 'Data Structures & Algorithms', seats: 50 },
    { id: 'ML', title: 'Machine Learning', seats: 30 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Courses</h2>
      <div className="grid md:grid-cols-2 gap-4 text-xs">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow flex flex-col justify-between"
          >
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Course ID: {c.id}</p>
              <h3 className="font-semibold text-slate-100 mb-1">{c.title}</h3>
            </div>
            <p className="text-slate-300 mt-2">Available seats: {c.seats}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------ Main App ------------------
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
          <Header />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />

              <Route
                path="/dashboard/*"
                element={
                  <RequireAuth role="admin">
                    <DashboardLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="courses" element={<CoursesPage />} />
              </Route>

              <Route
                path="*"
                element={
                  <main className="max-w-4xl mx-auto px-4 py-10">
                    <h2 className="text-2xl font-semibold mb-2">404 — Not Found</h2>
                    <p className="text-sm text-slate-300">
                      The page you&apos;re looking for does not exist.{' '}
                      <Link to="/" className="text-cyan-400 hover:underline">
                        Go back home
                      </Link>
                      .
                    </p>
                  </main>
                }
              />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
