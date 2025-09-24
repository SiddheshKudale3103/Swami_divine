import { useEffect, useState } from "react";
import axios from "axios";
import { ImageMediaData } from "../helpers/ImageMediaData";

const API_BASE = "https://swami-divine-backend.onrender.com/api";
// const SWAGGER = "https://swami-divine-backend.onrender.com/api-docs/"
const PAGE_SIZE = 6;

export default function useMediaData() {
  const [allImages, setAllImages] = useState<any[]>([]);
  const [allVideos, setAllVideos] = useState<any[]>([]);
  const [allPosters, setAllPosters] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [posters, setPosters] = useState<any[]>([]);
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [pageText, setPageText] = useState<any>(null);

  const [imgPage, setImgPage] = useState(1);
  const [vidPage, setVidPage] = useState(1);
  const [posterPage, setPosterPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imgRes = await axios.get(`${API_BASE}/images`);
        setAllImages(imgRes.data || []);
        setImages(imgRes.data.slice(0, PAGE_SIZE));
      } catch (err) {
        console.error("❌ Error fetching images:", err);
      }

      try {
        const vidRes = await axios.get(`${API_BASE}/videos`);
        setAllVideos(vidRes.data || []);
        setVideos(vidRes.data.slice(0, PAGE_SIZE));
      } catch (err) {
        console.error("❌ Error fetching videos:", err);
      }

      setAllPosters(ImageMediaData);
      setPosters(ImageMediaData.slice(0, PAGE_SIZE));

      try {
        const pdfRes = await axios.get(`${API_BASE}/pdfs`);
        setPdfs(pdfRes.data || []);
      } catch (err) {
        console.error("❌ Error fetching pdfs:", err);
      }

      try {
        const textRes = await axios.get(`${API_BASE}/text`);
        setPageText(textRes.data || null);
      } catch (err) {
        console.error("❌ Error fetching page text:", err);
      }
    };

    fetchData();
  }, []);

  const loadMoreImages = () => {
    const next = allImages.slice(imgPage * PAGE_SIZE, (imgPage + 1) * PAGE_SIZE);
    setImages((prev) => [...prev, ...next]);
    setImgPage((prev) => prev + 1);
  };

  const loadMoreVideos = () => {
    const next = allVideos.slice(vidPage * PAGE_SIZE, (vidPage + 1) * PAGE_SIZE);
    setVideos((prev) => [...prev, ...next]);
    setVidPage((prev) => prev + 1);
  };

  const loadMorePosters = () => {
    const next = allPosters.slice(posterPage * PAGE_SIZE, (posterPage + 1) * PAGE_SIZE);
    setPosters((prev) => [...prev, ...next]);
    setPosterPage((prev) => prev + 1);
  };

  return {
    images,
    videos,
    posters,
    pdfs,
    pageText,
    loadMoreImages,
    loadMoreVideos,
    loadMorePosters,
    allImages,
    allVideos,
    allPosters,
  };
}
