export async function  getAllProducts(){
  const res = await fetch("https://fakestoreapi.com/products/");   
  const data = await res.json();
  return data;
    
  
}