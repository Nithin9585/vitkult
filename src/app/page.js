import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-900">
      <Link href={"/Forms"}>  
        <Button className="bg-gradient-to-r from-yellow-200 to-red-500">
          Join Us
        </Button>
      </Link>
    </div>
  );
}
