"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Button } from "../ui/button";

export default function UploadYourImage() {
  const ref = useRef();
  const { push } = useRouter();
  const { scrollYProgress, scrollXProgress } = useScroll({
    target: ref,
  });

  const textScale = useTransform(scrollYProgress, [0, 1], ["100%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const imageWidth = useTransform(scrollYProgress, [0, 1], ["20%", "100%"]);
  const imageHeight = useTransform(scrollYProgress, [0, 1], ["30%", "50%"]);

  const imageScale = useTransform(scrollYProgress, [0, 1], ["10%", "100%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="h-[200vh] relative container mb-44">
      <div className="sticky top-0 h-screen grid place-items-center overflow-hidden">
        <div className="grid place-item-center w-full h-96">
          <Image
            src={"/assets/svg/pattern.svg"}
            fill
            alt="pattern-upload-img"
            className="object-cover md:object-fill"
          />
        </div>
        <div className="absolute h-screen w-full columns-3 space-y-3 gap-3 md:space-y-5 md:gap-5">
          <motion.div
            style={{
              zIndex: "20",
              position: "relative",
              width: "100%",
              height: "50%",
              scale: imageScale,
              opacity: imageOpacity,
            }}
          >
            <Image
              src={"/assets/image/login-bg.jpg"}
              alt="login-bg"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{
              zIndex: "20",
              position: "relative",
              width: "100%",
              height: "50%",
              scale: imageScale,
              opacity: imageOpacity,
            }}
          >
            <Image
              src={"/assets/image/image-1.jpg"}
              alt="image-1"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{
              zIndex: "20",
              position: "relative",
              width: "100%",
              height: "50%",
              scale: imageScale,
              opacity: imageOpacity,
              maxWidth: "100%",
            }}
          >
            <Image
              src={"/assets/image/image-2.jpg"}
              alt="image-2"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{
              zIndex: "20",
              position: "relative",
              width: "100%",
              height: "50%",
              scale: imageScale,
              opacity: imageOpacity,
              maxWidth: "100%",
            }}
          >
            <Image
              src={"/assets/image/image-3.jpg"}
              alt="image-3"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{
              zIndex: "20",
              position: "relative",
              width: "100%",
              height: "50%",
              scale: imageScale,
              opacity: imageOpacity,
              maxWidth: "100%",
            }}
          >
            <Image
              src={"/assets/image/image-4.jpg"}
              alt="image-4"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{
              zIndex: "20",
              position: "relative",
              width: "100%",
              height: "50%",
              scale: imageScale,
              opacity: imageOpacity,
              maxWidth: "100%",
            }}
          >
            <Image
              src={"/assets/image/image-5.jpg"}
              alt="image-5"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
        <motion.div
          className="text-center text-white absolute w-full space-y-3"
          style={{
            // y: textY,
            scale: textScale,
            opacity: textOpacity,
          }}
        >
          <p className="font-semibold text-3xl md:text-5xl font-source-serif text-foreground">
            Posting your <span className="text-primary">memorable</span> image
          </p>
          <p className="font-semibold max-w-2xl mx-auto text-foreground">
            Radsnaps invites you to explore the wonders of different corners of
            the world, capturing mesmerizing moments.
          </p>
          <Button size={"lg"} onClick={() => push(`/posting`)}>
            Posting
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
