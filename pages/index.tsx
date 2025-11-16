import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center p-6 bg-black border-b border-maroon">
        <div className="text-3xl font-bold text-maroon">ZShield</div>
        <div className="space-x-6">
          <button className="px-6 py-2 bg-maroon text-white rounded-lg hover:bg-red-900">
            <Link href="/dashboard">Dashboard</Link>
          </button>
        </div>
      </nav>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">Privacy Intelligence for Zcash</h1>
          <p className="text-xl text-gray-400 mb-8">Analyze transaction privacy, detect metadata leaks, and optimize fees before sending.</p>
          <div className="space-x-4">
            <Link href="/dashboard">
              <button className="px-8 py-3 bg-maroon text-white rounded-lg font-semibold hover:bg-red-900">Analyze Now</button>
            </Link>
            <a href="https://chrome.google.com/webstore/detail/zshield/" className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 inline-block">Install Extension</a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-900 p-6 rounded-lg border border-maroon">
            <h3 className="text-xl font-bold mb-3">Privacy Score</h3>
            <p>Real-time analysis of transaction privacy with detailed risk assessment</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-maroon">
            <h3 className="text-xl font-bold mb-3">Fee Optimizer</h3>
            <p>Save money with smart fee suggestions and optimal broadcast timing</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-maroon">
            <h3 className="text-xl font-bold mb-3">Metadata Detection</h3>
            <p>Identify privacy leaks before they happen and prevent linkability</p>
          </div>
        </div>
      </section>
      <section className="bg-gray-900 py-20 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-maroon w-12">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Paste or Monitor</h3>
                <p>Analyze any Zcash transaction ID or address instantly</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-maroon w-12">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Get Privacy Score</h3>
                <p>Receive a detailed privacy analysis with risk warnings</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-maroon w-12">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Optimize & Send</h3>
                <p>Get fee recommendations and optimal broadcast timing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Protect Your Privacy?</h2>
        <p className="text-xl text-gray-400 mb-8">Join privacy-conscious Zcash users. No signup required.</p>
        <div className="space-x-4">
          <Link href="/dashboard">
            <button className="px-8 py-3 bg-maroon text-white rounded-lg font-semibold hover:bg-red-900">Start Analyzing</button>
          </Link>
          <a href="https://chrome.google.com/webstore/detail/zshield/" className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 inline-block">Get Extension</a>
        </div>
      </section>
      <footer className="bg-black border-t border-gray-800 py-6 text-center text-gray-500">
        <p>&copy; 2025 ZShield. Protecting privacy on Zcash.</p>
      </footer>
    </div>
  );
}