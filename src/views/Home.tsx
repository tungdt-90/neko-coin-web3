const Home = () => (
  <>
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Home page</h1>
      </div>
    </header>
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-3 md:p-6">
            <h3 className="text-xl">
              <strong>Pet project demo for Neko Token</strong>
            </h3>
            <p>
              A demo for WolffunGame, using Web3JS to interact with Metamask.
            </p>
            <p>
              To connect to Metamask Wallet and see your account&apos;s
              information about Neko Token, please go to Wallet page.
            </p>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default Home;
