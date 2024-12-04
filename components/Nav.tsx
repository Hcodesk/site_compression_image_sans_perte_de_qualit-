import { Image } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Github } from 'lucide-react';
export default function Nav() {
  return (
    <nav className="max-w-[1000px] mx-auto border-2 h-[50px] flex justify-center items-center">
    <Link target="_blank" href="#">
      <Image />
    </Link>
    <Link target="_blank" href="#">
    <Button> <Github /></Button>
    </Link>
   
    </nav>
  )
}
