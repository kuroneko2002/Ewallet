const Home = () => {
  const handleLoginWithMetaMask = () => {
    console.log("Login...");
  };

  return (
    <div className="bg-primary-purple">
      <section className="relative py-[100px] bg-primary-purple">
        <div className="absolute inset-0 bg-[url('/assets/bg2.png')] opacity-20"></div>
        <div className="relative mx-auto max-w-screen-lg p-6">
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="text-[60px] font-bold text-center md:text-left">
              <div className="flex flex-wrap items-center gap-5">
                <h1>Play</h1>
                <h1 className="text-primary-yellow">Online Lottery</h1>
              </div>
              <h1>& Win Money</h1>
              <h1>Unlimited</h1>
            </div>
            <img className="w-[350px]" src="assets/assets.png" alt="assets-1" />
          </div>
          <button
            className="mt-10 mx-auto bg-gradient-to-b from-primary-yellow to-secondary-yellow px-4 py-2 rounded-md flex items-center gap-5"
            onClick={() => {
              handleLoginWithMetaMask();
            }}
          >
            <img
              className="w-[50px]"
              src="assets/metamask.png"
              alt="metamask"
            />
            <p>Login With MetaMask</p>
          </button>
        </div>
      </section>
      <section className="relative py-[100px] bg-primary-purple">
        <div className="absolute inset-0 bg-[url('/assets/bg3.png')] opacity-10"></div>
        <div className="relative mx-auto max-w-screen-lg p-6 flex flex-wrap gap-10 items-center justify-between">
          <div className="flex flex-col gap-8">
            <h1 className="text-[60px] font-bold text-center md:text-left">
              About the Lottery
            </h1>
            <p className="max-w-[400px] text-xl">
              A lottery is a gambling game where participants purchase tickets
              in the hope of winning prizes or money through a random number
              drawing.
            </p>
            <button className="w-[200px] bg-gradient-to-b from-primary-yellow to-secondary-yellow px-4 py-2 rounded-md">
              <h1 className="text-2xl font-bold">Know More</h1>
            </button>
          </div>
          <img className="w-[400px]" src="assets/thumb.png" alt="assets-2" />
        </div>
      </section>
    </div>
  );
};

export default Home;
