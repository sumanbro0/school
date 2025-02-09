"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SectionProps = {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  buttonText?: string;
  buttonColor?: string;
  titlePosition?: "top" | "default";
  maxChars?: number;
};

const CHARS = 250;

const Section = ({
  title,
  subtitle,
  description = "",
  imageSrc,
  imageAlt = "Section Image",
  imagePosition = "left",
  maxChars = CHARS,
  buttonText,
  buttonColor = "bg-blue-600 hover:bg-blue-700",
  titlePosition = "default",
}: SectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const shortenedText = description.slice(0, maxChars);
  const shouldShowReadMore = description.length > maxChars;

  const TitleSection = () => (
    <div className="space-y-2">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-500">{subtitle}</p>
      )}
    </div>
  );

  return (
    <section className="py-16 px-4 w-full">
      <div className="flex flex-col w-full">
        {titlePosition === "top" && (
          <div className="mb-12 text-center">
            <TitleSection />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 md:gap-20 md:justify-between items-center w-full">
          {imageSrc && imagePosition === "left" && (
            <div className="relative aspect-video w-full md:w-1/2">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          )}

          <div className="flex flex-col space-y-6 flex-1">
            {titlePosition === "default" && <TitleSection />}
            <div className="space-y-2">
              <AnimatePresence mode="sync">
                <motion.div
                  key={isExpanded ? "expanded" : "collapsed"}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                  }}
                  onAnimationStart={() => setIsAnimating(true)}
                  onAnimationComplete={() => setIsAnimating(false)}
                  className="overflow-hidden"
                >
                  <p className="text-lg text-gray-600">
                    {isExpanded
                      ? description
                      : `${shortenedText}${shouldShowReadMore ? "..." : ""}`}
                  </p>
                </motion.div>
                {shouldShowReadMore && !isAnimating && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`text-sm font-medium ${
                      buttonText
                        ? "text-gray-500 hover:text-gray-700"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            {buttonText && !isAnimating && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${buttonColor} px-4 py-1.5 text-white rounded-md transition-colors duration-200 w-fit`}
              >
                {buttonText}
              </motion.button>
            )}
          </div>

          {imageSrc && imagePosition === "right" && (
            <div className="relative aspect-video w-full md:w-1/2">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                objectFit="cover"
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section;
