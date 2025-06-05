"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ShareRedirectPage({
  params,
}: {
  params: { type: string | string[] };
}) {
  const router = useRouter();
  const type = Array.isArray(params.type) ? params.type[0] : params.type;

  useEffect(() => {
    router.push(`/result?type=${type}`);
  }, [router, type]);

  return null; // 화면에 아무것도 안 그리기
}