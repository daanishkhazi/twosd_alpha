import Image from "next/image";
import Link from "next/link";

type PricingProps = {
  id: string
};

const Pricing: React.FC<PricingProps> = (props: PricingProps) => {
  const id = props.id
  return (<div id={id} className="min-h-screen flex items-center justify-center bg-primary-300">
            <div className="text-5xl font-bold p-8">TODO - Pricing section</div>
          </div>);
};

export default Pricing;
