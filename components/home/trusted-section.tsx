"use client";

import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";

export function TrustedSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative bg-black text-white py-16 my-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center ">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">
              TRUSTED BY PARENTS
              <br />
              NATIONWIDE
            </h2>
            <p className="text-gray-300 text-lg">
              ORCHIDS The International School is elated to be honoured multiple
              times by the Asian Education Leadership Awards
            </p>
            <Button
              variant="default"
              className="bg-[#B01B2E] hover:bg-[#8B1624] text-white"
            >
              Enquire Now →
            </Button>
          </div>

          {/* Right Content - Video Card */}
          <div
            className="relative group cursor-pointer"
            onClick={() => setVideoOpen(true)}
          >
            <div className="relative rounded-lg overflow-hidden aspect-video h-[250px] max-w-full md:h-[300px]">
              <Image
                fill
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1920&auto=format&fit=crop"
                alt="Student speaking"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-[#B01B2E]" />
                </div>
              </div>

              {/* Video Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-sm mb-1">Explore the Orchids</p>
                <p className="text-xl font-semibold">
                  Experience Designed to Create Champions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://youtu.be/wsupCm382Oo?list=TLGGCVbcGMHcL8UxNDAxMjAyNQ"
              title="Orchids International School Experience"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
