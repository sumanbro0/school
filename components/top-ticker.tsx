"use client";
import { useState, useEffect } from "react";

const TopTicker = () => {
  const announcements = [
    "🎓 Senior Graduation Ceremony - June 15th at 2 PM",
    "📚 Book Fair Next Week - Don't forget to visit the library!",
    "🏆 Congratulations to our Math Team on State Championship",
    "🎭 Spring Musical Auditions - Sign up in Room 204",
    "🏃‍♂️ Track & Field Practice starts at 3:30 PM",
  ];

  const [items, setItems] = useState([...announcements, announcements[0]]);
  const [scrolling, setScrolling] = useState(true);

  useEffect(() => {
    if (!scrolling) return;

    const scrollInterval = setInterval(() => {
      setItems((prev) => {
        const newItems = [...prev];
        const firstItem = newItems.shift();
        newItems.push(firstItem || "");
        return newItems;
      });
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [scrolling]);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-8">
          {/* <div className="bg-yellow-500 text-blue-900 font-bold px-4 py-1 rounded-full text-sm mr-4 shadow-md">
            LATEST NEWS
          </div> */}
          <div className="overflow-hidden flex-1 relative">
            <div className="flex whitespace-nowrap animate-scroll">
              {items.map((announcement, index) => (
                <div
                  key={index}
                  className="inline-block px-8 text-sm font-medium transition-all duration-500 ease-in-out hover:scale-105"
                  onMouseEnter={() => setScrolling(false)}
                  onMouseLeave={() => setScrolling(true)}
                  style={{
                    animation: `slide 15s linear infinite`,
                    animationPlayState: scrolling ? "running" : "paused",
                  }}
                >
                  {announcement}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-${100 / items.length}%);
          }
        }
        .animate-scroll {
          display: flex;
          animation: slide 15s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TopTicker;
