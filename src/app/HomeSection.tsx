"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Chewy } from "next/font/google";
import LightningRingCard from "./LightningRingCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const chewy = Chewy({ subsets: ["latin"], weight: "400" });

export default function HomeSection() {
  const [wallet, setWallet] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tier, setTier] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [showCard, setShowCard] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
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

  // Load tier wallets
  const tier1Wallets = process.env.NEXT_PUBLIC_1_WALLETS?.split(",").map(w => w.trim().toLowerCase()) || [];
  const tier2Wallets = process.env.NEXT_PUBLIC_2_WALLETS?.split(",").map(w => w.trim().toLowerCase()) || [];
  const tier3Wallets = process.env.NEXT_PUBLIC_3_WALLETS?.split(",").map(w => w.trim().toLowerCase()) || [];
  
  const getTierName = (tier: number) => {
    switch (tier) {
      case 1: return "GTD Free Mint";
      case 2: return "GTD Whitelisted";
      case 3: return "FCFS Whitelisted";
      case 4: return "Public Phase";
      default: return "Unknown";
    }
  };

  const handleCheck = async () => {
    if (!wallet.trim() || !username.trim()) {
      setErrorMessage("Please enter both wallet address and X username");
      setShowError(true);
      return;
    }

    setIsLoading(true);
    setShowError(false);
    setHasChecked(false);
    setShowCard(false);

    // Check tier
    const walletLower = wallet.toLowerCase();
    let userTier = 4; // Default to public phase
    
    if (tier1Wallets.includes(walletLower)) {
      userTier = 1;
    } else if (tier2Wallets.includes(walletLower)) {
      userTier = 2;
    } else if (tier3Wallets.includes(walletLower)) {
      userTier = 3;
    }

    setTier(userTier);

    // Fetch X profile image via API route
    try {
      const cleanUsername = username.trim().replace(/^@/, "");
      const response = await fetch(`/api/profile?username=${encodeURIComponent(cleanUsername)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch profile");
      }

      const data = await response.json();
      
      console.log("API Response:", data); // Debug log
      
      if (!data.profile_image || data.profile_image === null || data.profile_image === "") {
        throw new Error("Profile image not found");
      }

      setProfileImage(data.profile_image);
      setIsLoading(false);
      setShowCard(true);
      setHasChecked(true);
    } catch (error: any) {
      console.error("Error fetching profile:", error); // Debug log
      setIsLoading(false);
      setHasChecked(true); // Keep check button visible on error
      setShowCard(false);
      setErrorMessage(`Couldn't load profile image. ${error.message || "Please check the username and try again."}`);
      setShowError(true);
    }
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
            height: "520px",
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
            src="/bas_logo.png"
            alt="Basterds Logo"
            width={35}
            height={35}
            className="ml-3 mb-1 object-contain"
          />
          <span className="text-white text-2xl font-bold inline xs:hidden">asterds</span>
        </div>
        
        <div className="flex items-center gap-1 mr-3">
          <a href="https://x.com/basterds_xyz" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <Image
              src="/x-logo.png"
              alt="X Logo"
              width={32}
              height={32}
              className="object-contain w-8 h-8 sm:w-8 sm:h-8"
            />
          </a>
          <a href="https://discord.com/invite/basterds-1353038611154599986" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
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
          The Basterds step first into Monad.
        </p>
        <p className="text-md sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2" style={{ fontFamily: 'Arial' }}>
          Check your whitelist status now — the mainnet awaits the bold.
        </p>
      </div>

      <div className="absolute top-54 sm:top-56 md:top-53 left-1/2 lg:left-25 transform -translate-x-1/2 lg:translate-x-0 flex flex-col items-start bg-purple-200/90 p-6 sm:p-8 rounded-3xl z-20 w-11/12 sm:w-4/5 md:w-3/5 lg:w-130 max-w-2xl shadow-2xl">
        <p className="text-black text-base sm:text-lg mb-4 sm:mb-6 italic font-semibold">
          Enter your wallet and X username.
        </p>
        
        <input
          type="text"
          placeholder="0x...."
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="px-4 sm:px-6 py-3 sm:py-4 rounded-2xl text-gray-600 w-full bg-white/60 mb-3 text-sm sm:text-base"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="text"
            placeholder="X username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-2xl text-gray-600 flex-1 bg-white/60 text-sm sm:text-base"
          />
          
          {showCard ? (
            <LightningRingCard
              bgImage={`/${tier}.png`}
              profilePic={profileImage}
              username={`@${username.replace(/^@/, "")}`}
            />
          ) : (
            <button
              onClick={handleCheck}
              disabled={isLoading}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-900 to-pink-500 text-white font-bold rounded-2xl hover:scale-105 transition text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full"
            >
              {isLoading ? "Loading..." : "Check"}
            </button>
          )}
        </div>

        {/* Error Dialog */}
        <Dialog open={showError} onOpenChange={setShowError}>
          <DialogContent className="bg-white rounded-2xl p-6 max-w-md">
            <VisuallyHidden>
              <DialogTitle>Error</DialogTitle>
            </VisuallyHidden>
            <div className="text-center">
              <p className="text-red-600 text-lg font-bold mb-4">❌ Error</p>
              <p className="text-gray-700">{errorMessage}</p>
              <button
                onClick={() => setShowError(false)}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
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
            alt="Basterds Overlay"
            fill
            className="absolute top-0 left-0"
          />
        </div>
        <div className="relative top-40 w-100 h-19 mt-[-24px]">
          <Image
            src="/bastards_flipped.png"
            alt="Flipped Basterds Overlay"
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
            alt="Basterds Overlay"
            fill
            className="object-contain"
          />
        </div>

        <div className="relative w-76 h-30 sm:w-80 sm:h-16 z-1 -mt-10 mb-[-20px]">
          <Image
            src="/bastards_flipped.png"
            alt="Flipped Basterds Overlay"
            fill
            className="object-contain opacity-50"
          />
        </div>
      </div>

      <div className="absolute inset-0 z-0" />
    </div>
  );
}