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
    <>
      <Image
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={product.image}
        alt=""
        width={500}
        height={300}
      />
    
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.category}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.price} $
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.description}
        </p>
      </div>
    </>
  );
}
