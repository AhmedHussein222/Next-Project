import { getAllProducts } from "@/app/service/productsFetch";
import Image from "next/image";
import { notFound } from "next/navigation";

async function generateMetaData({ params }) {
  let id = await params.details;
  const res = await fetch("https://fakestoreapi.com/products/" + id);
  const data = await res.json();
  return {
    title: data.title,
  };
}

export async function generateStaticParams() {
  let products = await getAllProducts();
  let ids = products.map((product) => ({
    details: product.id.toString(),
  }));
  return ids;
}

export const metadata = {
  title: "User",
  description: "User page",
};
export default async function User({ params }) {
  let id = await params.details;
  console.log(id);
  let product;
  try {
    let res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch user data: ${res.statusText}`);
    }
    product = await res.json();
  } catch (e) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <Image
            className="object-contain h-[300px] w-auto rounded-lg"
            src={product.image}
            alt={product.title}
            width={500}
            height={300}
            priority
          />
        </div>

        <div className="md:w-2/3 p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.title}
          </h1>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm">
              {product.category}
            </span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${product.price}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
