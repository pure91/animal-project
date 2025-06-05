import { redirect } from "next/navigation";

export default function ShareRedirectPage({
  params,
}: {
  params: { type: string | string[] };
}) {
  const type = Array.isArray(params.type) ? params.type[0] : params.type;
  redirect(`/result?type=${type}`);
}