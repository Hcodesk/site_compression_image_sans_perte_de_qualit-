import React from 'react'
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { ArrowUpFromLine } from 'lucide-react';
import { Input } from "@/components/ui/input"
interface ImageUploadProps {
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Img: React.FC<ImageUploadProps> = ({onChange})=> {
    return(
        <Card className="max-w-[1000px] mx-auto w-full mt-8 border border-dashed border-gray-400
        p-6 rounded-lg text-center cursor-pointer hover:bg-red-500 hover:text-white transition-all"
        onClick={()=> document.querySelector<HTMLInputElement>('.file-inp')?.click()}>
            <ArrowUpFromLine size='sm' className='mx-auto h-12 w-12'/>
            <p className="mt-4 text-sm">Sélectionner un fichier</p>
            <Input type='file' accept='image/*' className="file-inp hidden" onChange={onChange}/>

        </Card>
    )
}

export default Img