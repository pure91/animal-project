import { redirect } from "next/navigation";

type Props = {
  params: { type: string | string[] };
};

export default function Page({ params }: Props) {
  const type = Array.isArray(params.type) ? params.type[0] : params.type;
  redirect(`/result?type=${type}`);
}