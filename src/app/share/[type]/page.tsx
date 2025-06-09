import { redirect } from "next/navigation";

export default function Page({ params }: { params: { type: string } }): never {
  redirect(`/result?type=${params.type}`);
}