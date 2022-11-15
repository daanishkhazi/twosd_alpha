import Image from "next/image";
import Link from "next/link";

type FeatureProps = {
  id: string
};

const Features: React.FC<FeatureProps> = (props: FeatureProps) => {
  const id = props.id
  return (<div id={id} className="min-h-screen flex items-center justify-center bg-primary-300">
            <div className="text-5xl font-bold p-8">TODO - Features section (demo)</div>
          </div>);
};

export default Features;
