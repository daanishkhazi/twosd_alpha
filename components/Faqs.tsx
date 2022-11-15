import Image from "next/image";
import Link from "next/link";

type FaqProps = {
  id: string
};

const Faqs: React.FC<FaqProps> = (props: FaqProps) => {
  const id = props.id
  return (<div id={id} className="min-h-screen flex items-center justify-center bg-primary-500">
            <div className="text-5xl font-bold p-8">TODO - FAQs sections</div>
         </div>);
};

export default Faqs;
