import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Code2, GitPullRequest, Users, Search, ArrowRight, Github } from "lucide-react";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen w-full ">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Collaborate on Projects
            <span className="text-[#0165FF]"> Seamlessly</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with developers, find projects matching your tech stack, and collaborate through GitHub integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-[#0165FF]  text-white px-8 py-3 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 hover:bg-white hover:text-[#0165FF]"
            >
              <Search className="w-5 h-5" />
              Browse Projects
            </Link>
            {!user?.isLoggedIn && (
              <Link
                to="/login"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Github className="w-5 h-5" />
                Sign in with GitHub
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6 text-[#0165FF]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Tech Stack Matching</h3>
            <p className="text-gray-400">
              Find projects that match your expertise or discover contributors with the right skills for your project.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
              <GitPullRequest className="w-6 h-6 text-[#0165FF]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Task Management</h3>
            <p className="text-gray-400">
              Track task progress through GitHub PRs. Tasks are automatically marked complete when PRs are merged.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 bg-black/30 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-[#0165FF]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Collaboration</h3>
            <p className="text-gray-400">
              Connect with developers, manage project roles, and collaborate effectively through integrated messaging.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0165FF]/30">
              <span className="text-2xl font-bold text-[#0165FF]">1</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Sign In</h3>
            <p className="text-gray-400">Connect with your GitHub account</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0165FF]/30">
              <span className="text-2xl font-bold text-[#0165FF]">2</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Set Skills</h3>
            <p className="text-gray-400">Define your tech stack and expertise</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0165FF]/30">
              <span className="text-2xl font-bold text-[#0165FF]">3</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Find Projects</h3>
            <p className="text-gray-400">Discover projects matching your skills</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0165FF]/30">
              <span className="text-2xl font-bold text-[#0165FF]">4</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Collaborate</h3>
            <p className="text-gray-400">Start contributing and tracking progress</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-black/20 rounded-2xl p-8 text-center border border-white/30">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Collaborating?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our platform to find exciting projects, connect with developers, and contribute to meaningful work.
          </p>
          <Link
            to={user?.isLoggedIn ? "/projects" : "/login"}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0165FF] px-8 py-3 rounded-2xl font-bold hover:bg-[#0165FF] hover:text-white transition-colors"
          >
            {user?.isLoggedIn ? "Browse Projects" : "Get Started"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
