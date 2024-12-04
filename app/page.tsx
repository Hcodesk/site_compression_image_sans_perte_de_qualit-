"use client"
import Image from "next/image";
import Loader from "@/components/Loader";
import { RotateCcw } from 'lucide-react';
import {useState,useEffect} from "react"
import Img from "@/components/ImageUpload";
import ImageInfo from "@/components/ImageInfo";
export default function Home() {
 //etats
 const [originalImmageSource,setOriginalImageSource] = useState<string | null>(null)
 const [compressedImmageSource,setCompressedImageSource] = useState<string | null>(null)
 const [originalSize,setOriginalSize] = useState<Number>(0)
 const [compressedSize,setCompressedSize] = useState<Number | null >(null)
 const [imageName,setImageName] = useState<string>("")
 const [imageFormat,setImageFormat] = useState<string>("jpg")
 const [compressionType,setCompressionType] = useState<string>("lossy")
 const [loading,setLoading] = useState<boolean>(false)
 //comportement
 useEffect(()=>{
  if (loading) {
    const timer = setTimeout(()=>{
      setLoading(false)
    }, 2000);
    return () => clearTimeout(timer)
  }
 })

 //pas compris
 const handleCompress = () => {
  if (!originalImmageSource) return;
  setLoading(true)
  const img = new Image();
  img.onload = ()=> {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const maxWidth = 1920;
    const maxHeight = 1080;
    let width = img.width;
    let height = img.height;

    if (width > maxWidth || height > maxHeight) {
      const aspectRatio = width / height;
      if (width > maxWidth){
        width = maxWidth;
        height = width / aspectRatio;
      }
      if (height > maxHeight){
        width = maxHeight;
        height = height * aspectRatio;
      }
    }

    canvas.width = width;
    canvas.height = height;

    ctx?.drawImage(img, 0,0, width, height)

    let mimeType = '';
    let quality = 0.8;

    if(imageFormat === "jpeg") {
      mimeType = "image/jpeg";
    } else if(imageFormat === "png") {
      mimeType = "image/png";
    } else if (imageFormat === "webp") {
      mimeType = "image/webp"
    }

    const compressImage = (quality: number) => {
      if (compressionType === "lossless" ) {
        return canvas.toDataURL(mimeType)
      } else {
        canvas.toDataURL(mimeType, quality)
      }
    let compressedDataURL = compressImage(quality)
    let compressedBlob = dataURLToBlob(compressedDataURL)
    let compresedBlobSize = compressedBlob.size
  while(compressedBlobSize>= originalSize && quality > 0.1){
      quality - 0.1;
      compressedDataURL = compressImage(quality)
      compressedBlob = dataURLToBlob(compressedDataURL);
      compressedBlobSize = compressedBlog.size
    }

    setCompressedImageSource(compressedDataURL);
    setCompressedSize(compressedBlobSize);
    setLoading(false)

    }
    img.src = originalImmageSource;
 }

 const dataURLToBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',')
  const mine = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n);
  while (n--){
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob ([u8arr],{type: mine} )
 }


 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if(!file) return;
  setLoading(true)
  const img = new window.Image();
  img.onload =()=> {
    setOriginalImageSource(img.src)
    setCompressedImageSource(null)
    setOriginalSize(file.size)
    setLoading(false)
  }
  img.src = URL.createObjectURL(file)
 }
 //affichage
 return (
  <section className="max-w-[1000px] mx-auto w-full min-h-sxreen 
  flex fle-col items-center px-3 py-20 overflow-hidden relative">
    <h2 className="text-2xl md:text-4xl lg:text-8xl uppercase font-black text-center">
      <span className="text-red-500">Rapid</span>Image
    </h2>

//pas compris
    {loading && <Loader />}
    {!loading && compressedSize === null && (
      <>
        {originalImmageSource === null && (
            <Img onChange={handleFileChange} />
        )}
        {(originalImmageSource !== null || compressedImmageSource !== null) && (
          <ImageInfo 
            imageName = {imageName}
            imageFormat = {imageFormat}
            originalSize = {originalSize}
            originalImageSource = {originalImmageSource as string}
            compressionType = {compressionType}
            setCompressionType = {setCompressionType}
            handleCompress = {HandleCompress}
          />
        )}
      </>
    )}
    <Img/>
  </section>
  

 )
}
