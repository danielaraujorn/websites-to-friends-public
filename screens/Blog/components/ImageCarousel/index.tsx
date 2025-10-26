/* eslint-disable @next/next/no-img-element */
"use client";
import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import { MediaType } from "@/types/utils";
import styles from "./ImageCarousel.module.scss";

interface ImageCarouselProps {
  images: MediaType[];
  altText: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  altText,
}) => {
  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const imageCount = images.length;

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % imageCount);
  }, [imageCount]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageCount) % imageCount,
    );
  }, [imageCount]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextImage();
    }
    if (distance < -minSwipeDistance) {
      prevImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "Escape") {
          closeFullscreen();
        } else if (
          e.key === "ArrowLeft" &&
          imageCount > 1
        ) {
          prevImage();
        } else if (
          e.key === "ArrowRight" &&
          imageCount > 1
        ) {
          nextImage();
        }
      } else if (imageCount > 1) {
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [imageCount, isFullscreen, nextImage, prevImage]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className={styles.carouselContainer}>
        <div
          className={styles.carousel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${
                currentImageIndex * 100
              }%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={styles.carouselSlide}
                onClick={openFullscreen}
              >
                <img
                  src={image.file.url}
                  alt={image.title ?? altText}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {imageCount > 1 && (
            <>
              <button
                className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className={styles.carouselDots}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.carouselDot} ${
                      index === currentImageIndex
                        ? styles.carouselDotActive
                        : ""
                    }`}
                    onClick={() => goToImage(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className={styles.fullscreenOverlay}
          onClick={closeFullscreen}
        >
          <div
            className={styles.fullscreenContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.fullscreenClose}
              onClick={closeFullscreen}
              aria-label="Close fullscreen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src={images[currentImageIndex].file.url}
              alt={
                images[currentImageIndex].title ?? altText
              }
              className={styles.fullscreenImage}
            />

            {imageCount > 1 && (
              <>
                <button
                  className={`${styles.fullscreenButton} ${styles.fullscreenButtonPrev}`}
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  className={`${styles.fullscreenButton} ${styles.fullscreenButtonNext}`}
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className={styles.fullscreenCounter}>
                  {currentImageIndex + 1} / {imageCount}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
