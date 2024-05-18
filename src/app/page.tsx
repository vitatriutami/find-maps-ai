import Image from "next/image";
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import ("./components/MapComponent"), {ssr: false});


export default function MyPage() {
  return (
    <div>
      <DynamicMapComponent />
    </div>
  );
}
