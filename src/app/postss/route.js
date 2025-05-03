import { v4 } from "uuid";
import { posts } from "./data";

export async function GET() {
  return  Response.json( posts);
  
  
}
export async function POST(request) {
  const body = await request.json();
  const newPost = {
    id: v4(),
    title: body.title,
    content: body.content,};
  
  
}