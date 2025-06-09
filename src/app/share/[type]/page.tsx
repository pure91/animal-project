import { redirect } from "next/navigation";

export default function Page({ params }: { params: { type: string } }) {
  redirect(`/result?type=${params.type}`);
  return null;
}