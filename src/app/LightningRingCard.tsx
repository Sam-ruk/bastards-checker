"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface LightningRingCardProps {
  bgImage: string;
  profilePic: string;
  username: string;
}

export default function LightningRingDialog({
  bgImage,
  profilePic,
  username,
}: LightningRingCardProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const generateLightningPath = (
    radius: number,
    segments: number,
    jaggedness: number
  ) => {
    let path = "";
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const variance = (Math.random() - 0.5) * jaggedness;
      const r = radius + variance;
      const x = 170 + Math.cos(angle) * r;
      const y = 170 + Math.sin(angle) * r;
      path += `${i === 0 ? "M" : "L"} ${x} ${y} `;
    }
    return path + "Z";
  };

  useEffect(() => {
    const generatePaths = () => {
      setPaths(Array.from({ length: 5 }, () => generateLightningPath(150, 120, 15)));
    };
    generatePaths();
    const interval = setInterval(generatePaths, 2500);
    return () => clearInterval(interval);
  }, []);

  const postOnX = () => {
    const message = `🎉 Wow, I'm eligible to mint Basterds on Monad Mainnet 🎉\n\nCheck yours:`;
    const url = "bastards-checker.vercel.app";
    const hashtags = "Basterds,Monad";
    const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message
    )}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
    window.open(twitterIntent, "_blank");
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported");

      const CARD_W = 340;
      const CARD_H = 408;
      canvas.width = CARD_W * 2;
      canvas.height = CARD_H * 2;
      ctx.scale(2, 2);

      const load = (src: string): Promise<HTMLImageElement> =>
        new Promise((res, rej) => {
          const abs = src.startsWith("/") ? `${window.location.origin}${src}` : src;
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => res(img);
          img.onerror = () => rej(new Error(`Failed: ${abs}`));
          img.src = abs;
        });

      const [bgImg, profileImg] = await Promise.all([
        load(bgImage),
        load(profilePic),
      ]);

      // Background
      ctx.drawImage(bgImg, 0, 0, CARD_W, CARD_H);

      // Lightning ring
      const ringSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 420 420" width="340" height="340">
          ${paths
            .map(
              (p) => `<path d="${p}" fill="none" stroke="white" stroke-width="2.5"
                       stroke-linecap="round" stroke-linejoin="round"
                       style="filter: drop-shadow(0 0 6px rgba(255,255,255,0.6))
                                   drop-shadow(0 0 12px rgba(255,255,255,0.4))
                                   drop-shadow(0 0 20px rgba(255,255,255,0.2));"/>`
            )
            .join("")}
        </svg>`;
      const ringBlob = new Blob([ringSvg], { type: "image/svg+xml" });
      const ringUrl = URL.createObjectURL(ringBlob);
      const ringImg = await load(ringUrl);
      URL.revokeObjectURL(ringUrl);

      const ringScale = 0.79;
      const ringSize = CARD_W * ringScale;
      const ringX = (CARD_W - ringSize) / 2;
      const ringY = CARD_H * 0.23 - ringSize * 0.3;
      const adjustedSize = ringSize * (420 / 340);
      const offsetAdjust = (adjustedSize - ringSize) / 2;
      ctx.drawImage(ringImg, ringX - offsetAdjust, ringY - offsetAdjust, adjustedSize, adjustedSize);

      // Profile
      const profileSize = 70;
      const profileX = (CARD_W - profileSize) / 2;
      const profileY = CARD_H * 0.5 - profileSize / 2 - CARD_H * 0.15;

      ctx.save();
      ctx.beginPath();
      ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2 + 3, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(profileImg, profileX, profileY, profileSize, profileSize);
      ctx.restore();

      // Username badge
      ctx.font = "bold 7px system-ui, -apple-system, sans-serif";
      const textW = ctx.measureText(username).width;
      const badgeX = profileX + profileSize / 2;
      const badgeY = profileY + profileSize + 10;
      const pad = 5;
      const badgeH = 17;

      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(badgeX - textW / 2 - pad, badgeY - badgeH / 2, textW + pad * 2, badgeH, 9999);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(username, badgeX, badgeY);
      ctx.restore();

      // Export
      canvas.toBlob((blob) => {
        if (!blob) return alert("Failed to create image.");
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = `${username}_card.png`;
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (err: any) {
      console.error("Download failed:", err);
      alert(`Download failed: ${err.message || "Try again."}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-900 to-pink-500 text-white font-bold rounded-2xl hover:scale-105 transition text-base sm:text-lg sm:w-auto w-full">
          Show Card
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="p-0 border-0 bg-transparent max-w-[min(85vw,340px)] overflow-visible"
      >
        <VisuallyHidden>
          <DialogTitle>{username}&apos;s Basterds Card</DialogTitle>
        </VisuallyHidden>

        <div
          className="relative rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.4)] overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, #faa1c6, #c64dbe, #48318b)",
            transform: "scale(0.85)",
            transformOrigin: "center",
          }}
        >
          <div className="absolute inset-0 border-[2px] border-white/20 rounded-3xl pointer-events-none" />
          <div className="p-4 sm:p-5">
            <div
              ref={cardRef}
              className="relative w-full aspect-[5/6] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
              />

              {/* Lightning Ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <motion.div
                className="w-[80%] aspect-square translate-y-[-22%] sm:translate-y-[-23%]"
                  animate={{ rotate: 360 }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <svg
                    viewBox="0 0 340 340"
                    className="overflow-visible w-full h-full"
                  >
                    {paths.map((path, i) => (
                      <motion.path
                        key={i}
                        d={path}
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          filter:
                            "drop-shadow(0 0 6px rgba(255,255,255,0.6)) drop-shadow(0 0 12px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.2))",
                        }}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1, 1, 0],
                          opacity: [0, 1, 0.8, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          times: [0, 0.3, 0.7, 1],
                          repeat: Infinity,
                          delay: i * 0.35,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </svg>
                </motion.div>
              </div>

              {/* Profile */}
              <div className="lg:ml-1.5 ml-1.5 lg:mb-4 mb-3 absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="relative -mt-[35%] sm:-mt-[35%]">
                  <div className="w-[55px] h-[55px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden border-[2.5px] sm:border-[3px] border-white shadow-2xl bg-white">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${profilePic})` }}
                    />
                  </div>
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1 py-0.5 sm:px-2 sm:py-0.5 rounded-full border-[1.5px] sm:border-2 border-white/70 bg-black/70 backdrop-blur-sm text-white text-[6px] sm:text-[11px] font-bold shadow-lg">
                    {username}
                  </div>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-row gap-2.5">
              <Button
                onClick={downloadCard}
                className="flex-1 text-sm bg-white/20 border-2 border-white/40 backdrop-blur-md text-white hover:bg-white/30 hover:border-white/50 transition-all font-semibold h-10"
              >
                Download
              </Button>
              <Button
                onClick={postOnX}
                className="flex-1 text-sm bg-white/20 border-2 border-white/40 backdrop-blur-md text-white hover:bg-white/30 hover:border-white/50 transition-all font-semibold h-10"
              >
                Share on X
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}