import Image from "next/image";
import Link from "next/link";


type TestimonialProps = {
  id: string
};

const Testimonials: React.FC<TestimonialProps> = (props: TestimonialProps) => {
  const id = props.id
  return (<div id={id} className="min-h-screen flex items-center justify-center bg-primary-800">
            <div className="text-5xl font-bold p-8">TODO - Testimonials section</div>
          </div>);
};

export default Testimonials;
