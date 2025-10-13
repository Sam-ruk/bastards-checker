"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Chewy } from "next/font/google";

const chewy = Chewy({ subsets: ["latin"], weight: "400" });

export default function HomeSection() {
  const [wallet, setWallet] = useState<string>("");
  const [isWhitelisted, setIsWhitelisted] = useState<boolean | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === '+' || e.key === '-')) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeydown);

    const style = document.createElement('style');
    style.innerHTML = `
      body {
        touch-action: pan-y !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeydown);
      style.remove();
    };
  }, []);

  const whitelisted = process.env.NEXT_PUBLIC_WALLETS?.split(",").map(w => w.trim().toLowerCase()) || [];
  
  const handleCheck = () => {
    setIsWhitelisted(whitelisted.includes(wallet.toLowerCase()));
    setHasChecked(true);
  };

  const postOnX = () => {
    const message = `🎉 Wow, I'm eligible to mint Bastards on Monad Mainnet 🎉\n Check your's :`;
    const url = "https://bastards-checker.vercel.app/";
    const hashtags = "Bastards,Monad";
    
    const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message
    )}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
    
    window.open(twitterIntent, "_blank");
  };

  return (
    <div className="relative w-full lg:min-h-screen oerflow-x-hidden text-white font-bold">
      {/* Mobile - Split background */}
      <div className="lg:hidden absolute inset-0">
        {/* Top section - shows left portion of background (wallet area) */}
        <div 
          className="absolute top-0 left-0 w-full bg-no-repeat"
          style={{ 
            backgroundImage: "url('/main-bg.png')", 
            backgroundSize: "200% 100%", 
            backgroundPosition: "left center",
            height: "490px",
            maskImage: "linear-gradient(to bottom, white 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, white 90%, transparent 100%)"
          }}
        />
        {/* Bottom section */}
        <div 
          className="absolute left-0 w-full bottom-0 bg-no-repeat"
          style={{ 
            backgroundImage: "url('/bg-main-2.png')", 
            backgroundSize: "200% 100%", 
            backgroundPosition: "right center",
            top: "465px",
            maskImage: "linear-gradient(to top, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 90%, transparent 100%)"
          }}
        />
      </div>
      
      {/* Desktop - Full background */}
      <div
        className="hidden lg:block absolute inset-0 bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/main-bg.png')", backgroundSize: "100% 100%" }}
      />

      <div
        className="flex items-center justify-between w-full h-14 py-0 px-0 relative z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/navbar-bg.png')" }}
      >
        <div className="flex items-center">
          <Image
            src="/bas_logo.jpg"
            alt="Bastards Logo"
            width={35}
            height={35}
            className="ml-3 mb-1 object-contain"
          />
          <span className="text-white text-2xl font-bold inline xs:hidden">astards</span>
        </div>
        
        <div className="flex items-center gap-1 mr-3">
          <a href="https://x.com/bastards_xyz" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <Image
              src="/x-logo.png"
              alt="X Logo"
              width={32}
              height={32}
              className="object-contain w-8 h-8 sm:w-8 sm:h-8"
            />
          </a>
          <a href="https://discord.com/invite/bastards-1353038611154599986" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <Image
              src="/dc-logo.png"
              alt="Discord Logo"
              width={32}
              height={32}
              className="object-contain w-8 h-8 sm:w-8 sm:h-8"
            />
          </a>
        </div>
      </div>

      <div className="absolute top-13 left-0 w-full h-1 bg-white z-20" />

      <div className="absolute top-18 sm:top-20 left-1/2 transform -translate-x-1/2 text-center z-20 px-2 w-full max-w-7xl">
        <p className={`${chewy.className} text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`}>
          The Bastards step first into Monad.
        </p>
        <p className="text-md sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2" style={{ fontFamily: 'Arial' }}>
          Check your whitelist status now — the mainnet awaits the bold.
        </p>
      </div>

      <div className="absolute top-54 sm:top-56 md:top-53 left-1/2 lg:left-25 transform -translate-x-1/2 lg:translate-x-0 flex flex-col items-start bg-purple-200/90 p-6 sm:p-8 rounded-3xl z-20 w-11/12 sm:w-4/5 md:w-3/5 lg:w-130 max-w-2xl shadow-2xl">
        <p className="text-black text-base sm:text-lg mb-4 sm:mb-6 italic font-semibold">
          Enter your wallet address to check your WL status.
        </p>
        <input
          type="text"
          placeholder="0x...."
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="px-4 sm:px-6 py-3 sm:py-4 rounded-2xl text-gray-600 w-full bg-white/60 mb-4 text-sm sm:text-base"
        />
        
        {!hasChecked && (
          <button
            onClick={handleCheck}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-900 to-pink-500 text-white font-bold rounded-2xl hover:scale-105 transition w-full text-base sm:text-lg"
          >
            Check Wallet
          </button>
        )}

        {hasChecked && (
          <div className="mt-4 flex flex-row sm:flex-row items-center justify-center gap-4 w-full">
            {isWhitelisted ? (
              <>
                <p className="text-green-800 text-lg sm:text-xl font-bold">Whitelisted ✅</p>
                <button
                  onClick={postOnX}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl hover:scale-105 transition text-sm sm:text-base"
                >
                  Share on X
                </button>
              </>
            ) : (
              <p className="text-red-600 text-lg sm:text-xl font-bold">Not Whitelisted ❌</p>
            )}
          </div>
        )}
      </div>

      {/* Desktop - positioned on right */}
      <div className="hidden lg:flex absolute top-35 right-16 flex-col items-center z-10">
        <div className="absolute w-80 h-80">
          <Image
            src="/monad-logo.png"
            alt="Monad Logo"
            fill
            className="animate-spin"
            style={{ animation: 'spin 10s linear infinite' }}
          />
        </div>
        <div className="relative top-40 w-100 h-45">
          <Image
            src="/bastards.png"
            alt="Bastards Overlay"
            fill
            className="absolute top-0 left-0"
          />
        </div>
        <div className="relative top-40 w-100 h-19 mt-[-24px]">
          <Image
            src="/bastards_flipped.png"
            alt="Flipped Bastards Overlay"
            fill
            className="absolute top-0 left-0 opacity-50"
          />
        </div>
      </div>

      {/* Mobile - positioned below wallet box */}
<div className="lg:hidden flex flex-col items-center relative z-10 mt-[420px] sm:mt-[460px] md:mt-[500px] px-4 pb-0 mb-[-10px] overflow-hidden">
  <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
    <Image
      src="/monad-logo.png"
      alt="Monad Logo"
      fill
      className="animate-spin object-contain"
      style={{ animation: "spin 10s linear infinite" }}
    />
  </div>

  <div className="relative w-90 h-36 sm:w-80 sm:h-36 z-2 -mt-36">
    <Image
      src="/bastards.png"
      alt="Bastards Overlay"
      fill
      className="object-contain"
    />
  </div>

  <div className="relative w-76 h-30 sm:w-80 sm:h-16 z-1 -mt-10 mb-[-20px]">
    <Image
      src="/bastards_flipped.png"
      alt="Flipped Bastards Overlay"
      fill
      className="object-contain opacity-50"
    />
  </div>
</div>

      <div className="absolute inset-0 z-0" />
    </div>
  );
}